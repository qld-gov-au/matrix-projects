//## UTILS MODAL

// Extend the global Window object to safely recognize your custom focus-tracking property
interface Window {
    lastFocusedElement?: HTMLElement | null;
}

// Interface defining individual button actions inside the modal popups
interface ModalButton {
    id: string;
    text?: string;
    class?: string;
    onClick?: string;
    focus?: boolean;
}

// Interface defining the configuration required to create a new modal component instance
interface ModalProps {
    title: string;
    message: string;
    buttons: ModalButton[];
    onClose?: Array<() => void> | false;
}

// Close Modal
const cctCloseModal = function(onClose: Array<() => void> | false = false): void {
    const $modalContainer: JQuery<HTMLElement> = $(document).find('#cctErrorModal');
    
    // additional onClose functions execution loop
    if (onClose && Array.isArray(onClose)) {
        onClose.forEach((fn) => { fn(); });
    }
    
    // Resume scrolling & restore scroll
    $('html').removeClass("overflow-hidden");
    
    if ($modalContainer.length) {
        // Clean up the DOM
        $modalContainer.remove();

        // Return focus to the trigger element safely if it exists natively in the environment
        if (window.lastFocusedElement) {
            window.lastFocusedElement.focus();
        }
    }
};


// Add modal
const cctShowModal = (props: ModalProps): void => {

    // Store current focus element using structural DOM typings
    window.lastFocusedElement = document.activeElement as HTMLElement | null;
    
    // Variables
    const { message, buttons, title } = props;
    
    // Generate buttons HTML safely
    let focus: string = buttons[0]?.id || '';
    const buttonsHtml = buttons.map((btn: ModalButton) => {
        if ("focus" in btn && btn.focus === true) {
            focus = btn.id;
        }
        
        // Match string references or fallback default handlers cleanly inside runtime parameters
        const onClickAttr = btn.onClick || `cctCloseModal(${props.onClose ? JSON.stringify(props.onClose) : 'false'});`;
        
        return `
            <button type="button" 
              class="btn m-0 ${btn.class || 'btn-primary'}" 
              id="${btn.id}"
              onclick="${onClickAttr}">${btn.text || 'Ok'}</button>
        `;
    }).join('');
    

    // Modal HTML layout generation wrapper      
    const $modalHtml: JQuery<HTMLElement> = $(`
    <div class="swal2-container swal2-center swal2-backdrop-show cct-admin__modal" id="cctErrorModal">
        <div aria-labelledby="swal2-title" class="swal2-popup swal2-modal matrix-modal matrix-modal-warning swal2-icon-warning swal2-show d-flex flex-column shadow-lg cct-admin__modal__popup" role="dialog" aria-modal="true">
            
            <div class="swal2-header p-4">
                <div class="swal2-icon swal2-warning swal2-icon-show d-flex mx-auto">
                    <div class="swal2-icon-content">!</div>
                </div>
                <h2 class="swal2-title d-flex w-100" id="swal2-title">${title}</h2>
            </div>

            <div class="swal2-content p-0">
                <div class="swal2-html-container d-block p-4">
                        ${message}
                </div>
            </div>

            <div class="swal2-actions p-4 m-0 justify-content-between">
                ${buttonsHtml}
            </div>
        </div>
    </div>`);
    
    // Lock scrolling on parent view structures
    $('html').scrollLeft(0).addClass("overflow-hidden");
    
    setTimeout((): void => {
        // Append our modal layout build cleanly into the primary template engine block
        $('.sq-main').first().after($modalHtml);
    
        // Shift active focus context onto the targeted primary action button instance
        if (focus) {
            $(`#${focus}`).focus();
        }
    }, 50);

    // Close on backdrop click using strongly typed jQuery events
    $modalHtml.on('click', function(this: HTMLElement, e: JQuery.TriggeredEvent): void {
        if ($(e.target).is($(this))) {
            cctCloseModal(props.onClose || false);
        }
    });
};
