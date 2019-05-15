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
        function locateWithArea(area) {

            // Create endpoint to query endpoint with coordinates
            var parameters = "&address=" + encodeURIComponent(area) + ",qld";
            
            // Get user location
            geocode(parameters);
            
        }

        function geocode(parameters) {

            var endpoint_to_call = map_data_api + parameters;

            $.getJSON( endpoint_to_call, function( data ) {

                // If successful request of location from Google
                if (data.hasOwnProperty("results")) {

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

                }

            });

        }

        function geolocationSuccess(position) {
            // Set coordinates
            user_location.lat = position.coords.latitude;
            user_location.lon = position.coords.longitude;

            locateWithCoordinates();
        }

        function geolocationFail(error) {

            // Broadcast the geolocation encountered an error
            event.emit("geolocation error");

        }

        function locateUser() {

            // Use HTML5 geolocation to get user's coordinates
            if ("geolocation" in navigator) {

                navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFail);

            } else {

                // Broadcast the geolocation encountered an error
                event.emit("geolocation error");

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

        }

        var user_location = {};

        var map_data_api = "https://www.qld.gov.au/_qgdesigns/integrations/services/rest/google-maps-api?SQ_ASSET_CONTENTS_RAW";

        var event = new EventEmitter2();

        event.on("area manually selected", locateWithArea);

        return {
            init: init,
            event: event,
            locateUser,locateUser
        }

    }());

    
    document.addEventListener("DOMContentLoaded", function() {
        
        qg_user_location_module.init();
         
    });

}());
