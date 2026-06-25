//ACTIVE HEADING (Section)

// Explicitly type the incoming liveInput parameter as a jQuery input/element wrapper
const handleActiveHeading = (liveInput: JQuery<HTMLElement>): void => {
    const sectionHead: JQuery<HTMLElement> = liveInput
        .closest(".sq-backend-section-inner-table-wrapper")
        .parent()
        .find(".sq-backend-section-subheading");
        
    const inputValue = liveInput.val() as string;
    const defaultContent = sectionHead.attr("data-default-content") || "";
    
    const newValue = inputValue.length ? inputValue : defaultContent;
    sectionHead.find(".sq-backend-section-subheading__content").text(newValue);
};

// Trigger on change - Uses a clean string literal to target the class properly
$(document).on("input", ".sq-backend-row.activeHeading .sq-form-field", function (this: HTMLElement): void {
    handleActiveHeading($(this));
});
