//## Handle DEFAULT BUTTONS


// Append Preview Button
const cctHandlePreviewButton = (containerId: string | number): void => {
    const urlString = cctStore.url[containerId] as string;
    if (!urlString) return;

    const isValid = urlString.startsWith('http');

    if (isValid) {
        const buttons: ButtonData[] = [
            // Preview
            {
                name: "cct-preview",
                label: "Preview component",
                iconHash: "cctPreview",
                onClick: `handleCctPreviewClick('${containerId}')`,
                externalLink: true,
                extraClasses: "cct-preview-button",
            },
        ];

        cctAppendButtonToTop(containerId, buttons);
    }
};

// Handle Preview Button Click
const handleCctPreviewClick = (containerId: string | number): void => {
    const rawUrl = cctStore.url[containerId] as string;
    if (!rawUrl) return;

    // Unescape Component URL
    const url = decodeHtmlFe(rawUrl);
    // Open in a new tab
    window.open(url, '_blank');
};

// Append Assistance Button
const cctHandleAssistanceButton = (containerId: string | number): void => {
    const urlString = cctStore.url[containerId] as string;
    if (!urlString) return;

    const isValid = urlString.startsWith('http');

    if (isValid) {
        const buttons: ButtonData[] = [
            // Assistance
            {
                name: "cct-assistance",
                label: "Request assistance",
                iconHash: "cctAssistance",
                onClick: `handleCctAssistanceClick('${containerId}')`,
                externalLink: true,
            },
        ];

        cctAppendButtonToTop(containerId, buttons);
    }
};

// Handle Assistance Button Click
const handleCctAssistanceClick = (containerId: string | number): void => {
    const rawUrl = `https://www.support.services.qld.gov.au/servicedesk/customer/portal/7/group/32/create/100`;
    
    // Create description safely from DOM
    const cctName = $(`[data-cct-id="${containerId}"]`)
        .find(".cct-admin__title__cct-name__content__text")
        .text()
        .trim();
        
    const description = `Ref: ${cctName} component %23${containerId}`; 
    
    // Unescape Component URL
    const url = decodeHtmlFe(`${rawUrl}?description=${description}`);
    // Open in a new tab
    window.open(url, '_blank');
};
