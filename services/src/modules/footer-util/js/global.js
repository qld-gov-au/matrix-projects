(function(){

    'use strict';

     /*
     * ===========================
     * Nearest Service Centre
     * ===========================
     * This widget module deals with getting and displaying the nearest service centre depending on the user's coordinates
     * 
     * ---------------------------
     * Functionality
     * ---------------------------
     * When coordinates are received, a call is made to a funnelback endpoint which returns the closest service centre.
     * The nearest service centre details are then updated
     * 
     */

    var qg_nearest_service_centre_module = (function() {
        
        function updateCentreName() {

        }

        function updateServicesAvailable() {

        }

        // function updateHours() {

        // }

        function updateLocation() {

        }




        function updateDetails(location) {

            var request_url = nearest_service_center_data_source_url + "&origin=" + location.lat + "%3B" + location.lon;
        
            // When the nearest service centre data is retrieved from source by passing in the user's coords
            $.getJSON( request_url, function( data ) {
                
                nearest_service_centre_data = data;

                // If there are results in the features key
                if (nearest_service_centre_data.features.length) {

                    // Update centre name
                    updateCentreName();

                    // Update services available text
                    updateServicesAvailable();

                    // Update hours text
                    // updateHours();

                    // Update location text
                    updateLocation();

                    // Class to make the widget show is added to the root node
                    qg_nearest_service_centre.dom.$root.addClass("qg-site-footer-util__nearest-service-centre--has-result");

                }

            });

        }

        function init() {
            
            
            qg_nearest_service_centre.dom = {};

            // Get root element
            qg_nearest_service_centre.dom.$root = $(".qg-site-footer-util__nearest-service-centre");
            
            // If widget exists
            if (qg_nearest_service_centre.dom.$root.length) {

                nearest_service_center_data_source_url = qg_nearest_service_centre.dom.$root.data("nearest-service-centre-source");
                
            }

        }
        
        var qg_nearest_service_centre = {};

        var nearest_service_centre_data;

        var nearest_service_center_data_source_url;
        
        qg_user_location_module.event.on("location set", updateDetails);

        return {
            init: init
        }
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {
        qg_nearest_service_centre_module.init();
    });

}());
