//RETIRED FIELDS TOGGLE


const cctHandleHasRetired = (containerId: string | number): void => {

    const retiredButtonData: ButtonData = {
        name                : "cct-retired-md",
        label               : "Show retired fields",
        iconHash            : "cctHistory",
        onClick             : `handleRetiredToggleClick('${containerId}')`,
        extraClasses        : "retired-fields-btn retired-fields-btn--hidden",
    };

    cctAppendButtonToTop(containerId, [retiredButtonData]);
    
};

const handleRetiredToggleClick = (containerId: string | number): void => {
    
    const $button: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"]`)
        .closest(".component-wrapper")
        .find(".matrix-inline-editing-styles .retired-fields-btn");

    // Adjust button
    const isHidden = $button.hasClass("retired-fields-btn--hidden");
    
    // adjust tooltip based on current state
    const label = `${isHidden ? "Hide" : "Show"} retired fields`;
    $button.attr({ "aria-label": label });
    cctUpdateTooltip($button, label);

    // toggle class
    $button.toggleClass("retired-fields-btn--hidden", !isHidden);

    // Adjust fields visibility
    const rows: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"] .sq-metadata-settings-row--retired`);
    cctVisibilityToggle({ elems: rows });
};
