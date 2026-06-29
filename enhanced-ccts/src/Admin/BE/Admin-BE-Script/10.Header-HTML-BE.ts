//##CCT HEADER HTML

const cctHeader = (): string => {
    
    const { cctId } = store;
    const assetid = store.asset.assetid;
    const guideUrl = objQuery(() => store.guideUrl);
    
    // Explicit string conversion or fallback to satisfy template literals safely
    const cctIdStr = cctId ? cctId.toString() : '';
    const guideUrlStr = typeof guideUrl === 'string' ? guideUrl : '';
    
    return `
            <div class="sq-backend-section-subheading cct-admin__title">

                <span class="cct-admin__title__component-name cct-admin__title__component-name--locks-not-acquired mt-2">
                    <span class="cct-admin__title__component-name__content h3">
                        <span class="cct-admin__title__component-name__content__display">
                            <span class="cct-admin__title__component-name__content__display__text">%globals_asset_name:${assetid}^escapehtml%</span>
                            <svg class="cct-admin__title__component-name__content__display__icon" aria-hidden="true" focusable="false" aria-label="icon edit component name">
                                <use href="${iconSpriteAssetUrl}#cctEdit"></use>
                            </svg>
                        </span>
                        <input type="text" value="%globals_asset_name:${assetid}^escapehtml%" class="cct-admin__title__component-name__content__input" />
                    </span>
                </span>
                
                <span class="cct-admin__title__cct-name">
                    <span class="cct-admin__title__cct-name__label">
                            <span class="cct-admin__title__cct-name__label__content bg-mx-%globals_asset_data:${cctIdStr}^json_decode^index:attributes^index:icon_color^index:value%-light">
                                <svg class="icon cct-admin__title__cct-name__label__content__icon" aria-hidden="true" focusable="false" aria-label="Component icon">
                                    <use href="${iconSpriteAssetUrl}#%globals_asset_data:${cctIdStr}^json_decode^index:attributes^index:icon^index:value%"></use>
                                </svg>
                                <span class="cct-admin__title__cct-name__label__content__text">
                                    %globals_asset_name:${cctIdStr}%
                                </span>
                                ${guideUrlStr ? `
                                    <span class="cct-admin__title__cct-name__label__content__guide">
                                        <a href="${guideUrlStr}" class="cct-admin__title__cct-name__label__content__guide__link" target="_blank" aria-label="Open component documentation" data-tippy-position="top" data-tippy-tooltip="Open component documentation<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false' viewBox='0 0 24 24' width='16' height='16'><use href='${iconSpriteAssetUrl}#cctExternalLink'></use></svg>">
                                            <svg class="icon color-mx-%globals_asset_data:${cctIdStr}^json_decode^index:attributes^index:icon_color^index:value%" aria-hidden="true" focusable="false" aria-label="icon open in a new window">
                                                <use href="${iconSpriteAssetUrl}#cctHelp"></use>
                                            </svg>
                                        </a>
                                    </span>
        
                                ` : ``}
                            </span>
                    </span>
                </span>
                    
            </div> `;
};
