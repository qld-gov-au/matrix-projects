//## Handle HTML SELECT

// Interface for Select2 event structures to avoid type errors on data elements
interface Select2Data {
    text: string;
    element?: HTMLOptionElement;
}

const cctHandleHtmlSelect = (): void => {
    $('.cct-html-select').each(function (this: HTMLElement): void {
        const $container: JQuery<HTMLElement> = $(this);
        const $customSelect: JQuery<HTMLElement> = $container.find('.cct-html-select__select');
        const isCustomHtmlSelect = !!$customSelect.length;
        
        const $select: JQuery<HTMLElement> = isCustomHtmlSelect 
            ? $customSelect 
            : $container.find('select.sq-form-field');
            
        const $mdField: JQuery<HTMLElement> = $container.find('.cct-html-select__md-field .sq-form-field');
        
        // Apply Select2 configuration mappings
        if ($select.length) {
            // Cast to 'any' to bypass compiler restrictions if Select2 global ambient types aren't loaded
            ($select as any).select2({
                // Allow HTML/SVG tags to be rendered
                escapeMarkup: (markup: string): string => markup,
                // Template for the dropdown list
                templateResult: (data: Select2Data): string => {
                    if (!data.element) return data.text;
                    return `<span class='cct-selecthtml-label'>${data.element.innerHTML}</span>`;
                },
                // Template for the selected item in the box
                templateSelection: (data: Select2Data): string => {
                    if (!data.element) return data.text;
                    return `<span class='cct-selecthtml-label'>${data.element.innerHTML}</span>`;
                }
            }).on('select2:open', function (e: any): void {
                // Search field in the newly opened dropdown
                $('.select2-search__field').attr('placeholder', 'Search...');
            });
        }

        // Update hidden MD field on change for custom select lists
        if (isCustomHtmlSelect) {
            $select.on('change', function (this: HTMLElement): void {
              const selectedVal = $(this).val();
              
              // Fallback to an empty string if the value is undefined or null
              const safeVal = selectedVal !== undefined && selectedVal !== null ? selectedVal : "";
              
              $mdField.val(safeVal);
            });
        }
    });
};
