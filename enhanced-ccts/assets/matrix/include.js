    if (typeof cctAssetsLoaded === 'undefined') {
        
        //Mark as loaded so other CCT containers skip importing assets
        var cctAssetsLoaded = true;
        
        //Declare Icon Sprite SVG Git Bridge URL
        var iconSpriteAssetUrl = `%nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/images/cct-admin-icon.svg^as_asset:asset_url%`;
        
        //CCT Support - FE - Asset Ids vars & JS/CSS Append to Head
        print(`<script>$('#cct-admin-css').length || $('head').append('<link rel="stylesheet" id="cct-admin-css" href="%nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/css/admin-fe-styles.css^as_asset:asset_url%" />');$('#cct-admin-js').length || $('head').append('<script id="cct-admin-js" src="%nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/js/admin-fe-script.js^as_asset:asset_url%"><\\/script>');<\/script>`);
        
        //CCT Support - BE
        %nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/js/admin-be-script.js^as_asset:asset_contents_raw%

    }
