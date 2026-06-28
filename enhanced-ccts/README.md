# Enhanced Custom Component Templates (CCTs)

![Enhanced CCts](./enhanced-ccts/documentation/assets/Enhanced-CCts.gif)

![1782667967602](image/README/1782667967602.gif)

## 📌 Overview

- **Matrix Version Agnostic:** Tested and fully compatible with Squiz Matrix versions 6.28 to 6.9.
- **Design System Independent:** Works seamlessly with any design system (the included examples use QGDS, but this is not a requirement).
- **Decoupled Enhancements:** Custom Edit Layouts, and Paint Layouts can be enhanced independently.
- **Flexible Rendering:** Supports Handlebars rendering out of the box, as well as custom-built HTML templates.



## 🛠️ Features

### 1. Publishing Tools

* **Drag-and-Drop Reordering:** Drag-and-drop sections to easily reorder cards, panels and tabs.
* **Hash Linking:** Hash links dynamically added to allow direct navigation to specific page sections.
* **Custom Slugs:** Custom unique CCT URLs (Custom Hash links).
* **Design Control:**  Add Custom CSS classes to manage individual CCT presentation.
* **Instant Preview:** One-click functionality to view CCT updates before publishing.
* **HTML rich select fields:** Search options in Select fields and customise option layout with HTML markups.
* **Input Validation:** Real-time popups on save to ensure all required fields are complete.

### 2. Improved Scannability

* **CCT labels:** Unique icons and colour-coding labels for faster identification.
* **Conditional visibility:** CCT form fields visibility progresses based on editor input.
* **Collapsible form sections** : Minimises editor screen length.
* **Custom component name** : Edit CCT name in page content and asset tree for faster identification.
* **Custom section titles:** Content hints at a glance, without needing to expand sections.
* **Hidden retired fields (SWE):** Visible with one click to maintain access to historical data.

### 3. Editor Support

* **Documentation:** High-visibility links to updated CCT documentation for quick reference.
* **Direct Assistance:** One-click support ticket creation with pre-filled description.



## 📦 Installation

The easiest way to install Enhanced CCTs is by using the provided XML package.

1. **Import the XML** file into your Squiz Matrix environment.
2. **Update the QGDS Git Bridge asset** `Enhanced CCT XML/Config/Site/QGDS Git Bridge`
3. **Update the Enhanced CCTs Git Bridge asset** `Enhanced CCT XML/Config/Enhanced CCTs/Enhanced CCTs Git Bridge`
4. **Assign a URL** to the Site asset `Enhanced CCT XML/Site`

Once completed, the imported site will be functional, and all 5 sample CCT examples will work on the site homepage.

> 💡 **Note:** Manual installation instructions are also available in the documentation if you prefer not to use the XML import method.



## 🚀 Integrating with Existing Site Assets

1. **Nest the Design Partial:** Nest `Enhanced CCT XML/Config/Enhanced CCTs/Enhanced CCT Design Partial` into your Site asset's active design customisation.
   *(Note: This step is optional and only required if you want to enhance Paint Layout rendering).*
2. **Build Components:** Follow the specific Custom Edit Layout and Paint Layout instructions to start building your own Enhanced CCTs.
