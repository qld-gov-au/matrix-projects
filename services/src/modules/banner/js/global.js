(function(){

    'use strict';

    var services_banner_module = (function() {
    
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        
        function updateBanner(image_url, caption) {

            services_banner.dom.$root.css("background-image", "url(" + image_url + ")")

            services_banner.dom.$caption_text.text(caption);

        }

        function processLocation(location) {

            var current_location_lga = location.lga;

            var filtered_banner = _.find(banners_list, function(obj) {return  obj.lgas.indexOf(current_location_lga) !== -1 });

            if (filtered_banner) {
                updateBanner(filtered_banner.url, filtered_banner.caption);
            }
            
        }

        function randomiseBanner() {

            var banner_count = banners_list.length;

            var random_image_index = getRandomInt(3);

            var random_banner_url = banners_list[random_image_index].url;

            var random_banner_caption = banners_list[random_image_index].caption;

            updateBanner(random_banner_url, random_banner_caption);

        }
            
        function init() {
            
            services_banner.dom = {};

            services_banner.dom.$root = $(".services-banner");
            
            if (services_banner.dom.$root.length) {

                banners_list = services_banner.dom.$root.data("banners-list");

                services_banner.dom.$caption_text = services_banner.dom.$root.find(".services-banner__caption-text");

            }
            
        }
        
        var services_banner = {};
        
        var banners_list;

        qg_user_location_module.event.on("user location module initialised", init);

        qg_user_location_module.event.on("location set", processLocation);

        qg_user_location_module.event.on("location unknown", randomiseBanner);

        return {
            init: init
        }
    
    }());
    
}());
