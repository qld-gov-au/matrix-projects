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
module.exports = __webpack_require__(15);


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
})();

/***/ }),
/* 13 */
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
   * For example, the search widget will be embedded in the header util bar.
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
/* 14 */
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
        var $this = $(event.target);
        services_service_finder.dom.$root.addClass("services-service-finder--focused"); // Scroll to element

        $([document.documentElement, document.body]).animate({
          scrollTop: $this.offset().top
        }, 300);
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
/* 15 */
/***/ (function(module, exports) {

(function () {
  'use strict';
})();

/***/ })
],[[0,1]]]);