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
module.exports = __webpack_require__(10);


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
  'use strict'; // Declare global variable Queensland Gov object

  window.qg = {}; // Create an event emitter object
  // This allows components to "broadcast" events and other components can respond to it
  // Promotes decoupling

  qg.events = {}; // Location related events

  qg.events.location = new EventEmitter2();
})();

/***/ }),
/* 4 */
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

      if ($services_banner.length) {
        qg.event.on("location-selected", processSelectedLocation);
      }
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
/* 5 */
/***/ (function(module, exports) {

(function () {
  'use strict';
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
})();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  var services_service_finder_module = function () {
    /* Initialise Funnelback Conceirge on input field */
    function initFBConceirge() {
      services_service_finder.dom.$field.autocompletion({
        program: 'https://stage-15-10-search.clients.funnelback.com/s/suggest.json',
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
      });
    } // Clone the featured result and insert into organic set so that featured result can appear between suggestions


    function cloneFeaturedResult() {
      var $featured_result = services_service_finder.dom.$featured_result_wrapper.find(".tt-suggestion");

      if ($featured_result.length) {
        var $featured_result_wrapper_clone = services_service_finder.dom.$featured_result_wrapper.clone(); // Get number of organic results

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
    } // This function adds and removes a "focus" class whenever the field is focused / blurred
    // This is to control CSS border radius of input and button
    // If user is focusing on field, scroll to field so that user can always see the rest of the no results menu


    function initFieldFocusEvent() {
      services_service_finder.dom.$field.on("focus", function (event) {
        var $this = $(event.target);
        services_service_finder.dom.$root.addClass("services-service-finder--focused"); // Scroll to element

        $([document.documentElement, document.body]).animate({
          scrollTop: $this.offset().top
        }, 300);
      });
      services_service_finder.dom.$field.on("blur", function (event) {
        services_service_finder.dom.$root.removeClass("services-service-finder--focused");
      });
    }

    function init() {
      services_service_finder.dom = {};
      services_service_finder.dom.$root = $(".services-service-finder");

      if (services_service_finder.dom.$root.length) {
        // Cache field input
        services_service_finder.dom.$field = services_service_finder.dom.$root.find(".services-service-finder__field"); // Set up root node to have class whenver field is focused on

        initFieldFocusEvent(); // Initialise Funnelback Concerige

        initFBConceirge();
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

/***/ })
],[[0,1]]]);