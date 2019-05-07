(function(){

    'use strict';

    var services_banner_module = (function() {
    
        function init() {
            
            $services_banner = $(".services-banner");
            
            if ($services_banner.length) {

                

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
