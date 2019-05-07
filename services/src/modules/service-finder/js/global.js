(function(){

    'use strict';

    var services_service_finder_module = (function() {
        
        /* Initialise Funnelback Conceirge on input field */
        function initFBConceirge() {

            var $services_service_finder_field = $services_service_finder.find(".services-service-finder__field");

            $services_service_finder_field.autocompletion({
                program   : 'https://stage-15-10-search.clients.funnelback.com/s/suggest.json',
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
                    }
                    
                  }

                }

            });

            $tt_menu = $services_service_finder.find(".tt-menu");

            $services_service_finder_field.on('input', function() { 
                renderInputField();
            });

        }

        function renderInputField() {

            // If results list menu has class and there are suggestions
            // Add class to input field to adjust appearance
            if ($tt_menu.hasClass("tt-open") && $tt_menu.find(".tt-suggestion").length) {
                $services_service_finder.addClass("results-shown");
            } else {
                $services_service_finder.removeClass("results-shown");
            }

        }

        function init() {
            
            $services_service_finder = $(".services-service-finder");
            
            if ($services_service_finder.length) {

                /* Initialise Funnelback Concerige */
                initFBConceirge();

            }
            
        }
        
        // Cache elements
        var $services_service_finder;
        var $tt_menu;
        
        return {
            init: init
        }
    
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {
        services_service_finder_module.init();
    });

}());
