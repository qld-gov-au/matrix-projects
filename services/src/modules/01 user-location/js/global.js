(function(){

    'use strict';

    /*
     * ================================
     * User location Module
     * ================================
     * This involves detecting the user's location and saving it to session storage
     * It uses EventEmitter2 to broadcast location whenever the location is set/updated
     * 
     * Other modules (e.g. dynamic banner, nearest service center, location info widget, weather info widget) will depend on this module
     * 
     * ---------------------------
     * Functionality
     * ---------------------------
     * 
     * 
     */

    window.qg_user_location_module = (function() {

        function broadcastLocation() {
            
            console.log(user_location);
            event.emit("location set", user_location);

        }
        
        function checkSessionStorage() {

            // Check if Google maps JSON is stored in session storage
            var user_location_session_storage = sessionStorage.getItem('user_location');

            if (user_location_session_storage !== null) {

                var user_location_session_storage_json = JSON.parse(user_location_session_storage);

                // Get details from stored Google maps result
                user_location.lat = user_location_session_storage_json.lat;
                user_location.lon = user_location_session_storage_json.lon;
                user_location.suburb = user_location_session_storage_json.suburb;
                user_location.lga = user_location_session_storage_json.lga;

                return true;

            } else {

                return false;

            }
            
        }

        // Locate suburb and LGA with coordinates
        function locateWithCoordinates() {

            // Create endpoint to query endpoint with coordinates
            var parameters = "&address=" + user_location.lat + "," + user_location.lon;

            // Get user location
            geocode(parameters);
            
        }

        // Locate user with provided suburb and LGA
        function locateWithArea(suburb, lga) {

            // Create endpoint to query endpoint with coordinates
            var parameters = "&address=" + suburb + "," + lga + ",qld";
            
            // Get user location
            geocode(parameters);
            
        }

        function geocode(parameters) {

            var endpoint_to_call = map_data_api + encodeURIComponent(parameters);

            $.getJSON( endpoint_to_call, function( data ) {

                // Get the first result item in the returned JSON
                var results = data.results[0];

                // Get latitutde
                user_location.lat = results.geometry.location.lat;

                // Get longtitude - Note that google's data is spelt lng
                user_location.lon = results.geometry.location.lng;

                var address_components = results.address_components;

                // Get suburb 
                user_location.suburb = _.find(address_components, function(obj) { return obj.types.indexOf("locality") !== -1; }).long_name;

                // Get LGA
                user_location.lga = _.find(address_components, function(obj) { return obj.types.indexOf("administrative_area_level_2") !== -1; }).long_name;

                // Store location object in session storage
                sessionStorage.setItem("user_location", JSON.stringify(user_location));

                broadcastLocation();

            });

        }

        function locateUser() {

            // Use HTML5 geolocation to get user's coordinates
            if ("geolocation" in navigator) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    
                    // Set coordinates
                    user_location.lat = position.coords.latitude;
                    user_location.lon = position.coords.longitude;

                    locateWithCoordinates();
                                                        
                });

            }

        }
        
        function init() {

            // Emit this so other modules dependent on user location can get initialised first before emmitting events
            qg_user_location_module.event.emit("user location module initialised");

            if (checkSessionStorage()) {

                // Emit event user's current location
                broadcastLocation();

            } else {

                // Start locating the user
                locateUser();

            }

            // West End
            // qg_user_location_module.event.emit("location set",{"lat":"-27.4773931", "lon": "153.0131612"});

            // Buranda housing - no services
            // qg_user_location_module.event.emit("location set",{"lat":"-27.496579", "lon": "153.040391"});
 
            // Cairns 5B Sheridan
            // qg_user_location_module.event.emit("location set",{"lat":"-16.926496", "lon": "145.775533"});

        }

        var user_location = {};

        var map_data_api = "https://www.qld.gov.au/_qgdesigns/integrations/services/rest/google-maps-api";

        var event = new EventEmitter2();

        event.on("Area manually selected", locateWithArea);

        return {
            init: init,
            event: event
        }

    }());

    
    document.addEventListener("DOMContentLoaded", function() {
        
        qg_user_location_module.init();
         
    });

}());
