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
            //event.emit("location set", location);
            console.log("Broadcasting location");
        }
        
        function checkSessionStorage() {

            // Check latitude
            user_location.lat = sessionStorage.getItem('user.location.lat');
            
            if (isNaN(user_location.lat) || user_location.lat === null) {
                user_location.lat = "";
                sessionStorage.removeItem('user.location.lat');
            }
            
            // Check longtitude
            user_location.lon = sessionStorage.getItem('user.location.lon');

            if (isNaN(user_location.lon) || user_location.lon === null) {
                user_location.lon = "";
                sessionStorage.removeItem('user.location.lon');
            }
            
            // Check suburb
            user_location.suburb = sessionStorage.getItem('user.location.suburb');

            if (!isNaN(user_location.suburb) || user_location.suburb === null) {
                location.suburb = "";
                sessionStorage.removeItem('user.location.suburb');
            }

            // Check LGA
            location.lga = sessionStorage.getItem('user.location.lga');

            if (!isNaN(user_location.lga) || user_location.lga === null) {
                location.lga = "";
                sessionStorage.removeItem('user.location.lga');
            }
            
            if (user_location.lat && user_location.lon && user_location.suburb & user_location.lga) {

                return true;

            } else {

                return false;

            }

        }

        // Update Suburb and LGA by using Coordinates
        function updateRegion() {

            // Look at location_reference

            // Get and set closest suburb

            // Get and set related LGA

            //broadcastLocation();

        }

        // Update coordinates by using Suburb
        function updateCoordinates(suburb) {

            // Look at location_reference
            
            // Get and set coordinates

            //broadcastLocation();

        }
        
        function init() {

            if (checkSessionStorage()) {

                broadcastLocation();

            } else {

                // Check coordinates
                if (!user_location.lat || !user_location.lon) {

                    // Use HTML5 geolocation to get user's coordinates
                    if ("geolocation" in navigator) {

                        navigator.geolocation.getCurrentPosition(function(position) {
                            
                            // Set coordinates
                            user_location.lat = position.coords.latitude;
                            user_location.lon = position.coords.longitude;

                            // Set session storage
                            sessionStorage.setItem('user.location.lat', user_location.lat);
                            sessionStorage.setItem('user.location.lon', user_location.lon);

                            updateRegion();
                                                             
                        });

                    } else {

                        console.log("Geolocation disabled");

                    }

                } else if (!user_location.suburb) {
                 
                    updateRegion();

                }

            }

        }

        var user_location = {};

        var location_reference_url = "";
        var location_reference_json;

        var event = new EventEmitter2();

        event.on("suburb manually selected", updateCoordinates);

        return {
            init: init,
            event: event
        }

    }());

    
    document.addEventListener("DOMContentLoaded", function() {
        qg_user_location_module.init();
    });

}());
