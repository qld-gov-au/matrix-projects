//#HANDLE SORTING

// Query hidden sort element by MD field name
const cctControlSortElem = (cct: JQuery<HTMLElement>): JQuery<HTMLElement> => {
    return cct.find("[data-name='cct-control.section_sort']");
};

// Check if has sort 
const hasSortOrder = (cct: JQuery<HTMLElement>): number => {
    return cctControlSortElem(cct).length;
};
    
// Get current sort order from the DOM
const getSortState = (cct: JQuery<HTMLElement>): string[] => {
    return cct.find('[data-sortref]').map(function (this: HTMLElement) {
        return $(this).attr('data-sortref');
    }).get() as string[];
};
    
// Save current sort order state in store
const updateSortStore = (cct: JQuery<HTMLElement>, newVal: string[], triggerChange: boolean = false): void => {
    const storeInput = cctControlSortElem(cct).find("input");
    storeInput.val(JSON.stringify(newVal));
    if (triggerChange) {
        storeInput.trigger('change');
    }    
};
 
// Get sort value stored safely with array/false type assertions
const getSortStore = (cct: JQuery<HTMLElement>): string[] | false => {
    const storedSortStr = cctControlSortElem(cct).find("input").val() as string | undefined;
    
    // Safety guard if the input doesn't exist or is completely blank
    if (!storedSortStr || storedSortStr.trim() === "") {
        return false;
    }
    
    try {
        return JSON.parse(storedSortStr) as string[];
    } catch (e) {
        return false;
    }
};
    
    
const cctHandleSorting = (containerId: string | number): void => {
    
    const cct: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"]`);
    
    if (hasSortOrder(cct)) {
        
        // if locks acquired, enable sorting
        if (isLocksAcquiredFE()) {
            cct.addClass("cct-admin--sortable");
        }
        
        // ON LOAD, MANAGE STORE
        const rawSortStore = getSortStore(cct);
            
        // has previously stored sort order
        if (rawSortStore) {
            let sortStore: string[] = rawSortStore;

            const currentDomSort = getSortState(cct);
                
            // if any of the sections in the array don't exist in the dom, remove them from the array (deleted section)
            const storeLessDom = sortStore.filter(item => !currentDomSort.includes(item));
            sortStore = sortStore.filter(item => !storeLessDom.includes(item));
                
            // if any of the sortable sections in the dom don't exist in the array, add them to the array (new section)
            const domLessStore = currentDomSort.filter(item => !sortStore.includes(item));
            sortStore = [...sortStore, ...domLessStore];
                
            // update store with new array
            updateSortStore(cct, sortStore);
                
        } else {
            // no previously stored sort order
            updateSortStore(cct, getSortState(cct));
        }
            
        // ON CHANGE OF ORDER, UPDATE STORE
        // Uses standard jQuery event parameters to handle jQuery UI sortable callbacks
        cct.find(".ui-sortable").on("sortupdate", function (event: JQuery.TriggeredEvent, ui: any): void {
            updateSortStore(cct, getSortState(cct), true);
        });  
        
    }
    
};
