//# CCT - Render

// 1. Define internal and external structural interfaces
interface CctProps {
    name: string;
    assetData: string;
    html?: string;
    hbData?: Record<string, any>;
    hbSource?: string;
    hbReturn?: boolean;
    globalClass?: string;
}

interface CctAttributes {
    css_class?: string;
    dir?: 'ltr' | 'rtl' | string;
    container_id?: string;
    [key: string]: any;
}

interface ParsedAssetData {
    attributes: {
        value: CctAttributes;
        attributes?: {
            attributes: {
                value: CctAttributes;
            };
        };
    };
}

// Declare external global dependencies if not already defined in your environment
declare const Handlebars: {
    compile: (template: string) => (data: any) => string;
};
declare function print(output: string): void;

/**
 * Renders a Custom Component Template (CCT).
 * @param props The configuration and data properties for the template.
 */
const cctRender = (props: CctProps): string | void => {
    try {

        const { name, assetData } = props;
        let rawHtml: string | undefined;
        
        //Static HTML - Rendered on PL
        if ("html" in props && props.html !== undefined) {
            rawHtml = props.html;
        } 
        //HB - Render component  
        else if ("hbData" in props) {
            const hbTemplate = "hbSource" in props && props.hbSource && props.hbSource.length ? props.hbSource : false;
            if (hbTemplate) {
                rawHtml = Handlebars.compile(hbTemplate)(props.hbData);
            } else {
                print(`<script>console.error("'${name}' CCT has no valid Handlebars template")<\/script>`);
                return;
            }
        }
        
        if (rawHtml) {
            //Fix Handlebars &amp; bug (it double escapes & in escaped strings). For example, $ -> &amp;#36; -> &amp;amp;#36;
            const html: string = rawHtml.replace(/&(amp;)+/g, '&');
            
            //custom global classes
            const globalClass = "globalClass" in props && props.globalClass && props.globalClass.length ? props.globalClass : false;
            
            //function to wrap html in a parent if needed and update parent element attributes
            const wrapAndUpdate = (customAttributes: { id?: string; className?: string } | false = false): string => {
                //wrap html in a section tag if template is made of multiple elements 
                const wrappedHtml = isSingleParent(html) ? html : `<section>${html}</section>`;
                //Update parent element class
                return customAttributes ? updateFirstTag(wrappedHtml, customAttributes) : wrappedHtml; 
            };
            
            //Return compiled html
            if ("hbReturn" in props && props.hbReturn) {
                const customGlobalClass = globalClass ? { className: globalClass } : false;
                return wrapAndUpdate(customGlobalClass);
            } else {
                //apply attributes and print
                const assetDataObj = JSON.parse(assetData) as ParsedAssetData;
                
                // Fallback architecture matching the original nested structural check
                const attributes: CctAttributes = 
                    assetDataObj.attributes && "attributes" in assetDataObj.attributes && assetDataObj.attributes.attributes
                        ? assetDataObj.attributes.attributes.attributes.value 
                        : assetDataObj.attributes.value;
                
                //Update Attributes
                const customAttributes: { id?: string; className?: string } = {};
                
                //classes
                const classes: string[] = ["qld-cct", `qld-cct--${name}`];
                
                //CCT PL classes
                if (globalClass && props.globalClass) { 
                    classes.push(props.globalClass); 
                }
                
                //Advanced settings classes
                if (attributes && "css_class" in attributes && attributes.css_class && attributes.css_class.length) { 
                    classes.push(attributes.css_class); 
                }
                
                //Advanced settings direction
                if (attributes && "dir" in attributes && attributes.dir && attributes.dir.length) {
                    const dir = attributes.dir === "ltr" ? "text-start" : "text-end";
                    classes.push(dir); 
                }
                
                //store classes
                customAttributes.className = classes.join(" ");
                
                //id
                if (attributes && "container_id" in attributes && attributes.container_id && attributes.container_id.length) {
                    customAttributes.id = attributes.container_id.replace(/"/g, '&quot;');
                }

                //adjust parent element attributes
                const DOM = wrapAndUpdate(customAttributes);
                
                //print component
                print(DOM);
            }
        } else {
            print(`<script>console.error("'${name}' CCT has no valid HTML body")<\/script>`);
        }
    }
    catch (error) {
        print(`<script>console.error("Couldn't render ${props.name} CCT","${error}")<\/script>`);
    }
};
