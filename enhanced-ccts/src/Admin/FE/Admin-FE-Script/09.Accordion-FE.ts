//## ACCORDION  

// Configuration interface matching the destructured parameters of your structural layout handler
interface AccordionStateOptions {
    elem: JQuery<HTMLElement>;
    state?: boolean | null;
    animate?: boolean;
}


// Toggle the visibility of the clicked section's content
const cctChangeAccordionState = ({ elem, state = null, animate = true }: AccordionStateOptions): void => {
    const accordionArea: JQuery<HTMLElement> = elem.next('.sq-backend-section-inner-table-wrapper--accordion-area');
    const isExpanded = elem.hasClass("expanded");
    const shouldExpand = state === null ? !isExpanded : state === true;
    
    const callbackFunc = (cbState: boolean): JQuery<HTMLElement> => elem.toggleClass("expanded", cbState).blur();

    cctVisibilityToggle({
        elems: accordionArea,
        state: shouldExpand,
        animate,
        callbackStart: callbackFunc,
        callbackEnd: callbackFunc
    });
};


//# EVENTS

// On click, toggle accordion
$(document).on("click", ".sq-backend-section-subheading--accordion-trigger", function (this: HTMLElement): void {
    cctChangeAccordionState({ elem: $(this) });
});


// On save || on acquire locks, store expanded accordions state
$(document).on("click", "#sq_lock_button_element,.screen-actions #sq_commit_button[type='submit'][form='main_form']", function (this: HTMLElement, e: JQuery.TriggeredEvent): void {
    const groupedExpandedIds: Record<string | number, Array<string | number>> = {};

    $('.sq-backend-section-subheading--accordion-trigger.expanded').each(function (this: HTMLElement): void {
        const $trigger = $(this);
        
        // Find the cct id and assert types from runtime datasets safely
        const cctId = $trigger.closest('[data-cct-id]').data('cct-id') as string | number | undefined;
        // Find the accordion id
        const sqId = $trigger.closest('[data-sq-id]').data('sq-id') as string | number | undefined;

        // Skip assignment processing safeguards if key descriptors are missing in DOM wrappers
        if (cctId === undefined || sqId === undefined) return;

        // Initialise the array for this cctId if it doesn't exist yet
        if (!groupedExpandedIds[cctId]) {
            groupedExpandedIds[cctId] = [];
        }
        // Add the expanded accordion id to the relevant group
        groupedExpandedIds[cctId].push(sqId);
    });

    cctStore.expandedIds = groupedExpandedIds;
});
