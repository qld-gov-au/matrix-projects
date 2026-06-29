//## CONTENT HTML

const cctContentHtml = (): string => {

    const cctId = store.cctId ? store.cctId.toString() : '';
    const assetid = store.asset.assetid.toString();
    const headerHtml = cctHeader();
    const feedbackHtml = cctFeedback();
    const bodyHtml = cctBodyHtml();

    const html = `
        <div class="metadata-value-table cct-admin" data-cct-id="${assetid}" style="visibility:hidden">
          <div class="sq-backend-section-table">
     
            ${headerHtml}
            
            ${feedbackHtml}
            
            ${objQuery(() => store.inlineDescription) ? 
                `%globals_asset_attribute_description:${cctId}^eq:::
                    <div class="sq-backend-section-inner-table-wrapper">
                        {globals_asset_attribute_description:${cctId}}
                    </div>
                %` : ``
            }
            
            ${bodyHtml}
           
          </div>
        </div>`;
                
    return html;
};
