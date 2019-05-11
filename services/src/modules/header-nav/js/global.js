(function(){

    'use strict';

    var qg_main_nav_module = (function() {
        
        function setupMobileNav() {

            var $mobile_nav_toggle = $(".qg-util-bar__mobile-nav-toggle");
            
            $mobile_nav_toggle.click(function(event) {
                
                var $this = $(event.target);

                /* Add class to body */
                $("body").toggleClass("mobile-nav-active");

            });

        }

        function init() {
            
            qg_main_nav.dom = {};

            qg_main_nav.dom.$root = $(".qg-main-nav");
            
            if (qg_main_nav.dom.$root.length) {

                setupMobileNav();
                
            }
            
        }
        
        var qg_main_nav = {};
        
        return {
            init: init
        }
    
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {
        qg_main_nav_module.init();
    });

}());
