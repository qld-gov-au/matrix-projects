//## FIELD HTML SELECT

interface SelectOption {
    value: string | number;
    label: string;
}

//Option HTML
const cctSelectOptionsHTML = (
    inputValue: string | number, 
    optionsArray: SelectOption[]
): string => {
    const html = optionsArray.map(option => {
            const selected = inputValue == option.value ? ` selected` : ``;
            return `<option${selected} value="${option.value}">${option.label}</option>`;
        }).join('');
    
    return html;
};


//Build Select Options
const cctCustomSelectOptionsBuilder = (
    inputHtml: string | null | undefined, 
    inputId: string | number, 
    optionsArray: SelectOption[]
): string => {
    let html = ``;
    const inputValue = getInputValue(inputHtml);

    // Locks acquired
    if (store.has.locks) {

        // Build Select HTML
        html = `<span class="cct-html-select__md-field hidden">${inputHtml || ""}</span>
                <select name="cct-html-select__select-${inputId}" class="cct-html-select__select">
                    ${cctSelectOptionsHTML(inputValue, optionsArray)}
                </select>
                `;

    } else {
        // Locks not acquired
        const selectedOption = optionsArray.find(option => option.value == inputValue);
        if(selectedOption){
            html = `<span class='cct-selecthtml-label'>${selectedOption.label}</span>`;
        }
    }

    return html;
};
