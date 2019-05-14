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

            var centre_name = nearest_service_centre_data.title;

            qg_nearest_service_centre.dom.$centre_name.text(centre_name);


            qg_nearest_service_centre.dom.$centre_name.prop("href");

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
                
                // If there are results in the features key
                if (data.hasOwnProperty('features')) {

                    if (data.features.length) {

                        // Get result from 1st item in array
                        nearest_service_centre_data = data.features[0].properties;

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

                }

            });

        }

        function init() {
            
            
            qg_nearest_service_centre.dom = {};

            // Get root element
            qg_nearest_service_centre.dom.$root = $(".qg-site-footer-util__nearest-service-centre");
            
            // If widget exists
            if (qg_nearest_service_centre.dom.$root.length) {

                // Cache centre name element
                qg_nearest_service_centre.dom.$centre_name = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-name");

                // Cache services available elements
                qg_nearest_service_centre.dom.$service_available_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-services-available");
                qg_nearest_service_centre.dom.$service_available_link = qg_nearest_service_centre.dom.$service_available_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-services-available-link");

                // Cache location wrapper elements
                qg_nearest_service_centre.dom.$location_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-location");
                qg_nearest_service_centre.dom.$location_distance_from = qg_nearest_service_centre.dom.$location_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-distance-from");
                qg_nearest_service_centre.dom.$location_address = qg_nearest_service_centre.dom.$location_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-location-address");

                // Get API source data endpoint URL from data attribute
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
