//##UTILS

//Object Query
//Matrix uses a version of V8 that doesn't support Optional Chaining
//Using a wrapper function (fn) here to ensure the script doesn't crash if accessing a deeply nested key that doesn't exist.
const objQuery = <T>(
    fn: () => T
): T | false => {
    try {
        const val = fn();
        
        //if not found, return false
        if (val === undefined || val === null) return false;

        return val;
        
    } catch (e) {
        //catch errors and return false
        return false;
    }
};

//Safe HTML 
//Escape double quotes
const escapeDoubleQuote = (string: string): string => 
    string.replace(/\"/g, '&quot;');

//Encode HTML
const escapeHtmlBe = (str: string | null | undefined): string => {
    if (!str) return '';
    const map: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
    };
    return str.replace(/[<>]/g, (m) => map[m]);
};

//Check of locks are acquired
const isLocksAcquiredBE = (wrapperHtml: string | null | undefined | false): boolean => {
    if (!wrapperHtml) return false;

    const patterns = [
        '<select(?=[^>]*?class=["\'][^"\']*?sq-form-field)',                                                // Select List
        '<input(?=[^>]*?type=["\']checkbox["\'])(?=[^>]*?class=["\'][^"\']*?sq-form-field)',                // Select Checkbox
        '<input(?![^>]*?disabled)(?=[^>]*?type=["\']text["\'])(?=[^>]*?class=["\'][^"\']*?sq-form-field)',  // Text - type: text, or Asset Finder
        '<textarea(?![^>]*?disabled)(?=[^>]*?class=["\'][^"\'][^>]*?sq-form-field)',                       // Text - textareas / multi-line 
        'class=["\'][^"\']*?sq-wysiwyg-standalone-body[^"\']*?["\'](?=[\\s\\S]*?<textarea)'                 // WYSIWYG editors
    ];
    
    const combinedRegex = new RegExp(patterns.join('|'), 'im');

    return combinedRegex.test(wrapperHtml);
};

//Extract input value from field html
const getInputValue = (html: string | null | undefined): string => {
    const match = (html || "").match(/value\s*=\s*["']([^"']*?)["']/i);
    return match ? match[1] : "";
};
