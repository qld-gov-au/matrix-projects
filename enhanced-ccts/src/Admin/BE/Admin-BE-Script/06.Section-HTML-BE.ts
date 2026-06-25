//##SECTION HTML

interface SectionHtmlData {
    id: string | number;
    fields?: FieldHtmlData[];
    activeHeading?: string | number;
    toggleAnimation?: boolean;
    extraClass?: string;
    toggle?: boolean;
    sort?: boolean;
    sortRef?: string | number;
}

const cctSectionHtml = (
    data: SectionHtmlData, 
    sectionHeading: boolean
): string => {
    
    const fields = objQuery(() => data.fields) || [];
    const id = data.id.toString();
    const sectionNameNoEndNumber = `%globals_asset_name:${id}^replace:[0-9 -]+$:^escapehtml%`;
    
    // Safely look up the active heading value from the store map
    const activeHeadingKey = data.activeHeading ? data.activeHeading.toString() : '';
    const storeActiveHeadingValue = store.metadataHashMap && activeHeadingKey 
        ? store.metadataHashMap[activeHeadingKey]?.value 
        : undefined;
    
    const activeHeadingStr = typeof storeActiveHeadingValue === 'string' ? storeActiveHeadingValue : '';
    const title = data.activeHeading && activeHeadingStr.trim().length 
        ? escapeHtml(activeHeadingStr) 
        : sectionNameNoEndNumber;
        
    //classes
    const toggleAnimationClass = "toggleAnimation" in data && data.toggleAnimation === false ? ` cct-no-toggle-animation` : ``;
    const extraClassData = objQuery(() => data.extraClass) ? ` ${data.extraClass}` : ``;
    const extraClass = extraClassData + toggleAnimationClass;

    //Accordion Variables
    const isToggle = objQuery(() => data.toggle) === true;     
    const toggleConfig = isToggle ? {
        elemTag                 : "button type='button'",
        accordionTriggerExtras  : ` sq-backend-section-subheading--accordion-trigger${toggleAnimationClass} align-items-center justify-content-between`,
        accordionAreaExtras     : ` sq-backend-section-inner-table-wrapper--accordion-area${toggleAnimationClass} hidden`,
    } : {
        elemTag                 : "div",
        accordionTriggerExtras  : "",
        accordionAreaExtras     : "",
    };
    // destructure 
    const { elemTag, accordionTriggerExtras, accordionAreaExtras } = toggleConfig;
    
    //Sort Variables
    const isSort = objQuery(() => data.sort) === true;
    const sortConfig = isSort ? {
        wrapperElem         : "td",
        wrapperClasses      : " class='sq-sortable-dragging__row'",
        sortRowStart        : `<tr class="sq-sortable-dragging${extraClass} cct-admin__section" data-sq-id="${id}" data-sortRef="${data.sortRef || ''}">`,
        sortRowEnd          : "</tr>",
        sortSectionTrigger  : `<div class="js_sq-draggable-column sq-draggable-column ui-sortable-handle position-absolute " title="Drag to reorder">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" >
                                        <use href="./?a=${store.iconSpriteAssetUrl}#cctDragHandle"></use>
                                    </svg>
                                </div>`,
    } : {
        wrapperElem         : `div data-sq-id="${id}"`,
        wrapperClasses      : ` class='cct-admin__section${extraClass}'`,
        sortRowStart        : "",
        sortRowEnd          : "",
        sortSectionTrigger  : "",
    };

    // destructure
    const { wrapperElem, wrapperClasses, sortRowStart, sortRowEnd, sortSectionTrigger } = sortConfig;

    //all fields html
    let fieldsHtml = '';
    fields.forEach((field) => {
        const fieldHtml = cctFieldHtml(field, data.activeHeading);
        fieldsHtml += fieldHtml;
    });
    
    // Splitting tags safely out of template literals to satisfy closing bracket structure
    const openWrapperTag = `<${wrapperElem}${wrapperClasses}>`;
    const closeWrapperTag = `</${wrapperElem.split(' ')[0]}>`;
    const openHeadingTag = `<${elemTag} data-default-content="${sectionNameNoEndNumber}" class="sq-backend-section-subheading d-flex${accordionTriggerExtras}">`;
    const closeHeadingTag = `</${elemTag.split(' ')[0]}>`;

    const html = `
            ${sortRowStart}
                ${openWrapperTag}
                    ${sortSectionTrigger}
                    ${sectionHeading ? `
                        ${openHeadingTag}
                            <span class="sq-backend-section-subheading__content">${title}</span>
                        ${closeHeadingTag}
                    ` : `` }
                    <div class="sq-backend-section-inner-table-wrapper p-0${accordionAreaExtras}">
                        <div class="px-4">
                            %globals_asset_data_attributes:${id}^json_decode^index:description^index:value^neq::<div class="sq-backend-note sq-text-normal pt-4 mt-0 mb-4">{globals_asset_data_attributes:${id}^json_decode^index:description^index:value}</div>%
                            <table class="sq-backend-section-table-inner">
                                <tbody>
                                    ${ fieldsHtml }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ${closeWrapperTag}
            ${sortRowEnd}
        `;
    
    return html;
};
