(function(){

    'use strict';

    var qg_main_nav_module = (function() {
        
        function setupMobileNav() {

            var $site_header = $(".qg-site-header");
            var $mobile_nav_toggle = $site_header.find(".qg-util-bar__mobile-nav-toggle");
            
            $mobile_nav_toggle.click(function(event) {
                
                var $this = $(event.target);

                $site_header.toggleClass("qg-site-header--mobile-menu-open");

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
