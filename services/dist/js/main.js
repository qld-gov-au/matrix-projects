(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
module.exports = __webpack_require__(16);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_global_scss__WEBPACK_IMPORTED_MODULE_0__);
// CSS


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function () {
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

  window.qg_user_location_module = function () {
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
      } // Check longtitude


      user_location.lon = sessionStorage.getItem('user.location.lon');

      if (isNaN(user_location.lon) || user_location.lon === null) {
        user_location.lon = "";
        sessionStorage.removeItem('user.location.lon');
      } // Check suburb


      user_location.suburb = sessionStorage.getItem('user.location.suburb');

      if (!isNaN(user_location.suburb) || user_location.suburb === null) {
        location.suburb = "";
        sessionStorage.removeItem('user.location.suburb');
      } // Check LGA


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
    } // Update Suburb and LGA by using Coordinates


    function updateRegion() {} // Look at location_reference
    // Get and set closest suburb
    // Get and set related LGA
    //broadcastLocation();
    // Update coordinates by using Suburb


    function updateCoordinates(suburb) {// Look at location_reference
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
            navigator.geolocation.getCurrentPosition(function (position) {
              // Set coordinates
              user_location.lat = position.coords.latitude;
              user_location.lon = position.coords.longitude; // Set session storage

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
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    qg_user_location_module.init();
  });
})();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  var services_banner_module = function () {
    function processSelectedLocation(suburb, lga) {// Check session storage for existing JSON
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

      if ($services_banner.length) {}
    }

    var $services_banner;
    return {
      init: init
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    services_banner_module.init();
  });
})();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function () {
  'use strict';
  /*
  * ===========================
  * Nearest Service Centre
  * ===========================
  * This widget module deals with getting and displaying the nearest service centre depending on the user's coordinates
  * 
  * ---------------------------
  * Functionality
  * ---------------------------
  * When coordinates are received, a call is made to a funnelback endpoint which returns the closest service centre.
  * The nearest service centre details are then updated
  * 
  */

  var qg_nearest_service_centre_module = function () {
    function updateCentreName() {}

    function updateServicesAvailable() {} // function updateHours() {
    // }


    function updateLocation() {}

    function updateDetails(location) {
      var request_url = nearest_service_center_data_source_url + "&origin=" + location.lat + "%3B" + location.lon; // When the nearest service centre data is retrieved from source by passing in the user's coords

      $.getJSON(request_url, function (data) {
        nearest_service_centre_data = data; // If there are results in the features key

        if (nearest_service_centre_data.features.length) {
          // Update centre name
          updateCentreName(); // Update services available text

          updateServicesAvailable(); // Update hours text
          // updateHours();
          // Update location text

          updateLocation(); // Class to make the widget show is added to the root node

          qg_nearest_service_centre.dom.$root.addClass("qg-site-footer-util__nearest-service-centre--has-result");
        }
      });
    }

    function init() {
      qg_nearest_service_centre.dom = {}; // Get root element

      qg_nearest_service_centre.dom.$root = $(".qg-site-footer-util__nearest-service-centre"); // If widget exists

      if (qg_nearest_service_centre.dom.$root.length) {
        nearest_service_center_data_source_url = qg_nearest_service_centre.dom.$root.data("nearest-service-centre-source");
      }
    }

    var qg_nearest_service_centre = {};
    var nearest_service_centre_data;
    var nearest_service_center_data_source_url;
    qg_user_location_module.event.on("location set", updateDetails);
    return {
      init: init
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    qg_nearest_service_centre_module.init();
  });
})();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

(function () {
  'use strict';
  /*
  * ======================
  * Main Navigation Module
  * ======================
  * The main navigation has parent menu items, each with its own sub menu
  * 
  * ---------------------------
  * Functionality - Mobile mode
  * ---------------------------
  * When mobile mode is made active by clicking on the hamburger menu, a class is added to the body tag.
  * This allows the main body overflow-y to be hidden which disallows users to scroll whatever is behind the
  * expanded menu.
  * 
  * --------------------------------------
  * Functionality - Focused dropdown links
  * --------------------------------------
  * For better keyboard navigation, we want the dropdown to stay open when user focuses on a dropdown link
  * 
  */

  var qg_main_nav_module = function () {
    function setupMobileMode() {
      // Get hamburger menu
      var $mobile_nav_toggle = $(".qg-util-bar__mobile-nav-toggle");
      $mobile_nav_toggle.click(function (event) {
        var $this = $(event.target); // Toggle class on body

        $("body").toggleClass("mobile-nav-active");
      });
    }

    function setupDropdownLinks() {
      var focus_class = "qg-main-nav__dropdown-link--focused"; // Get links in dropdown

      qg_main_nav.dom.$root.$submenu_links = qg_main_nav.dom.$root.find(".qg-main-nav__dropdown .qg-main-nav__menu-link");
      qg_main_nav.dom.$root.$submenu_links.on("focus", function (event) {
        var $this = $(event.target); // Find parent menu item and add class

        $this.closest(".qg-main-nav__dropdown").parent().addClass(focus_class);
      });
      qg_main_nav.dom.$root.$submenu_links.on("blur", function (event) {
        var $this = $(event.target); // // Find parent menu item and remove class

        $this.closest(".qg-main-nav__dropdown").parent().removeClass(focus_class);
      });
    }

    function init() {
      qg_main_nav.dom = {}; // Get root element

      qg_main_nav.dom.$root = $(".qg-main-nav"); // If main navigation exists

      if (qg_main_nav.dom.$root.length) {
        setupMobileMode();
        setupDropdownLinks();
      }
    }

    var qg_main_nav = {};
    return {
      init: init
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    qg_main_nav_module.init();
  });
})();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 11 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function () {
  'use strict';
  /*
  * ===========================
  * Location Info Widget Module
  * ===========================
  * This widget module deals with displaying the user's location and providing an interface for the user to select a location
  * 
  * ---------------------------
  * Functionality
  * ---------------------------
  * 
  * 
  */

  var qg_location_info_widget_module = function () {
    function linkClicked(event) {
      // Prevent default action
      event.preventDefault(); // Prevent bubbling

      event.stopPropagation();
    }

    function init() {
      qg_location_info_widget.dom = {}; // Get root element

      qg_location_info_widget.dom.$root = $(".qg-location-info-widget"); // If widget exists

      if (qg_location_info_widget.dom.$root.length) {
        qg_location_info_widget.dom.$link = qg_location_info_widget.dom.$root.find(".qg-location-info-widget__link");
        qg_location_info_widget.dom.$link.click(linkClicked);
      }
    }

    var qg_location_info_widget = {};
    return {
      init: init
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    qg_location_info_widget_module.init();
  });
})();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 14 */
/***/ (function(module, exports) {

(function () {
  'use strict';
  /*
   * ====================
   * Search Widget Module
   * ====================
   * The search widget is a form which has an input search field and a submit button.
   * 
   * ---------------------------------------------------
   * Functionality - Control appearance with class names
   * ---------------------------------------------------
   * When hover events happen on the form, or focus events happen on the input search field and submit button:
   * Classes are removed and added to the parent of the widget.
   * For example, the search widget is embedded in the header util bar.
   * On desktop, the search widget appears as a magnifying glass icon only.
   * If the classes are applied to the parent:
   * - other widgets in the header util bar are hidden 
   * - the search field input is visible
   * 
   */

  var qg_search_widget_module = function () {
    function form_hovered(event) {
      // Add class to parent so that not only field can show but hide other widgets in util bar as well
      qg_search_widget_module.dom.$parent.addClass("search-form-widget--hover");
    }

    function form_unhovered(event) {
      // Remove class to hide search field and show other widgets
      qg_search_widget_module.dom.$parent.removeClass("search-form-widget--hover");
    }

    function form_focused(event) {
      // Add class to parent so that not only field can show but hide other widgets in util bar as well
      qg_search_widget_module.dom.$parent.addClass("search-form-widget--focused");
    }

    function form_blurred(event) {
      // Remove class to hide search field and show other widgets
      qg_search_widget_module.dom.$parent.removeClass("search-form-widget--focused");
    }

    function init() {
      qg_search_widget_module.dom = {}; // Get root node

      qg_search_widget_module.dom.$root = $(".qg-search-widget"); // If search widget exists

      if (qg_search_widget_module.dom.$root.length) {
        // Get input search field element
        qg_search_widget_module.dom.$field = qg_search_widget_module.dom.$root.find(".qg-search-widget__field"); // Get submit button element

        qg_search_widget_module.dom.$button = qg_search_widget_module.dom.$root.find(".qg-search-widget__btn"); // Get parent element

        qg_search_widget_module.dom.$parent = qg_search_widget_module.dom.$root.parent(); // Bind field focused event to field and button

        qg_search_widget_module.dom.$field.add(qg_search_widget_module.dom.$button).on("focus", form_focused);
        qg_search_widget_module.dom.$field.add(qg_search_widget_module.dom.$button).on("blur", form_blurred); // Bind hover event over form - includes mouse enter and leave

        qg_search_widget_module.dom.$root.hover(form_hovered, form_unhovered);
      }
    }

    var qg_search_widget = {};
    var hover_class = "search-form-widget--hover";
    var active_class = "search-form-widget--focused";
    return {
      init: init
    };
  }(); // When dom is ready


  document.addEventListener("DOMContentLoaded", function () {
    // Initialise the module
    qg_search_widget_module.init();
  });
})();

/***/ }),
/* 15 */
/***/ (function(module, exports) {

(function () {
  'use strict';
  /*
   * =====================
   * Service Finder Module
   * =====================
   * The search finder module is a form which has an input search field and a submit button.
   * 
   * -----------------------------------------
   * Functionality - FB Autocomplete Conceirge
   * -----------------------------------------
   * The Funnelback autocomplete coneirge is applied on the input search field to allow
   * - autocompletion
   * - organic suggestions (Up to 5)
   * - featured suggestion (1)
   * The script also clones the featured result into the organic result set for mobile view
   * 
   * -------------------------------------------
   * Functionality - No results menu links focus
   * -------------------------------------------
   * We would prefer users are able to keyboard navigate through the no-menu links
   * Thus, a class needs to be added to the parent to keep the no-menu open when tabbing through
   * 
   */

  var services_service_finder_module = function () {
    // Set up Funnelback Conceirge on input field
    function setupFBConceirge() {
      // Get autocomplete source url
      var autocomplete_source_url = services_service_finder.dom.$root.data("autocomplete-source"); // Initiate conceirge plugin

      services_service_finder.dom.$field.autocompletion({
        program: autocomplete_source_url,
        scrollable: true,
        datasets: {
          organic: {
            name: 'General suggestions',
            collection: 'qgov-web',
            profile: 'services',
            show: 5
          },
          featured: {
            name: 'Featured result',
            collection: 'qld-gov',
            profile: 'featured_auto-completion',
            template: {
              'suggestion': '<div><h6 class="services-service-finder__featured-heading">{{label.title}}</h6>{{#if label.icon}}<i class="fas {{label.icon}} services-service-finder__featured-icon"></i>{{/if}}<p class="services-service-finder__featured-description">{{label.description}}</p><button class="services-service-finder__featured-btn" href="{{label.link}}">{{label.CTA}}</button></div>'
            },
            show: 1
          }
        },
        length: 3,
        typeahead: {
          hint: true,
          events: {
            open: function open(event) {
              renderInputField();
            },
            close: function close(event) {
              renderInputField();
            },
            render: function render(event, suggestions, syncType, name) {
              renderInputField();
              cloneFeaturedResult();
            }
          }
        }
      }); // Cache dropdown result menu elements

      services_service_finder.dom.$tt_menu = services_service_finder.dom.$root.find(".tt-menu");
      services_service_finder.dom.$organic_results_wrapper = services_service_finder.dom.$tt_menu.find(".tt-dataset-organic");
      services_service_finder.dom.$featured_result_wrapper = services_service_finder.dom.$tt_menu.find(".tt-dataset-featured");
      services_service_finder.dom.$field.on('input', function () {
        renderInputField();
      }); // Unfocus on field when suggestion / featured result is clicked on

      $("body").on("click", ".tt-suggestion", function () {
        services_service_finder.dom.$field.blur();
      });
    } // Clone the featured result and insert into organic set so that featured result can appear between suggestions


    function cloneFeaturedResult() {
      // Remove featured result from organic result wrapper if exists
      services_service_finder.dom.$organic_results_wrapper.find(".tt-dataset-featured").remove();
      var $featured_result = services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion");

      if ($featured_result.length) {
        // Clone featured result set. Arguments are true in order to clone click events binded to search result
        var $featured_result_wrapper_clone = services_service_finder.dom.$featured_result_wrapper.clone(true, true); // Get number of organic results

        var $organic_results = services_service_finder.dom.$organic_results_wrapper.find(".tt-suggestion");

        if ($organic_results.length > 2) {
          $featured_result_wrapper_clone.insertAfter($organic_results.eq(1));
        } else {
          $featured_result_wrapper_clone.appendTo(services_service_finder.dom.$organic_results_wrapper);
        }
      }
    }

    function renderInputField() {
      // If results list menu has class and there are suggestions
      // Add classes to input field to adjust appearance
      // This will add a class if there are results and menu is open
      if (services_service_finder.dom.$tt_menu.hasClass("tt-open") && services_service_finder.dom.$tt_menu.find(".tt-suggestion").length) {
        services_service_finder.dom.$root.addClass("results-shown");
      } else {
        services_service_finder.dom.$root.removeClass("results-shown");
      } // This will add a class to specify there are featured results


      if (services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion").length) {
        services_service_finder.dom.$root.addClass("has-featured-result");
      } else {
        services_service_finder.dom.$root.removeClass("has-featured-result");
      }
    } // This function adds/removes a "focus" class whenever the field is focused/blurred
    // This is to control CSS border radius of input and button
    // If user is focusing on field, scroll to field so that user can always see the rest of the no results menu


    function setupFieldFocusEvent() {
      services_service_finder.dom.$field.on("focus", function (event) {
        services_service_finder.dom.$root.addClass("services-service-finder--focused");
      });
      services_service_finder.dom.$field.on("blur", function (event) {
        services_service_finder.dom.$root.removeClass("services-service-finder--focused");
      });
    } // Whenever a link in the no results menu is selected, ensure that the no results menu is visible
    // This allows better keyboard navigation


    function setupNoResultsMenuLinks() {
      var no_result_menu_link_focused_state_class = "services-service-finder--no-results-menu-link-focused";
      services_service_finder.dom.$no_result_menu_links = services_service_finder.dom.$root.find(".services-service-finder__no-results-menu-list-item-link");
      services_service_finder.dom.$no_result_menu_links.on("focus", function (event) {
        services_service_finder.dom.$root.addClass(no_result_menu_link_focused_state_class);
      });
      services_service_finder.dom.$no_result_menu_links.on("blur", function (event) {
        services_service_finder.dom.$root.removeClass(no_result_menu_link_focused_state_class);
      });
    }

    function init() {
      services_service_finder.dom = {}; // Get root node

      services_service_finder.dom.$root = $(".services-service-finder"); // If sevice finder exists

      if (services_service_finder.dom.$root.length) {
        // Get field input
        services_service_finder.dom.$field = services_service_finder.dom.$root.find(".services-service-finder__field"); // Set up root node to have class whenver field is focused on

        setupFieldFocusEvent(); // Initialise Funnelback Concerige

        setupFBConceirge(); // Set up no results menu links

        setupNoResultsMenuLinks();
      }
    }

    var services_service_finder = {};
    return {
      init: init
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    services_service_finder_module.init();
  });
})();

/***/ }),
/* 16 */
/***/ (function(module, exports) {

(function () {
  'use strict';
  /*
  * ===========================
  * Weather Info Widget Module
  * ===========================
  * This widget module deals with getting and displaying the current weather depending on the user's coordinates
  * 
  * ---------------------------
  * Functionality
  * ---------------------------
  * When coordinates are received, the widget makes a call to the open weather API and retrieves current weather data in JSON
  * The temperature and icon is then extracted to populate the widget
  * 
  */

  var qg_weather_info_widget_module = function () {
    // Update temperature from weather data
    function updateTemperature() {
      var current_temperature = weather_data.main.temp;
      qg_weather_info_widget.dom.$temperature_wrapper.text(current_temperature);
    }

    function updateIcon() {
      var prefix = 'wi wi-'; // Get code from weather data JSON

      var weather_data_code = weather_data.weather[0].id; // Get single char from icon string which tells us its day (d) or night (n)

      var weather_data_icon_char = weather_data.weather[0].icon.slice(-1); // Get mapped icon

      var mapped_icon = weather_icons_map[weather_data_code].icon; // If we are not in the ranges mentioned above, add a prefix.

      if (!(weather_data_code > 699 && weather_data_code < 800) && !(weather_data_code > 899 && weather_data_code < 1000)) {
        if (weather_data_icon_char === "d") {
          mapped_icon = 'day-' + mapped_icon;
        } else {
          mapped_icon = 'night-' + mapped_icon;
        }
      } // Get description from weather data API


      var description = weather_data.weather[0].description; // Create icon element

      var $icon = $('<i/>', {
        "class": 'wi wi-' + mapped_icon,
        "title": description
      }); // Empty wrapper and append icon

      qg_weather_info_widget.dom.$image_wrapper.empty().append($icon);
    }

    function updateWidget(location) {
      var request_url = weather_data_source + "&lat=" + location.lat + "&lon=" + location.lon; // When the weather data is retrieved from open weather API by passing in the user's coords

      $.getJSON(request_url, function (data) {
        weather_data = data; // Update temperature

        updateTemperature(); // Update image icon

        updateIcon(); // Class to make the widget show is added to the root node

        qg_weather_info_widget.dom.$root.addClass("qg-weather-info-widget--has-result");
      });
    }

    function init() {
      qg_weather_info_widget.dom = {}; // Get root element

      qg_weather_info_widget.dom.$root = $(".qg-weather-info-widget"); // If widget exists

      if (qg_weather_info_widget.dom.$root.length) {
        // Get wrapper which contains temeperature text
        qg_weather_info_widget.dom.$temperature_wrapper = qg_weather_info_widget.dom.$root.find(".qg-weather-info-widget__temperature"); // Get wrapper which contains image

        qg_weather_info_widget.dom.$image_wrapper = qg_weather_info_widget.dom.$root.find(".qg-weather-info-widget__image");
        weather_data_source = qg_weather_info_widget.dom.$root.data("weather-source");
      }
    }

    var qg_weather_info_widget = {};
    var weather_data_source;
    var weather_data; ///https://gist.github.com/tbranyen/62d974681dea8ee0caa1

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
      } // On "location set" event, update the widget

    };
    qg_user_location_module.event.on("location set", updateWidget);
    return {
      init: init
    };
  }();

  document.addEventListener("DOMContentLoaded", function () {
    qg_weather_info_widget_module.init(); // Remove when user-location modue is implemented!

    qg_user_location_module.event.emit("location set", {
      "lat": "-27.4773931",
      "lon": "153.0131612"
    });
  });
})();

/***/ })
],[[0,1]]]);