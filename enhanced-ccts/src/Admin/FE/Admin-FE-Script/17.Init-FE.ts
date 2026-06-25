//## CCT INIT

// Interface extending standard HTMLElements to safely read the native stylesheet object runtime payload
interface LinkElementWithSheet extends HTMLElement {
    sheet?: CSSStyleSheet | null;
}

// Define specific string literal types for valid feature flags allowed inside your options array
type CctInitOption = 'retired' | 'visibility' | 'sort';

// Wait until document finishes loading style sheet for DOM styling handling JS functions
const cctCallFunctionAfterCssLoads = (fn: () => void): void => {
    const cssSelector = '#cct-admin-css';
    const $existing: JQuery<HTMLElement> = $(cssSelector);
    
    // 1. If it exists and is ALREADY loaded
    const nativeLink = $existing[0] as LinkElementWithSheet | undefined;
    if ($existing.length && nativeLink && nativeLink.sheet) {
        fn();
    } 
    // 2. If it exists but IS NOT loaded yet, wait for it
    else if ($existing.length) {
        $existing.on('load', fn);
    } 
    // 3. If it doesn't exist at all, observe the head for it
    else {
        const observer = new MutationObserver((): void => {
            const $link = $(cssSelector);
            if ($link.length) {
                $link.on('load', fn);
                observer.disconnect();
            }
        });
        observer.observe(document.head, { childList: true });
    }
};

// Adjust CCT After JS & CSS have been appended to head
const cctPageReady = (containerId: string | number): void => {
    // change width of Name Input
    cctNameInputInit(containerId);
    // Show CCT
    $(`[data-cct-id="${containerId}"]`).addClass("cct-admin--ready");
};

// Restore expanded accordion state
const cctAccordionStateRestore = (containerId: string | number): void => {
    if ("expandedIds" in cctStore && cctStore.expandedIds && containerId in cctStore.expandedIds) {
        const targetIds = cctStore.expandedIds[containerId];
        if (targetIds) {
            // restore
            targetIds.forEach((accordionId) => {
                const elem = $(`[data-sq-id="${accordionId}"] .sq-backend-section-subheading--accordion-trigger`);
                cctChangeAccordionState({ elem, state: true, animate: false });
            });
        }
        
        // clear only when locks are acquired (store to survive multiple renders by the locks acquiring event and collapse all accordions on releasing locks)
        if (isLocksAcquiredFE()) {
            cctStore.expandedIds[containerId] = [];
        }
    }
};

// Initiate CCT FE - runs on CCT load
const cctInit = (containerId: string | number, options: CctInitOption[] = []): void => {
    // init CCT after CSS sheet has loaded in the DOM
    cctCallFunctionAfterCssLoads((): void => { cctPageReady(containerId); });
    
    // restore expanded accordions state 
    cctAccordionStateRestore(containerId);
    
    // handle HTML Select
    cctHandleHtmlSelect();
    
    // handle preview button 
    cctHandlePreviewButton(containerId);
    
    // run options functions using clean, type-safe matching boundaries
    if (options.includes('retired')) cctHandleHasRetired(containerId);
    if (options.includes('visibility')) handleCctConditionalVisibility(containerId);
    if (options.includes('sort')) cctHandleSorting(containerId);
    
    // handle assistance button 
    cctHandleAssistanceButton(containerId);
};
