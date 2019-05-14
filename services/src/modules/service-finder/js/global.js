(function(){

    'use strict';

    /*
     * =====================
     * Service Finder Module
     * =====================
     * The search finder module is a form which has an input search field and a submit button.
     * 
     * -----------------------------------------
     * Functionality - FB Autocomplete Conceirge
     * -----------------------------------------
     * The Funnelback autocomplete coneirge is applied on the input search field to allow
     * - autocompletion
     * - organic suggestions (Up to 5)
     * - featured suggestion (1)
     * The script also clones the featured result into the organic result set for mobile view
     * 
     * -------------------------------------------
     * Functionality - No results menu links focus
     * -------------------------------------------
     * We would prefer users are able to keyboard navigate through the no-menu links
     * Thus, a class needs to be added to the parent to keep the no-menu open when tabbing through
     * 
     */

    var services_service_finder_module = (function() {
        
        // Set up Funnelback Conceirge on input field
        function setupFBConceirge() {

            // Get autocomplete source url
            var autocomplete_source_url = services_service_finder.dom.$root.data("autocomplete-source");

            // Initiate conceirge plugin
            services_service_finder.dom.$field.autocompletion({

                program: autocomplete_source_url,
                scrollable: true,
                datasets: {
                    organic: {
                        name: 'General suggestions',
                        collection: 'qgov-web',
                        profile : 'services',
                        show: 5
                    },
                    featured: {
                        name: 'Featured result',
                        collection: 'qld-gov',
                        profile: 'featured_auto-completion',
                        template: {'suggestion':'<div><h6 class="services-service-finder__featured-heading">{{label.title}}</h6>{{#if label.icon}}<i class="fas {{label.icon}} services-service-finder__featured-icon"></i>{{/if}}<p class="services-service-finder__featured-description">{{label.description}}</p><button class="services-service-finder__featured-btn" href="{{label.link}}">{{label.CTA}}</button></div>'},
                        show: 1
                    }
                },
                length: 3,
                typeahead: {
                  hint: true,
                  events: {
                    open: function(event) {
                        renderInputField();
                    },
                    close: function(event) {
                        renderInputField();
                    },
                    render: function(event, suggestions, syncType, name) {
                        renderInputField();
                        cloneFeaturedResult();
                    }
                    
                  }

                }

            });

            // Cache dropdown result menu elements
            services_service_finder.dom.$tt_menu = services_service_finder.dom.$root.find(".tt-menu");
            services_service_finder.dom.$organic_results_wrapper = services_service_finder.dom.$tt_menu.find(".tt-dataset-organic");
            services_service_finder.dom.$featured_result_wrapper = services_service_finder.dom.$tt_menu.find(".tt-dataset-featured");

            services_service_finder.dom.$field.on('input', function() { 
                renderInputField();
            });

            // Unfocus on field when suggestion / featured result is clicked on
            $("body").on("click", ".tt-suggestion", function() {
                services_service_finder.dom.$field.blur();
            });

        }

        // Clone the featured result and insert into organic set so that featured result can appear between suggestions
        function cloneFeaturedResult() {

            // Remove featured result from organic result wrapper if exists
            services_service_finder.dom.$organic_results_wrapper.find(".tt-dataset-featured").remove();

            var $featured_result = services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion");

            if ($featured_result.length) {

                // Clone featured result set. Arguments are true in order to clone click events binded to search result
                var $featured_result_wrapper_clone = services_service_finder.dom.$featured_result_wrapper.clone(true, true);
                
                // Get number of organic results
                var $organic_results = services_service_finder.dom.$organic_results_wrapper.find(".tt-suggestion");

                if ($organic_results.length > 2) {
                    $featured_result_wrapper_clone.insertAfter($organic_results.eq(1));
                } else {
                    $featured_result_wrapper_clone.appendTo(services_service_finder.dom.$organic_results_wrapper);
                }

            }

        }

        function renderInputField() {

            // If results list menu has class and there are suggestions
            // Add classes to input field to adjust appearance

            // This will add a class if there are results and menu is open
            if (services_service_finder.dom.$tt_menu.hasClass("tt-open") && services_service_finder.dom.$tt_menu.find(".tt-suggestion").length) {
                services_service_finder.dom.$root.addClass("services-service-finder--results-shown");
            } else {
                services_service_finder.dom.$root.removeClass("services-service-finder--results-shown");
            }

            // This will add a class to specify there are featured results
            if (services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion").length) {
                services_service_finder.dom.$root.addClass("services-service-finder--has-featured-result");
            } else {
                services_service_finder.dom.$root.removeClass("services-service-finder--has-featured-result");
            }
            
        }


        function checkFieldHasInput(current_value) {

            if (current_value.length === 0) {
                services_service_finder.dom.$root.addClass("services-service-finder--no-input");
            } else {
                services_service_finder.dom.$root.removeClass("services-service-finder--no-input");
            }

        }

        // This function adds/removes a "focus" class whenever the field is focused/blurred
        // This is to control CSS border radius of input and button
        // Also, if user is focused / blurred from field input, check if there is input
        // This is to make the "no results menu" hide if there is input
        function setupFieldFocusEvent() {

            // Focus event
            services_service_finder.dom.$field.on("focus", function (event) {

                var $this = $(event.target);
                var current_value = $this.val();

                checkFieldHasInput(current_value);

                services_service_finder.dom.$root.addClass("services-service-finder--focused");

            });

            // Blur event
            services_service_finder.dom.$field.on("blur", function (event) {

                var $this = $(event.target);
                var current_value = $this.val();

                checkFieldHasInput(current_value);

                services_service_finder.dom.$root.removeClass("services-service-finder--focused");

            });

        }

        // Whenever user is typing or deleting input, check if there is input
        // This is to make the "no results menu" hide if there is input 
        function setupFieldInputEvent() {

            services_service_finder.dom.$field.on("input", function (event) {

                var $this = $(event.target);
                var current_value = $this.val();

                checkFieldHasInput(current_value);

            });

        }

        // Whenever a link in the no results menu is selected, ensure that the no results menu is visible
        // This allows better keyboard navigation
        function setupNoResultsMenuLinks() {

            var no_result_menu_link_focused_state_class = "services-service-finder--no-results-menu-link-focused";

            services_service_finder.dom.$no_result_menu_links = services_service_finder.dom.$root.find(".services-service-finder__no-results-menu-list-item-link");

            services_service_finder.dom.$no_result_menu_links.on("focus", function(event) {
                services_service_finder.dom.$root.addClass(no_result_menu_link_focused_state_class);
            });

            services_service_finder.dom.$no_result_menu_links.on("blur", function(event) {
                services_service_finder.dom.$root.removeClass(no_result_menu_link_focused_state_class);
            });

        }

        function init() {
            
            services_service_finder.dom = {};

            // Get root node
            services_service_finder.dom.$root = $(".services-service-finder");
            
            // If sevice finder exists
            if (services_service_finder.dom.$root.length) {

                // Get field input
                services_service_finder.dom.$field = services_service_finder.dom.$root.find(".services-service-finder__field");

                // Set up root node to have class whenever field is focused on
                setupFieldFocusEvent();

                // Set up root node to have a class whenever something is being typed into the search field
                setupFieldInputEvent();

                // Initialise Funnelback Concerige
                setupFBConceirge();

                // Set up no results menu links
                setupNoResultsMenuLinks();

            }
            
        }
        
        var services_service_finder = {};

        return {
            init: init
        }
    
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {
        services_service_finder_module.init();
    });

}());
