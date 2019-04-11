(function() {
    
    'use strict';

    var franchise_breadcrumb_ellipses_module = (function() {

        // When the breadcrumb ellipses is clicked
        function breadcrumbEllipsesClicked(event) {
            
            event.preventDefault();
            
            // Show hidden after siblings
            $franchise_list_item_next_siblings.not($franchise_list_item_next_siblings.last()).removeClass("hide-breadcrumb");
            
            // Remove breadcrumb ellipses from DOM
            $breadcrumb_ellipses.remove();
            
        }

        function init() {
            
            // Get franchise list item in the breadcrumbs (identified with a data attribute
            var $franchise_list_item = $("li[data-franchise-page]");
            
            // If franchise list item exists
            if ($franchise_list_item.length) {
                
                // Get all siblings after the franchise item
                $franchise_list_item_next_siblings = $franchise_list_item.nextAll();
                
                if ($franchise_list_item_next_siblings.length > 1) {
                    
                    // Hide all after siblings except the last one
                    $franchise_list_item_next_siblings.not($franchise_list_item_next_siblings.last()).addClass("hide-breadcrumb");
                    
                    // Prepare the breadcrumb ellipses DOM element
                    $breadcrumb_ellipses = $("<li id='qg-breadcrumb__ellipses'><a href='#' role='button' aria-pressed='false' aria-label='Reveal hidden breadcrumbs'>...</a></li>");
                    
                    // Insert it after the franchise breacrumb item and attach a click handler
                    $breadcrumb_ellipses.insertAfter($franchise_list_item).click(breadcrumbEllipsesClicked);
                    
                }
                
            }
            
        }
        
        var $franchise_list_item_next_siblings; // To store siblings after the franchise list item
        var $breadcrumb_ellipses; // To store a prepared DOM element to insert after the franchise list item
        
        return {
            init: init
        }
        
    }());

    // Initiate module
    document.addEventListener("DOMContentLoaded", function() {
        franchise_breadcrumb_ellipses_module.init();
    });
    
}());

