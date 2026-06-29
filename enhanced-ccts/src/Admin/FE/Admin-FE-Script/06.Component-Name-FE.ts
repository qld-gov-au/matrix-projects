//## Component Name   
   
//#Functions

// Adjust width of name input
const cctUpdateNameInputWidth = (containerId: string | number): void => {
    const $cct: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"]`);
    const $input: JQuery<HTMLInputElement> = $cct.find(".cct-admin__title__component-name__content__input") as JQuery<HTMLInputElement>;
    const $textElem: JQuery<HTMLElement> = $cct.find(".cct-admin__title__component-name__content__display__text");
    
    // Adjust content of displayed name. 
    const val = ($input.val() as string) || " "; 
    $textElem.text(val);
    
    // Adjust input width
    const outerWidth = $textElem.outerWidth() || 0;
    const newWidth = outerWidth + 42; 
    $input.css("width", newWidth);
};


// init name editing when locks are acquired
const cctNameInputInit = (containerId: string | number): void => {
    if (isLocksAcquiredFE()) {
        // Enable content container
        $(`[data-cct-id="${containerId}"]`).find(".cct-admin__title__component-name").removeClass("cct-admin__title__component-name--locks-not-acquired");
        // Adjust input width
        cctUpdateNameInputWidth(containerId);
    }
};


// Toggle Edit Mode
const cctNameToggleEditMode = ($input: JQuery<HTMLElement>, status: boolean): void => {
    const $contentElem: JQuery<HTMLElement> = $input.closest(".cct-admin__title__component-name__content");
    $contentElem.toggleClass("cct-admin__title__component-name__content--edit", status);
};


//#EVENTS

// Open settings - Explicit type string or boolean false placeholder matching runtime patterns
let cctOpenPropertiesBodycopy: string | boolean = false;

$(document).on("click", ".component-header button[name='properties']", function (this: HTMLElement): void {
    // Store open properties Bodycopy id
    const foundId = $(this).closest(".component-wrapper").find("[data-cct-id]").attr("data-cct-id");
    cctOpenPropertiesBodycopy = foundId !== undefined ? foundId : false;
});


// Focus Editing Name Input
$(document).on('focusin', '.cct-admin__title__component-name__content__input', function (this: HTMLElement): void {
    // Enable Edit Mode
    cctNameToggleEditMode($(this), true);
});


// Real-time Editing Name Input
$(document).on("input", ".cct-admin__title__component-name__content__input", function (this: HTMLElement): void {
    // Close Settings Menu for this bodycopy
    cctCloseSettingsMenu();
    // adjust input width
    const containerId = $(this).closest(`[data-cct-id]`).attr("data-cct-id");
    if (containerId !== undefined) {
        cctUpdateNameInputWidth(containerId);
    }
});


// Finish Editing Name Input
$(document).on("blur", ".cct-admin__title__component-name__content__input", function (this: HTMLElement,e: JQuery.TriggeredEvent): void {

    const containerId = $(this).closest("[data-cct-id]").attr("data-cct-id");
    if (containerId === undefined) return;
    
    // Disable Edit Mode
    cctNameToggleEditMode($(this), false);

    // Determine new value
    const standardVal = `Component`;
    const inputVal = $(this).val() as string;
    const newVal = inputVal.trim() || standardVal;
    
    // Empty value
    if (newVal === standardVal) {
        $(this).val(standardVal);
        cctUpdateNameInputWidth(containerId);
    }
        
    // Change name in settings menu
    
    // if settings menu is open, close it
    cctCloseSettingsMenu();

    // open settings menu for this bodycopy
    cctOpenSettingsMenu(containerId);
    
    // apply dynamic change class
    $(".sidebar-panel-wrapper #identifier").addClass("dynamic-update");

    // Change name value
    setReactInputValue(".sidebar-panel-wrapper #identifier", newVal);
    
    // remove dynamic change class
    $(".sidebar-panel-wrapper #identifier").removeClass("dynamic-update");
    
    // Close Settings Menu for this bodycopy
    cctCloseSettingsMenu();
    
});


// User changes cct name in settings menu
$(document).on("input", ".sidebar-panel-wrapper #identifier:not(.dynamic-update)", function (this: HTMLElement, e: JQuery.TriggeredEvent): void {
    if (cctOpenPropertiesBodycopy && typeof cctOpenPropertiesBodycopy === "string") {
        const cctNameElem: JQuery<HTMLElement> = $(`[data-cct-id="${cctOpenPropertiesBodycopy}"]`);
        
        // If the setting menu trigger has stored the component id and the component is an Enhanced CCT
        if (cctNameElem.length) {
            const inputValue = $(this).val() as string;
            cctNameElem.find(".cct-admin__title__component-name__content__input").val(inputValue);
            cctUpdateNameInputWidth(cctOpenPropertiesBodycopy);
        }
    }
});
