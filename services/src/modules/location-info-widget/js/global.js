(function(){

    'use strict';

     /*
     * ===========================
     * Location Info Widget Module
     * ===========================
     * This widget module deals with displaying the user's location and providing an interface for the user to select a location
     * 
     * ---------------------------
     * Functionality
     * ---------------------------
     * 
     * 
     */

    var qg_location_info_widget_module = (function() {
        
        function linkClicked(event) {
            
            // Prevent default action
            event.preventDefault();

            // Prevent bubbling
            event.stopPropagation();

            

        }

        function init() {
            
            qg_location_info_widget.dom = {};

            // Get root element
            qg_location_info_widget.dom.$root = $(".qg-location-info-widget");
            
            // If widget exists
            if (qg_location_info_widget.dom.$root.length) {

                qg_location_info_widget.dom.$link = qg_location_info_widget.dom.$root.find(".qg-location-info-widget__link");

                qg_location_info_widget.dom.$link.click(linkClicked);
   
            }
            
        }
        
        var qg_location_info_widget = {};


        // Initialise this module only when the user location module is initialised
        qg_user_location_module.event.emit("user location module initialised");

        return {
            init: init
        }
    
    
    }());

}());
