//## FIELD HTML

interface FieldHtmlData {
    id: string | number;
    html?: string;
    retired?: boolean;
    required?: 'soft' | string;
    extraClass?: string;
    toggleAnimation?: boolean;
    htmlSelect?: {
        name?: string;
        options?: SelectOption[];
    };
}

const cctFieldHtml = (
    data: FieldHtmlData, 
    activeHeadingId: string | number | undefined | null
): string => {
     
    //variables
    const id = data.id.toString();
    const isRetired = objQuery(() => data.retired) === true;
    
    // Fallback in case the metadataHashMap doesn't contain the field ID
    const metadataItem = store.metadataHashMap ? store.metadataHashMap[id] : undefined;
    const name = metadataItem ? metadataItem.name : '';
    const value = metadataItem && typeof metadataItem.value === 'string' ? metadataItem.value : '';
    
    const isSoftRequired = objQuery(() => data.required) === 'soft';
    const isHtmlSelect = objQuery(() => data.htmlSelect);
    const isCustomHtmlSelect = isHtmlSelect && objQuery(() => data.htmlSelect!.name);
    const isNoToggleAnimation = "toggleAnimation" in data && data.toggleAnimation === false;
    
    //Row classes
    const rowClassesArray: string[] = [
        //required (strong Metadata field setting)
        `%globals_asset_data_attributes:${id}^json_decode^index:required^index:value^eq:true:required:%`,
    ];
    
    //active heading
    if (activeHeadingId?.toString() === id) rowClassesArray.push('activeHeading');
    //retired
    if (isRetired) rowClassesArray.push('sq-metadata-settings-row--retired hidden');
    //extra class
    const extraClass = objQuery(() => data.extraClass);
    if (extraClass) rowClassesArray.push(extraClass);
    //Visibility trigger
    const visibilityTriggers = objQuery(() => store.visibilityTriggers);
    if (visibilityTriggers && visibilityTriggers.includes(id)) rowClassesArray.push('visibility-trigger');
    //Soft Required
    if (isSoftRequired) rowClassesArray.push('required-soft');
    //HTML Select
    if (isHtmlSelect) rowClassesArray.push("cct-html-select");
    if (isCustomHtmlSelect && data.htmlSelect?.name) rowClassesArray.push(`cct-html-select--${data.htmlSelect.name}`);
    //Toggle Animation
    if (isNoToggleAnimation) rowClassesArray.push("cct-no-toggle-animation");
    
    //All classes string
    const rowClasses = ` ${rowClassesArray.join(' ')}`;
        
    //Conditional/Reusable HTML parts
    const retiredLabelHtml = isRetired ? `<span class="rounded bg-warning small text-white text-nowrap d-inline-block mt-2 px-2">Retired</span>` : ``;
    const requiredErrorHtml = value.trim().length ? `` : `<br><span class="sq-metadata-warning sq-backend-warning">Currently empty</span>`;
    const requiredLabelHtml = `
            <span title="This field is required">
                <span class="sq-metadata-settings-row__field-name" id="${id}">
                    {globals_asset_data_attributes:${id}^json_decode^index:friendly_name^index:value}
                </span> 
                <span class="sq-backend-warning">*</span>
            </span>
        `;

    // Extract options conditionally for the builder snippet
    const selectOptions = data.htmlSelect?.options || [];
    
    //row html
    const html  = ` 
                <tr class="sq-backend-row sq-metadata-settings-row${rowClasses}" data-sq-id="${id}">
                    <td class="sq-backend-field">
                        <span class="sq-backend-field-label">
                            %globals_asset_data_attributes:${id}^json_decode^index:required^index:value^eq:true:${requiredLabelHtml}:${isSoftRequired ? requiredLabelHtml : `{globals_asset_data_attributes:${id}^json_decode^index:friendly_name^index:value}`}%
                            <br>
                            <a title="Find in Asset Map" class="js_sq-locate-asset-in-map sq-backend-note sq-backend-note-light" data-asset-id="${id}">
                                ${name} #${id}
                            </a>
                            %globals_asset_data_attributes:${id}^json_decode^index:required^index:value^eq:true:${requiredErrorHtml}:${isSoftRequired ? requiredErrorHtml : ``}%
                        </span>
                    </td>
                    <td class="sq-backend-data">
                        <div class="sq-backend-data__input-wrapper" data-name="${escapeDoubleQuote(name)}">
                            ${isCustomHtmlSelect ? cctCustomSelectOptionsBuilder(data.html, id, selectOptions) : data.html}
                        </div>
                        ${retiredLabelHtml}
                        %globals_asset_data_attributes:${id}^json_decode^index:description^index:value^neq::<div class="small text-muted mt-2">{globals_asset_data_attributes:${id}^json_decode^index:description^index:value}</div>%
                    </td>
                </tr>
            `;
    
    return html;
}
