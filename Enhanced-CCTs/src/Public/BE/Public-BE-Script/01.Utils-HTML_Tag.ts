//# UTILS - HTML TAG

interface UpdateTagOptions {
    id?: string;
    className?: string;
}

/**
 * Updates or adds ID and class attributes to the first HTML tag of a component string.
 * @param component The HTML component string to update.
 * @param options Object containing the optional id and className to apply.
 */
const updateFirstTag = (component: string, { id, className }: UpdateTagOptions = {}): string =>  {
    // Regex 
    // ^([\s\S]*?)  -> Group 1: Match leading whitespace or comments (non-greedy)
    // (<[a-zA-Z0-9]+[^>]*>) -> Group 2: Match the first actual opening tag
    const mainRegex = /^([\s\S]*?)(<[a-zA-Z0-9]+[^>]*>)/i;
    const match = component.match(mainRegex);
    if (!match) return component;
    
    const prefix: string = match[1]; // Leading comments/whitespace
    let firstTag: string = match[2];  // The actual tag (e.g., <section ...>)
    const remaining: string = component.slice(match[0].length);

    // 1. Process ID (Overwrite if exists, add if not)
    if (id) {
        const idRegex = /(id\s*=\s*(['"]))(.*?)\2/i;
        if (idRegex.test(firstTag)) {
            firstTag = firstTag.replace(idRegex, `$1${id}$2`);
        } else {
            firstTag = firstTag.replace(/<([a-z0-9]+)/i, `<$1 id="${id}"`);
        }
    }

    // 2. Process Class (Append if exists, add if not)
    if (className) {
        // Prevent duplicate addition by checking boundaries [ \s ' " ]
        const classExists = new RegExp(`[\\s'"]${className}[\\s"']`).test(firstTag);
        if (!classExists) {
            const classRegex = /(class\s*=\s*(['"]))(.*?)\2/i;
            if (classRegex.test(firstTag)) {
                // $1: prefix (class="), $3: existing classes, $2: original quote type
                firstTag = firstTag.replace(classRegex, `$1$3 ${className}$2`);
            } else {
                firstTag = firstTag.replace(/<([a-z0-9]+)/i, `<$1 class="${className}"`);
            }
        }
    }

    // 3. Reconstruct the string and fix any potential double spaces
    const updatedTag = firstTag.replace(/\s{2,}/g, ' ');
    return prefix + updatedTag + remaining;
}

/**
 * Checks if an HTML string consists of exactly one top-level parent element.
 * @param html The HTML string to evaluate.
 */
const isSingleParent = (html: string): boolean => {
    const str: string = html.replace(/<!--[\s\S]*?-->/g, '').trim();
    const tagMatch = str.match(/^<([a-z0-9]+)/i);
    if (!tagMatch) return false;

    const tag: string = tagMatch[1];
    const rgx = new RegExp('<(/?' + tag + ')(?:\\s|/?>)', 'gi');
    let depth = 0;
    let match: RegExpExecArray | null;

    while ((match = rgx.exec(str))) {
        // Increment for <tag, decrement for </tag
        depth += match[1].indexOf('/') === 0 ? -1 : 1;
        
        // If depth hits 0, we found the closing partner for the very first tag
        if (depth === 0) {
            const rest: string = str.substring(rgx.lastIndex).trim();
            // It's a single parent ONLY if there is nothing left after this tag
            return rest.length === 0;
        }
    }

    return false;
};
