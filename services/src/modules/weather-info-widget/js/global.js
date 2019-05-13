(function(){

    'use strict';

     /*
     * ===========================
     * Weather Info Widget Module
     * ===========================
     * This widget module deals with displaying the weather depending on the user's coordinates
     * 
     * ---------------------------
     * Functionality
     * ---------------------------
     * When coordinates are received, the widget makes a call to the open weather API and retrieves current weather data in JSON
     * The temperature and icon is then extracted to populate the widget
     * 
     */

    var qg_weather_info_widget_module = (function() {
        
        // Update temperature from weather data
        function updateTemperature() {

            var current_temperature = weather_data.main.temp;

            qg_weather_info_widget.dom.$temperature_wrapper.text(current_temperature);

        }

        function updateImage() {

            var prefix = 'wi wi-';

            // Get code from weather data JSON
            var weather_data_code = weather_data.weather[0].id;

            // Get mapped icon
            var icon = weather_icons_map[weather_data_code].icon;

            // If we are not in the ranges mentioned above, add a day prefix.
            if (!(weather_data_code > 699 && weather_data_code < 800) && !(weather_data_code > 899 && weather_data_code < 1000)) {
                icon = 'day-' + icon;
            }

            // Get description from weather data API
            var description = weather_data.weather[0].description;
            
            // Create icon element
            var $icon = $('<i/>', {
                "class": 'wi wi-' + icon,
                "title": description
            });

            // Empty wrapper and append icon
            qg_weather_info_widget.dom.$image_wrapper.empty().append($icon);

        }

        function getWeatherData(lat, lon) {

            var request_url = weather_api_source + "&lat=" + lat + "&lon=" + lon;
        
            return $.getJSON( request_url, function( data ) {
                
                weather_data = data;

            });

        }

        function updateWidget(location) {

            // When the weather data is retrieved from open weather API by passing in the user's coords
            // Tempereature is updated
            // Image is updated
            // Class to make the widget show is added to the root node
            $.when( getWeatherData(location.lat, location.lon) ).then(function( data, textStatus, jqXHR ) {
                
                updateTemperature();

                updateImage();

                qg_weather_info_widget.dom.$root.addClass("qg-weather-info-widget--has-result");

            });

        }

        function init() {
            
            qg_weather_info_widget.dom = {};

            // Get root element
            qg_weather_info_widget.dom.$root = $(".qg-weather-info-widget");
            
            // If widget exists
            if (qg_weather_info_widget.dom.$root.length) {

                // Get wrapper which contains temeperature text
                qg_weather_info_widget.dom.$temperature_wrapper = qg_weather_info_widget.dom.$root.find(".qg-weather-info-widget__temperature");

                // Get wrapper which contains image
                qg_weather_info_widget.dom.$image_wrapper = qg_weather_info_widget.dom.$root.find(".qg-weather-info-widget__image");
                   
            }
            
        }
        
        var qg_weather_info_widget = {};

        var weather_api_source = "https://api.openweathermap.org/data/2.5/weather?APPID=cc58e12aadc49c12c7b2aa2322eb0981&units=metric";

        var weather_data;

        ///https://gist.github.com/tbranyen/62d974681dea8ee0caa1
        var weather_icons_map = {

            "200": {
                "label": "thunderstorm with light rain",
                "icon": "storm-showers"
            },
        
            "201": {
                "label": "thunderstorm with rain",
                "icon": "storm-showers"
            },
        
            "202": {
                "label": "thunderstorm with heavy rain",
                "icon": "storm-showers"
            },
        
            "210": {
                "label": "light thunderstorm",
                "icon": "storm-showers"
            },
        
            "211": {
                "label": "thunderstorm",
                "icon": "thunderstorm"
            },
        
            "212": {
                "label": "heavy thunderstorm",
                "icon": "thunderstorm"
            },
        
            "221": {
                "label": "ragged thunderstorm",
                "icon": "thunderstorm"
            },
        
            "230": {
                "label": "thunderstorm with light drizzle",
                "icon": "storm-showers"
            },
        
            "231": {
                "label": "thunderstorm with drizzle",
                "icon": "storm-showers"
            },
        
            "232": {
                "label": "thunderstorm with heavy drizzle",
                "icon": "storm-showers"
            },
        
            "300": {
                "label": "light intensity drizzle",
                "icon": "sprinkle"
            },
        
            "301": {
                "label": "drizzle",
                "icon": "sprinkle"
            },
        
            "302": {
                "label": "heavy intensity drizzle",
                "icon": "sprinkle"
            },
        
            "310": {
                "label": "light intensity drizzle rain",
                "icon": "sprinkle"
            },
        
            "311": {
                "label": "drizzle rain",
                "icon": "sprinkle"
            },
        
            "312": {
                "label": "heavy intensity drizzle rain",
                "icon": "sprinkle"
            },
        
            "313": {
                "label": "shower rain and drizzle",
                "icon": "sprinkle"
            },
        
            "314": {
                "label": "heavy shower rain and drizzle",
                "icon": "sprinkle"
            },
        
            "321": {
                "label": "shower drizzle",
                "icon": "sprinkle"
            },
        
            "500": {
                "label": "light rain",
                "icon": "rain"
            },
        
            "501": {
                "label": "moderate rain",
                "icon": "rain"
            },
        
            "502": {
                "label": "heavy intensity rain",
                "icon": "rain"
            },
        
            "503": {
                "label": "very heavy rain",
                "icon": "rain"
            },
        
            "504": {
                "label": "extreme rain",
                "icon": "rain"
            },
        
            "511": {
                "label": "freezing rain",
                "icon": "rain-mix"
            },
        
            "520": {
                "label": "light intensity shower rain",
                "icon": "showers"
            },
        
            "521": {
                "label": "shower rain",
                "icon": "showers"
            },
        
            "522": {
                "label": "heavy intensity shower rain",
                "icon": "showers"
            },
        
            "531": {
                "label": "ragged shower rain",
                "icon": "showers"
            },
        
            "600": {
                "label": "light snow",
                "icon": "snow"
            },
        
            "601": {
                "label": "snow",
                "icon": "snow"
            },
        
            "602": {
                "label": "heavy snow",
                "icon": "snow"
            },
        
            "611": {
                "label": "sleet",
                "icon": "sleet"
            },
        
            "612": {
                "label": "shower sleet",
                "icon": "sleet"
            },
        
            "615": {
                "label": "light rain and snow",
                "icon": "rain-mix"
            },
        
            "616": {
                "label": "rain and snow",
                "icon": "rain-mix"
            },
        
            "620": {
                "label": "light shower snow",
                "icon": "rain-mix"
            },
        
            "621": {
                "label": "shower snow",
                "icon": "rain-mix"
            },
        
            "622": {
                "label": "heavy shower snow",
                "icon": "rain-mix"
            },
        
            "701": {
                "label": "mist",
                "icon": "sprinkle"
            },
        
            "711": {
                "label": "smoke",
                "icon": "smoke"
            },
        
            "721": {
                "label": "haze",
                "icon": "day-haze"
            },
        
            "731": {
                "label": "sand, dust whirls",
                "icon": "cloudy-gusts"
            },
        
            "741": {
                "label": "fog",
                "icon": "fog"
            },
        
            "751": {
                "label": "sand",
                "icon": "cloudy-gusts"
            },
        
            "761": {
                "label": "dust",
                "icon": "dust"
            },
        
            "762": {
                "label": "volcanic ash",
                "icon": "smog"
            },
        
            "771": {
                "label": "squalls",
                "icon": "day-windy"
            },
        
            "781": {
                "label": "tornado",
                "icon": "tornado"
            },
        
            "800": {
                "label": "clear sky",
                "icon": "sunny"
            },
        
            "801": {
                "label": "few clouds",
                "icon": "cloudy"
            },
        
            "802": {
                "label": "scattered clouds",
                "icon": "cloudy"
            },
        
            "803": {
                "label": "broken clouds",
                "icon": "cloudy"
            },
        
            "804": {
                "label": "overcast clouds",
                "icon": "cloudy"
            },
        
            "900": {
                "label": "tornado",
                "icon": "tornado"
            },
        
            "901": {
                "label": "tropical storm",
                "icon": "hurricane"
            },
        
            "902": {
                "label": "hurricane",
                "icon": "hurricane"
            },
        
            "903": {
                "label": "cold",
                "icon": "snowflake-cold"
            },
        
            "904": {
                "label": "hot",
                "icon": "hot"
            },
        
            "905": {
                "label": "windy",
                "icon": "windy"
            },
        
            "906": {
                "label": "hail",
                "icon": "hail"
            },
        
            "951": {
                "label": "calm",
                "icon": "sunny"
            },
        
            "952": {
                "label": "light breeze",
                "icon": "cloudy-gusts"
            },
        
            "953": {
                "label": "gentle breeze",
                "icon": "cloudy-gusts"
            },
        
            "954": {
                "label": "moderate breeze",
                "icon": "cloudy-gusts"
            },
        
            "955": {
                "label": "fresh breeze",
                "icon": "cloudy-gusts"
            },
        
            "956": {
                "label": "strong breeze",
                "icon": "cloudy-gusts"
            },
        
            "957": {
                "label": "high wind, near gale",
                "icon": "cloudy-gusts"
            },
        
            "958": {
                "label": "gale",
                "icon": "cloudy-gusts"
            },
        
            "959": {
                "label": "severe gale",
                "icon": "cloudy-gusts"
            },
        
            "960": {
                "label": "storm",
                "icon": "thunderstorm"
            },
        
            "961": {
                "label": "violent storm",
                "icon": "thunderstorm"
            },
        
            "962": {
                "label": "hurricane",
                "icon": "cloudy-gusts"
            }

        }

        // On location set event, update the widge
        qg_user_location_module.event.on("location set", updateWidget);

        return {
            init: init
        }
    
    }());
    
    document.addEventListener("DOMContentLoaded", function() {
        qg_weather_info_widget_module.init();
    });

}());

