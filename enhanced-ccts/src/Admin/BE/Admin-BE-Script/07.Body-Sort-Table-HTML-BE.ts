//##SORT TABLE HTML

const sortTableHtml = (unsortedGroup: Map<string, string>): string => {
    //start table
    let sortTable = `
        <table class="sq-backend-table js_sq-sortable-table sq-sortable-table sq-sortable-table--cct-control">
            <tbody class="ui-sortable">
    `;
        
        //table body
            // Safely parse the legacy V8 fallback for metadata parsing
            const rawMetadataValue = objQuery(() => store.asset.metadata['cct-control.section_sort'].value);
            let savedSortArray: string[] | false = false;

            if (typeof rawMetadataValue === 'string' && rawMetadataValue.trim().length) {
                try {
                    savedSortArray = JSON.parse(rawMetadataValue);
                } catch (e) {
                    savedSortArray = false;
                }
            }
            
            //Has custom sorting stored
            if (Array.isArray(savedSortArray)) {

                //metadata section existed in the last sort
                savedSortArray.forEach((key: string) => {
                  if (unsortedGroup.has(key)) {
                    sortTable += unsortedGroup.get(key);
                  }
                });
                
                //new metadata section added to schema after last sort
                const targetSavedArray = savedSortArray; // Local reference to satisfy compiler checking
                const newSections = [...unsortedGroup.keys()].filter(item => !targetSavedArray.includes(item));
                newSections.forEach((key: string) => {
                    sortTable += unsortedGroup.get(key) || '';
                });
                
            } else {
            //No custom sorting, first load (use default order as per the Custom Edit Layout asset order)
                 sortTable += Array.from(unsortedGroup.values()).join('');
            }
            
    //end table        
    sortTable += `
            </tbody>
        </table>
    `;
        
    return sortTable;
};
