(function(){

    'use strict';

    /*
     * =====================
     * Service Finder Module
     * =====================
     * The search finder module is a form which has an input search field and a submit button.
     * 
     * ---------------------------------------------------
     * Functionality - FB Autocomplete Conceirge
     * ---------------------------------------------------
     * The Funnelback autocomplete coneirge is applied on the input search field to allow
     * - autocompletion
     * - organic suggestions (Up to 5)
     * - featured suggestion (1)
     * The script also clones the featured result into the organic result set for mobile view
     */

    var services_service_finder_module = (function() {
        
        // Initialise Funnelback Conceirge on input field
        function initFBConceirge() {

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
                services_service_finder.dom.$root.addClass("results-shown");
            } else {
                services_service_finder.dom.$root.removeClass("results-shown");
            }

            // This will add a class to specify there are featured results
            if (services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion").length) {
                services_service_finder.dom.$root.addClass("has-featured-result");
            } else {
                services_service_finder.dom.$root.removeClass("has-featured-result");
            }
            
        }

        // This function adds/removes a "focus" class whenever the field is focused/blurred
        // This is to control CSS border radius of input and button
        // If user is focusing on field, scroll to field so that user can always see the rest of the no results menu
        function initFieldFocusEvent() {

            services_service_finder.dom.$field.on("focus", function (event) {

                var $this = $(event.target);

                services_service_finder.dom.$root.addClass("services-service-finder--focused");

                // Scroll to element
                $([document.documentElement, document.body]).animate({
                    scrollTop: $this.offset().top
                }, 300);

            });

            services_service_finder.dom.$field.on("blur", function (event) {

                services_service_finder.dom.$root.removeClass("services-service-finder--focused");

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

                // Set up root node to have class whenver field is focused on
                initFieldFocusEvent();

                // Initialise Funnelback Concerige
                initFBConceirge();

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
