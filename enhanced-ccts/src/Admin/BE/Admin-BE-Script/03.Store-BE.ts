//#GLOBAL STORE

// 1. Interfaces for the Data Structures
interface AssetAttributes {
    attributes: {
        value: {
            template: string;
            container_id?: string;
        };
    };
}

interface AssetData {
    assetid: string | number;
    metadata: Record<string, MetadataItem>;
    attributes: AssetAttributes;
}

interface FieldData {
    id: string | number;
    html?: string;
    retired?: boolean;
}

interface SectionInput {
    id: string | number;
    activeHeading?: string | number;
    sort?: boolean;
    sortRef?: string | number;
    fields: FieldData[];
}

interface InitDataInput {
    assetData: string; // JSON string of AssetData
    sections: SectionInput[];
    conditionalVisibility?: Array<{ trigger: string | number }>;
    [key: string]: unknown; // For any other properties passed in data
}

interface StoreHasState {
    visibility: boolean;
    sort: boolean;
    retired: boolean;
    locks: boolean;
}

interface StoreStructure extends Omit<InitDataInput, 'assetData'> {
    asset: AssetData;
    has: StoreHasState;
    cctId?: string;
    metadataHashMap?: Record<string, MetadataHashmapValue>;
    visibilityTriggers?: string[];
    url?: string;
    sections: SectionInput[]; 
    feedback?: {};
    guideUrl?: string;
    inlineDescription?: boolean;
}

// 2. Global Store Variable
let store: StoreStructure = {} as StoreStructure;

// 3. InitStore Function Implementation
const initStore = (data: InitDataInput): void => {
    
    //Data variables
    const asset: AssetData = JSON.parse(data.assetData);
    const assetId = asset.assetid.toString();

        //Adjust & Validate Store
        
            //## 1. cct level
            
                //Store data in global store
                store = {
                    ...data,
                    asset,
                    has                     : {
                        visibility  : false,
                        sort        : false,
                        retired     : false,
                        locks       : false,
                    },
                };
                
                //Easy access of CCT Id
                store.cctId = asset.attributes.attributes.value.template;
                
                //Metadata Hashmap
                store.metadataHashMap = cctMetadataHashmap(asset.metadata);

                
                //Conditional Visibility
                store.has.visibility = !!objQuery(() => data["conditionalVisibility"]);
                if(store.has.visibility && data.conditionalVisibility) {
                  store.visibilityTriggers = data.conditionalVisibility.map((rules) => String(rules.trigger));  
                }
                
                //Component URL
                const containerIdAttr = objQuery(() => asset.attributes.attributes.value.container_id);
                const hash = containerIdAttr ? `#${containerIdAttr.replace(/\\/g, '\\\\')}` : ``;
                store.url = `%globals_asset_parent:${assetId}^as_asset:asset_parent^as_asset:asset_url%/_nocache${hash}`;
                
                //Locks (check first form element in cct)
                const firstFieldHtml = objQuery(() => data.sections[0].fields[0].html);
                store.has.locks = isLocksAcquired(firstFieldHtml);
            
            //## 2. section level
            data.sections.forEach(function(section, index) {
                
                //validate activeHeading - check if the activeHeading id exists in the fields
                const activeHeading = objQuery(() => section.activeHeading);
                if(activeHeading){
                    const activeHeadingField = section.fields.some(function(field) {
                        return field.id.toString() === activeHeading.toString();
                    });
                    
                    // Fallback typing alignment for safety
                    if (store.sections[index]) {
                        store.sections[index].activeHeading = activeHeadingField ? activeHeading.toString() : 'false';
                    }
                }
                
                //sort fields
                if(objQuery(() => section.sort) === true){
                    
                    if (store.sections[index]) {
                        //adjust sortRef (sortRef default value is section id)
                        const rawSortRef = objQuery(() => section.sortRef);
                        store.sections[index].sortRef = rawSortRef && String(rawSortRef).length ? String(rawSortRef) : section.id.toString();
                    }
                                
                    //adjust has.sort for the cct (if one sort is found in any section, the cct has sort)
                    if (!store.has.sort) {
                        store.has.sort = true;
                    }
                }
                
            //## 3. field level
                //adjust has retired for cct. Skip if already found one retired field
                if (!store.has.retired) {
                    const retiredFound = section.fields.some(function(field) {
                        return objQuery(() => field.retired) === true;
                    });

                    if (retiredFound) store.has.retired = true;
                }
                
            });

        
            //## 4. CCT Control Section (check if this CCT has a CCT Control section, if found add section data to store.sections)
            const controlSectionData = cctControlSectionData();
            if(controlSectionData){
                // Pushing runtime transformed data into sections array
                (store.sections as unknown[]).push(controlSectionData);
            }
        
};
