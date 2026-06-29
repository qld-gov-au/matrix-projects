//##CCT FEEDBACK HTML

const cctFeedback = (): string => {
    // Looks up optional feedback text stored globally
    const feedback = objQuery(() => store.feedback);
    
        let html = ``;
        
        if(feedback){
            if("btnText" in feedback && "url" in feedback){

                //Unescape Componant URL
                const url = `${feedback.url}/?source=${store.asset.assetid}&cct=%globals_asset_name:${store.cctId}%`;
        
                html = `
                    <div class="cct-admin__feedback">
                        <a class="btn cct-admin__feedback__button" href="${url}" target="_blank">
                            <span class="cct-admin__feedback__button__inner">
                                <svg class="cct-admin__feedback__button__inner__icon" aria-hidden="true" focusable="false" aria-label="icon component feedback">
                                    <use href="${iconSpriteAssetUrl}#cctChat"></use>
                                </svg>
                                <span>${feedback.btnText}</span>
                            </span>
                        </a>
                    </div>
                `;
            }
        }
    
    return html;
};
