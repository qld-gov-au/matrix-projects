(function(){

    'use strict';

    /*
     * ====================
     * Search Widget Module
     * ====================
     * The search widget is a form which has an input search field and a submit button.
     * 
     * When hover events happen on the form, or focus events happen on the input search field and submit button:
     * Classes are removed and added to the parent of the widget.
     * For example, the search widget is embedded in the header util bar.
     * On desktop, the search widget appears as a magnifying glass icon only.
     * If the classes are applied to the parent:
     * - other widgets in the header util bar are hidden 
     * - the search field input is visible
     * 
     */

    var qg_search_widget_module = (function() {
    
        function setupField() {

            // Bind field focused event to field
            qg_search_widget_module.dom.$field.on("focus", form_focused);
            qg_search_widget_module.dom.$field.on("blur", form_blurred);

        }

        function form_focused(event) {
            
            // Add class to parent so that not only field can show but hide other widgets in util bar as well
            qg_search_widget_module.dom.$parent.addClass("search-form-widget--focused");

        }

        function form_blurred(event) {
            
            // Remove class to hide search field and show other widgets
            qg_search_widget_module.dom.$parent.removeClass("search-form-widget--focused");

        }

        function cacheElements() {

            // Get input search field element
            qg_search_widget_module.dom.$field = qg_search_widget_module.dom.$root.find(".qg-search-widget__field");

            // Get form element
            qg_search_widget_module.dom.$form = qg_search_widget_module.dom.$root.find(".qg-search-widget__form");

            // Get submit button element
            qg_search_widget_module.dom.$button_submit = qg_search_widget_module.dom.$root.find(".qg-search-widget__btn-submit");

            // Get toggle button element
            qg_search_widget_module.dom.$button_toggle = qg_search_widget_module.dom.$root.find(".qg-search-widget__btn-toggle");

            // Get parent element
            qg_search_widget_module.dom.$parent = qg_search_widget_module.dom.$root.parent();

        }

        function btn_toggle_clicked() {

            qg_search_widget_module.dom.$parent.addClass("search-form-widget--focused");
            qg_search_widget_module.dom.$field.focus();

        }

        function submitForm(event) {
            
            event.preventDefault();

            qg_search_widget_module.dom.$form.submit();
            
        }

        // Initialisation
        function init() {
            
            qg_search_widget_module.dom = {};

            // Get root node
            qg_search_widget_module.dom.$root = $(".qg-search-widget");
            
            // If search widget exists
            if (qg_search_widget_module.dom.$root.length) {

                cacheElements();

                setupField();

                // Bind click event on toggle button
                qg_search_widget_module.dom.$button_toggle.on("click", btn_toggle_clicked);

                qg_search_widget_module.dom.$button_submit.on("mousedown", submitForm);
            }
            
        }
        
        var qg_search_widget = {};
        var hover_class = "search-form-widget--hover";
        var active_class = "search-form-widget--focused";

        return {
            init: init
        }
    
    }());
    
    // When dom is ready
    document.addEventListener("DOMContentLoaded", function() {

        // Initialise the module
        qg_search_widget_module.init(); 

    });

}());
