//## UTILS FORMAT
   
// Decode String
// Assumes jQuery ($) is globally available or imported in your project
const decodeHtmlFe = (html: string): string => {
    return $('<textarea />').html(html).text();
};
