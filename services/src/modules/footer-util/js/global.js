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
        
        

        

        function getWeatherData(lat, lon) {

            var request_url = weather_api_source + "&lat=" + lat + "&lon=" + lon;
        
            return $.getJSON( request_url, function( data ) {
                
                weather_data = data;

            });

        }

        function updateDetails(location) {

            // When the weather data is retrieved from open weather API by passing in the user's coords
            // Tempereature is updated
            // Image is updated
            // Class to make the widget show is added to the root node
            $.when( getNearestCentre(location.lat, location.lon) ).then(function( data, textStatus, jqXHR ) {
                
                

            });

        }

        function init() {
            
            qg_nearest_service_centre.dom = {};

            // Get root element
            qg_nearest_service_centre.dom.$root = $(".qg-site-footer-util__nearest-service-centre");
            
            // If widget exists
            if (qg_nearest_service_centre.dom.$root.length) {

                nearest_service_centre_data_source = qg_nearest_service_centre.dom.$root.data("data-source-url");
                
            }
            
        }
        
        var qg_nearest_service_centre = {};

        var data_source_url;
        
        // On location set event, update the widge
        qg_user_location_module.event.on("location set", updateDetails);

        return {
            init: init
        }
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {

        qg_nearest_service_centre_module.init();

        // Remove when user-location modue is implemented!
        qg_user_location_module.event.emit("location set",{"lat":"-27.4802", "lon": "153.0122"});

    });

}());
