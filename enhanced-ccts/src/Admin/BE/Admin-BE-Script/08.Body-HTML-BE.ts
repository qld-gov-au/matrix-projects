//##CCT BODY HTML

const cctBodyHtml = (): string => {
    let contentHtml = '';
    const unsortedGroup = new Map<string, string>();
    const sectionHeading = store.sections.length > 1;
    
    //All sections html
    store.sections.forEach((section) => {
        
        //generate this section html
        const sectionHtml = cctSectionHtml(section, sectionHeading);
        
        //add not sortable sections to return and split sortable sections in unsortedGroup
        const isSort = objQuery(() => section.sort) === true;
        if (isSort) {
            // Ensure sortRef is transformed to a valid string identifier for the Map key
            const sortKey = section.sortRef ? section.sortRef.toString() : section.id.toString();
            unsortedGroup.set(sortKey, sectionHtml);
        } else {
            //add not sortable sections to body html with their Custom Edit Layout order
            contentHtml += sectionHtml;
        }
    });
    
    if (unsortedGroup.size) {
        //Generate sort table HTML
        contentHtml += sortTableHtml(unsortedGroup);
    }
    
    const bodyHtml = `
        <div class="sq-backend-section-inner-table-wrapper">
            <div class="sq-backend-section-table-inner">
                ${contentHtml}    
            </div>    
        </div>        
    `;
    
    //return output
    return bodyHtml;
};
