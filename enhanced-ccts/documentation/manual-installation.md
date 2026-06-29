
# 🛠️ Manual Installation Guide

Follow these instructions to manually set up Enhanced CCTs in Squiz Matrix without using the automated XML import package.

## 1. Create and Configure the Git File Bridge Asset

1. Create a new **Git File Bridge** asset in your Matrix asset tree.
2. Navigate to the asset's **Details** or **Configuration** screen.
3. Apply the following configuration settings:
   * **Git URL:** `https://github.com/qld-gov-au/matrix-projects.git`
   * **Branch name:** `enhanced-ccts`
   * **Sub directories:** `enhanced-ccts/assets`
4. Save the Git File Bridge asset.
5. Update the Git File Bridge asset to import the remote files.

---

## 2. Configure the Paint Layout Functions Nester

This step injects the component rendering scripts into your site.

1. Create a new **Code Component** asset.
2. Nest this component within your **Site Design Customisation**.
3. Insert the following Server-Side JavaScript (SSJS) into the component, replacing `<enhanced-ccts-git-file-bridge-asset-id>` with the actual asset ID of the Git File Bridge you created in Step 1:

```html
<script runat="server">
    %globals_asset_assetid:<enhanced-ccts-git-file-bridge-asset-id>^replace_keywords:append:\\:enhanced-ccts/assets/js/public-be-script.js^as_asset:asset_contents_raw%
</script>
```

---

## 3. Configure the Custom Edit Layout Functions Importer

This step handles loading Custom Edit Layout supporting functions, and required JS and CSS files inside the Matrix Admin interface.

1. Create a new **Code Component** asset.
2. Add the following code block to the asset.

```html
<script runat="server">
    if (typeof cctAssetsLoaded === 'undefined') {
        // Mark as loaded so other CCT containers skip importing assets
        var cctAssetsLoaded = true;
      
        // Declare Icon Sprite SVG Git Bridge URL
        var iconSpriteAssetUrl = `%nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/images/cct-admin-icon.svg^as_asset:asset_url%`;
      
        // CCT Support - Front End - Asset IDs variables & JS/CSS Append to Head
        print(`<script>$('#cct-admin-css').length || $('head').append('<link rel="stylesheet" id="cct-admin-css" href="%nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/css/admin-fe-styles.css^as_asset:asset_url%" />');$('#cct-admin-js').length || $('head').append('<script id="cct-admin-js" src="%nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/js/admin-fe-script.js^as_asset:asset_url%"><\\/script>');<\/script>`);
      
        // CCT Support - Back End
        %nested_get_gb^replace_keywords:append:\\:enhanced-ccts/assets/js/admin-be-script.js^as_asset:asset_contents_raw%
    }
</script>
```

---

## 4. Create a Regular Expression Asset

This asset fixes the text content of Template Literals that can otherwise break Squiz Matrix SSJS processing. It must be utilised in both **Custom Edit Layouts** and **Paint Layouts**.

1. Create a **Regular Expression** asset in Matrix.
2. Configure **Regex 1**:

   * **Pattern:** `/\$/`
   * **Replacement:** `&#36;`
   * **Description:** Escapes the dollar sign (`$`) so it is not incorrectly interpreted as a placeholder variable inside template literals.
3. Configure **Regex 2**:

   * **Pattern:** ``/\`/``
   * **Replacement:** ``&#96;``
   * **Description:** Escapes backticks so they do not break JavaScript strings that are already wrapped inside backticks.
