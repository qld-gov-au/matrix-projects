(function(){

    'use strict';

     /*
     * ===========================
     * Nearest Service Centre
     * ===========================
     * This module deals with getting and displaying the nearest service centre depending on the user's coordinates
     * 
     * ---------------------------
     * Functionality
     * ---------------------------
     * When coordinates are received, a call is made to a funnelback endpoint which returns the closest service centre.
     * The nearest service centre details are then updated
     * 
     */

    var qg_nearest_service_centre_module = (function() {
        
        function generateLinkToCentreDetail() {

            // Get display url parameters from data
            var display_url = nearest_service_centre_data.displayUrl;

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

        function updateServicesAvailable() {
            
            // If services key exists and is not empty
            if (nearest_service_centre_data.metaData.hasOwnProperty('s') && nearest_service_centre_data.metaData.s.length) {
                
                // Generate link to centre detail page
                var link = generateLinkToCentreDetail();

                qg_nearest_service_centre.dom.$services_available_link.prop("href", link);


            } else {

                qg_nearest_service_centre.dom.$services_available_wrapper.hide();

                qg_nearest_service_centre.dom.$services_available_link.prop("href", "#");

            }

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

        function updateLocation() {

            updateLocationDistanceFrom();
            
            updatelocationAddress();
            
        }

        function populateDetails() {

            // Update centre name
            updateCentreName();

            // Update services available text
            updateServicesAvailable();

            // Update location text
            updateLocation();

            // Class to make the widget show is added to the root node
            qg_nearest_service_centre.dom.$root.addClass("qg-site-footer-util__nearest-service-centre--has-result");

        }

        function clearDetails() {

            qg_nearest_service_centre.dom.$root.removeClass("qg-site-footer-util__nearest-service-centre--has-result");

        }

        function updateDetails(location) {

            var request_url = nearest_service_center_data_source_url + "&origin=" + location.lat + "%3B" + location.lon;
        
            // When the nearest service centre data is retrieved from source by passing in the user's coords
            $.getJSON( request_url, function( data ) {
                
                // If there are results in the features key and there is a result
                if (data.hasOwnProperty('features') && data.features.length) {

                    // Get result from 1st item in array
                    nearest_service_centre_data = data.features[0].properties;

                    // Populate and show details
                    populateDetails();

                } else {

                    // Clear and hide details
                    clearDetails();
                    
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
                qg_nearest_service_centre.dom.$services_available_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-services-available");
                qg_nearest_service_centre.dom.$services_available_link = qg_nearest_service_centre.dom.$services_available_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-services-available-link");

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
