(function(){

    'use strict';

    /*
     * ====================
     * User location Module
     * ====================
     * Detects the user's location either by:
     * - getting user's coordinate with HTML5 geolocation and query the Google Maps API; or
     * - query the Google Maps API with suburb and LGA (Local Government Area)
     * 
     * Once the user's location is known, an object is saved to session sorage
     * User's location is an object with 4 properties
     * - lat
     * - lon
     * - suburb
     * - lga
     * 
     * EventEmitter2 (https://github.com/EventEmitter2/EventEmitter2) is used to broadcast events such as
     * - succesfully located the user
     * - failed to locate the user
     * 
     * Other modules such as the following are subscribed to these events and will react:
     * - banner 
     * - nearest service center
     * - location info widget
     * - weather info widget 
     * 
     */

    window.qg_user_location_module = (function() {
        
        // Emit event fail to detect user's location
        function detectLocationFailed() {
            event.emit("location unknown");
        }

        // Check if user's location is already stored in session storage
        function checkSessionStorage() {

            // Check if Google maps JSON result is stored in session storage
            var user_location_session_storage = sessionStorage.getItem('user_location');

            // If exists
            if (user_location_session_storage !== null) {

                // Parse the string into a JSON object
                var user_location_session_storage_json = JSON.parse(user_location_session_storage);

                // Set details from stored Google maps result
                user_location.lat = user_location_session_storage_json.lat;
                user_location.lon = user_location_session_storage_json.lon;
                user_location.suburb = user_location_session_storage_json.suburb;
                user_location.lga = user_location_session_storage_json.lga;

                return true;

            } else {

                return false;

            }
            
        }

        function updateLocation() {

            // Store location object in session storage
            sessionStorage.setItem("user_location", JSON.stringify(user_location));

            event.emit("location updated", user_location);

        }

        function queryMapAPISuccessful(data) {

            // If successful request of location from Google
            if (data.hasOwnProperty("results")) {

                // Get the first result item in the returned JSON
                var results = data.results[0];

                // Set latitutde
                user_location.lat = results.geometry.location.lat;

                // Set longtitude - Note that google's data is spelt lng
                user_location.lon = results.geometry.location.lng;

                // Get address component object
                var address_components = results.address_components;

                // Get locality object 
                var locality_obj = _.find(address_components, function(obj) { return obj.types.indexOf("locality") !== -1; });

                // If locality object exists
                if (locality_obj) {

                    // Set suburb
                    user_location.suburb = locality_obj.long_name;

                }
                
                // Get Administrative Area Level 2 Object
                var admin_area_level_two_obj = _.find(address_components, function(obj) { return obj.types.indexOf("administrative_area_level_2") !== -1; });

                // If administrative area level 2 object exists
                if (admin_area_level_two_obj) {

                    // Set LGA
                    user_location.lga = admin_area_level_two_obj.long_name;

                }

                event.emit("location detected", user_location)

            }

        }

        // Query Google Maps API endpoint to get current user location
        function queryMapAPI(parameters) {

            // Create full endpoint
            var endpoint_to_call = map_data_api + parameters;

            // Make the call
            return $.getJSON(endpoint_to_call, queryMapAPISuccessful);
                
        }

        // Locate user with provided suburb and LGA
        function geocode() {

            // Create address parameter to pass to endpoint
            var parameters = "&address=" + user_location.suburb  + "," + user_location.lga + ",qld";
            
            // Get user's current location
            return queryMapAPI(parameters);
            
        }

        // Locate suburb and LGA with coordinates
        function reverseGeocode() {

            // Create address parameter to pass to endpoint
            var parameters = "&address=" + user_location.lat + "," + user_location.lon;

            // Get user's current location
            return queryMapAPI(parameters);
            
        }

        // // Check if suburb and LGA arguments are not the same as current location
        function checkArea(suburb,lga) {
            
            if (user_location.suburb !== suburb && user_location.lga !== lga) {

                // Set current suburb
                user_location.suburb = suburb

                // Set current lga
                user_location.lga = lga;

                // Only geocode if sububrb and lga is different
                // Theres going to be some false positives such as Gold Coast City vs City of Gold Coast
                $.when( geocode() ).done(function() {
                    
                    // Update user's location
                    updateLocation();
                    
                });
            
            }

        }

        // Use HTML5 geolocation to get user's coordinates
        function geolocate() {

            // Create a deferred promise
            var dfd = $.Deferred();

            // Check if browser can use HTML5 geolocation
            if ("geolocation" in navigator) {

                // Get current user's coordinates
                navigator.geolocation.getCurrentPosition(function(position) {
            
                    // Set coordinates
                    user_location.lat = position.coords.latitude;
                    user_location.lon = position.coords.longitude;
        
                    // When reverse geocoded finishes
                    $.when( reverseGeocode() ).done(function() {
                    
                        // Resolve the promise
                        dfd.resolve();
    
                    });
        
                },  function (error) {
                    
                    // If reverse geocoding failed
                    dfd.fail();
                    detectLocationFailed();

                });

            } else {

                // Geolocation not supported in browser
                // Broadcast error occured while locating user
                detectLocationFailed();

            }

            return dfd.promise();

        }

        // Initialise module
        function init() {

            // Emit init event so that other modules dependent on user's location can be initialised first before 
            // this module starts detecting/broadcasting the user's current location
            qg_user_location_module.event.emit("user location module initialised");

            // Check session storage to see if current location is stored in user's details
            if (checkSessionStorage()) {

                // Update user's location
                updateLocation();

            } else {

                // Get user's coordinates with HTML5 geolocation so that we can reverse geocode
                $.when( geolocate() ).done(function() {
                    
                    // When located, Update user's location
                    updateLocation();

                });

            }

        }

        var user_location = {};

        // Call Matrix REST Resource which makes a GET request to Google Maps API
        // This REST Resource as a middle layer because we don't want the API key to be expoed on the front end
        var map_data_api = "https://www.qld.gov.au/_qgdesigns/integrations/services/rest/google-maps-api?SQ_ASSET_CONTENTS_RAW";

        // Create event emitter object
        // This is an important object which deals with location related events 
        // Allows modules to react to these events
        var event = new EventEmitter2();

        // On suburb / lga manually selected from the location info widget
        event.on("area manually selected", checkArea);

        // Public API
        return {
            init: init,
            event: event,
            geolocate: geolocate
        }

    }());

    // On DOM Ready
    document.addEventListener("DOMContentLoaded", function() {
        
        // Initialise module
        qg_user_location_module.init();
         
    });

}());
