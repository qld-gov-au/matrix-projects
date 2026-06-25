//#Advanced Settings

// Explicitly type the boolean flag driving the property updates
const adjustAdminPropertyMenu = (apply: boolean): void => {
    const wrapper: JQuery<HTMLElement> = $(".page-builder-properties-accordion-body");
    
    // apply adjustments
    if (apply) {
        // check if applied already
        const applied = wrapper.hasClass("cct-adjusted");
        if (!applied) {
            wrapper.addClass("cct-adjusted");
            // hide "Disable Keywords"
            wrapper.find(".page-builder-properties-toggle-field").eq(1).hide();
            wrapper.find(".page-builder-properties-toggle-field").eq(0).removeClass("mb-4").addClass("mb-1");
            // hide "Presentation tag" (controlled by the DS template)
            wrapper.find("label").eq(3).hide();
            wrapper.find(".select-field").eq(0).hide();
            // adjust "classes" label
            wrapper.find("label").eq(4).html("Extra class");
        }
    } else {
        // undo adjustments
        wrapper.removeClass("cct-adjusted");
        // show "Disabled Keywords"
        wrapper.find(".page-builder-properties-toggle-field").eq(1).show();
        wrapper.find(".page-builder-properties-toggle-field").eq(0).removeClass("mb-1").addClass("mb-4");
        // hide "Presentation tag" (controlled by the DS template)
        wrapper.find("label").eq(3).show();
        wrapper.find(".select-field").eq(0).show();
        // adjust "classes" label
        wrapper.find("label").eq(4).html("Custom class");
    }
};

// Declaring return context as boolean for evaluation gates
const isCctTemplate = (): boolean => {
    if (isLocksAcquiredFE()) {
        const templateVal = $(".sidebar-panel-wrapper input[name='template']").val() as string | undefined;
        return $.inArray(templateVal, ["--", ""]) === -1;
    } else {
        return !$("#template .select-field__placeholder").length;
    }
};

// Open menu - Typed event handler listening to the global document object context
$(document).on("click", ".component-header button[name='properties']", function (this: HTMLElement): void {
    setTimeout(function (): void {

        // avoid dynamic opening
        if ($("#identifier").length && !$("#identifier").hasClass("dynamic-update")) {
            
            // only trigger adjustments if the menu becomes visible. if the click is to hide the menu Matrix will clear the wrapper content anyway.
            const menuVisible = $(".sidebar-panel-wrapper").hasClass("is-open");
            if (menuVisible && isCctTemplate()) {
                adjustAdminPropertyMenu(true);
            }
            
            // change if cct value
            if (isLocksAcquiredFE()) {
                // Cast broadly queried element to specific type so TypeScript knows attributes can shift dynamically
                const templateInput = document.querySelector(".sidebar-panel-wrapper input[name='template']") as HTMLInputElement | null;
                if (templateInput) {
                    const observer = new MutationObserver((): void => adjustAdminPropertyMenu(isCctTemplate()));
                    observer.observe(templateInput, { 
                        attributes: true, 
                        attributeFilter: ["value"] // Only watch the value attribute
                    }); 
                }
            } 
            
        }

    }, 50);
});
