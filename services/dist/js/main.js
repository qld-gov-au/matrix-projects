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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      event.emit("location set", user_location);
    }

    function checkSessionStorage() {
      // Check if Google maps JSON is stored in session storage
      var user_location_session_storage = sessionStorage.getItem('user_location');

      if (user_location_session_storage !== null) {
        var user_location_session_storage_json = JSON.parse(user_location_session_storage); // Get details from stored Google maps result

        user_location.lat = user_location_session_storage_json.lat;
        user_location.lon = user_location_session_storage_json.lon;
        user_location.suburb = user_location_session_storage_json.suburb;
        user_location.lga = user_location_session_storage_json.lga;
        return true;
      } else {
        return false;
      }
    } // Locate suburb and LGA with coordinates


    function locateWithCoordinates() {
      // Create endpoint to query endpoint with coordinates
      var parameters = "&address=" + user_location.lat + "," + user_location.lon; // Get user location

      geocode(parameters);
    } // Locate user with provided suburb and LGA


    function locateWithArea(area) {
      // Create endpoint to query endpoint with coordinates
      var parameters = "&address=" + encodeURIComponent(area) + ",qld"; // Get user location

      geocode(parameters);
    }

    function geocode(parameters) {
      var endpoint_to_call = map_data_api + parameters;
      $.getJSON(endpoint_to_call, function (data) {
        // If successful request of location from Google
        if (data.hasOwnProperty("results")) {
          // Get the first result item in the returned JSON
          var results = data.results[0]; // Get latitutde

          user_location.lat = results.geometry.location.lat; // Get longtitude - Note that google's data is spelt lng

          user_location.lon = results.geometry.location.lng;
          var address_components = results.address_components; // Get suburb 

          user_location.suburb = _.find(address_components, function (obj) {
            return obj.types.indexOf("locality") !== -1;
          }).long_name; // Get LGA

          user_location.lga = _.find(address_components, function (obj) {
            return obj.types.indexOf("administrative_area_level_2") !== -1;
          }).long_name; // Store location object in session storage

          sessionStorage.setItem("user_location", JSON.stringify(user_location));
          broadcastLocation();
        }
      });
    }

    function geolocationSuccess(position) {
      // Set coordinates
      user_location.lat = position.coords.latitude;
      user_location.lon = position.coords.longitude;
      locateWithCoordinates();
    }

    function geolocationFail(error) {
      // Broadcast the geolocation encountered an error
      event.emit("location unknown");
    }

    function locateUser() {
      // Use HTML5 geolocation to get user's coordinates
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFail);
      } else {
        // Broadcast the geolocation encountered an error
        event.emit("location unknown");
      }
    }

    function init() {
      // Emit this so other modules dependent on user location can get initialised first before emmitting events
      qg_user_location_module.event.emit("user location module initialised");

      if (checkSessionStorage()) {
        // Emit event user's current location
        broadcastLocation();
      } else {
        // Start locating the user
        locateUser();
      }
    }

    var user_location = {};
    var map_data_api = "https://www.qld.gov.au/_qgdesigns/integrations/services/rest/google-maps-api?SQ_ASSET_CONTENTS_RAW";
    var event = new EventEmitter2();
    event.on("area manually selected", locateWithArea);
    return _defineProperty({
      init: init,
      event: event,
      locateUser: locateUser
    }, "locateUser", locateUser);
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
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function updateBanner(image_url, caption) {
      services_banner.dom.$root.css("background-image", "url(" + image_url + ")").addClass("services-banner--banner-selected");
      services_banner.dom.$caption_text.text(caption);
    }

    function processLocation(location) {
      var current_location_lga = location.lga;

      var filtered_banner = _.find(banners_list, function (obj) {
        return obj.lgas.indexOf(current_location_lga) !== -1;
      });

      if (filtered_banner) {
        updateBanner(filtered_banner.url, filtered_banner.caption);
      } else {
        // No banner found
        // This means the LGA from google didnt not match any LGAs in any banner
        // Pick a random banner as a fallback
        randomiseBanner();
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
    };
  }();
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
  * This module deals with getting and displaying the nearest service centre depending on the user's coordinates
  * 
  * ---------------------------
  * Functionality
  * ---------------------------
  * When coordinates are received, a call is made to a funnelback endpoint which returns the closest service centre.
  * The nearest service centre details are then updated
  * 
  */

  var qg_nearest_service_centre_module = function () {
    function generateLinkToCentreDetail() {
      // Get display url parameters from data
      var display_url = nearest_service_centre_data.displayUrl;
      var fb_domain = nearest_service_center_data_source_url.split('?')[0];
      return fb_domain + display_url;
    }

    function updateCentreName() {
      // Get centre name from data 
      var centre_name = nearest_service_centre_data.title; // Generate link to centre detail page

      var link = generateLinkToCentreDetail(); // Update heading

      qg_nearest_service_centre.dom.$centre_name.text(centre_name); // Update link

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
      updateCentreName(); // Update services available text

      updateServicesAvailable(); // Update location text

      updateLocation(); // Class to make the widget show is added to the root node

      qg_nearest_service_centre.dom.$root.addClass("qg-site-footer-util__nearest-service-centre--has-result");
    }

    function clearDetails() {
      qg_nearest_service_centre.dom.$root.removeClass("qg-site-footer-util__nearest-service-centre--has-result");
    }

    function updateDetails(location) {
      var request_url = nearest_service_center_data_source_url + "&origin=" + location.lat + "%3B" + location.lon; // When the nearest service centre data is retrieved from source by passing in the user's coords

      $.getJSON(request_url, function (data) {
        // If there are results in the features key and there is a result
        if (data.hasOwnProperty('features') && data.features.length) {
          // Get result from 1st item in array
          nearest_service_centre_data = data.features[0].properties; // Populate and show details

          populateDetails();
        } else {
          // Clear and hide details
          clearDetails();
        }
      });
    }

    function init() {
      qg_nearest_service_centre.dom = {}; // Get root element

      qg_nearest_service_centre.dom.$root = $(".qg-site-footer-util__nearest-service-centre"); // If widget exists

      if (qg_nearest_service_centre.dom.$root.length) {
        // Cache centre name element
        qg_nearest_service_centre.dom.$centre_name = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-name"); // Cache services available elements

        qg_nearest_service_centre.dom.$services_available_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-services-available");
        qg_nearest_service_centre.dom.$services_available_link = qg_nearest_service_centre.dom.$services_available_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-services-available-link"); // Cache location wrapper elements

        qg_nearest_service_centre.dom.$location_wrapper = qg_nearest_service_centre.dom.$root.find(".qg-site-footer-util__nearest-service-centre-detail-location");
        qg_nearest_service_centre.dom.$location_distance_from = qg_nearest_service_centre.dom.$location_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-distance-from");
        qg_nearest_service_centre.dom.$location_address = qg_nearest_service_centre.dom.$location_wrapper.find(".qg-site-footer-util__nearest-service-centre-detail-location-address"); // Get API source data endpoint URL from data attribute

        nearest_service_center_data_source_url = qg_nearest_service_centre.dom.$root.data("nearest-service-centre-source");
      }
    }

    var qg_nearest_service_centre = {};
    var nearest_service_centre_data;
    var nearest_service_center_data_source_url; // Initialise this module only when the user location module is initiliased

    qg_user_location_module.event.on("user location module initialised", init); // On location set event, update details

    qg_user_location_module.event.on("location set", updateDetails);
    return {
      init: init
    };
  }();
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
    function closeModal() {
      qg_location_info_widget.dom.$modal.modal('hide');
    }

    function shakeForm() {
      // Add animation class to make form shake
      qg_location_info_widget.dom.$form_wrapper.addClass("shake"); // Clear animation

      clearTimeout(remove_shake_class_timeout);
      remove_shake_class_timeout = setTimeout(function () {
        qg_location_info_widget.dom.$form_wrapper.removeClass("shake");
      }, 750);
    }

    function setupModalDetectLocationButton() {
      qg_location_info_widget.dom.$detect_location_btn.click(function (event) {
        var $this = $(event.target);
        qg_user_location_module.locateUser();
      });
    }

    function setupModalSetLocationButton() {
      qg_location_info_widget.dom.$set_location_btn.click(function (event) {
        var current_value = qg_location_info_widget.dom.$modal_input.val(); // Check if inputted value is at least one of the suburb list items

        var selected_suburb_list_item = qg_location_info_widget.dom.$suburb_list_items.filter(function () {
          return $(this).text().toLowerCase() === current_value.toLowerCase();
        }); // If inputted value exists in the suburb list

        if (selected_suburb_list_item.length) {
          // Emit event
          qg_user_location_module.event.emit("area manually selected", current_value); // Dismiss the modal

          closeModal();
        } else {
          // Shake the form to alert user
          shakeForm();
        }
      });
    }

    function hideSuburbList() {
      qg_location_info_widget.dom.$suburb_list_items.hide();
      qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--has-result");
    }

    function filterSuburbList(value) {
      var lowered_case_value = value.toLowerCase();
      var filtered_suburbs = qg_location_info_widget.dom.$suburb_list_items.filter(function () {
        var lowered_case_list_item_option = $(this).text().toLowerCase();
        return lowered_case_list_item_option.indexOf(lowered_case_value) === 0;
      });

      if (filtered_suburbs.length) {
        filtered_suburbs.show();
        qg_location_info_widget.dom.$suburb_list_items.not(filtered_suburbs).hide();
        qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--has-result");
      } else {
        hideSuburbList();
      }
    }

    function setupSuburbListItems() {
      // Can't use click because focus event happens before click
      qg_location_info_widget.dom.$suburb_list_items.mousedown(function (event) {
        var $this = $(event.target);
        var current_value = $this.text();
        qg_location_info_widget.dom.$modal_input.val(current_value);
      });
    }

    function setupModalInput() {
      // On input, check how many chars in input.
      // If more than 3, perform filtering
      qg_location_info_widget.dom.$modal_input.on("input", function (event) {
        var $this = $(event.target);
        var current_value = $this.val();

        if (current_value.length > 2) {
          filterSuburbList(current_value);
        } else {
          hideSuburbList(current_value);
        }
      });
      qg_location_info_widget.dom.$modal_input.on("focus", function (event) {
        qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--focused");
      });
      qg_location_info_widget.dom.$modal_input.on("blur", function (event) {
        qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--focused");
      });
    } // When location is set, set the suburb in the link


    function updateLink(location) {
      qg_location_info_widget.dom.$link.text(location.suburb);
    }

    function init() {
      qg_location_info_widget.dom = {}; // Get root element

      qg_location_info_widget.dom.$root = $(".qg-location-info-widget"); // If widget exists

      if (qg_location_info_widget.dom.$root.length) {
        // Get widget link
        qg_location_info_widget.dom.$link = qg_location_info_widget.dom.$root.find(".qg-location-info-widget__link"); // Get Modal

        qg_location_info_widget.dom.$modal = $("#qg-location-info__modal"); // Get form wrapper

        qg_location_info_widget.dom.$form_wrapper = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-form-wrapper"); // Get field input in modal

        qg_location_info_widget.dom.$modal_input = qg_location_info_widget.dom.$form_wrapper.find(".qg-location-info__modal-field"); // Get suburb list items

        qg_location_info_widget.dom.$suburb_list_items = qg_location_info_widget.dom.$form_wrapper.find(".qg-location-info__modal-suburb-list-item"); // Get detect location button in modal

        qg_location_info_widget.dom.$detect_location_btn = qg_location_info_widget.dom.$form_wrapper.find(".qg-location-info__modal-btn-detect-location"); // Get set location button in modal

        qg_location_info_widget.dom.$set_location_btn = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-btn-set-location");
        setupModalInput();
        setupSuburbListItems();
        setupModalDetectLocationButton();
        setupModalSetLocationButton();
      }
    }

    var qg_location_info_widget = {}; // List to store suburb/ LGAs

    var area_list_array = [];
    var remove_shake_class_timeout; // Initialise this module only when the user location module is initiliased

    qg_user_location_module.event.on("user location module initialised", init);
    qg_user_location_module.event.on("location set", updateLink);
    qg_user_location_module.event.on("location set", closeModal);
    qg_user_location_module.event.on("location unknown", shakeForm);
    return {
      init: init
    };
  }();
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
      var autocomplete_source_url = services_service_finder.dom.$root.data("autocomplete-source"); // Create handlebars helper that will create the icons

      Handlebars.registerHelper('generateIconsMarkup', function (icons) {
        var icons_array = icons.split(" ");
        var icons_markup = "";
        icons_array.forEach(function (icon) {
          icons_markup += "<i class='fas " + icon + " services-service-finder__featured-icon' aria-hidden='true' title='" + icon + "'></i>";
        });
        return new Handlebars.SafeString(icons_markup);
      }); // Initiate conceirge plugin

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
              'suggestion': '<div><h6 class="services-service-finder__featured-heading">{{label.title}}</h6>{{#if label.icon}}<div class="services-service-finder__featured-icons">{{generateIconsMarkup label.icon}}</div>{{/if}}<p class="services-service-finder__featured-description">{{label.description}}</p><button type="button" class="services-service-finder__featured-btn">{{label.CTA}}</button></div>'
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
        services_service_finder.dom.$root.addClass("services-service-finder--results-shown");
      } else {
        services_service_finder.dom.$root.removeClass("services-service-finder--results-shown");
      } // This will add a class to specify there are featured results


      if (services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion").length) {
        services_service_finder.dom.$root.addClass("services-service-finder--has-featured-result");
      } else {
        services_service_finder.dom.$root.removeClass("services-service-finder--has-featured-result");
      }
    }

    function checkFieldHasInput(current_value) {
      if (current_value.length === 0) {
        services_service_finder.dom.$root.addClass("services-service-finder--no-input");
      } else {
        services_service_finder.dom.$root.removeClass("services-service-finder--no-input");
      }
    } // This function adds/removes a "focus" class whenever the field is focused/blurred
    // This is to control CSS border radius of input and button
    // Also, if user is focused / blurred from field input, check if there is input
    // This is to make the "no results menu" hide if there is input


    function setupFieldFocusEvent() {
      // Focus event
      services_service_finder.dom.$field.on("focus", function (event) {
        var $this = $(event.target);
        var current_value = $this.val();
        checkFieldHasInput(current_value);
        services_service_finder.dom.$root.addClass("services-service-finder--focused");
      }); // Blur event

      services_service_finder.dom.$field.on("blur", function (event) {
        var $this = $(event.target);
        var current_value = $this.val();
        checkFieldHasInput(current_value);
        services_service_finder.dom.$root.removeClass("services-service-finder--focused");
      });
    } // Whenever user is typing or deleting input, check if there is input
    // This is to make the "no results menu" hide if there is input 


    function setupFieldInputEvent() {
      services_service_finder.dom.$field.on("input", function (event) {
        var $this = $(event.target);
        var current_value = $this.val();
        checkFieldHasInput(current_value);
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
        services_service_finder.dom.$field = services_service_finder.dom.$root.find(".services-service-finder__field"); // Set up root node to have class whenever field is focused on

        setupFieldFocusEvent(); // Set up root node to have a class whenever something is being typed into the search field

        setupFieldInputEvent(); // Initialise Funnelback Concerige

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
        } else if (weather_data_icon_char === "n") {
          if (mapped_icon === "sunny") {
            mapped_icon = 'clear';
          }

          mapped_icon = 'night-' + mapped_icon;
        }
      } // Get description from weather data API


      var description = weather_data.weather[0].description; // Create icon element

      var $icon = $('<i/>', {
        "class": 'wi wi-' + mapped_icon,
        "title": description,
        "aria-hidden": "hidden"
      }); // Empty wrapper and append icon

      qg_weather_info_widget.dom.$image_wrapper.empty().append($icon);
    }

    function updateWidget(location) {
      var request_url = weather_data_source + "&lat=" + location.lat + "&lon=" + location.lon; // When the weather data is retrieved from open weather API by passing in the user's coords

      $.getJSON(request_url, function (data) {
        // If result is valud
        if (data.hasOwnProperty("weather")) {
          weather_data = data; // Update temperature

          updateTemperature(); // Update image icon

          updateIcon(); // Class to make the widget show is added to the root node

          qg_weather_info_widget.dom.$root.addClass("qg-weather-info-widget--has-result");
        }
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
      } // Initialise this module only when the user location module is initiliased

    };
    qg_user_location_module.event.on("user location module initialised", init); // On "location set" event, update the widget

    qg_user_location_module.event.on("location set", updateWidget);
    return {
      init: init
    };
  }();
})();

/***/ })
],[[0,1]]]);