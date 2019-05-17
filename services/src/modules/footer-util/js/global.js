(function(){

    'use strict';

    /*
     * ======================
     * Nearest Service Centre
     * ======================
     * Deals with getting the closest service centre from Funnelback and displaying its details
     * Depends on receiving coordinates from the user location module
     * 
     */

    var qg_nearest_service_centre_module = (function() {
        
        // The funnelback results returns a displayUrl result but no domain
        // Need to get the funnelback domain from the source API endpoint and concatenate with display url
        function generateLinkToCentreDetail() {

            // Get display url parameter from nearest centre data
            var display_url = nearest_service_centre_data.displayUrl;

            // Get funnelback domain from source url by splitting the URL into a string and getting everything before the ? char
            var fb_domain = nearest_service_center_data_source_url.split('?')[0];

            return fb_domain + display_url;

        }

        function updateCentreName() {

            // Get centre name from data 
            var centre_name = nearest_service_centre_data.title;

            // Generate link to centre detail page
            var link = generateLinkToCentreDetail();

            // Update heading
            qg_nearest_service_centre.dom.$centre_name.text(centre_name);

            // Update link
            qg_nearest_service_centre.dom.$centre_name.prop("href", link);

        }

        function clearCentreName() {

            // Clear heading
            qg_nearest_service_centre.dom.$centre_name.text("");

            // Change href property to be #
            qg_nearest_service_centre.dom.$centre_name.prop("href", "#");

        }

        function updateServicesAvailable() {
            
            // If services key exists and is not empty
            if (nearest_service_centre_data.metaData.hasOwnProperty('s') && nearest_service_centre_data.metaData.s.length) {
                
                // Generate link to nearest service centre detail page
                var link = generateLinkToCentreDetail();

                // Update href property to be link to nearest service centre detail page
                qg_nearest_service_centre.dom.$services_available_link.prop("href", link);

            } else {

                // Hide services available link
                qg_nearest_service_centre.dom.$services_available_wrapper.hide();

                // Change href to #
                qg_nearest_service_centre.dom.$services_available_link.prop("href", "#");

            }

        }

        function clearServicesAvailable() {
            qg_nearest_service_centre.dom.$services_available_link.prop("href", "#");
        }

        function updateLocationDistanceFrom() {

            // Update distance from ;

            // If kmFromOrigin key exists and is not empty
            if (nearest_service_centre_data.hasOwnProperty('kmFromOrigin') && nearest_service_centre_data.kmFromOrigin.length) {
                
                var distance_from_origin = nearest_service_centre_data.kmFromOrigin + "km away";
                
                qg_nearest_service_centre.dom.$location_distance_from.text(distance_from_origin).show();

            } else {

                // Clear text and hide distance from origin text
                qg_nearest_service_centre.dom.$location_distance_from.hide().text("");

            }

        }

        function updatelocationAddress() {

            // Update address
            var address1 = nearest_service_centre_data.metaData.address1;
            var suburb = nearest_service_centre_data.metaData.suburb;
            var postcode = nearest_service_centre_data.metaData.postcode;

            var full_address = address1 + "<br />" + suburb + " " + postcode;

            qg_nearest_service_centre.dom.$location_address.html(full_address);

        }

        // Update location related details
        function updateLocation() {
            updateLocationDistanceFrom();
            updatelocationAddress();
        }

        // Clear location related details
        function clearLocation() {
            qg_nearest_service_centre.dom.$location_distance_from.text("");
            qg_nearest_service_centre.dom.$location_address.html("");
        }

        // Update details
        function updateDetails() {

            // Update centre name
            updateCentreName();

            // Update services available text
            updateServicesAvailable();

            // Update location text
            updateLocation();

            // Class to show nearest service centre details
            qg_nearest_service_centre.dom.$root.addClass("qg-site-footer-util__nearest-service-centre--has-result");

        }

        // Clear and hide details
        function reset() {

            clearCentreName();

            clearServicesAvailable();
            
            clearLocation()
            
            qg_nearest_service_centre.dom.$root.removeClass("qg-site-footer-util__nearest-service-centre--has-result");

        }

        // If request to FB collection is successful
        function successfulRequest(data) {

            // If there are results in the features key and there is a result
            if (data.hasOwnProperty('features') && data.features.length) {

                // Get result from 1st item in array
                nearest_service_centre_data = data.features[0].properties;

                // Populate and show details
                updateDetails();

            } else {

                // Clear and hide details
                reset();
                
            }

        } 
        
        // If request to FB collection failed
        function failedRequest(data) {
            
            // Clear and hide details
            reset();

        }

        // Update nearest service centre details
        function getNearestServiceCentre(location) {

            // Create request url by adding coordinates as parameters
            var request_url = nearest_service_center_data_source_url + "&origin=" + location.lat + "%3B" + location.lon;
        
            // When the nearest service centre data is retrieved from source by passing in the user's coords
            $.getJSON( request_url, successfulRequest, failedRequest);

        }

        function subscribeToEvents() {
            
            // On location updated event, update details
            qg_user_location_module.event.on("location updated", getNearestServiceCentre);

            // If user's location is unknown clear details
            qg_user_location_module.event.on("location unknown", reset);

        }

        function cacheElements() {

            // Cache centre name element
            qg_nearest_service_centre.dom.$centre_name = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-name");

            // Cache services available elements
            qg_nearest_service_centre.dom.$services_available_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-services-available");
            qg_nearest_service_centre.dom.$services_available_link = qg_nearest_service_centre.dom.$services_available_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-services-available-link");

            // Cache location wrapper elements
            qg_nearest_service_centre.dom.$location_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-location");
            qg_nearest_service_centre.dom.$location_distance_from = qg_nearest_service_centre.dom.$location_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-distance-from");
            qg_nearest_service_centre.dom.$location_address = qg_nearest_service_centre.dom.$location_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-location-address");

        }

        function init() {
            
            qg_nearest_service_centre.dom = {};

            // Get root element
            qg_nearest_service_centre.dom.$root = $(".qg-site-footer-util__nearest-service-centre");
            
            // If widget exists
            if (qg_nearest_service_centre.dom.$root.length) {

                subscribeToEvents();

                cacheElements();

                // Get API source data endpoint URL from data attribute on root node
                nearest_service_center_data_source_url = qg_nearest_service_centre.dom.$root.data("nearest-service-centre-source");
                
            }

        }
        
        var qg_nearest_service_centre = {};

        // To store respoonse results from FB
        var nearest_service_centre_data;

        // To store the FB endpoint which is found on the root nodes data attribute
        var nearest_service_center_data_source_url;

        // Initialise this module only when the user location module is initiliased
        qg_user_location_module.event.on("user location module initialised", init);

    }());
    
}());
