//## UTILS FORMAT

// Is Number
// Uses a type guard (val is ...) to safely narrow down types later in your code
const isNumeric = (val: unknown): val is number | string => {
    return !isNaN(parseFloat(val as string)) && isFinite(val as any);
};
   
// Unescaping HTML
const unescapeHTML = (str: string): string => {
    return str.replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/'/g, "'")
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');
};

// Decode String
// Assumes jQuery ($) is globally available or imported in your project
const decodeHtmlFe = (html: string): string => {
    return $('<textarea />').html(html).text();
};
