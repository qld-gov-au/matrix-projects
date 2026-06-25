//#FEEDBACK

// Ensure our global asset object structure recognizes the feedback form mapping
interface CctAssetIdWithFeedback extends CctAssetId {
    feedbackForm: string;
}

$(document).on("click", `.cct-admin__feedback__button`, function (this: HTMLElement): void {
    
    const cctElem: JQuery<HTMLElement> = $(this).closest(`[data-cct-id]`);
    const containerId = cctElem.attr("data-cct-id");
    
    // Safety check: Exit if the container ID cannot be resolved from the DOM
    if (containerId === undefined) return;
    
    const cctName = cctElem.find(".cct-admin__title__cct-name__label__content__text").text().trim();
    
    // Leverage native URLSearchParams for clean, type-safe URL building
    const params = new URLSearchParams({
        a       : cctAssetId.feedbackForm,
        source  : containerId,
        cct     : cctName, 
    }).toString();

    // Unescape Component URL
    const url = decodeHtmlFe(`/?${params}#feedback_form`);
    
    // Open in a new tab
    window.open(url, '_blank');
});
