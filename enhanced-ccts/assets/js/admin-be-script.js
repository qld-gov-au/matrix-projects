const objQuery=fn=>{try{const val=fn();return val??!1}catch{return!1}},escapeDoubleQuote=string=>string.replace(/\"/g,"&quot;"),escapeHtmlBe=str=>{if(!str)return"";const map={"<":"&lt;",">":"&gt;"};return str.replace(/[<>]/g,m=>map[m])},isLocksAcquiredBE=wrapperHtml=>{if(!wrapperHtml)return!1;const patterns=[`<select(?=[^>]*?class=["'][^"']*?sq-form-field)`,`<input(?=[^>]*?type=["']checkbox["'])(?=[^>]*?class=["'][^"']*?sq-form-field)`,`<input(?![^>]*?disabled)(?=[^>]*?type=["']text["'])(?=[^>]*?class=["'][^"']*?sq-form-field)`,`<textarea(?![^>]*?disabled)(?=[^>]*?class=["'][^"'][^>]*?sq-form-field)`,`class=["'][^"']*?sq-wysiwyg-standalone-body[^"']*?["'](?=[\\s\\S]*?<textarea)`];return new RegExp(patterns.join("|"),"im").test(wrapperHtml)},getInputValue=html=>{const match=(html||"").match(/value\s*=\s*["']([^"']*?)["']/i);return match?match[1]:""},cctMetadataHashmap=metadata=>Object.fromEntries(Object.entries(metadata).map(([key,item])=>[item.fieldid,{value:item.value,name:key}])),cctControlSectionData=()=>{const cctControlFields=Object.keys(store.asset.metadata).filter(item=>item.startsWith("cct-control."));if(cctControlFields.length){const assetId=store.asset.assetid,firstFieldKey=cctControlFields[0],sectionData={id:`%globals_asset_parent:${store.asset.metadata[firstFieldKey].fieldid}%`,extraClass:"hidden",fields:[],cctControl:!0};return cctControlFields.forEach(fieldName=>{const fieldId=store.asset.metadata[fieldName].fieldid,fieldConfig={id:fieldId,extraClasses:"bg-alert",html:`<input type="text" name="container_${assetId}_metadata_field_text_${fieldId}_value" value="%globals_asset_metadata_${fieldName}:${assetId}^escapehtml%" class="form-control sq-form-field" id="container_${assetId}_metadata_field_text_${fieldId}_value">`};sectionData.fields.push(fieldConfig)}),sectionData}return!1};let store={};const initStore=data=>{const asset=JSON.parse(data.assetData),assetId=asset.assetid.toString();store={...data,asset,has:{visibility:!1,sort:!1,retired:!1,locks:!1}},store.cctId=asset.attributes.attributes.value.template,store.metadataHashMap=cctMetadataHashmap(asset.metadata),store.has.visibility=!!objQuery(()=>data.conditionalVisibility),store.has.visibility&&data.conditionalVisibility&&(store.visibilityTriggers=data.conditionalVisibility.map(rules=>String(rules.trigger)));const containerIdAttr=objQuery(()=>asset.attributes.attributes.value.container_id),hash=containerIdAttr?`#${containerIdAttr.replace(/\\/g,"\\\\")}`:"";store.url=`%globals_asset_parent:${assetId}^as_asset:asset_parent^as_asset:asset_url%/_nocache${hash}`;const firstFieldHtml=objQuery(()=>data.sections[0].fields[0].html);store.has.locks=isLocksAcquiredBE(firstFieldHtml),data.sections.forEach(function(section,index){const activeHeading=objQuery(()=>section.activeHeading);if(activeHeading){const activeHeadingField=section.fields.some(function(field){return field.id.toString()===activeHeading.toString()});store.sections[index]&&(store.sections[index].activeHeading=activeHeadingField?activeHeading.toString():"false")}if(objQuery(()=>section.sort)===!0){if(store.sections[index]){const rawSortRef=objQuery(()=>section.sortRef);store.sections[index].sortRef=rawSortRef&&String(rawSortRef).length?String(rawSortRef):section.id.toString()}store.has.sort||(store.has.sort=!0)}store.has.retired||section.fields.some(function(field){return objQuery(()=>field.retired)===!0})&&(store.has.retired=!0)});const controlSectionData=cctControlSectionData();controlSectionData&&store.sections.push(controlSectionData)},cctSelectOptionsHTML=(inputValue,optionsArray)=>optionsArray.map(option=>`<option${inputValue==option.value?" selected":""} value="${option.value}">${option.label}</option>`).join(""),cctCustomSelectOptionsBuilder=(inputHtml,inputId,optionsArray)=>{let html="";const inputValue=getInputValue(inputHtml);if(store.has.locks)html=`<span class="cct-html-select__md-field hidden">${inputHtml||""}</span>
                <select name="cct-html-select__select-${inputId}" class="cct-html-select__select">
                    ${cctSelectOptionsHTML(inputValue,optionsArray)}
                </select>
                `;else{const selectedOption=optionsArray.find(option=>option.value==inputValue);selectedOption&&(html=`<span class='cct-selecthtml-label'>${selectedOption.label}</span>`)}return html},cctFieldHtml=(data,activeHeadingId)=>{const id=data.id.toString(),isRetired=objQuery(()=>data.retired)===!0,metadataItem=store.metadataHashMap?store.metadataHashMap[id]:void 0,name=metadataItem?metadataItem.name:"",value=metadataItem&&typeof metadataItem.value=="string"?metadataItem.value:"",isSoftRequired=objQuery(()=>data.required)==="soft",htmlSelect="htmlSelect"in data&&data.htmlSelect&&typeof data.htmlSelect=="object"?data.htmlSelect:!1,isCustomHtmlSelect=htmlSelect&&objQuery(()=>htmlSelect.name),isNoToggleAnimation="toggleAnimation"in data&&data.toggleAnimation===!1,rowClassesArray=[`%globals_asset_data_attributes:${id}^json_decode^index:required^index:value^eq:true:required:%`];activeHeadingId&&activeHeadingId.toString()===id&&rowClassesArray.push("activeHeading"),isRetired&&rowClassesArray.push("sq-metadata-settings-row--retired hidden");const extraClass=objQuery(()=>data.extraClass);extraClass&&rowClassesArray.push(extraClass);const visibilityTriggers=objQuery(()=>store.visibilityTriggers);visibilityTriggers&&visibilityTriggers.includes(id)&&rowClassesArray.push("visibility-trigger"),isSoftRequired&&rowClassesArray.push("required-soft"),htmlSelect&&rowClassesArray.push("cct-html-select"),isCustomHtmlSelect&&rowClassesArray.push(`cct-html-select--${htmlSelect.name}`),isNoToggleAnimation&&rowClassesArray.push("cct-no-toggle-animation");const rowClasses=` ${rowClassesArray.join(" ")}`,retiredLabelHtml=isRetired?'<span class="rounded bg-warning small text-white text-nowrap d-inline-block mt-2 px-2">Retired</span>':"",requiredErrorHtml=value.trim().length?"":'<br><span class="sq-metadata-warning sq-backend-warning">Currently empty</span>',requiredLabelHtml=`
            <span title="This field is required">
                <span class="sq-metadata-settings-row__field-name" id="${id}">
                    {globals_asset_data_attributes:${id}^json_decode^index:friendly_name^index:value}
                </span> 
                <span class="sq-backend-warning">*</span>
            </span>
        `,selectOptions=htmlSelect?htmlSelect.options||[]:[];return` 
                <tr class="sq-backend-row sq-metadata-settings-row${rowClasses}" data-sq-id="${id}">
                    <td class="sq-backend-field">
                        <span class="sq-backend-field-label">
                            %globals_asset_data_attributes:${id}^json_decode^index:required^index:value^eq:true:${requiredLabelHtml}:${isSoftRequired?requiredLabelHtml:`{globals_asset_data_attributes:${id}^json_decode^index:friendly_name^index:value}`}%
                            <br>
                            <a title="Find in Asset Map" class="js_sq-locate-asset-in-map sq-backend-note sq-backend-note-light" data-asset-id="${id}">
                                ${name} #${id}
                            </a>
                            %globals_asset_data_attributes:${id}^json_decode^index:required^index:value^eq:true:${requiredErrorHtml}:${isSoftRequired?requiredErrorHtml:""}%
                        </span>
                    </td>
                    <td class="sq-backend-data">
                        <div class="sq-backend-data__input-wrapper" data-name="${escapeDoubleQuote(name)}">
                            ${isCustomHtmlSelect?cctCustomSelectOptionsBuilder(data.html,id,selectOptions):data.html}
                        </div>
                        ${retiredLabelHtml}
                        %globals_asset_data_attributes:${id}^json_decode^index:description^index:value^neq::<div class="small text-muted mt-2">{globals_asset_data_attributes:${id}^json_decode^index:description^index:value}</div>%
                    </td>
                </tr>
            `},cctSectionHtml=(data,sectionHeading)=>{const fields=objQuery(()=>data.fields)||[],id=data.id.toString(),sectionNameNoEndNumber=`%globals_asset_name:${id}^replace:[0-9 -]+$:^escapehtml%`,activeHeadingKey=data.activeHeading?data.activeHeading.toString():"",storeActiveHeadingValue=store.metadataHashMap&&activeHeadingKey?store.metadataHashMap[activeHeadingKey].value:void 0,activeHeadingStr=typeof storeActiveHeadingValue=="string"?storeActiveHeadingValue:"",title=data.activeHeading&&activeHeadingStr.trim().length?escapeHtmlBe(activeHeadingStr):sectionNameNoEndNumber,toggleAnimationClass="toggleAnimation"in data&&data.toggleAnimation===!1?" cct-no-toggle-animation":"",extraClass=(objQuery(()=>data.extraClass)?` ${data.extraClass}`:"")+toggleAnimationClass,toggleConfig=objQuery(()=>data.toggle)===!0?{elemTag:"button type='button'",accordionTriggerExtras:` sq-backend-section-subheading--accordion-trigger${toggleAnimationClass} align-items-center justify-content-between`,accordionAreaExtras:` sq-backend-section-inner-table-wrapper--accordion-area${toggleAnimationClass} hidden`}:{elemTag:"div",accordionTriggerExtras:"",accordionAreaExtras:""},{elemTag,accordionTriggerExtras,accordionAreaExtras}=toggleConfig,sortConfig=objQuery(()=>data.sort)===!0?{wrapperElem:"td",wrapperClasses:" class='sq-sortable-dragging__row'",sortRowStart:`<tr class="sq-sortable-dragging${extraClass} cct-admin__section" data-sq-id="${id}" data-sortRef="${data.sortRef||""}">`,sortRowEnd:"</tr>",sortSectionTrigger:`<div class="js_sq-draggable-column sq-draggable-column ui-sortable-handle position-absolute " title="Drag to reorder">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" >
                                        <use href="${iconSpriteAssetUrl}#cctDragHandle"></use>
                                    </svg>
                                </div>`}:{wrapperElem:`div data-sq-id="${id}"`,wrapperClasses:` class='cct-admin__section${extraClass}'`,sortRowStart:"",sortRowEnd:"",sortSectionTrigger:""},{wrapperElem,wrapperClasses,sortRowStart,sortRowEnd,sortSectionTrigger}=sortConfig;let fieldsHtml="";fields.forEach(field=>{const fieldHtml=cctFieldHtml(field,data.activeHeading);fieldsHtml+=fieldHtml});const openWrapperTag=`<${wrapperElem}${wrapperClasses}>`,closeWrapperTag=`</${wrapperElem.split(" ")[0]}>`,openHeadingTag=`<${elemTag} data-default-content="${sectionNameNoEndNumber}" class="sq-backend-section-subheading d-flex${accordionTriggerExtras}">`,closeHeadingTag=`</${elemTag.split(" ")[0]}>`;return`
            ${sortRowStart}
                ${openWrapperTag}
                    ${sortSectionTrigger}
                    ${sectionHeading?`
                        ${openHeadingTag}
                            <span class="sq-backend-section-subheading__content">${title}</span>
                        ${closeHeadingTag}
                    `:""}
                    <div class="sq-backend-section-inner-table-wrapper p-0${accordionAreaExtras}">
                        <div class="px-4">
                            %globals_asset_data_attributes:${id}^json_decode^index:description^index:value^neq::<div class="sq-backend-note sq-text-normal pt-4 mt-0 mb-4">{globals_asset_data_attributes:${id}^json_decode^index:description^index:value}</div>%
                            <table class="sq-backend-section-table-inner">
                                <tbody>
                                    ${fieldsHtml}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ${closeWrapperTag}
            ${sortRowEnd}
        `},sortTableHtml=unsortedGroup=>{let sortTable=`
        <table class="sq-backend-table js_sq-sortable-table sq-sortable-table sq-sortable-table--cct-control">
            <tbody class="ui-sortable">
    `;const rawMetadataValue=objQuery(()=>store.asset.metadata["cct-control.section_sort"].value);let savedSortArray=!1;if(typeof rawMetadataValue=="string"&&rawMetadataValue.trim().length)try{savedSortArray=JSON.parse(rawMetadataValue)}catch{savedSortArray=!1}if(Array.isArray(savedSortArray)){savedSortArray.forEach(key=>{unsortedGroup.has(key)&&(sortTable+=unsortedGroup.get(key))});const targetSavedArray=savedSortArray;[...unsortedGroup.keys()].filter(item=>!targetSavedArray.includes(item)).forEach(key=>{sortTable+=unsortedGroup.get(key)||""})}else sortTable+=Array.from(unsortedGroup.values()).join("");return sortTable+=`
            </tbody>
        </table>
    `,sortTable},cctBodyHtml=()=>{let contentHtml="";const unsortedGroup=new Map,sectionHeading=store.sections.length>1;return store.sections.forEach(section=>{const sectionHtml=cctSectionHtml(section,sectionHeading);if(objQuery(()=>section.sort)===!0){const sortKey=section.sortRef?section.sortRef.toString():section.id.toString();unsortedGroup.set(sortKey,sectionHtml)}else contentHtml+=sectionHtml}),unsortedGroup.size&&(contentHtml+=sortTableHtml(unsortedGroup)),`
        <div class="sq-backend-section-inner-table-wrapper">
            <div class="sq-backend-section-table-inner">
                ${contentHtml}    
            </div>    
        </div>        
    `},cctFeedback=()=>{const feedback=objQuery(()=>store.feedback);let html="";return feedback&&"btnText"in feedback&&"url"in feedback&&(html=`
                    <div class="cct-admin__feedback">
                        <a class="btn cct-admin__feedback__button" href="${`${feedback.url}/?source=${store.asset.assetid}&cct=%globals_asset_name:${store.cctId}%`}" target="_blank">
                            <span class="cct-admin__feedback__button__inner">
                                <svg class="cct-admin__feedback__button__inner__icon" aria-hidden="true" focusable="false" aria-label="icon component feedback">
                                    <use href="${iconSpriteAssetUrl}#cctChat"></use>
                                </svg>
                                <span>${feedback.btnText}</span>
                            </span>
                        </a>
                    </div>
                `),html},cctHeader=()=>{const{cctId}=store,assetid=store.asset.assetid,guideUrl=objQuery(()=>store.guideUrl),cctIdStr=cctId?cctId.toString():"",guideUrlStr=typeof guideUrl=="string"?guideUrl:"";return`
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
                                ${guideUrlStr?`
                                    <span class="cct-admin__title__cct-name__label__content__guide">
                                        <a href="${guideUrlStr}" class="cct-admin__title__cct-name__label__content__guide__link" target="_blank" aria-label="Open component documentation" data-tippy-position="top" data-tippy-tooltip="Open component documentation<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false' viewBox='0 0 24 24' width='16' height='16'><use href='${iconSpriteAssetUrl}#cctExternalLink'></use></svg>">
                                            <svg class="icon color-mx-%globals_asset_data:${cctIdStr}^json_decode^index:attributes^index:icon_color^index:value%" aria-hidden="true" focusable="false" aria-label="icon open in a new window">
                                                <use href="${iconSpriteAssetUrl}#cctHelp"></use>
                                            </svg>
                                        </a>
                                    </span>
        
                                `:""}
                            </span>
                    </span>
                </span>
                    
            </div> `},cctContentHtml=()=>{const cctId=store.cctId?store.cctId.toString():"",assetid=store.asset.assetid.toString(),headerHtml=cctHeader(),feedbackHtml=cctFeedback(),bodyHtml=cctBodyHtml();return`
        <div class="metadata-value-table cct-admin" data-cct-id="${assetid}" style="visibility:hidden">
          <div class="sq-backend-section-table">
     
            ${headerHtml}
            
            ${feedbackHtml}
            
            ${objQuery(()=>store.inlineDescription)?`%globals_asset_attribute_description:${cctId}^eq:::
                    <div class="sq-backend-section-inner-table-wrapper">
                        {globals_asset_attribute_description:${cctId}}
                    </div>
                %`:""}
            
            ${bodyHtml}
           
          </div>
        </div>`};var cctAdmin=(function(){return{compile:data=>{try{initStore(data);const html=cctContentHtml();print(html);const handleCct=[],assetId=store.asset.assetid.toString();let feJs="";feJs+=`cctStore.iconSpriteAssetUrl="${iconSpriteAssetUrl}";`,store.has.visibility&&store.conditionalVisibility&&(feJs+=`cctStore.conditionalVisibility[${assetId}]=${JSON.stringify(store.conditionalVisibility)};`,handleCct.push("visibility")),feJs+=`cctStore.url["${assetId}"]=\`${store.url||""}\`;`,store.has.sort&&handleCct.push("sort"),store.has.retired&&handleCct.push("retired");const handleCctVariable=handleCct.length?`,${JSON.stringify(handleCct)}`:"";feJs+=`cctInit("${assetId}"${handleCctVariable});`,feJs.length&&print(`<script>${feJs}<\/script>`)}catch(error){print(`<script>console.error("${error}")<\/script>`)}}}})();

//# sourceMappingURL=admin-be-script.js.map