//## STORE DATA FORMAT

interface MetadataItem {
    fieldid: string | number;
    value: unknown;
}

interface MetadataHashmapValue {
    value: unknown;
    name: string;
}

// Generate Metadata Hashmap
const cctMetadataHashmap = (
    metadata: Record<string, MetadataItem>
): Record<string, MetadataHashmapValue> => {
    return Object.fromEntries(
        Object.entries(metadata).map(([key, item]) => [
            item.fieldid, 
            { value: item.value, name: key }
        ])
    );
};


interface ControlFieldConfig {
    id: string | number;
    extraClasses: string;
    html: string;
}

interface SectionData {
    id: string;
    extraClass: string;
    fields: ControlFieldConfig[];
}

// Hidden Control Section Data
const cctControlSectionData = (): SectionData | false => {
    
    // All fields that start with cct-control.
    const cctControlFields = Object.keys(store.asset.metadata).filter(item => item.startsWith("cct-control."));
    
    if (cctControlFields.length) {
        
        const assetId = store.asset.assetid;
        
        //section id is parent id of first field in the list
        const firstFieldKey = cctControlFields[0];
        const sectionId = `{globals_asset_parent:${store.asset.metadata[firstFieldKey].fieldid}}`;
        
        // Section data structure explicitly typed
        const sectionData: SectionData = {
            id              : sectionId,
            extraClass      : 'hidden',
            fields          : [],
        };
        
        // Loop through fields to find id & html
        cctControlFields.forEach((fieldName) => {
            
            const fieldId = store.asset.metadata[fieldName].fieldid;
            const fieldConfig: ControlFieldConfig = {
                id          : fieldId,
                extraClasses: 'bg-alert',
                html        : `<input type="text" name="container_${assetId}_metadata_field_text_${fieldId}_value" value="%globals_asset_metadata_${fieldName}:${assetId}^escapehtml%" class="form-control sq-form-field" id="container_${assetId}_metadata_field_text_${fieldId}_value">`,
            };
            
            // Add field to sectionData
            sectionData.fields.push(fieldConfig);
        });
        
        return sectionData;
    }
    
    return false;            
};
