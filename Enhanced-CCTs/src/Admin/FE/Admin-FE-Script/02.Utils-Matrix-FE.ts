//## UTILS MATRIX

// Global declaration for your Matrix asset configuration object
interface CctAssetId {
    iconSprite: string;
    feedbackForm: string; 
}
declare const cctAssetId: CctAssetId;

// Interface defining the expected shape of each button object
interface ButtonData {
    name: string;
    label: string;
    iconHash: string;
    onClick: string;
    extraClasses?: string;
    externalLink?: boolean;
}

// Interface extending standard HTMLElements to support Tippy.js instances attached by Matrix
interface TippyElement extends HTMLElement {
    _tippy?: {
        setProps: (props: Record<string, any>) => void;
        show: () => void;
    };
}

// Check if locks are acquired
const isLocksAcquiredFE = (): boolean => {
    // check content of first field 
    const $wrapper: JQuery<HTMLElement> = $(".sq-backend-data__input-wrapper").first();

    // selectors for fields that indicate locks are acquired
    const selectors: string[] = [
        "select.sq-form-field",                                     // Select List
        "input[type='checkbox'].sq-form-field",                     // Select Checkbox
        "input[type='text'].sq-form-field:not(:disabled)",          // Text - type: text, or Asset Finder
        ".sq-option-list-row input[type='text']:not(:disabled)",    // Text - multi-line 
        "textarea.sq-form-field:not(:disabled)",                    // Text - textareas
        ".sq-wysiwyg-standalone-body textarea"                      // WYSIWYG editors
    ];

    // .find().length returns a truthy value if any match the list
    return !!$wrapper.find(selectors.join(',')).length;
};


// Open settings menu
const cctOpenSettingsMenu = (containerId: string | number): JQuery<HTMLElement> => {
    return $(`[data-cct-id="${containerId}"]`)
        .closest(".component-wrapper")
        .find(".component-header button[name='properties']")
        .click(); 
};


// Close settings menu
const cctCloseSettingsMenu = (): void => {
    if ($(".sidebar-panel-wrapper").hasClass("is-open")) {
        const $wrapper: JQuery<HTMLElement> = $(".sidebar-panel-wrapper");
        // Close menu organically
        $(".sidebar-panel-header button").click();

        // avoid animation for accurate calculation of name input width
        $wrapper.addClass("hidden");
        setTimeout(function (): void {
            $wrapper.removeClass("hidden");
        }, 500);
    }
};

// Top menu is appended by Matrix on page load, wait till it is appended then append the button in it
const cctAppendButtonToTop = (containerId: string | number, buttonsData: ButtonData[]): void => {

    // 1. Build buttons HTML
    let buttonsHTML = ``;
    buttonsData.forEach((buttonData: ButtonData) => {
        const buttonExtraClasses = "extraClasses" in buttonData ? ` ${buttonData.extraClasses}` : ``;
        const externalLinkIcon = "externalLink" in buttonData && buttonData.externalLink 
            ? `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false' viewBox='0 0 24 24' width='16' height='16'><use href='./?a=${cctAssetId.iconSprite}#cctExternalLink'></use></svg>` 
            : ``;
            
        buttonsHTML += `
        <button name="${buttonData.name}" aria-label="${buttonData.label}" data-tippy-position="top" data-tippy-tooltip="${buttonData.label}${externalLinkIcon}" type="button" class="btn-icon btn-default-transparent${buttonExtraClasses}" onclick="${buttonData.onClick}">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden='true' focusable='false' viewBox="0 0 24 24" width="24" height="24" fill="currentColor" >
                <use href="./?a=${cctAssetId.iconSprite}#${buttonData.iconHash}"></use>
            </svg>
        </button>`;
    });

    // 2. Append to top menu
    const $wrapper: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"]`).closest(".component-wrapper");
    const headerSelector = ".matrix-inline-editing-styles .component-header-details";
    const $initialHeader: JQuery<HTMLElement> = $wrapper.find(headerSelector);
    
    const addButton = ($header: JQuery<HTMLElement>): void => {
        $header.before(buttonsHTML);
        cctOpenSettingsMenu(containerId);
        cctCloseSettingsMenu();
    };

    // if header has been appended by Matrix, append button
    if ($initialHeader.length) {
        addButton($initialHeader);
    } else {
        // if header not yet appended, observe it and append button when ready
        const targetNode = $wrapper[0];
        if (targetNode) {
            const observer = new MutationObserver((): void => {
                const $observerHeader: JQuery<HTMLElement> = $wrapper.find(headerSelector); 
                if ($observerHeader.length) {
                    addButton($observerHeader);
                    observer.disconnect();
                }
            });
            observer.observe(targetNode, { childList: true, subtree: true });
        }
    }
};


// Update Tooltip Message
const cctUpdateTooltip = ($button: JQuery<HTMLElement>, label: string): void => {
    // 1. Check if the jQuery object actually found an element and cast to TippyElement
    const el = $button[0] as TippyElement | undefined;
    if (!el) return; 

    // 2. Update Tippy message
    if (el._tippy) {
        el._tippy.setProps({
            hideOnClick: false,
            content: label,
        });
        el._tippy.show(); 
    }
};


// Change input value in React
const setReactInputValue = (selector: string, value: string): void => {
    const input = document.querySelector(selector) as HTMLInputElement | null;
    if (!input) return;

    // 1. Get the native setter from the prototype (React overrides the 'value' property)
    const propertyDescriptor = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 
        'value'
    );
    
    const nativeInputValueSetter = propertyDescriptor?.set;
    if (!nativeInputValueSetter) return;

    // 2. Call the native setter so React's internal tracker is updated
    nativeInputValueSetter.call(input, value);

    // 3. Dispatch a 'bubble' event so React's event delegation picks it up
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
};
