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
module.exports = __webpack_require__(9);


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
  /*
      Global namespace
  */

  var qg_dfv = {
    'fn': {},
    'vars': {}
  }; // Make variable available to the console for debugging

  window.qg_dfv = qg_dfv;
  /*
      Utilities
  */
  // Generate loader

  qg_dfv.fn.generateLoader = function () {
    var loader = '<div class="d-flex justify-content-center">';
    loader += '<div class="spinner-border text-primary" role="status">';
    loader += '<span class="sr-only">Loading...</span>';
    loader += '</div>';
    loader += '</div>';
    return loader;
  };

  qg_dfv.fn.sendXHR = function (xhr_parameters, method) {
    var xhr = new XMLHttpRequest();
    var request_url = xhr_parameters['request_url'];
    var request_extras = xhr_parameters['request_extras'];
    var request_success = xhr_parameters['request_success'];
    var request_failure = xhr_parameters['request_failure']; // Handle timeouts in modern browsers

    xhr.ontimeout = function () {
      console.log("FAIL - HTTP request for '" + request_url + "' timed out.");
    }; // Handle aborted connections


    xhr.onabort = function () {
      console.log("FAIL - HTTP request for '" + request_url + "' was aborted.");
    }; // Handle when XHR has processed


    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        switch (this.status) {
          case 200:
          case 201:
          case 204:
            request_success(this.responseText, request_extras);
            break;

          default:
            request_failure(this);
            break;
        }
      }
    };

    xhr.open(method, request_url, true);
    xhr.timeout = 120000;

    switch (method) {
      case 'GET':
        xhr.send();
        break;

      case 'POST':
        // This lets us post Custom Forms
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // This is the request payload

        xhr.send(request_extras);
        break;
    }
  };

  qg_dfv.fn.failedRequest = function () {
    console.log('The request failed.');
  };
})();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function () {
  'use strict';
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

/***/ })
],[[0,1]]]);