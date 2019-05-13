(function(){

    'use strict';

    /*
     * ====================
     * Search Widget Module
     * ====================
     * The search widget is a form which has an input search field and a submit button.
     * 
     * ---------------------------------------------------
     * Functionality - Control appearance with class names
     * ---------------------------------------------------
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
    
        function form_hovered(event) {

            // Add class to parent so that not only field can show but hide other widgets in util bar as well
            qg_search_widget_module.dom.$parent.addClass("search-form-widget--hover");

        }

        function form_unhovered(event) {

            // Remove class to hide search field and show other widgets
            qg_search_widget_module.dom.$parent.removeClass("search-form-widget--hover");

        }

        function form_focused(event) {
            
            // Add class to parent so that not only field can show but hide other widgets in util bar as well
            qg_search_widget_module.dom.$parent.addClass("search-form-widget--focused");

        }

        function form_blurred(event) {
            
            // Remove class to hide search field and show other widgets
            qg_search_widget_module.dom.$parent.removeClass("search-form-widget--focused");

        }

        function init() {
            
            qg_search_widget_module.dom = {};

            // Get root node
            qg_search_widget_module.dom.$root = $(".qg-search-widget");
            
            // If search widget exists
            if (qg_search_widget_module.dom.$root.length) {

                // Get input search field element
                qg_search_widget_module.dom.$field = qg_search_widget_module.dom.$root.find(".qg-search-widget__field");

                // Get submit button element
                qg_search_widget_module.dom.$button = qg_search_widget_module.dom.$root.find(".qg-search-widget__btn");

                // Get parent element
                qg_search_widget_module.dom.$parent = qg_search_widget_module.dom.$root.parent();

                // Bind field focused event to field and button
                qg_search_widget_module.dom.$field.add(qg_search_widget_module.dom.$button).on("focus", form_focused);
                qg_search_widget_module.dom.$field.add(qg_search_widget_module.dom.$button).on("blur", form_blurred);

                // Bind hover event over form - includes mouse enter and leave
                qg_search_widget_module.dom.$root.hover(form_hovered, form_unhovered);

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
