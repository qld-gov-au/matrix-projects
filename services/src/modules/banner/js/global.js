(function(){

    'use strict';

    var services_banner_module = (function() {
    
        function processSelectedLocation(suburb, lga) {

            // Check session storage for existing JSON
            // If exist, use JSON stored
            //      find related image
            //        find related image success
            //          set image
            //        else
            //          set default
            // else
            //  ajax endpoint to get JSON
            //      ajax success
            //        store JSON in session storage
            //        find related image
            //        find related image success
            //          set location image
            //          set location caption
            //        else
            //          set default image
            //          set default caption
            //      else ajax fail
            //          set default image
            //          set default caption
            
        }

        function init() {
            
            $services_banner = $(".services-banner");
            
            if ($services_banner.length) {

                qg.event.on("location-selected", processSelectedLocation);

            }
            
        }
        
        var $services_banner;
        
        return {
            init: init
        }
    
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {
        
        services_banner_module.init();
        
    });

}());
