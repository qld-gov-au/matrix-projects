//##CCT FEEDBACK HTML

const cctFeedback = (): string => {
    // Looks up optional feedback text stored globally
    const feedback = objQuery(() => store.feedback);
    
    // Explicit string conversion or check to handle types safely
    const feedbackText = typeof feedback === 'string' ? feedback : '';
    
    const html = feedbackText.trim().length ? `
        <div class="cct-admin__feedback">
            <button type="button" class="cct-admin__feedback__button">
                <span class="cct-admin__feedback__button__inner">
                    <svg class="cct-admin__feedback__button__inner__icon" aria-hidden="true" focusable="false" aria-label="icon component feedback">
                        <use href="./?a=${store.iconSpriteAssetUrl}#cctChat"></use>
                    </svg>
                    <span>${feedbackText}</span>
                </span>
            </button>
        </div>
    ` : ``;
    
    return html;
};
