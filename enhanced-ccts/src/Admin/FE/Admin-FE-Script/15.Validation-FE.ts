//#VALIDATION

// Interface for individual empty required metadata fields
interface ValidationErrorField {
    name: string;
    id: string;
}

// Interface for groups of empty fields tracked by section blocks
interface ValidationSection {
    name: string;
    required: ValidationErrorField[];
}

// Interface for the structural container error record log
interface ContainerErrorLog {
    name: string;
    id: string | number;
    sections: ValidationSection[];
}

// Global errors container dictionary structure
interface ComprehensiveErrorLog {
    [containerId: string]: ContainerErrorLog;
}

// Ensure dependent modal interface signatures match from your earlier code templates
interface ModalButton {
    id: string;
    text?: string;
    class?: string;
    onClick?: string;
    focus?: boolean;
}

const cctValidateCct = (containerId: string | number): ComprehensiveErrorLog => {
    
    const parentDiv: JQuery<HTMLElement> = $(`[data-cct-id="${containerId}"]`);
    const visibleSections: JQuery<HTMLElement> = parentDiv.find('.cct-admin__section:not(.hidden)');
    
    // Initialize the main error log using strict explicit signatures
    const errors: ComprehensiveErrorLog = {};
    
    const containerName = parentDiv.find(".cct-admin__title__component-name__content__display__text").text();
    
    errors[containerId.toString()] = {
        name        : containerName,
        id          : containerId,
        sections    : []
    };

    // Filter to find the .required containers that are actually empty
    visibleSections.each((i: number, sectionElem: HTMLElement) => {
        
        const emptyRequiredFields: JQuery<HTMLElement> = $(sectionElem)
            .find('.required, .required-soft')
            .not('.sq-metadata-settings-row--retired,.hidden')
            .filter(function (this: HTMLElement) {
                const firstInput = $(this).find(".sq-backend-data").find('input[type="text"], textarea, select').not("#MatrixViper-tabTextfield").first();
                
                const rawVal = firstInput.val();
                let val: string | number | string[] | boolean | undefined | null = (typeof rawVal === 'string' && rawVal.trim() !== '') ? rawVal.trim() : rawVal;

                // Specific check for Textareas (for WYSIWYG Text fields rendered by Matrix)
                if (firstInput.is('textarea')) {
                    const inputId = firstInput.attr('id') || "";
                    // Remove "_input" suffix to target the content wrapper container div
                    const divId = inputId.replace(/_input$/, "");
                    const $contentDiv: JQuery<HTMLElement> = $(`#${divId}`);
        
                    if ($contentDiv.length > 0) {
                        // Check the inner text length of the associated metadata div wrapper
                        val = $contentDiv.text().trim();
                    }
                }
                
                return val === "" || val === null || val === undefined;
            });
        
        if (emptyRequiredFields.length) {
            const sectionName = $(sectionElem).find('.sq-backend-section-subheading__content').text().trim();
            const sectionObj: ValidationSection = {
                name        : sectionName,
                required    : []
            };
            
            // Populate the required array within the errors dictionary structure object safely
            sectionObj.required = emptyRequiredFields.map(function (this: HTMLElement) {
                const $field = $(this);
                
                const inputId = $field.closest("[data-sq-id]").attr("data-sq-id") || "";
        
                const inputName = $field.closest('.sq-backend-row')
                    .find('.sq-metadata-settings-row__field-name')
                    .text().trim();
        
                return {
                    name    : inputName,
                    id      : inputId,
                };
                
            }).get() as ValidationErrorField[];
            
            errors[containerId.toString()].sections.push(sectionObj);
        }
        
    });
    
    return errors[containerId.toString()].sections.length ? errors : {};
};

// About to be deleted CCT validation exception toggle track
let cctAboutToDelete: string | boolean = false;

// Clear about to be deleted CCT validation exception from memory pipeline
const cctRemoveAboutToDelete = (): boolean => cctAboutToDelete = false;

// Validate all CCT modules rendered in view context blocks
const cctValidateAll = (): ComprehensiveErrorLog => {
    const errors: ComprehensiveErrorLog = {};
    $(".cct-admin").each((i: number, cct: HTMLElement) => {
        const containerId = $(cct).attr("data-cct-id");
        if (containerId !== undefined && cctAboutToDelete !== containerId) {
            const cctErrors = cctValidateCct(containerId);
            Object.assign(errors, cctErrors);
        }
    });
    return errors;
};

// End Modal Cleanup Action
const cctValidateModalDestroy = (): void => {
    // Close Modal execution cycle
    cctCloseModal([cctRemoveAboutToDelete]);
    
    // clear memory exception flags for the next validation runtime cycle
    cctRemoveAboutToDelete();
    
    // Clear Matrix Canceled Action payload parameters safely
    $("#main_form [name='bodycopy_action'], #main_form [name='bodycopy_name'], #main_form [name='bodycopy_data']").val('');
};

// Target Matrix UI Form Actions button layout
const saveButton = (): JQuery<HTMLElement> => $(".screen-actions #sq_commit_button[type='submit'][form='main_form']");

// Save edits
const cctProceedWithSave = (): void => {
    const $btn = saveButton();
    $btn.addClass('cct-validated');
    setTimeout((): void => { 
        $btn.trigger('click').removeClass('cct-validated'); 
        cctValidateModalDestroy();
    }, 20); 
};


// Save Button Interceptor Handler Routing
$(document).on("click", ".screen-actions #sq_commit_button[type='submit'][form='main_form']", function (this: HTMLElement, e: JQuery.TriggeredEvent): void {

    const $btn = $(this);

    if (!$btn.hasClass('cct-validated')) {
        // Halt matrix execution to apply structural custom validations checks
        e.preventDefault();
    
        // check all current CCT containers for structural context error breaks
        const allCctsErrorLog = cctValidateAll();
        const errorCctIds = Object.keys(allCctsErrorLog);
        
        if (errorCctIds.length) {
            let message = `<p class="font-weight-bold">⚠️ Empty required fields may cause content to disappear from this page.</p>`;
            errorCctIds.forEach((cctId) => {
                message += `<div class="bg-light border rounded p-2 mb-2">`;
                message += `<p class="m-2 pt-1 pb-2 text-muted">
                                <span class="font-weight-bold">${allCctsErrorLog[cctId].name}</span>
                                <span class="ml-1"> #${allCctsErrorLog[cctId].id}</span>
                            </p>`;
                allCctsErrorLog[cctId].sections.forEach((section) => {
                    message += `<ul>
                                    <li>
                                        <span>${section.name}</span>
                                            <ul class="py-1">`;
                                                section.required.forEach((field) => {
                                                    message += `<li>
                                                                    <span class="text-danger font-weight-bold">${field.name}*</span>
                                                                    <span class="text-muted ml-1"> #${field.id}</span>
                                                                </li>`;
                                                });
                    message +=             `</ul>
                                    </li>
                                </ul>`;
                });
                message += '</div>';
            });
            
            // Trigger customized SweetAlert styling warn wrapper modal component
            cctShowModal({
                title   : "Empty required fields",
                onClose : [cctValidateModalDestroy],
                message, 
                buttons : [
                    { id: "cctSaveCancel", onClick: `cctValidateModalDestroy();`, text: "Cancel", focus: true },
                    { id: "cctSaveAnyway", class: "btn-default cct-btn-hover-danger", onClick: "cctProceedWithSave();", text: "Save anyway" },
                ],
            });
        } else {
            // No configuration exceptions generated; resume save pipeline
            cctProceedWithSave();
        }
    }

});


//Delete Button Handler
//exclude about to be deleted CCT from validation checks
$(document).on('click', 'button[name="delete"]', function (this: HTMLElement, e: JQuery.TriggeredEvent): void {

    // Prevent direct execution loop routines
    e.preventDefault();

    const $deleteBtn = $(this);
    const nativeConfirm = window.confirm;

    // Type-safe overriding pattern to capture confirmation dialog state values inside Matrix v6 stacks
    window.confirm = (...args: any[]): boolean => {
        const confirmed = nativeConfirm.apply(window, args as any);

        if (confirmed) {
            // Track the component target flag skipping tracking requirements
            const foundContainerId = $deleteBtn.closest("[data-containerid]").attr("data-containerid");
            cctAboutToDelete = foundContainerId !== undefined ? foundContainerId : false;
        }
        window.confirm = nativeConfirm;
        return confirmed;
  };
});