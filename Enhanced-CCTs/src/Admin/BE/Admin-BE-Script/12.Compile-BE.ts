//## COMPILE CCT

// Declare Squiz Matrix server-side print function global signature
declare function print(html: string): void;

interface CctAdminModule {
    compile: (data: InitDataInput) => void;
}

var cctAdmin: CctAdminModule = (function () {
    return {
        compile: (data: InitDataInput): void => {
            
            try {
                
                //BE CCT JS
                    //initiate global store
                    initStore(data);
                    
                    //print CCT html to page
                    const html = cctContentHtml();
                    print(html);
                    
    
                //FE CCT JS
                    
                    const handleCct: string[] = [];
                    const assetId = store.asset.assetid.toString();
                    
                    //pass variables to frontend
                    let feJs = ``;
                    
                    //conditional visibility
                    if (store.has.visibility && store.conditionalVisibility) {
                        feJs += `cctStore.conditionalVisibility[${assetId}]=${JSON.stringify(store.conditionalVisibility)};`;
                        handleCct.push('visibility');
                    }
                    
                    //URL
                    feJs += `cctStore.url["${assetId}"]=\`${store.url || ''}\`;`;
                        
                    //enable sorting for CCT
                    if (store.has.sort) { handleCct.push('sort'); }
                    //Add show retired button to CCT
                    if (store.has.retired) { handleCct.push('retired'); }
                    
                    //print script tag to DOM
                    const handleCctVariable = handleCct.length ? `,${JSON.stringify(handleCct)}` : ``;
                    feJs += `cctInit("${assetId}"${handleCctVariable});`; 
                    if (feJs.length) { print(`<script>${feJs}<\/script>`); }
            }
            catch (error) {
                print(`<script>console.error("${error}")<\/script>`);
            }
        }
    };
    
})();
