//#CONDITIONAL VISIBILITY

// Structural schema defining each internal configuration rule block
interface VisibilityCondition {
    values: Array<string | number>;
    hide: string[];
    limit?: number;
}

interface VisibilityRule {
    trigger: string;
    conditions: VisibilityCondition[];
}

// Map external dependencies referenced from earlier snippets
interface CctVisibilityOptions {
    elems: JQuery<HTMLElement>;
    state: boolean;
    animate: boolean;
    callbackEnd?: () => void;
}

interface VisibilityRule {
    trigger: string;
    conditions: VisibilityCondition[];
}

const handleCctConditionalVisibility = (
    containerId: string | number, 
    animate: boolean = false, 
    expandAccordions: boolean = false
): void => {
    const parentDiv: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"]`);
    const rules = cctStore.conditionalVisibility[containerId] as VisibilityRule[] | undefined;

    // Safety guard if no conditional rules exist for this specific component container instance
    if (!rules) return;
    
    // generate comparable arrays (case-insensitive strings)
    const comparableArray = (values: Array<string | number>): string[] => 
        values.map(value => String(value).toLowerCase());
    
    // create array of affected elems by trigger
    const allAffectedElems: Record<string, string[]> = {};

    rules.forEach((rule: VisibilityRule) => { 
        const uniqueSet = new Set<string>();
        const conditions = rule.conditions || [];
        
        // Flatten nested hide arrays and convert to unique strings
        for (let i = 0; i < conditions.length; i++) {
            const hideArray = conditions[i].hide || [];
            for (let j = 0; j < hideArray.length; j++) {
                uniqueSet.add(String(hideArray[j]));
            }
        }
        // Assign unique IDs to the trigger key
        allAffectedElems[rule.trigger] = Array.from(uniqueSet);
    });

    // store target elements visibility per trigger (last trigger wins)
    const visibilityTargets: Record<string, boolean> = {};
    const cctFieldVisibility = (trigger: string, elemToHide: string[]): void => {
        const targets = allAffectedElems[trigger];
        if (!targets) return;
        targets.forEach((target) => {
            visibilityTargets[target] = !elemToHide.includes(target);
        });
    };

    // adjust array of elements to hide to limit
    const adjustHideToLimit = (limit: number, elemToHide: string[]): string[] => {
        // order elemToHide array by presence in the DOM
        const sortedElemHide: string[] = [];
        parentDiv.find(`[data-sq-id]`).each(function (this: HTMLElement): void {
            const id = $(this).attr("data-sq-id");
            if (id !== undefined && elemToHide.includes(id)) {
                sortedElemHide.push(id);
            }
        });
        // shrink hide array to requested limit
        return limit > 0 ? sortedElemHide.slice(0, limit) : (limit < 0 ? sortedElemHide.slice(limit) : []);
    };
    
    // examine conditions against triggers for the current value
    rules.forEach((rule) => {
        const { trigger, conditions } = rule;
        
        // find out if none/any of the conditions applied after the loop
        let hasAppliedConditions = false;
            
        // loop through conditions to examine conditions against triggers for the current value
        conditions.forEach((condition) => {
            const { values, hide } = condition;
            const valuesComparableArray = comparableArray(values);
            const triggerElem = parentDiv.find(`[data-sq-id='${trigger}']`);
            const selectElem = triggerElem.find(`select`);
            
            // find current value
            let thisVal = '';
            if (selectElem.length) {
                thisVal = selectElem.find("option:selected").text().trim().toLowerCase();
            } else {
                // locks not acquired = div html
                const html = parentDiv.find(`[data-sq-id='${trigger}'] .sq-backend-data__input-wrapper`).html();
                // FIXED: 'typeof html !== "undefined"' check correction
                if (html !== undefined && html !== null) {
                    thisVal = html.toString().trim().toLowerCase();
                }
            }

            // adjust visibility
            let elemToHideArray: string[] | false = false;
            const hideComparableArray = comparableArray(hide);
            
            // Case 1: nested conditional visibility
            if (trigger in visibilityTargets && !visibilityTargets[trigger]) {
                elemToHideArray = hideComparableArray;
            } 
            // Case 2: value matches condition
            else if (valuesComparableArray.includes(thisVal)) {
                // calculate limit array of elements to hide
                elemToHideArray = "limit" in condition && condition.limit !== undefined && condition.limit !== 0 
                    ? adjustHideToLimit(condition.limit, hideComparableArray) 
                    : hideComparableArray;
            }
            
            // adjust visibility if any case matches
            if (elemToHideArray) {
                // adjust visibility targets
                cctFieldVisibility(trigger, elemToHideArray);
                // record processing of trigger
                hasAppliedConditions = true;
            }
        });
        
        // show all relevant fields if no condition is met in this trigger conditions loop
        if (!hasAppliedConditions) {
           cctFieldVisibility(trigger, []);
        }
    });
    

    // after all conditions have been checked, adjust visibility
    Object.keys(visibilityTargets).forEach((target) => {
        const element = parentDiv.find(`[data-sq-id='${target}']`);
        const isHidden = element.hasClass("hidden");
        
        const options: CctVisibilityOptions = {
            elems: element,
            state: visibilityTargets[target],
            animate
        };

        // Adjustment accordion child visibility
        const accordionTrigger = element.find(".sq-backend-section-subheading--accordion-trigger");
        if (accordionTrigger.length) {
            const accordionOptions = { elem: accordionTrigger, state: options.state, animate: false };
            // show accordion before showing row
            if (options.state) {
                if (isHidden && expandAccordions) cctChangeAccordionState(accordionOptions);
            } else {
                // hide accordion after hiding row
                options.callbackEnd = () => cctChangeAccordionState(accordionOptions);
            }
        }

        // Adjust element visibility
        cctVisibilityToggle(options);
    });
};


// on change of select element in cct container, examine element against conditional visibility
$(document).on("change", ".visibility-trigger select", function (this: HTMLElement,e: JQuery.TriggeredEvent): void {
    const cctElem = $(this).closest(`[data-cct-id]`);
    if (cctElem.length) {
        const containerId = cctElem.attr("data-cct-id");
        if (containerId !== undefined) {
            handleCctConditionalVisibility(containerId, true, true);
        }
    }
});
