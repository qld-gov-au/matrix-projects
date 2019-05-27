(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
module.exports = __webpack_require__(4);


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
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
  "use strict";

  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function (a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
        b = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    for (var c in b) {
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    }

    return !1;
  }

  a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
        d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0;
    });

    var e = function e() {
      c || a(d).trigger(a.support.transition.end);
    };

    return setTimeout(e, b), this;
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function handle(b) {
        if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
      }
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
    });
  }

  var c = '[data-dismiss="alert"]',
      d = function d(b) {
    a(b).on("click", c, this.close);
  };

  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove();
    }

    var e = a(this),
        f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a("#" === f ? [] : f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this;
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.button"),
          f = "object" == _typeof(b) && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
    });
  }

  var c = function c(b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
  };

  c.VERSION = "3.3.7", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function (b) {
    var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1));
    }, this), 0);
  }, c.prototype.toggle = function () {
    var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');

    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this;
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target).closest(".btn");
    b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"));
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == _typeof(b) && b),
          g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
    });
  }

  var c = function c(b, _c2) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c2, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;

        case 39:
          this.next();
          break;

        default:
          return;
      }

      a.preventDefault();
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
        f = (c + e) % this.$items.length;
    return this.$items.eq(f);
  }, c.prototype.to = function (a) {
    var b = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a);
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
  }, c.prototype.next = function () {
    if (!this.sliding) return this.slide("next");
  }, c.prototype.prev = function () {
    if (!this.sliding) return this.slide("prev");
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
        f = d || this.getItemForDirection(b, e),
        g = this.interval,
        h = "next" == b ? "left" : "right",
        i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
        k = a.Event("slide.bs.carousel", {
      relatedTarget: j,
      direction: h
    });

    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active");
      }

      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m);
        }, 0);
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this;
  };

  var e = function e(c) {
    var d,
        e = a(this),
        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));

    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
    }
  };

  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);
      b.call(c, c.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    var c,
        d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d);
  }

  function c(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == _typeof(b) && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
    });
  }

  var d = function d(b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
  };

  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height";
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b,
          e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");

      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");

        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;

          var h = function h() {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
          };

          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");

      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;

        var e = function e() {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };

        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e);
    }, this)).end();
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this;
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : e.data();
    c.call(f, h);
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent();
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
          e = b(d),
          f = {
        relatedTarget: this
      };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
    }));
  }

  function d(b) {
    return this.each(function () {
      var c = a(this),
          d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
    });
  }

  var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function g(b) {
    a(b).on("click.bs.dropdown", this.toggle);
  };

  g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
    var e = a(this);

    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
          g = f.hasClass("open");

      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
      }

      return !1;
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);

      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
            g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
            i = e.find(".dropdown-menu" + h);

        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this;
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation();
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function (a) {
  "use strict";

  function b(b, d) {
    return this.each(function () {
      var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == _typeof(b) && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
    });
  }

  var c = function c(b, _c3) {
    this.options = _c3, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal");
    }, this));
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a);
  }, c.prototype.show = function (b) {
    var d = this,
        e = a.Event("show.bs.modal", {
      relatedTarget: b
    });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
      });
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f);
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
    }));
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
    }, this));
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide();
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
  }, c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
    });
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
  }, c.prototype.backdrop = function (b) {
    var d = this,
        e = this.$element.hasClass("fade") ? "fade" : "";

    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");

      var g = function g() {
        d.removeBackdrop(), b && b();
      };

      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
    } else b && b();
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog();
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    });
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    });
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;

    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad);
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b;
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this;
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
        e = d.attr("href"),
        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
        g = f.data("bs.modal") ? "toggle" : a.extend({
      remote: !/#/.test(e) && e
    }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus");
      });
    }), b.call(f, g, this);
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == _typeof(b) && b;
      !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }

  var c = function c(a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
      click: !1,
      hover: !1,
      focus: !1
    }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");

    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
            i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle();
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b;
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
        c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d);
    }), b;
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show();
    }, c.options.delay.show)) : c.show());
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState) {
      if (this.inState[a]) return !0;
    }

    return !1;
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide();
    }, c.options.delay.hide)) : c.hide();
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
          f = this.tip(),
          g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
          i = /\s?auto?\s?/i,
          j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
          l = f[0].offsetWidth,
          m = f[0].offsetHeight;

      if (j) {
        var n = h,
            o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
      }

      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);

      var q = function q() {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
      };

      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function using(a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        });
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
        j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
        n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l);
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
    }

    var e = this,
        f = a(this.$tip),
        g = a.Event("hide.bs." + this.type);
    if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this;
  }, c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  }, c.prototype.hasContent = function () {
    return this.getTitle();
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;
    var c = b[0],
        d = "BODY" == c.tagName,
        e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = window.SVGElement && c instanceof window.SVGElement,
        g = d ? {
      top: 0,
      left: 0
    } : f ? null : b.offset(),
        h = {
      scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
    },
        i = d ? {
      width: a(window).width(),
      height: a(window).height()
    } : null;
    return a.extend({}, e, h, i, g);
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    };
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);

    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
          i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
    } else {
      var j = b.left - f,
          k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
    }

    return e;
  }, c.prototype.getTitle = function () {
    var a,
        b = this.$element,
        c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
  }, c.prototype.getUID = function (a) {
    do {
      a += ~~(1e6 * Math.random());
    } while (document.getElementById(a));

    return a;
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip;
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  }, c.prototype.enable = function () {
    this.enabled = !0;
  }, c.prototype.disable = function () {
    this.enabled = !1;
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  }, c.prototype.toggle = function (b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
  }, c.prototype.destroy = function () {
    var a = this;
    clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null;
    });
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this;
  };
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == _typeof(b) && b;
      !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }

  var c = function c(a, b) {
    this.init("popover", a, b);
  };

  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  }, c.prototype.getContent = function () {
    var a = this.$element,
        b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this;
  };
}(jQuery), +function (a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
  }

  function c(c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == _typeof(c) && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }

  b.VERSION = "3.3.7", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  }, b.prototype.refresh = function () {
    var b = this,
        c = "offset",
        d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
          e = b.data("target") || b.attr("href"),
          f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1]);
    });
  }, b.prototype.process = function () {
    var a,
        b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.getScrollHeight(),
        d = this.options.offset + c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();

    for (a = e.length; a--;) {
      g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this;
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      c.call(b, b.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
    });
  }

  var c = function c(b) {
    this.element = a(b);
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");

    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
          f = a.Event("hide.bs.tab", {
        relatedTarget: b[0]
      }),
          g = a.Event("show.bs.tab", {
        relatedTarget: e[0]
      });

      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          });
        });
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
    }

    var g = d.find("> .active"),
        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this;
  };

  var e = function e(c) {
    c.preventDefault(), b.call(a(this), "show");
  };

  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == _typeof(b) && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
    });
  }

  var c = function c(b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
  };

  c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();
    if (null != c && "top" == this.affixed) return e < c && "top";
    if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
    var h = null == this.affixed,
        i = h ? e : f.top,
        j = h ? g : b;
    return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom";
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
        b = this.$element.offset();
    return this.pinnedOffset = b.top - a;
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1);
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
          d = this.options.offset,
          e = d.top,
          f = d.bottom,
          g = Math.max(a(document).height(), a(document.body).height());
      "object" != _typeof(d) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);

      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
            j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
      }

      "bottom" == h && this.$element.offset({
        top: g - b - f
      });
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this;
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
          d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
    });
  });
}(jQuery);

(function (root, undef) {
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      slice = ArrayProto.slice,
      hasOwnProp = ObjProto.hasOwnProperty,
      nativeForEach = ArrayProto.forEach,
      breaker = {};
  var _ = {
    forEach: function forEach(obj, iterator, context) {
      var i, l, key;

      if (obj === null) {
        return;
      }

      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (i = 0, l = obj.length; i < l; i++) {
          if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
            return;
          }
        }
      } else {
        for (key in obj) {
          if (hasOwnProp.call(obj, key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) {
              return;
            }
          }
        }
      }
    },
    extend: function extend(obj) {
      this.forEach(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      });
      return obj;
    }
  };

  var Jed = function Jed(options) {
    this.defaults = {
      "locale_data": {
        "messages": {
          "": {
            "domain": "messages",
            "lang": "en",
            "plural_forms": "nplurals=2; plural=(n != 1);"
          }
        }
      },
      "domain": "messages"
    };
    this.options = _.extend({}, this.defaults, options);
    this.textdomain(this.options.domain);

    if (options.domain && !this.options.locale_data[this.options.domain]) {
      throw new Error('Text domain set to non-existent domain: `' + domain + '`');
    }
  };

  Jed.context_delimiter = String.fromCharCode(4);

  function getPluralFormFunc(plural_form_string) {
    return Jed.PF.compile(plural_form_string || "nplurals=2; plural=(n != 1);");
  }

  function Chain(key, i18n) {
    this._key = key;
    this._i18n = i18n;
  }

  _.extend(Chain.prototype, {
    onDomain: function onDomain(domain) {
      this._domain = domain;
      return this;
    },
    withContext: function withContext(context) {
      this._context = context;
      return this;
    },
    ifPlural: function ifPlural(num, pkey) {
      this._val = num;
      this._pkey = pkey;
      return this;
    },
    fetch: function fetch(sArr) {
      if ({}.toString.call(sArr) != '[object Array]') {
        sArr = [].slice.call(arguments);
      }

      return (sArr && sArr.length ? Jed.sprintf : function (x) {
        return x;
      })(this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val), sArr);
    }
  });

  _.extend(Jed.prototype, {
    translate: function translate(key) {
      return new Chain(key, this);
    },
    textdomain: function textdomain(domain) {
      if (!domain) {
        return this._textdomain;
      }

      this._textdomain = domain;
    },
    gettext: function gettext(key) {
      return this.dcnpgettext.call(this, undef, undef, key);
    },
    dgettext: function dgettext(domain, key) {
      return this.dcnpgettext.call(this, domain, undef, key);
    },
    dcgettext: function dcgettext(domain, key) {
      return this.dcnpgettext.call(this, domain, undef, key);
    },
    ngettext: function ngettext(skey, pkey, val) {
      return this.dcnpgettext.call(this, undef, undef, skey, pkey, val);
    },
    dngettext: function dngettext(domain, skey, pkey, val) {
      return this.dcnpgettext.call(this, domain, undef, skey, pkey, val);
    },
    dcngettext: function dcngettext(domain, skey, pkey, val) {
      return this.dcnpgettext.call(this, domain, undef, skey, pkey, val);
    },
    pgettext: function pgettext(context, key) {
      return this.dcnpgettext.call(this, undef, context, key);
    },
    dpgettext: function dpgettext(domain, context, key) {
      return this.dcnpgettext.call(this, domain, context, key);
    },
    dcpgettext: function dcpgettext(domain, context, key) {
      return this.dcnpgettext.call(this, domain, context, key);
    },
    npgettext: function npgettext(context, skey, pkey, val) {
      return this.dcnpgettext.call(this, undef, context, skey, pkey, val);
    },
    dnpgettext: function dnpgettext(domain, context, skey, pkey, val) {
      return this.dcnpgettext.call(this, domain, context, skey, pkey, val);
    },
    dcnpgettext: function dcnpgettext(domain, context, singular_key, plural_key, val) {
      plural_key = plural_key || singular_key;
      domain = domain || this._textdomain;
      val = typeof val == 'undefined' ? 1 : val;
      var fallback;

      if (!this.options) {
        fallback = new Jed();
        return fallback.dcnpgettext.call(fallback, undefined, undefined, singular_key, plural_key, val);
      }

      if (!this.options.locale_data) {
        throw new Error('No locale data provided.');
      }

      if (!this.options.locale_data[domain]) {
        throw new Error('Domain `' + domain + '` was not found.');
      }

      if (!this.options.locale_data[domain][""]) {
        throw new Error('No locale meta information provided.');
      }

      if (!singular_key) {
        throw new Error('No translation key found.');
      }

      if (typeof val != 'number') {
        try {
          val = parseInt(val, 10);
        } catch (e) {
          throw new Error('Error parsing the value.');
        }

        if (isNaN(val)) {
          throw new Error('The number that was passed in is not a number.');
        }
      }

      var key = context ? context + Jed.context_delimiter + singular_key : singular_key,
          locale_data = this.options.locale_data,
          dict = locale_data[domain],
          defaultPF = this.defaults.locale_data.messages[""].plural_forms,
          val_idx = getPluralFormFunc(dict[""].plural_forms)(val) + 1,
          val_list,
          res;

      if (!dict) {
        throw new Error('No domain named `' + domain + '` could be found.');
      }

      val_list = dict[key];

      if (!val_list || val_idx >= val_list.length) {
        res = [null, singular_key, plural_key];
        return res[getPluralFormFunc()(val) + 1];
      }

      res = val_list[val_idx];

      if (!res) {
        res = [null, singular_key, plural_key];
        return res[getPluralFormFunc()(val) + 1];
      }

      return res;
    }
  });

  var sprintf = function () {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    function str_repeat(input, multiplier) {
      for (var output = []; multiplier > 0; output[--multiplier] = input) {}

      return output.join('');
    }

    var str_format = function str_format() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }

      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function (parse_tree, argv) {
      var cursor = 1,
          tree_length = parse_tree.length,
          node_type = '',
          arg,
          output = [],
          i,
          k,
          match,
          pad,
          pad_character,
          pad_length;

      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);

        if (node_type === 'string') {
          output.push(parse_tree[i]);
        } else if (node_type === 'array') {
          match = parse_tree[i];

          if (match[2]) {
            arg = argv[cursor];

            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw sprintf('[sprintf] property "%s" does not exist', match[2][k]);
              }

              arg = arg[match[2][k]];
            }
          } else if (match[1]) {
            arg = argv[match[1]];
          } else {
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && get_type(arg) != 'number') {
            throw sprintf('[sprintf] expecting number but found %s', get_type(arg));
          }

          if (typeof arg == 'undefined' || arg === null) {
            arg = '';
          }

          switch (match[8]) {
            case 'b':
              arg = arg.toString(2);
              break;

            case 'c':
              arg = String.fromCharCode(arg);
              break;

            case 'd':
              arg = parseInt(arg, 10);
              break;

            case 'e':
              arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
              break;

            case 'f':
              arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
              break;

            case 'o':
              arg = arg.toString(8);
              break;

            case 's':
              arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
              break;

            case 'u':
              arg = Math.abs(arg);
              break;

            case 'x':
              arg = arg.toString(16);
              break;

            case 'X':
              arg = arg.toString(16).toUpperCase();
              break;
          }

          arg = /[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg;
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }

      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function (fmt) {
      var _fmt = fmt,
          match = [],
          parse_tree = [],
          arg_names = 0;

      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        } else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        } else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [],
                replacement_field = match[2],
                field_match = [];

            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);

              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else {
                  throw '[sprintf] huh?';
                }
              }
            } else {
              throw '[sprintf] huh?';
            }

            match[2] = field_list;
          } else {
            arg_names |= 2;
          }

          if (arg_names === 3) {
            throw '[sprintf] mixing positional and named placeholders is not (yet) supported';
          }

          parse_tree.push(match);
        } else {
          throw '[sprintf] huh?';
        }

        _fmt = _fmt.substring(match[0].length);
      }

      return parse_tree;
    };

    return str_format;
  }();

  var vsprintf = function vsprintf(fmt, argv) {
    argv.unshift(fmt);
    return sprintf.apply(null, argv);
  };

  Jed.parse_plural = function (plural_forms, n) {
    plural_forms = plural_forms.replace(/n/g, n);
    return Jed.parse_expression(plural_forms);
  };

  Jed.sprintf = function (fmt, args) {
    if ({}.toString.call(args) == '[object Array]') {
      return vsprintf(fmt, [].slice.call(args));
    }

    return sprintf.apply(this, [].slice.call(arguments));
  };

  Jed.prototype.sprintf = function () {
    return Jed.sprintf.apply(this, arguments);
  };

  Jed.PF = {};

  Jed.PF.parse = function (p) {
    var plural_str = Jed.PF.extractPluralExpr(p);
    return Jed.PF.parser.parse.call(Jed.PF.parser, plural_str);
  };

  Jed.PF.compile = function (p) {
    function imply(val) {
      return val === true ? 1 : val ? val : 0;
    }

    var ast = Jed.PF.parse(p);
    return function (n) {
      return imply(Jed.PF.interpreter(ast)(n));
    };
  };

  Jed.PF.interpreter = function (ast) {
    return function (n) {
      var res;

      switch (ast.type) {
        case 'GROUP':
          return Jed.PF.interpreter(ast.expr)(n);

        case 'TERNARY':
          if (Jed.PF.interpreter(ast.expr)(n)) {
            return Jed.PF.interpreter(ast.truthy)(n);
          }

          return Jed.PF.interpreter(ast.falsey)(n);

        case 'OR':
          return Jed.PF.interpreter(ast.left)(n) || Jed.PF.interpreter(ast.right)(n);

        case 'AND':
          return Jed.PF.interpreter(ast.left)(n) && Jed.PF.interpreter(ast.right)(n);

        case 'LT':
          return Jed.PF.interpreter(ast.left)(n) < Jed.PF.interpreter(ast.right)(n);

        case 'GT':
          return Jed.PF.interpreter(ast.left)(n) > Jed.PF.interpreter(ast.right)(n);

        case 'LTE':
          return Jed.PF.interpreter(ast.left)(n) <= Jed.PF.interpreter(ast.right)(n);

        case 'GTE':
          return Jed.PF.interpreter(ast.left)(n) >= Jed.PF.interpreter(ast.right)(n);

        case 'EQ':
          return Jed.PF.interpreter(ast.left)(n) == Jed.PF.interpreter(ast.right)(n);

        case 'NEQ':
          return Jed.PF.interpreter(ast.left)(n) != Jed.PF.interpreter(ast.right)(n);

        case 'MOD':
          return Jed.PF.interpreter(ast.left)(n) % Jed.PF.interpreter(ast.right)(n);

        case 'VAR':
          return n;

        case 'NUM':
          return ast.val;

        default:
          throw new Error("Invalid Token found.");
      }
    };
  };

  Jed.PF.extractPluralExpr = function (p) {
    p = p.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    if (!/;\s*$/.test(p)) {
      p = p.concat(';');
    }

    var nplurals_re = /nplurals\=(\d+);/,
        plural_re = /plural\=(.*);/,
        nplurals_matches = p.match(nplurals_re),
        res = {},
        plural_matches;

    if (nplurals_matches.length > 1) {
      res.nplurals = nplurals_matches[1];
    } else {
      throw new Error('nplurals not found in plural_forms string: ' + p);
    }

    p = p.replace(nplurals_re, "");
    plural_matches = p.match(plural_re);

    if (!(plural_matches && plural_matches.length > 1)) {
      throw new Error('`plural` expression not found: ' + p);
    }

    return plural_matches[1];
  };

  Jed.PF.parser = function () {
    var parser = {
      trace: function trace() {},
      yy: {},
      symbols_: {
        "error": 2,
        "expressions": 3,
        "e": 4,
        "EOF": 5,
        "?": 6,
        ":": 7,
        "||": 8,
        "&&": 9,
        "<": 10,
        "<=": 11,
        ">": 12,
        ">=": 13,
        "!=": 14,
        "==": 15,
        "%": 16,
        "(": 17,
        ")": 18,
        "n": 19,
        "NUMBER": 20,
        "$accept": 0,
        "$end": 1
      },
      terminals_: {
        2: "error",
        5: "EOF",
        6: "?",
        7: ":",
        8: "||",
        9: "&&",
        10: "<",
        11: "<=",
        12: ">",
        13: ">=",
        14: "!=",
        15: "==",
        16: "%",
        17: "(",
        18: ")",
        19: "n",
        20: "NUMBER"
      },
      productions_: [0, [3, 2], [4, 5], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 1], [4, 1]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
        var $0 = $$.length - 1;

        switch (yystate) {
          case 1:
            return {
              type: 'GROUP',
              expr: $$[$0 - 1]
            };
            break;

          case 2:
            this.$ = {
              type: 'TERNARY',
              expr: $$[$0 - 4],
              truthy: $$[$0 - 2],
              falsey: $$[$0]
            };
            break;

          case 3:
            this.$ = {
              type: "OR",
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 4:
            this.$ = {
              type: "AND",
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 5:
            this.$ = {
              type: 'LT',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 6:
            this.$ = {
              type: 'LTE',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 7:
            this.$ = {
              type: 'GT',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 8:
            this.$ = {
              type: 'GTE',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 9:
            this.$ = {
              type: 'NEQ',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 10:
            this.$ = {
              type: 'EQ',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 11:
            this.$ = {
              type: 'MOD',
              left: $$[$0 - 2],
              right: $$[$0]
            };
            break;

          case 12:
            this.$ = {
              type: 'GROUP',
              expr: $$[$0 - 1]
            };
            break;

          case 13:
            this.$ = {
              type: 'VAR'
            };
            break;

          case 14:
            this.$ = {
              type: 'NUM',
              val: Number(yytext)
            };
            break;
        }
      },
      table: [{
        3: 1,
        4: 2,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        1: [3]
      }, {
        5: [1, 6],
        6: [1, 7],
        8: [1, 8],
        9: [1, 9],
        10: [1, 10],
        11: [1, 11],
        12: [1, 12],
        13: [1, 13],
        14: [1, 14],
        15: [1, 15],
        16: [1, 16]
      }, {
        4: 17,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        5: [2, 13],
        6: [2, 13],
        7: [2, 13],
        8: [2, 13],
        9: [2, 13],
        10: [2, 13],
        11: [2, 13],
        12: [2, 13],
        13: [2, 13],
        14: [2, 13],
        15: [2, 13],
        16: [2, 13],
        18: [2, 13]
      }, {
        5: [2, 14],
        6: [2, 14],
        7: [2, 14],
        8: [2, 14],
        9: [2, 14],
        10: [2, 14],
        11: [2, 14],
        12: [2, 14],
        13: [2, 14],
        14: [2, 14],
        15: [2, 14],
        16: [2, 14],
        18: [2, 14]
      }, {
        1: [2, 1]
      }, {
        4: 18,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 19,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 20,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 21,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 22,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 23,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 24,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 25,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 26,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        4: 27,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        6: [1, 7],
        8: [1, 8],
        9: [1, 9],
        10: [1, 10],
        11: [1, 11],
        12: [1, 12],
        13: [1, 13],
        14: [1, 14],
        15: [1, 15],
        16: [1, 16],
        18: [1, 28]
      }, {
        6: [1, 7],
        7: [1, 29],
        8: [1, 8],
        9: [1, 9],
        10: [1, 10],
        11: [1, 11],
        12: [1, 12],
        13: [1, 13],
        14: [1, 14],
        15: [1, 15],
        16: [1, 16]
      }, {
        5: [2, 3],
        6: [2, 3],
        7: [2, 3],
        8: [2, 3],
        9: [1, 9],
        10: [1, 10],
        11: [1, 11],
        12: [1, 12],
        13: [1, 13],
        14: [1, 14],
        15: [1, 15],
        16: [1, 16],
        18: [2, 3]
      }, {
        5: [2, 4],
        6: [2, 4],
        7: [2, 4],
        8: [2, 4],
        9: [2, 4],
        10: [1, 10],
        11: [1, 11],
        12: [1, 12],
        13: [1, 13],
        14: [1, 14],
        15: [1, 15],
        16: [1, 16],
        18: [2, 4]
      }, {
        5: [2, 5],
        6: [2, 5],
        7: [2, 5],
        8: [2, 5],
        9: [2, 5],
        10: [2, 5],
        11: [2, 5],
        12: [2, 5],
        13: [2, 5],
        14: [2, 5],
        15: [2, 5],
        16: [1, 16],
        18: [2, 5]
      }, {
        5: [2, 6],
        6: [2, 6],
        7: [2, 6],
        8: [2, 6],
        9: [2, 6],
        10: [2, 6],
        11: [2, 6],
        12: [2, 6],
        13: [2, 6],
        14: [2, 6],
        15: [2, 6],
        16: [1, 16],
        18: [2, 6]
      }, {
        5: [2, 7],
        6: [2, 7],
        7: [2, 7],
        8: [2, 7],
        9: [2, 7],
        10: [2, 7],
        11: [2, 7],
        12: [2, 7],
        13: [2, 7],
        14: [2, 7],
        15: [2, 7],
        16: [1, 16],
        18: [2, 7]
      }, {
        5: [2, 8],
        6: [2, 8],
        7: [2, 8],
        8: [2, 8],
        9: [2, 8],
        10: [2, 8],
        11: [2, 8],
        12: [2, 8],
        13: [2, 8],
        14: [2, 8],
        15: [2, 8],
        16: [1, 16],
        18: [2, 8]
      }, {
        5: [2, 9],
        6: [2, 9],
        7: [2, 9],
        8: [2, 9],
        9: [2, 9],
        10: [2, 9],
        11: [2, 9],
        12: [2, 9],
        13: [2, 9],
        14: [2, 9],
        15: [2, 9],
        16: [1, 16],
        18: [2, 9]
      }, {
        5: [2, 10],
        6: [2, 10],
        7: [2, 10],
        8: [2, 10],
        9: [2, 10],
        10: [2, 10],
        11: [2, 10],
        12: [2, 10],
        13: [2, 10],
        14: [2, 10],
        15: [2, 10],
        16: [1, 16],
        18: [2, 10]
      }, {
        5: [2, 11],
        6: [2, 11],
        7: [2, 11],
        8: [2, 11],
        9: [2, 11],
        10: [2, 11],
        11: [2, 11],
        12: [2, 11],
        13: [2, 11],
        14: [2, 11],
        15: [2, 11],
        16: [2, 11],
        18: [2, 11]
      }, {
        5: [2, 12],
        6: [2, 12],
        7: [2, 12],
        8: [2, 12],
        9: [2, 12],
        10: [2, 12],
        11: [2, 12],
        12: [2, 12],
        13: [2, 12],
        14: [2, 12],
        15: [2, 12],
        16: [2, 12],
        18: [2, 12]
      }, {
        4: 30,
        17: [1, 3],
        19: [1, 4],
        20: [1, 5]
      }, {
        5: [2, 2],
        6: [1, 7],
        7: [2, 2],
        8: [1, 8],
        9: [1, 9],
        10: [1, 10],
        11: [1, 11],
        12: [1, 12],
        13: [1, 13],
        14: [1, 14],
        15: [1, 15],
        16: [1, 16],
        18: [2, 2]
      }],
      defaultActions: {
        6: [2, 1]
      },
      parseError: function parseError(str, hash) {
        throw new Error(str);
      },
      parse: function parse(input) {
        var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = '',
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1;
        this.lexer.setInput(input);
        this.lexer.yy = this.yy;
        this.yy.lexer = this.lexer;
        if (typeof this.lexer.yylloc == 'undefined') this.lexer.yylloc = {};
        var yyloc = this.lexer.yylloc;
        lstack.push(yyloc);
        if (typeof this.yy.parseError === 'function') this.parseError = this.yy.parseError;

        function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
        }

        function lex() {
          var token;
          token = self.lexer.lex() || 1;

          if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
          }

          return token;
        }

        var symbol,
            preErrorSymbol,
            state,
            action,
            a,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;

        while (true) {
          state = stack[stack.length - 1];

          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol == null) symbol = lex();
            action = table[state] && table[state][symbol];
          }

          _handle_error: if (typeof action === 'undefined' || !action.length || !action[0]) {
            if (!recovering) {
              expected = [];

              for (p in table[state]) {
                if (this.terminals_[p] && p > 2) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }

              var errStr = '';

              if (this.lexer.showPosition) {
                errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + this.terminals_[symbol] + "'";
              } else {
                errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }

              this.parseError(errStr, {
                text: this.lexer.match,
                token: this.terminals_[symbol] || symbol,
                line: this.lexer.yylineno,
                loc: yyloc,
                expected: expected
              });
            }

            if (recovering == 3) {
              if (symbol == EOF) {
                throw new Error(errStr || 'Parsing halted.');
              }

              yyleng = this.lexer.yyleng;
              yytext = this.lexer.yytext;
              yylineno = this.lexer.yylineno;
              yyloc = this.lexer.yylloc;
              symbol = lex();
            }

            while (1) {
              if (TERROR.toString() in table[state]) {
                break;
              }

              if (state == 0) {
                throw new Error(errStr || 'Parsing halted.');
              }

              popStack(1);
              state = stack[stack.length - 1];
            }

            preErrorSymbol = symbol;
            symbol = TERROR;
            state = stack[stack.length - 1];
            action = table[state] && table[state][TERROR];
            recovering = 3;
          }

          if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
          }

          switch (action[0]) {
            case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;

              if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) recovering--;
              } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
              }

              break;

            case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
              };
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

              if (typeof r !== 'undefined') {
                return r;
              }

              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }

              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;

            case 3:
              return true;
          }
        }

        return true;
      }
    };

    var lexer = function () {
      var lexer = {
        EOF: 1,
        parseError: function parseError(str, hash) {
          if (this.yy.parseError) {
            this.yy.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },
        setInput: function setInput(input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
          };
          return this;
        },
        input: function input() {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/\n/);
          if (lines) this.yylineno++;
          this._input = this._input.slice(1);
          return ch;
        },
        unput: function unput(ch) {
          this._input = ch + this._input;
          return this;
        },
        more: function more() {
          this._more = true;
          return this;
        },
        pastInput: function pastInput() {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function upcomingInput() {
          var next = this.match;

          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }

          return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },
        showPosition: function showPosition() {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },
        next: function next() {
          if (this.done) {
            return this.EOF;
          }

          if (!this._input) this.done = true;
          var token, match, col, lines;

          if (!this._more) {
            this.yytext = '';
            this.match = '';
          }

          var rules = this._currentRules();

          for (var i = 0; i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);

            if (match) {
              lines = match[0].match(/\n.*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[i], this.conditionStack[this.conditionStack.length - 1]);
              if (token) return token;else return;
            }
          }

          if (this._input === "") {
            return this.EOF;
          } else {
            this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });
          }
        },
        lex: function lex() {
          var r = this.next();

          if (typeof r !== 'undefined') {
            return r;
          } else {
            return this.lex();
          }
        },
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },
        popState: function popState() {
          return this.conditionStack.pop();
        },
        _currentRules: function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function topState() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function begin(condition) {
          this.begin(condition);
        }
      };

      lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;

        switch ($avoiding_name_collisions) {
          case 0:
            break;

          case 1:
            return 20;
            break;

          case 2:
            return 19;
            break;

          case 3:
            return 8;
            break;

          case 4:
            return 9;
            break;

          case 5:
            return 6;
            break;

          case 6:
            return 7;
            break;

          case 7:
            return 11;
            break;

          case 8:
            return 13;
            break;

          case 9:
            return 10;
            break;

          case 10:
            return 12;
            break;

          case 11:
            return 14;
            break;

          case 12:
            return 15;
            break;

          case 13:
            return 16;
            break;

          case 14:
            return 17;
            break;

          case 15:
            return 18;
            break;

          case 16:
            return 5;
            break;

          case 17:
            return 'INVALID';
            break;
        }
      };

      lexer.rules = [/^\s+/, /^[0-9]+(\.[0-9]+)?\b/, /^n\b/, /^\|\|/, /^&&/, /^\?/, /^:/, /^<=/, /^>=/, /^</, /^>/, /^!=/, /^==/, /^%/, /^\(/, /^\)/, /^$/, /^./];
      lexer.conditions = {
        "INITIAL": {
          "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          "inclusive": true
        }
      };
      return lexer;
    }();

    parser.lexer = lexer;
    return parser;
  }();

  if (true) {
    if ( true && module.exports) {
      exports = module.exports = Jed;
    }

    exports.Jed = Jed;
  } else {}
})(this); //! moment.js
//! version : 2.14.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com


!function (a, b) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? module.exports = b() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  "use strict";

  function a() {
    return je.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.


  function b(a) {
    je = a;
  }

  function c(a) {
    return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a);
  }

  function d(a) {
    return "[object Object]" === Object.prototype.toString.call(a);
  }

  function e(a) {
    var b;

    for (b in a) {
      // even if its not own property I'd still call it non-empty
      return !1;
    }

    return !0;
  }

  function f(a) {
    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a);
  }

  function g(a, b) {
    var c,
        d = [];

    for (c = 0; c < a.length; ++c) {
      d.push(b(a[c], c));
    }

    return d;
  }

  function h(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function i(a, b) {
    for (var c in b) {
      h(b, c) && (a[c] = b[c]);
    }

    return h(b, "toString") && (a.toString = b.toString), h(b, "valueOf") && (a.valueOf = b.valueOf), a;
  }

  function j(a, b, c, d) {
    return qb(a, b, c, d, !0).utc();
  }

  function k() {
    // We need to deep clone this object.
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1,
      parsedDateParts: [],
      meridiem: null
    };
  }

  function l(a) {
    return null == a._pf && (a._pf = k()), a._pf;
  }

  function m(a) {
    if (null == a._isValid) {
      var b = l(a),
          c = ke.call(b.parsedDateParts, function (a) {
        return null != a;
      });
      a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
    }

    return a._isValid;
  }

  function n(a) {
    var b = j(NaN);
    return null != a ? i(l(b), a) : l(b).userInvalidated = !0, b;
  }

  function o(a) {
    return void 0 === a;
  }

  function p(a, b) {
    var c, d, e;
    if (o(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), o(b._i) || (a._i = b._i), o(b._f) || (a._f = b._f), o(b._l) || (a._l = b._l), o(b._strict) || (a._strict = b._strict), o(b._tzm) || (a._tzm = b._tzm), o(b._isUTC) || (a._isUTC = b._isUTC), o(b._offset) || (a._offset = b._offset), o(b._pf) || (a._pf = l(b)), o(b._locale) || (a._locale = b._locale), le.length > 0) for (c in le) {
      d = le[c], e = b[d], o(e) || (a[d] = e);
    }
    return a;
  } // Moment prototype object


  function q(b) {
    p(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), me === !1 && (me = !0, a.updateOffset(this), me = !1);
  }

  function r(a) {
    return a instanceof q || null != a && null != a._isAMomentObject;
  }

  function s(a) {
    return 0 > a ? Math.ceil(a) || 0 : Math.floor(a);
  }

  function t(a) {
    var b = +a,
        c = 0;
    return 0 !== b && isFinite(b) && (c = s(b)), c;
  } // compare two arrays, return the number of differences


  function u(a, b, c) {
    var d,
        e = Math.min(a.length, b.length),
        f = Math.abs(a.length - b.length),
        g = 0;

    for (d = 0; e > d; d++) {
      (c && a[d] !== b[d] || !c && t(a[d]) !== t(b[d])) && g++;
    }

    return g + f;
  }

  function v(b) {
    a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b);
  }

  function w(b, c) {
    var d = !0;
    return i(function () {
      return null != a.deprecationHandler && a.deprecationHandler(null, b), d && (v(b + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + new Error().stack), d = !1), c.apply(this, arguments);
    }, c);
  }

  function x(b, c) {
    null != a.deprecationHandler && a.deprecationHandler(b, c), ne[b] || (v(c), ne[b] = !0);
  }

  function y(a) {
    return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a);
  }

  function z(a) {
    var b, c;

    for (c in a) {
      b = a[c], y(b) ? this[c] = b : this["_" + c] = b;
    }

    this._config = a, // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _ordinalParseLenient.
    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
  }

  function A(a, b) {
    var c,
        e = i({}, a);

    for (c in b) {
      h(b, c) && (d(a[c]) && d(b[c]) ? (e[c] = {}, i(e[c], a[c]), i(e[c], b[c])) : null != b[c] ? e[c] = b[c] : delete e[c]);
    }

    for (c in a) {
      h(a, c) && !h(b, c) && d(a[c]) && ( // make sure changes to properties don't modify parent config
      e[c] = i({}, e[c]));
    }

    return e;
  }

  function B(a) {
    null != a && this.set(a);
  }

  function C(a, b, c) {
    var d = this._calendar[a] || this._calendar.sameElse;
    return y(d) ? d.call(b, c) : d;
  }

  function D(a) {
    var b = this._longDateFormat[a],
        c = this._longDateFormat[a.toUpperCase()];

    return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
      return a.slice(1);
    }), this._longDateFormat[a]);
  }

  function E() {
    return this._invalidDate;
  }

  function F(a) {
    return this._ordinal.replace("%d", a);
  }

  function G(a, b, c, d) {
    var e = this._relativeTime[c];
    return y(e) ? e(a, b, c, d) : e.replace(/%d/i, a);
  }

  function H(a, b) {
    var c = this._relativeTime[a > 0 ? "future" : "past"];
    return y(c) ? c(b) : c.replace(/%s/i, b);
  }

  function I(a, b) {
    var c = a.toLowerCase();
    we[c] = we[c + "s"] = we[b] = a;
  }

  function J(a) {
    return "string" == typeof a ? we[a] || we[a.toLowerCase()] : void 0;
  }

  function K(a) {
    var b,
        c,
        d = {};

    for (c in a) {
      h(a, c) && (b = J(c), b && (d[b] = a[c]));
    }

    return d;
  }

  function L(a, b) {
    xe[a] = b;
  }

  function M(a) {
    var b = [];

    for (var c in a) {
      b.push({
        unit: c,
        priority: xe[c]
      });
    }

    return b.sort(function (a, b) {
      return a.priority - b.priority;
    }), b;
  }

  function N(b, c) {
    return function (d) {
      return null != d ? (P(this, b, d), a.updateOffset(this, c), this) : O(this, b);
    };
  }

  function O(a, b) {
    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN;
  }

  function P(a, b, c) {
    a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
  } // MOMENTS


  function Q(a) {
    return a = J(a), y(this[a]) ? this[a]() : this;
  }

  function R(a, b) {
    if ("object" == _typeof(a)) {
      a = K(a);

      for (var c = M(a), d = 0; d < c.length; d++) {
        this[c[d].unit](a[c[d].unit]);
      }
    } else if (a = J(a), y(this[a])) return this[a](b);

    return this;
  }

  function S(a, b, c) {
    var d = "" + Math.abs(a),
        e = b - d.length,
        f = a >= 0;
    return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d;
  } // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }


  function T(a, b, c, d) {
    var e = d;
    "string" == typeof d && (e = function e() {
      return this[d]();
    }), a && (Be[a] = e), b && (Be[b[0]] = function () {
      return S(e.apply(this, arguments), b[1], b[2]);
    }), c && (Be[c] = function () {
      return this.localeData().ordinal(e.apply(this, arguments), a);
    });
  }

  function U(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
  }

  function V(a) {
    var b,
        c,
        d = a.match(ye);

    for (b = 0, c = d.length; c > b; b++) {
      Be[d[b]] ? d[b] = Be[d[b]] : d[b] = U(d[b]);
    }

    return function (b) {
      var e,
          f = "";

      for (e = 0; c > e; e++) {
        f += d[e] instanceof Function ? d[e].call(b, a) : d[e];
      }

      return f;
    };
  } // format date using native date object


  function W(a, b) {
    return a.isValid() ? (b = X(b, a.localeData()), Ae[b] = Ae[b] || V(b), Ae[b](a)) : a.localeData().invalidDate();
  }

  function X(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }

    var d = 5;

    for (ze.lastIndex = 0; d >= 0 && ze.test(a);) {
      a = a.replace(ze, c), ze.lastIndex = 0, d -= 1;
    }

    return a;
  }

  function Y(a, b, c) {
    Te[a] = y(b) ? b : function (a, d) {
      return a && c ? c : b;
    };
  }

  function Z(a, b) {
    return h(Te, a) ? Te[a](b._strict, b._locale) : new RegExp($(a));
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


  function $(a) {
    return _(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
      return b || c || d || e;
    }));
  }

  function _(a) {
    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  function aa(a, b) {
    var c,
        d = b;

    for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function d(a, c) {
      c[b] = t(a);
    }), c = 0; c < a.length; c++) {
      Ue[a[c]] = d;
    }
  }

  function ba(a, b) {
    aa(a, function (a, c, d, e) {
      d._w = d._w || {}, b(a, d._w, d, e);
    });
  }

  function ca(a, b, c) {
    null != b && h(Ue, a) && Ue[a](b, c._a, c, a);
  }

  function da(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }

  function ea(a, b) {
    return c(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || cf).test(b) ? "format" : "standalone"][a.month()];
  }

  function fa(a, b) {
    return c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[cf.test(b) ? "format" : "standalone"][a.month()];
  }

  function ga(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();
    if (!this._monthsParse) for ( // this is not used
    this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; 12 > d; ++d) {
      f = j([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
    }
    return c ? "MMM" === b ? (e = pe.call(this._shortMonthsParse, g), -1 !== e ? e : null) : (e = pe.call(this._longMonthsParse, g), -1 !== e ? e : null) : "MMM" === b ? (e = pe.call(this._shortMonthsParse, g), -1 !== e ? e : (e = pe.call(this._longMonthsParse, g), -1 !== e ? e : null)) : (e = pe.call(this._longMonthsParse, g), -1 !== e ? e : (e = pe.call(this._shortMonthsParse, g), -1 !== e ? e : null));
  }

  function ha(a, b, c) {
    var d, e, f;
    if (this._monthsParseExact) return ga.call(this, a, b, c); // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse

    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
      // test the regex
      if (e = j([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
      if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
      if (!c && this._monthsParse[d].test(a)) return d;
    }
  } // MOMENTS


  function ia(a, b) {
    var c;
    if (!a.isValid()) // No op
      return a;
    if ("string" == typeof b) if (/^\d+$/.test(b)) b = t(b);else // TODO: Another silent failure?
      if (b = a.localeData().monthsParse(b), "number" != typeof b) return a;
    return c = Math.min(a.date(), da(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a;
  }

  function ja(b) {
    return null != b ? (ia(this, b), a.updateOffset(this, !0), this) : O(this, "Month");
  }

  function ka() {
    return da(this.year(), this.month());
  }

  function la(a) {
    return this._monthsParseExact ? (h(this, "_monthsRegex") || na.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = ff), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }

  function ma(a) {
    return this._monthsParseExact ? (h(this, "_monthsRegex") || na.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = gf), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex);
  }

  function na() {
    function a(a, b) {
      return b.length - a.length;
    }

    var b,
        c,
        d = [],
        e = [],
        f = [];

    for (b = 0; 12 > b; b++) {
      c = j([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
    }

    for ( // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    d.sort(a), e.sort(a), f.sort(a), b = 0; 12 > b; b++) {
      d[b] = _(d[b]), e[b] = _(e[b]);
    }

    for (b = 0; 24 > b; b++) {
      f[b] = _(f[b]);
    }

    this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i");
  } // HELPERS


  function oa(a) {
    return pa(a) ? 366 : 365;
  }

  function pa(a) {
    return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
  }

  function qa() {
    return pa(this.year());
  }

  function ra(a, b, c, d, e, f, g) {
    //can't just apply() to create a date:
    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
    var h = new Date(a, b, c, d, e, f, g); //the date constructor remaps years 0-99 to 1900-1999

    return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h;
  }

  function sa(a) {
    var b = new Date(Date.UTC.apply(null, arguments)); //the Date.UTC function remaps years 0-99 to 1900-1999

    return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b;
  } // start-of-first-week - start-of-year


  function ta(a, b, c) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    d = 7 + b - c,
        // first-week day local weekday -- which local weekday is fwd
    e = (7 + sa(a, 0, d).getUTCDay() - b) % 7;
    return -e + d - 1;
  } //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


  function ua(a, b, c, d, e) {
    var f,
        g,
        h = (7 + c - d) % 7,
        i = ta(a, d, e),
        j = 1 + 7 * (b - 1) + h + i;
    return 0 >= j ? (f = a - 1, g = oa(f) + j) : j > oa(a) ? (f = a + 1, g = j - oa(a)) : (f = a, g = j), {
      year: f,
      dayOfYear: g
    };
  }

  function va(a, b, c) {
    var d,
        e,
        f = ta(a.year(), b, c),
        g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
    return 1 > g ? (e = a.year() - 1, d = g + wa(e, b, c)) : g > wa(a.year(), b, c) ? (d = g - wa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), {
      week: d,
      year: e
    };
  }

  function wa(a, b, c) {
    var d = ta(a, b, c),
        e = ta(a + 1, b, c);
    return (oa(a) - d + e) / 7;
  } // HELPERS
  // LOCALES


  function xa(a) {
    return va(a, this._week.dow, this._week.doy).week;
  }

  function ya() {
    return this._week.dow;
  }

  function za() {
    return this._week.doy;
  } // MOMENTS


  function Aa(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), "d");
  }

  function Ba(a) {
    var b = va(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), "d");
  } // HELPERS


  function Ca(a, b) {
    return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10);
  }

  function Da(a, b) {
    return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a;
  }

  function Ea(a, b) {
    return c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()];
  }

  function Fa(a) {
    return this._weekdaysShort[a.day()];
  }

  function Ga(a) {
    return this._weekdaysMin[a.day()];
  }

  function Ha(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();
    if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; 7 > d; ++d) {
      f = j([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
    }
    return c ? "dddd" === b ? (e = pe.call(this._weekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? (e = pe.call(this._shortWeekdaysParse, g), -1 !== e ? e : null) : (e = pe.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "dddd" === b ? (e = pe.call(this._weekdaysParse, g), -1 !== e ? e : (e = pe.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = pe.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : "ddd" === b ? (e = pe.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = pe.call(this._weekdaysParse, g), -1 !== e ? e : (e = pe.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : (e = pe.call(this._minWeekdaysParse, g), -1 !== e ? e : (e = pe.call(this._weekdaysParse, g), -1 !== e ? e : (e = pe.call(this._shortWeekdaysParse, g), -1 !== e ? e : null)));
  }

  function Ia(a, b, c) {
    var d, e, f;
    if (this._weekdaysParseExact) return Ha.call(this, a, b, c);

    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) {
      // test the regex
      if (e = j([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
      if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
      if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
      if (!c && this._weekdaysParse[d].test(a)) return d;
    }
  } // MOMENTS


  function Ja(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != a ? (a = Ca(a, this.localeData()), this.add(a - b, "d")) : b;
  }

  function Ka(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, "d");
  }

  function La(a) {
    if (!this.isValid()) return null != a ? this : NaN; // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (null != a) {
      var b = Da(a, this.localeData());
      return this.day(this.day() % 7 ? b : b - 7);
    }

    return this.day() || 7;
  }

  function Ma(a) {
    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = nf), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }

  function Na(a) {
    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = of), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }

  function Oa(a) {
    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = pf), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }

  function Pa() {
    function a(a, b) {
      return b.length - a.length;
    }

    var b,
        c,
        d,
        e,
        f,
        g = [],
        h = [],
        i = [],
        k = [];

    for (b = 0; 7 > b; b++) {
      c = j([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), k.push(d), k.push(e), k.push(f);
    }

    for ( // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    g.sort(a), h.sort(a), i.sort(a), k.sort(a), b = 0; 7 > b; b++) {
      h[b] = _(h[b]), i[b] = _(i[b]), k[b] = _(k[b]);
    }

    this._weekdaysRegex = new RegExp("^(" + k.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i");
  } // FORMATTING


  function Qa() {
    return this.hours() % 12 || 12;
  }

  function Ra() {
    return this.hours() || 24;
  }

  function Sa(a, b) {
    T(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  } // PARSING


  function Ta(a, b) {
    return b._meridiemParse;
  } // LOCALES


  function Ua(a) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return "p" === (a + "").toLowerCase().charAt(0);
  }

  function Va(a, b, c) {
    return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
  }

  function Wa(a) {
    return a ? a.toLowerCase().replace("_", "-") : a;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


  function Xa(a) {
    for (var b, c, d, e, f = 0; f < a.length;) {
      for (e = Wa(a[f]).split("-"), b = e.length, c = Wa(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
        if (d = Ya(e.slice(0, b).join("-"))) return d;
        if (c && c.length >= b && u(e, c, !0) >= b - 1) //the next array item is better than a shallower substring of this one
          break;
        b--;
      }

      f++;
    }

    return null;
  }

  function Ya(a) {
    var b = null; // TODO: Find a better way to register and load all the locales in Node

    if (!uf[a] && "undefined" != typeof module && module && module.exports) try {
      b = qf._abbr, !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), // because defineLocale currently also sets the global locale, we
      // want to undo that for lazy loaded locales
      Za(b);
    } catch (c) {}
    return uf[a];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.


  function Za(a, b) {
    var c; // moment.duration._locale = moment._locale = data;

    return a && (c = o(b) ? ab(a) : $a(a, b), c && (qf = c)), qf._abbr;
  }

  function $a(a, b) {
    if (null !== b) {
      var c = tf; // treat as if there is no base config
      // backwards compat for now: also set the locale

      return b.abbr = a, null != uf[a] ? (x("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = uf[a]._config) : null != b.parentLocale && (null != uf[b.parentLocale] ? c = uf[b.parentLocale]._config : x("parentLocaleUndefined", "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")), uf[a] = new B(A(c, b)), Za(a), uf[a];
    } // useful for testing


    return delete uf[a], null;
  }

  function _a(a, b) {
    if (null != b) {
      var c,
          d = tf; // MERGE

      null != uf[a] && (d = uf[a]._config), b = A(d, b), c = new B(b), c.parentLocale = uf[a], uf[a] = c, // backwards compat for now: also set the locale
      Za(a);
    } else // pass null for config to unupdate, useful for tests
      null != uf[a] && (null != uf[a].parentLocale ? uf[a] = uf[a].parentLocale : null != uf[a] && delete uf[a]);

    return uf[a];
  } // returns locale data


  function ab(a) {
    var b;
    if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return qf;

    if (!c(a)) {
      if (b = Ya(a)) return b;
      a = [a];
    }

    return Xa(a);
  }

  function bb() {
    return oe(uf);
  }

  function cb(a) {
    var b,
        c = a._a;
    return c && -2 === l(a).overflow && (b = c[We] < 0 || c[We] > 11 ? We : c[Xe] < 1 || c[Xe] > da(c[Ve], c[We]) ? Xe : c[Ye] < 0 || c[Ye] > 24 || 24 === c[Ye] && (0 !== c[Ze] || 0 !== c[$e] || 0 !== c[_e]) ? Ye : c[Ze] < 0 || c[Ze] > 59 ? Ze : c[$e] < 0 || c[$e] > 59 ? $e : c[_e] < 0 || c[_e] > 999 ? _e : -1, l(a)._overflowDayOfYear && (Ve > b || b > Xe) && (b = Xe), l(a)._overflowWeeks && -1 === b && (b = af), l(a)._overflowWeekday && -1 === b && (b = bf), l(a).overflow = b), a;
  } // date from iso format


  function db(a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h = a._i,
        i = vf.exec(h) || wf.exec(h);

    if (i) {
      for (l(a).iso = !0, b = 0, c = yf.length; c > b; b++) {
        if (yf[b][1].exec(i[1])) {
          e = yf[b][0], d = yf[b][2] !== !1;
          break;
        }
      }

      if (null == e) return void (a._isValid = !1);

      if (i[3]) {
        for (b = 0, c = zf.length; c > b; b++) {
          if (zf[b][1].exec(i[3])) {
            // match[2] should be 'T' or space
            f = (i[2] || " ") + zf[b][0];
            break;
          }
        }

        if (null == f) return void (a._isValid = !1);
      }

      if (!d && null != f) return void (a._isValid = !1);

      if (i[4]) {
        if (!xf.exec(i[4])) return void (a._isValid = !1);
        g = "Z";
      }

      a._f = e + (f || "") + (g || ""), jb(a);
    } else a._isValid = !1;
  } // date from iso format or fallback


  function eb(b) {
    var c = Af.exec(b._i);
    return null !== c ? void (b._d = new Date(+c[1])) : (db(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))));
  } // Pick the first defined of two or three arguments.


  function fb(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }

  function gb(b) {
    // hooks is actually the exported moment object
    var c = new Date(a.now());
    return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]


  function hb(a) {
    var b,
        c,
        d,
        e,
        f = [];

    if (!a._d) {
      // Default to current date.
      // * if no year, month, day of month are given, default to today
      // * if day of month is given, default month and year
      // * if month is given, default only year
      // * if year is given, don't default anything
      for (d = gb(a), a._w && null == a._a[Xe] && null == a._a[We] && ib(a), a._dayOfYear && (e = fb(a._a[Ve], d[Ve]), a._dayOfYear > oa(e) && (l(a)._overflowDayOfYear = !0), c = sa(e, 0, a._dayOfYear), a._a[We] = c.getUTCMonth(), a._a[Xe] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) {
        a._a[b] = f[b] = d[b];
      } // Zero out whatever was not defaulted, including time


      for (; 7 > b; b++) {
        a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
      } // Check for 24:00:00.000


      24 === a._a[Ye] && 0 === a._a[Ze] && 0 === a._a[$e] && 0 === a._a[_e] && (a._nextDay = !0, a._a[Ye] = 0), a._d = (a._useUTC ? sa : ra).apply(null, f), // Apply timezone offset from input. The actual utcOffset can be changed
      // with parseZone.
      null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[Ye] = 24);
    }
  }

  function ib(a) {
    var b, c, d, e, f, g, h, i;
    b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = fb(b.GG, a._a[Ve], va(rb(), 1, 4).year), d = fb(b.W, 1), e = fb(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = fb(b.gg, a._a[Ve], va(rb(), f, g).year), d = fb(b.w, 1), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > wa(c, f, g) ? l(a)._overflowWeeks = !0 : null != i ? l(a)._overflowWeekday = !0 : (h = ua(c, d, e, f, g), a._a[Ve] = h.year, a._dayOfYear = h.dayOfYear);
  } // date from string and format string


  function jb(b) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (b._f === a.ISO_8601) return void db(b);
    b._a = [], l(b).empty = !0; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var c,
        d,
        e,
        f,
        g,
        h = "" + b._i,
        i = h.length,
        j = 0;

    for (e = X(b._f, b._locale).match(ye) || [], c = 0; c < e.length; c++) {
      f = e[c], d = (h.match(Z(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && l(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Be[f] ? (d ? l(b).empty = !1 : l(b).unusedTokens.push(f), ca(f, d, b)) : b._strict && !d && l(b).unusedTokens.push(f);
    } // add remaining unparsed input length to the string


    l(b).charsLeftOver = i - j, h.length > 0 && l(b).unusedInput.push(h), // clear _12h flag if hour is <= 12
    b._a[Ye] <= 12 && l(b).bigHour === !0 && b._a[Ye] > 0 && (l(b).bigHour = void 0), l(b).parsedDateParts = b._a.slice(0), l(b).meridiem = b._meridiem, // handle meridiem
    b._a[Ye] = kb(b._locale, b._a[Ye], b._meridiem), hb(b), cb(b);
  }

  function kb(a, b, c) {
    var d; // Fallback

    return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b;
  } // date from string and array of format strings


  function lb(a) {
    var b, c, d, e, f;
    if (0 === a._f.length) return l(a).invalidFormat = !0, void (a._d = new Date(NaN));

    for (e = 0; e < a._f.length; e++) {
      f = 0, b = p({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], jb(b), m(b) && (f += l(b).charsLeftOver, f += 10 * l(b).unusedTokens.length, l(b).score = f, (null == d || d > f) && (d = f, c = b));
    }

    i(a, c || b);
  }

  function mb(a) {
    if (!a._d) {
      var b = K(a._i);
      a._a = g([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
        return a && parseInt(a, 10);
      }), hb(a);
    }
  }

  function nb(a) {
    var b = new q(cb(ob(a))); // Adding is smart enough around DST

    return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b;
  }

  function ob(a) {
    var b = a._i,
        d = a._f;
    return a._locale = a._locale || ab(a._l), null === b || void 0 === d && "" === b ? n({
      nullInput: !0
    }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), r(b) ? new q(cb(b)) : (c(d) ? lb(a) : f(b) ? a._d = b : d ? jb(a) : pb(a), m(a) || (a._d = null), a));
  }

  function pb(b) {
    var d = b._i;
    void 0 === d ? b._d = new Date(a.now()) : f(d) ? b._d = new Date(d.valueOf()) : "string" == typeof d ? eb(b) : c(d) ? (b._a = g(d.slice(0), function (a) {
      return parseInt(a, 10);
    }), hb(b)) : "object" == _typeof(d) ? mb(b) : "number" == typeof d ? // from milliseconds
    b._d = new Date(d) : a.createFromInputFallback(b);
  }

  function qb(a, b, f, g, h) {
    var i = {}; // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423

    return "boolean" == typeof f && (g = f, f = void 0), (d(a) && e(a) || c(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = f, i._i = a, i._f = b, i._strict = g, nb(i);
  }

  function rb(a, b, c, d) {
    return qb(a, b, c, d, !1);
  } // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.


  function sb(a, b) {
    var d, e;
    if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return rb();

    for (d = b[0], e = 1; e < b.length; ++e) {
      b[e].isValid() && !b[e][a](d) || (d = b[e]);
    }

    return d;
  } // TODO: Use [].sort instead?


  function tb() {
    var a = [].slice.call(arguments, 0);
    return sb("isBefore", a);
  }

  function ub() {
    var a = [].slice.call(arguments, 0);
    return sb("isAfter", a);
  }

  function vb(a) {
    var b = K(a),
        c = b.year || 0,
        d = b.quarter || 0,
        e = b.month || 0,
        f = b.week || 0,
        g = b.day || 0,
        h = b.hour || 0,
        i = b.minute || 0,
        j = b.second || 0,
        k = b.millisecond || 0; // representation for dateAddRemove

    this._milliseconds = +k + 1e3 * j + // 1000
    6e4 * i + // 1000 * 60
    1e3 * h * 60 * 60, //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +g + 7 * f, // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = ab(), this._bubble();
  }

  function wb(a) {
    return a instanceof vb;
  } // FORMATTING


  function xb(a, b) {
    T(a, 0, 0, function () {
      var a = this.utcOffset(),
          c = "+";
      return 0 > a && (a = -a, c = "-"), c + S(~~(a / 60), 2) + b + S(~~a % 60, 2);
    });
  }

  function yb(a, b) {
    var c = (b || "").match(a) || [],
        d = c[c.length - 1] || [],
        e = (d + "").match(Ef) || ["-", 0, 0],
        f = +(60 * e[1]) + t(e[2]);
    return "+" === e[0] ? f : -f;
  } // Return a moment from input, that is local/utc/zone equivalent to model.


  function zb(b, c) {
    var d, e; // Use low-level api, because this fn is low-level api.

    return c._isUTC ? (d = c.clone(), e = (r(b) || f(b) ? b.valueOf() : rb(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : rb(b).local();
  }

  function Ab(a) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  } // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.


  function Bb(b, c) {
    var d,
        e = this._offset || 0;
    return this.isValid() ? null != b ? ("string" == typeof b ? b = yb(Qe, b) : Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ab(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? Sb(this, Mb(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ab(this) : null != b ? this : NaN;
  }

  function Cb(a, b) {
    return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
  }

  function Db(a) {
    return this.utcOffset(0, a);
  }

  function Eb(a) {
    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ab(this), "m")), this;
  }

  function Fb() {
    return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(yb(Pe, this._i)), this;
  }

  function Gb(a) {
    return this.isValid() ? (a = a ? rb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0) : !1;
  }

  function Hb() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function Ib() {
    if (!o(this._isDSTShifted)) return this._isDSTShifted;
    var a = {};

    if (p(a, this), a = ob(a), a._a) {
      var b = a._isUTC ? j(a._a) : rb(a._a);
      this._isDSTShifted = this.isValid() && u(a._a, b.toArray()) > 0;
    } else this._isDSTShifted = !1;

    return this._isDSTShifted;
  }

  function Jb() {
    return this.isValid() ? !this._isUTC : !1;
  }

  function Kb() {
    return this.isValid() ? this._isUTC : !1;
  }

  function Lb() {
    return this.isValid() ? this._isUTC && 0 === this._offset : !1;
  }

  function Mb(a, b) {
    var c,
        d,
        e,
        f = a,
        // matching against regexp is expensive, do it on demand
    g = null; // checks for null or undefined

    return wb(a) ? f = {
      ms: a._milliseconds,
      d: a._days,
      M: a._months
    } : "number" == typeof a ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (g = Ff.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
      y: 0,
      d: t(g[Xe]) * c,
      h: t(g[Ye]) * c,
      m: t(g[Ze]) * c,
      s: t(g[$e]) * c,
      ms: t(g[_e]) * c
    }) : (g = Gf.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
      y: Nb(g[2], c),
      M: Nb(g[3], c),
      w: Nb(g[4], c),
      d: Nb(g[5], c),
      h: Nb(g[6], c),
      m: Nb(g[7], c),
      s: Nb(g[8], c)
    }) : null == f ? f = {} : "object" == _typeof(f) && ("from" in f || "to" in f) && (e = Pb(rb(f.from), rb(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new vb(f), wb(a) && h(a, "_locale") && (d._locale = a._locale), d;
  }

  function Nb(a, b) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var c = a && parseFloat(a.replace(",", ".")); // apply sign while we're at it

    return (isNaN(c) ? 0 : c) * b;
  }

  function Ob(a, b) {
    var c = {
      milliseconds: 0,
      months: 0
    };
    return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
  }

  function Pb(a, b) {
    var c;
    return a.isValid() && b.isValid() ? (b = zb(b, a), a.isBefore(b) ? c = Ob(a, b) : (c = Ob(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
      milliseconds: 0,
      months: 0
    };
  }

  function Qb(a) {
    return 0 > a ? -1 * Math.round(-1 * a) : Math.round(a);
  } // TODO: remove 'name' arg after deprecation is removed


  function Rb(a, b) {
    return function (c, d) {
      var e, f; //invert the arguments, but complain about it

      return null === d || isNaN(+d) || (x(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Mb(c, d), Sb(this, e, a), this;
    };
  }

  function Sb(b, c, d, e) {
    var f = c._milliseconds,
        g = Qb(c._days),
        h = Qb(c._months);
    b.isValid() && (e = null == e ? !0 : e, f && b._d.setTime(b._d.valueOf() + f * d), g && P(b, "Date", O(b, "Date") + g * d), h && ia(b, O(b, "Month") + h * d), e && a.updateOffset(b, g || h));
  }

  function Tb(a, b) {
    var c = a.diff(b, "days", !0);
    return -6 > c ? "sameElse" : -1 > c ? "lastWeek" : 0 > c ? "lastDay" : 1 > c ? "sameDay" : 2 > c ? "nextDay" : 7 > c ? "nextWeek" : "sameElse";
  }

  function Ub(b, c) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var d = b || rb(),
        e = zb(d, this).startOf("day"),
        f = a.calendarFormat(this, e) || "sameElse",
        g = c && (y(c[f]) ? c[f].call(this, d) : c[f]);
    return this.format(g || this.localeData().calendar(f, this, rb(d)));
  }

  function Vb() {
    return new q(this);
  }

  function Wb(a, b) {
    var c = r(a) ? a : rb(a);
    return this.isValid() && c.isValid() ? (b = J(o(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf()) : !1;
  }

  function Xb(a, b) {
    var c = r(a) ? a : rb(a);
    return this.isValid() && c.isValid() ? (b = J(o(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf()) : !1;
  }

  function Yb(a, b, c, d) {
    return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c));
  }

  function Zb(a, b) {
    var c,
        d = r(a) ? a : rb(a);
    return this.isValid() && d.isValid() ? (b = J(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf())) : !1;
  }

  function $b(a, b) {
    return this.isSame(a, b) || this.isAfter(a, b);
  }

  function _b(a, b) {
    return this.isSame(a, b) || this.isBefore(a, b);
  }

  function ac(a, b, c) {
    var d, e, f, g; // 1000
    // 1000 * 60
    // 1000 * 60 * 60
    // 1000 * 60 * 60 * 24, negate dst
    // 1000 * 60 * 60 * 24 * 7, negate dst

    return this.isValid() ? (d = zb(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = J(b), "year" === b || "month" === b || "quarter" === b ? (g = bc(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : s(g)) : NaN) : NaN;
  }

  function bc(a, b) {
    // difference in months
    var c,
        d,
        e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
    f = a.clone().add(e, "months"); //check for negative zero, return zero if negative zero
    // linear across the month
    // linear across the month

    return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0;
  }

  function cc() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }

  function dc() {
    var a = this.clone().utc();
    return 0 < a.year() && a.year() <= 9999 ? y(Date.prototype.toISOString) ? this.toDate().toISOString() : W(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : W(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  }

  function ec(b) {
    b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
    var c = W(this, b);
    return this.localeData().postformat(c);
  }

  function fc(a, b) {
    return this.isValid() && (r(a) && a.isValid() || rb(a).isValid()) ? Mb({
      to: this,
      from: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }

  function gc(a) {
    return this.from(rb(), a);
  }

  function hc(a, b) {
    return this.isValid() && (r(a) && a.isValid() || rb(a).isValid()) ? Mb({
      from: this,
      to: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }

  function ic(a) {
    return this.to(rb(), a);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.


  function jc(a) {
    var b;
    return void 0 === a ? this._locale._abbr : (b = ab(a), null != b && (this._locale = b), this);
  }

  function kc() {
    return this._locale;
  }

  function lc(a) {
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (a = J(a)) {
      case "year":
        this.month(0);

      /* falls through */

      case "quarter":
      case "month":
        this.date(1);

      /* falls through */

      case "week":
      case "isoWeek":
      case "day":
      case "date":
        this.hours(0);

      /* falls through */

      case "hour":
        this.minutes(0);

      /* falls through */

      case "minute":
        this.seconds(0);

      /* falls through */

      case "second":
        this.milliseconds(0);
    } // weeks are a special case
    // quarters are also special


    return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this;
  }

  function mc(a) {
    // 'date' is an alias for 'day', so it should be considered as such.
    return a = J(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"));
  }

  function nc() {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }

  function oc() {
    return Math.floor(this.valueOf() / 1e3);
  }

  function pc() {
    return new Date(this.valueOf());
  }

  function qc() {
    var a = this;
    return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()];
  }

  function rc() {
    var a = this;
    return {
      years: a.year(),
      months: a.month(),
      date: a.date(),
      hours: a.hours(),
      minutes: a.minutes(),
      seconds: a.seconds(),
      milliseconds: a.milliseconds()
    };
  }

  function sc() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function tc() {
    return m(this);
  }

  function uc() {
    return i({}, l(this));
  }

  function vc() {
    return l(this).overflow;
  }

  function wc() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }

  function xc(a, b) {
    T(0, [a, a.length], 0, b);
  } // MOMENTS


  function yc(a) {
    return Cc.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function zc(a) {
    return Cc.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function Ac() {
    return wa(this.year(), 1, 4);
  }

  function Bc() {
    var a = this.localeData()._week;

    return wa(this.year(), a.dow, a.doy);
  }

  function Cc(a, b, c, d, e) {
    var f;
    return null == a ? va(this, d, e).year : (f = wa(a, d, e), b > f && (b = f), Dc.call(this, a, b, c, d, e));
  }

  function Dc(a, b, c, d, e) {
    var f = ua(a, b, c, d, e),
        g = sa(f.year, 0, f.dayOfYear);
    return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this;
  } // MOMENTS


  function Ec(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
  } // HELPERS
  // MOMENTS


  function Fc(a) {
    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return null == a ? b : this.add(a - b, "d");
  }

  function Gc(a, b) {
    b[_e] = t(1e3 * ("0." + a));
  } // MOMENTS


  function Hc() {
    return this._isUTC ? "UTC" : "";
  }

  function Ic() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }

  function Jc(a) {
    return rb(1e3 * a);
  }

  function Kc() {
    return rb.apply(null, arguments).parseZone();
  }

  function Lc(a) {
    return a;
  }

  function Mc(a, b, c, d) {
    var e = ab(),
        f = j().set(d, b);
    return e[c](f, a);
  }

  function Nc(a, b, c) {
    if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return Mc(a, b, c, "month");
    var d,
        e = [];

    for (d = 0; 12 > d; d++) {
      e[d] = Mc(a, d, c, "month");
    }

    return e;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)


  function Oc(a, b, c, d) {
    "boolean" == typeof a ? ("number" == typeof b && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, "number" == typeof b && (c = b, b = void 0), b = b || "");
    var e = ab(),
        f = a ? e._week.dow : 0;
    if (null != c) return Mc(b, (c + f) % 7, d, "day");
    var g,
        h = [];

    for (g = 0; 7 > g; g++) {
      h[g] = Mc(b, (g + f) % 7, d, "day");
    }

    return h;
  }

  function Pc(a, b) {
    return Nc(a, b, "months");
  }

  function Qc(a, b) {
    return Nc(a, b, "monthsShort");
  }

  function Rc(a, b, c) {
    return Oc(a, b, c, "weekdays");
  }

  function Sc(a, b, c) {
    return Oc(a, b, c, "weekdaysShort");
  }

  function Tc(a, b, c) {
    return Oc(a, b, c, "weekdaysMin");
  }

  function Uc() {
    var a = this._data;
    return this._milliseconds = Sf(this._milliseconds), this._days = Sf(this._days), this._months = Sf(this._months), a.milliseconds = Sf(a.milliseconds), a.seconds = Sf(a.seconds), a.minutes = Sf(a.minutes), a.hours = Sf(a.hours), a.months = Sf(a.months), a.years = Sf(a.years), this;
  }

  function Vc(a, b, c, d) {
    var e = Mb(b, c);
    return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)


  function Wc(a, b) {
    return Vc(this, a, b, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)


  function Xc(a, b) {
    return Vc(this, a, b, -1);
  }

  function Yc(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a);
  }

  function Zc() {
    var a,
        b,
        c,
        d,
        e,
        f = this._milliseconds,
        g = this._days,
        h = this._months,
        i = this._data; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    // The following code bubbles up values, see the tests for
    // examples of what that means.
    // convert days to months
    // 12 months -> 1 year

    return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * Yc(_c(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = s(f / 1e3), i.seconds = a % 60, b = s(a / 60), i.minutes = b % 60, c = s(b / 60), i.hours = c % 24, g += s(c / 24), e = s($c(g)), h += e, g -= Yc(_c(e)), d = s(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this;
  }

  function $c(a) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return 4800 * a / 146097;
  }

  function _c(a) {
    // the reverse of daysToMonths
    return 146097 * a / 4800;
  }

  function ad(a) {
    var b,
        c,
        d = this._milliseconds;
    if (a = J(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + $c(b), "month" === a ? c : c / 12;

    switch (b = this._days + Math.round(_c(this._months)), a) {
      case "week":
        return b / 7 + d / 6048e5;

      case "day":
        return b + d / 864e5;

      case "hour":
        return 24 * b + d / 36e5;

      case "minute":
        return 1440 * b + d / 6e4;

      case "second":
        return 86400 * b + d / 1e3;
      // Math.floor prevents floating point math errors here

      case "millisecond":
        return Math.floor(864e5 * b) + d;

      default:
        throw new Error("Unknown unit " + a);
    }
  } // TODO: Use this.as('ms')?


  function bd() {
    return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * t(this._months / 12);
  }

  function cd(a) {
    return function () {
      return this.as(a);
    };
  }

  function dd(a) {
    return a = J(a), this[a + "s"]();
  }

  function ed(a) {
    return function () {
      return this._data[a];
    };
  }

  function fd() {
    return s(this.days() / 7);
  } // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize


  function gd(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }

  function hd(a, b, c) {
    var d = Mb(a).abs(),
        e = gg(d.as("s")),
        f = gg(d.as("m")),
        g = gg(d.as("h")),
        h = gg(d.as("d")),
        i = gg(d.as("M")),
        j = gg(d.as("y")),
        k = e < hg.s && ["s", e] || 1 >= f && ["m"] || f < hg.m && ["mm", f] || 1 >= g && ["h"] || g < hg.h && ["hh", g] || 1 >= h && ["d"] || h < hg.d && ["dd", h] || 1 >= i && ["M"] || i < hg.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j];
    return k[2] = b, k[3] = +a > 0, k[4] = c, gd.apply(null, k);
  } // This function allows you to set the rounding function for relative time strings


  function id(a) {
    return void 0 === a ? gg : "function" == typeof a ? (gg = a, !0) : !1;
  } // This function allows you to set a threshold for relative time strings


  function jd(a, b) {
    return void 0 === hg[a] ? !1 : void 0 === b ? hg[a] : (hg[a] = b, !0);
  }

  function kd(a) {
    var b = this.localeData(),
        c = hd(this, !a, b);
    return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }

  function ld() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    var a,
        b,
        c,
        d = ig(this._milliseconds) / 1e3,
        e = ig(this._days),
        f = ig(this._months);
    a = s(d / 60), b = s(a / 60), d %= 60, a %= 60, c = s(f / 12), f %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    var g = c,
        h = f,
        i = e,
        j = b,
        k = a,
        l = d,
        m = this.asSeconds();
    return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D";
  }

  function md(a, b) {
    var c = a.split("_");
    return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && 4 >= b % 10 && (10 > b % 100 || b % 100 >= 20) ? c[1] : c[2];
  }

  function nd(a, b, c) {
    var d = {
      mm: b ? "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ð°_Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñ‹_Ñ…Ð²Ñ–Ð»Ñ–Ð½" : "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñƒ_Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñ‹_Ñ…Ð²Ñ–Ð»Ñ–Ð½",
      hh: b ? "Ð³Ð°Ð´Ð·Ñ–Ð½Ð°_Ð³Ð°Ð´Ð·Ñ–Ð½Ñ‹_Ð³Ð°Ð´Ð·Ñ–Ð½" : "Ð³Ð°Ð´Ð·Ñ–Ð½Ñƒ_Ð³Ð°Ð´Ð·Ñ–Ð½Ñ‹_Ð³Ð°Ð´Ð·Ñ–Ð½",
      dd: "Ð´Ð·ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð·Ñ‘Ð½",
      MM: "Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ñ‹_Ð¼ÐµÑÑÑ†Ð°Ñž",
      yy: "Ð³Ð¾Ð´_Ð³Ð°Ð´Ñ‹_Ð³Ð°Ð´Ð¾Ñž"
    };
    return "m" === c ? b ? "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ð°" : "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñƒ" : "h" === c ? b ? "Ð³Ð°Ð´Ð·Ñ–Ð½Ð°" : "Ð³Ð°Ð´Ð·Ñ–Ð½Ñƒ" : a + " " + md(d[c], +a);
  }

  function od(a, b, c) {
    var d = {
      mm: "munutenn",
      MM: "miz",
      dd: "devezh"
    };
    return a + " " + rd(d[c], a);
  }

  function pd(a) {
    switch (qd(a)) {
      case 1:
      case 3:
      case 4:
      case 5:
      case 9:
        return a + " bloaz";

      default:
        return a + " vloaz";
    }
  }

  function qd(a) {
    return a > 9 ? qd(a % 10) : a;
  }

  function rd(a, b) {
    return 2 === b ? sd(a) : a;
  }

  function sd(a) {
    var b = {
      m: "v",
      b: "v",
      d: "z"
    };
    return void 0 === b[a.charAt(0)] ? a : b[a.charAt(0)] + a.substring(1);
  }

  function td(a, b, c) {
    var d = a + " ";

    switch (c) {
      case "m":
        return b ? "jedna minuta" : "jedne minute";

      case "mm":
        return d += 1 === a ? "minuta" : 2 === a || 3 === a || 4 === a ? "minute" : "minuta";

      case "h":
        return b ? "jedan sat" : "jednog sata";

      case "hh":
        return d += 1 === a ? "sat" : 2 === a || 3 === a || 4 === a ? "sata" : "sati";

      case "dd":
        return d += 1 === a ? "dan" : "dana";

      case "MM":
        return d += 1 === a ? "mjesec" : 2 === a || 3 === a || 4 === a ? "mjeseca" : "mjeseci";

      case "yy":
        return d += 1 === a ? "godina" : 2 === a || 3 === a || 4 === a ? "godine" : "godina";
    }
  }

  function ud(a) {
    return a > 1 && 5 > a && 1 !== ~~(a / 10);
  }

  function vd(a, b, c, d) {
    var e = a + " ";

    switch (c) {
      case "s":
        // a few seconds / in a few seconds / a few seconds ago
        return b || d ? "pÃ¡r sekund" : "pÃ¡r sekundami";

      case "m":
        // a minute / in a minute / a minute ago
        return b ? "minuta" : d ? "minutu" : "minutou";

      case "mm":
        // 9 minutes / in 9 minutes / 9 minutes ago
        // 9 minutes / in 9 minutes / 9 minutes ago
        return b || d ? e + (ud(a) ? "minuty" : "minut") : e + "minutami";
        break;

      case "h":
        // an hour / in an hour / an hour ago
        return b ? "hodina" : d ? "hodinu" : "hodinou";

      case "hh":
        // 9 hours / in 9 hours / 9 hours ago
        // 9 hours / in 9 hours / 9 hours ago
        return b || d ? e + (ud(a) ? "hodiny" : "hodin") : e + "hodinami";
        break;

      case "d":
        // a day / in a day / a day ago
        return b || d ? "den" : "dnem";

      case "dd":
        // 9 days / in 9 days / 9 days ago
        // 9 days / in 9 days / 9 days ago
        return b || d ? e + (ud(a) ? "dny" : "dnÃ­") : e + "dny";
        break;

      case "M":
        // a month / in a month / a month ago
        return b || d ? "mÄ›sÃ­c" : "mÄ›sÃ­cem";

      case "MM":
        // 9 months / in 9 months / 9 months ago
        // 9 months / in 9 months / 9 months ago
        return b || d ? e + (ud(a) ? "mÄ›sÃ­ce" : "mÄ›sÃ­cÅ¯") : e + "mÄ›sÃ­ci";
        break;

      case "y":
        // a year / in a year / a year ago
        return b || d ? "rok" : "rokem";

      case "yy":
        // 9 years / in 9 years / 9 years ago
        // 9 years / in 9 years / 9 years ago
        return b || d ? e + (ud(a) ? "roky" : "let") : e + "lety";
    }
  }

  function wd(a, b, c, d) {
    var e = {
      m: ["eine Minute", "einer Minute"],
      h: ["eine Stunde", "einer Stunde"],
      d: ["ein Tag", "einem Tag"],
      dd: [a + " Tage", a + " Tagen"],
      M: ["ein Monat", "einem Monat"],
      MM: [a + " Monate", a + " Monaten"],
      y: ["ein Jahr", "einem Jahr"],
      yy: [a + " Jahre", a + " Jahren"]
    };
    return b ? e[c][0] : e[c][1];
  }

  function xd(a, b, c, d) {
    var e = {
      m: ["eine Minute", "einer Minute"],
      h: ["eine Stunde", "einer Stunde"],
      d: ["ein Tag", "einem Tag"],
      dd: [a + " Tage", a + " Tagen"],
      M: ["ein Monat", "einem Monat"],
      MM: [a + " Monate", a + " Monaten"],
      y: ["ein Jahr", "einem Jahr"],
      yy: [a + " Jahre", a + " Jahren"]
    };
    return b ? e[c][0] : e[c][1];
  }

  function yd(a, b, c, d) {
    var e = {
      s: ["mÃµne sekundi", "mÃµni sekund", "paar sekundit"],
      m: ["Ã¼he minuti", "Ã¼ks minut"],
      mm: [a + " minuti", a + " minutit"],
      h: ["Ã¼he tunni", "tund aega", "Ã¼ks tund"],
      hh: [a + " tunni", a + " tundi"],
      d: ["Ã¼he pÃ¤eva", "Ã¼ks pÃ¤ev"],
      M: ["kuu aja", "kuu aega", "Ã¼ks kuu"],
      MM: [a + " kuu", a + " kuud"],
      y: ["Ã¼he aasta", "aasta", "Ã¼ks aasta"],
      yy: [a + " aasta", a + " aastat"]
    };
    return b ? e[c][2] ? e[c][2] : e[c][1] : d ? e[c][0] : e[c][1];
  }

  function zd(a, b, c, d) {
    var e = "";

    switch (c) {
      case "s":
        return d ? "muutaman sekunnin" : "muutama sekunti";

      case "m":
        return d ? "minuutin" : "minuutti";

      case "mm":
        e = d ? "minuutin" : "minuuttia";
        break;

      case "h":
        return d ? "tunnin" : "tunti";

      case "hh":
        e = d ? "tunnin" : "tuntia";
        break;

      case "d":
        return d ? "pÃ¤ivÃ¤n" : "pÃ¤ivÃ¤";

      case "dd":
        e = d ? "pÃ¤ivÃ¤n" : "pÃ¤ivÃ¤Ã¤";
        break;

      case "M":
        return d ? "kuukauden" : "kuukausi";

      case "MM":
        e = d ? "kuukauden" : "kuukautta";
        break;

      case "y":
        return d ? "vuoden" : "vuosi";

      case "yy":
        e = d ? "vuoden" : "vuotta";
    }

    return e = Ad(a, d) + " " + e;
  }

  function Ad(a, b) {
    return 10 > a ? b ? Jg[a] : Ig[a] : a;
  }

  function Bd(a, b, c) {
    var d = a + " ";

    switch (c) {
      case "m":
        return b ? "jedna minuta" : "jedne minute";

      case "mm":
        return d += 1 === a ? "minuta" : 2 === a || 3 === a || 4 === a ? "minute" : "minuta";

      case "h":
        return b ? "jedan sat" : "jednog sata";

      case "hh":
        return d += 1 === a ? "sat" : 2 === a || 3 === a || 4 === a ? "sata" : "sati";

      case "dd":
        return d += 1 === a ? "dan" : "dana";

      case "MM":
        return d += 1 === a ? "mjesec" : 2 === a || 3 === a || 4 === a ? "mjeseca" : "mjeseci";

      case "yy":
        return d += 1 === a ? "godina" : 2 === a || 3 === a || 4 === a ? "godine" : "godina";
    }
  }

  function Cd(a, b, c, d) {
    var e = a;

    switch (c) {
      case "s":
        return d || b ? "nÃ©hÃ¡ny mÃ¡sodperc" : "nÃ©hÃ¡ny mÃ¡sodperce";

      case "m":
        return "egy" + (d || b ? " perc" : " perce");

      case "mm":
        return e + (d || b ? " perc" : " perce");

      case "h":
        return "egy" + (d || b ? " Ã³ra" : " Ã³rÃ¡ja");

      case "hh":
        return e + (d || b ? " Ã³ra" : " Ã³rÃ¡ja");

      case "d":
        return "egy" + (d || b ? " nap" : " napja");

      case "dd":
        return e + (d || b ? " nap" : " napja");

      case "M":
        return "egy" + (d || b ? " hÃ³nap" : " hÃ³napja");

      case "MM":
        return e + (d || b ? " hÃ³nap" : " hÃ³napja");

      case "y":
        return "egy" + (d || b ? " Ã©v" : " Ã©ve");

      case "yy":
        return e + (d || b ? " Ã©v" : " Ã©ve");
    }

    return "";
  }

  function Dd(a) {
    return (a ? "" : "[mÃºlt] ") + "[" + Tg[this.day()] + "] LT[-kor]";
  }

  function Ed(a) {
    return a % 100 === 11 ? !0 : a % 10 !== 1;
  }

  function Fd(a, b, c, d) {
    var e = a + " ";

    switch (c) {
      case "s":
        return b || d ? "nokkrar sekÃºndur" : "nokkrum sekÃºndum";

      case "m":
        return b ? "mÃ­nÃºta" : "mÃ­nÃºtu";

      case "mm":
        return Ed(a) ? e + (b || d ? "mÃ­nÃºtur" : "mÃ­nÃºtum") : b ? e + "mÃ­nÃºta" : e + "mÃ­nÃºtu";

      case "hh":
        return Ed(a) ? e + (b || d ? "klukkustundir" : "klukkustundum") : e + "klukkustund";

      case "d":
        return b ? "dagur" : d ? "dag" : "degi";

      case "dd":
        return Ed(a) ? b ? e + "dagar" : e + (d ? "daga" : "dÃ¶gum") : b ? e + "dagur" : e + (d ? "dag" : "degi");

      case "M":
        return b ? "mÃ¡nuÃ°ur" : d ? "mÃ¡nuÃ°" : "mÃ¡nuÃ°i";

      case "MM":
        return Ed(a) ? b ? e + "mÃ¡nuÃ°ir" : e + (d ? "mÃ¡nuÃ°i" : "mÃ¡nuÃ°um") : b ? e + "mÃ¡nuÃ°ur" : e + (d ? "mÃ¡nuÃ°" : "mÃ¡nuÃ°i");

      case "y":
        return b || d ? "Ã¡r" : "Ã¡ri";

      case "yy":
        return Ed(a) ? e + (b || d ? "Ã¡r" : "Ã¡rum") : e + (b || d ? "Ã¡r" : "Ã¡ri");
    }
  }

  function Gd(a, b, c, d) {
    var e = {
      m: ["eng Minutt", "enger Minutt"],
      h: ["eng Stonn", "enger Stonn"],
      d: ["een Dag", "engem Dag"],
      M: ["ee Mount", "engem Mount"],
      y: ["ee Joer", "engem Joer"]
    };
    return b ? e[c][0] : e[c][1];
  }

  function Hd(a) {
    var b = a.substr(0, a.indexOf(" "));
    return Jd(b) ? "a " + a : "an " + a;
  }

  function Id(a) {
    var b = a.substr(0, a.indexOf(" "));
    return Jd(b) ? "viru " + a : "virun " + a;
  }
  /**
  * Returns true if the word before the given number loses the '-n' ending.
  * e.g. 'an 10 Deeg' but 'a 5 Deeg'
  *
  * @param number {integer}
  * @returns {boolean}
  */


  function Jd(a) {
    if (a = parseInt(a, 10), isNaN(a)) return !1;
    if (0 > a) // Negative Number --> always true
      return !0;
    if (10 > a) // Only 1 digit
      return a >= 4 && 7 >= a;

    if (100 > a) {
      // 2 digits
      var b = a % 10,
          c = a / 10;
      return Jd(0 === b ? c : b);
    }

    if (1e4 > a) {
      // 3 or 4 digits --> recursively check first digit
      for (; a >= 10;) {
        a /= 10;
      }

      return Jd(a);
    } // Anything larger than 4 digits: recursively check first n-3 digits


    return a /= 1e3, Jd(a);
  }

  function Kd(a, b, c, d) {
    return b ? "kelios sekundÄ—s" : d ? "keliÅ³ sekundÅ¾iÅ³" : "kelias sekundes";
  }

  function Ld(a, b, c, d) {
    return b ? Nd(c)[0] : d ? Nd(c)[1] : Nd(c)[2];
  }

  function Md(a) {
    return a % 10 === 0 || a > 10 && 20 > a;
  }

  function Nd(a) {
    return Wg[a].split("_");
  }

  function Od(a, b, c, d) {
    var e = a + " ";
    return 1 === a ? e + Ld(a, b, c[0], d) : b ? e + (Md(a) ? Nd(c)[1] : Nd(c)[0]) : d ? e + Nd(c)[1] : e + (Md(a) ? Nd(c)[1] : Nd(c)[2]);
  }
  /**
  * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
  */


  function Pd(a, b, c) {
    return c ? b % 10 === 1 && b % 100 !== 11 ? a[2] : a[3] : b % 10 === 1 && b % 100 !== 11 ? a[0] : a[1];
  }

  function Qd(a, b, c) {
    return a + " " + Pd(Xg[c], a, b);
  }

  function Rd(a, b, c) {
    return Pd(Xg[c], a, b);
  }

  function Sd(a, b) {
    return b ? "daÅ¾as sekundes" : "daÅ¾Äm sekundÄ“m";
  }

  function Td(a, b, c, d) {
    var e = "";
    if (b) switch (c) {
      case "s":
        e = "à¤•à¤¾à¤¹à¥€ à¤¸à¥‡à¤•à¤‚à¤¦";
        break;

      case "m":
        e = "à¤à¤• à¤®à¤¿à¤¨à¤¿à¤Ÿ";
        break;

      case "mm":
        e = "%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡";
        break;

      case "h":
        e = "à¤à¤• à¤¤à¤¾à¤¸";
        break;

      case "hh":
        e = "%d à¤¤à¤¾à¤¸";
        break;

      case "d":
        e = "à¤à¤• à¤¦à¤¿à¤µà¤¸";
        break;

      case "dd":
        e = "%d à¤¦à¤¿à¤µà¤¸";
        break;

      case "M":
        e = "à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾";
        break;

      case "MM":
        e = "%d à¤®à¤¹à¤¿à¤¨à¥‡";
        break;

      case "y":
        e = "à¤à¤• à¤µà¤°à¥à¤·";
        break;

      case "yy":
        e = "%d à¤µà¤°à¥à¤·à¥‡";
    } else switch (c) {
      case "s":
        e = "à¤•à¤¾à¤¹à¥€ à¤¸à¥‡à¤•à¤‚à¤¦à¤¾à¤‚";
        break;

      case "m":
        e = "à¤à¤•à¤¾ à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾";
        break;

      case "mm":
        e = "%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚";
        break;

      case "h":
        e = "à¤à¤•à¤¾ à¤¤à¤¾à¤¸à¤¾";
        break;

      case "hh":
        e = "%d à¤¤à¤¾à¤¸à¤¾à¤‚";
        break;

      case "d":
        e = "à¤à¤•à¤¾ à¤¦à¤¿à¤µà¤¸à¤¾";
        break;

      case "dd":
        e = "%d à¤¦à¤¿à¤µà¤¸à¤¾à¤‚";
        break;

      case "M":
        e = "à¤à¤•à¤¾ à¤®à¤¹à¤¿à¤¨à¥à¤¯à¤¾";
        break;

      case "MM":
        e = "%d à¤®à¤¹à¤¿à¤¨à¥à¤¯à¤¾à¤‚";
        break;

      case "y":
        e = "à¤à¤•à¤¾ à¤µà¤°à¥à¤·à¤¾";
        break;

      case "yy":
        e = "%d à¤µà¤°à¥à¤·à¤¾à¤‚";
    }
    return e.replace(/%d/i, a);
  }

  function Ud(a) {
    return 5 > a % 10 && a % 10 > 1 && ~~(a / 10) % 10 !== 1;
  }

  function Vd(a, b, c) {
    var d = a + " ";

    switch (c) {
      case "m":
        return b ? "minuta" : "minutÄ™";

      case "mm":
        return d + (Ud(a) ? "minuty" : "minut");

      case "h":
        return b ? "godzina" : "godzinÄ™";

      case "hh":
        return d + (Ud(a) ? "godziny" : "godzin");

      case "MM":
        return d + (Ud(a) ? "miesiÄ…ce" : "miesiÄ™cy");

      case "yy":
        return d + (Ud(a) ? "lata" : "lat");
    }
  }

  function Wd(a, b, c) {
    var d = {
      mm: "minute",
      hh: "ore",
      dd: "zile",
      MM: "luni",
      yy: "ani"
    },
        e = " ";
    return (a % 100 >= 20 || a >= 100 && a % 100 === 0) && (e = " de "), a + e + d[c];
  }

  function Xd(a, b) {
    var c = a.split("_");
    return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && 4 >= b % 10 && (10 > b % 100 || b % 100 >= 20) ? c[1] : c[2];
  }

  function Yd(a, b, c) {
    var d = {
      mm: b ? "Ð¼Ð¸Ð½ÑƒÑ‚Ð°_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚" : "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚",
      hh: "Ñ‡Ð°Ñ_Ñ‡Ð°ÑÐ°_Ñ‡Ð°ÑÐ¾Ð²",
      dd: "Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ_Ð´Ð½ÐµÐ¹",
      MM: "Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ð°_Ð¼ÐµÑÑÑ†ÐµÐ²",
      yy: "Ð³Ð¾Ð´_Ð³Ð¾Ð´Ð°_Ð»ÐµÑ‚"
    };
    return "m" === c ? b ? "Ð¼Ð¸Ð½ÑƒÑ‚Ð°" : "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ" : a + " " + Xd(d[c], +a);
  }

  function Zd(a) {
    return a > 1 && 5 > a;
  }

  function $d(a, b, c, d) {
    var e = a + " ";

    switch (c) {
      case "s":
        // a few seconds / in a few seconds / a few seconds ago
        return b || d ? "pÃ¡r sekÃºnd" : "pÃ¡r sekundami";

      case "m":
        // a minute / in a minute / a minute ago
        return b ? "minÃºta" : d ? "minÃºtu" : "minÃºtou";

      case "mm":
        // 9 minutes / in 9 minutes / 9 minutes ago
        // 9 minutes / in 9 minutes / 9 minutes ago
        return b || d ? e + (Zd(a) ? "minÃºty" : "minÃºt") : e + "minÃºtami";
        break;

      case "h":
        // an hour / in an hour / an hour ago
        return b ? "hodina" : d ? "hodinu" : "hodinou";

      case "hh":
        // 9 hours / in 9 hours / 9 hours ago
        // 9 hours / in 9 hours / 9 hours ago
        return b || d ? e + (Zd(a) ? "hodiny" : "hodÃ­n") : e + "hodinami";
        break;

      case "d":
        // a day / in a day / a day ago
        return b || d ? "deÅˆ" : "dÅˆom";

      case "dd":
        // 9 days / in 9 days / 9 days ago
        // 9 days / in 9 days / 9 days ago
        return b || d ? e + (Zd(a) ? "dni" : "dnÃ­") : e + "dÅˆami";
        break;

      case "M":
        // a month / in a month / a month ago
        return b || d ? "mesiac" : "mesiacom";

      case "MM":
        // 9 months / in 9 months / 9 months ago
        // 9 months / in 9 months / 9 months ago
        return b || d ? e + (Zd(a) ? "mesiace" : "mesiacov") : e + "mesiacmi";
        break;

      case "y":
        // a year / in a year / a year ago
        return b || d ? "rok" : "rokom";

      case "yy":
        // 9 years / in 9 years / 9 years ago
        // 9 years / in 9 years / 9 years ago
        return b || d ? e + (Zd(a) ? "roky" : "rokov") : e + "rokmi";
    }
  }

  function _d(a, b, c, d) {
    var e = a + " ";

    switch (c) {
      case "s":
        return b || d ? "nekaj sekund" : "nekaj sekundami";

      case "m":
        return b ? "ena minuta" : "eno minuto";

      case "mm":
        return e += 1 === a ? b ? "minuta" : "minuto" : 2 === a ? b || d ? "minuti" : "minutama" : 5 > a ? b || d ? "minute" : "minutami" : b || d ? "minut" : "minutami";

      case "h":
        return b ? "ena ura" : "eno uro";

      case "hh":
        return e += 1 === a ? b ? "ura" : "uro" : 2 === a ? b || d ? "uri" : "urama" : 5 > a ? b || d ? "ure" : "urami" : b || d ? "ur" : "urami";

      case "d":
        return b || d ? "en dan" : "enim dnem";

      case "dd":
        return e += 1 === a ? b || d ? "dan" : "dnem" : 2 === a ? b || d ? "dni" : "dnevoma" : b || d ? "dni" : "dnevi";

      case "M":
        return b || d ? "en mesec" : "enim mesecem";

      case "MM":
        return e += 1 === a ? b || d ? "mesec" : "mesecem" : 2 === a ? b || d ? "meseca" : "mesecema" : 5 > a ? b || d ? "mesece" : "meseci" : b || d ? "mesecev" : "meseci";

      case "y":
        return b || d ? "eno leto" : "enim letom";

      case "yy":
        return e += 1 === a ? b || d ? "leto" : "letom" : 2 === a ? b || d ? "leti" : "letoma" : 5 > a ? b || d ? "leta" : "leti" : b || d ? "let" : "leti";
    }
  }

  function ae(a) {
    var b = a;
    return b = -1 !== a.indexOf("jaj") ? b.slice(0, -3) + "leS" : -1 !== a.indexOf("jar") ? b.slice(0, -3) + "waQ" : -1 !== a.indexOf("DIS") ? b.slice(0, -3) + "nem" : b + " pIq";
  }

  function be(a) {
    var b = a;
    return b = -1 !== a.indexOf("jaj") ? b.slice(0, -3) + "Huâ€™" : -1 !== a.indexOf("jar") ? b.slice(0, -3) + "wen" : -1 !== a.indexOf("DIS") ? b.slice(0, -3) + "ben" : b + " ret";
  }

  function ce(a, b, c, d) {
    var e = de(a);

    switch (c) {
      case "mm":
        return e + " tup";

      case "hh":
        return e + " rep";

      case "dd":
        return e + " jaj";

      case "MM":
        return e + " jar";

      case "yy":
        return e + " DIS";
    }
  }

  function de(a) {
    var b = Math.floor(a % 1e3 / 100),
        c = Math.floor(a % 100 / 10),
        d = a % 10,
        e = "";
    return b > 0 && (e += qh[b] + "vatlh"), c > 0 && (e += ("" !== e ? " " : "") + qh[c] + "maH"), d > 0 && (e += ("" !== e ? " " : "") + qh[d]), "" === e ? "pagh" : e;
  }

  function ee(a, b, c, d) {
    var e = {
      s: ["viensas secunds", "'iensas secunds"],
      m: ["'n mÃ­ut", "'iens mÃ­ut"],
      mm: [a + " mÃ­uts", "" + a + " mÃ­uts"],
      h: ["'n Ã¾ora", "'iensa Ã¾ora"],
      hh: [a + " Ã¾oras", "" + a + " Ã¾oras"],
      d: ["'n ziua", "'iensa ziua"],
      dd: [a + " ziuas", "" + a + " ziuas"],
      M: ["'n mes", "'iens mes"],
      MM: [a + " mesen", "" + a + " mesen"],
      y: ["'n ar", "'iens ar"],
      yy: [a + " ars", "" + a + " ars"]
    };
    return d ? e[c][0] : b ? e[c][0] : e[c][1];
  }

  function fe(a, b) {
    var c = a.split("_");
    return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && 4 >= b % 10 && (10 > b % 100 || b % 100 >= 20) ? c[1] : c[2];
  }

  function ge(a, b, c) {
    var d = {
      mm: b ? "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½" : "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½",
      hh: b ? "Ð³Ð¾Ð´Ð¸Ð½Ð°_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½" : "Ð³Ð¾Ð´Ð¸Ð½Ñƒ_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½",
      dd: "Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð½Ñ–Ð²",
      MM: "Ð¼Ñ–ÑÑÑ†ÑŒ_Ð¼Ñ–ÑÑÑ†Ñ–_Ð¼Ñ–ÑÑÑ†Ñ–Ð²",
      yy: "Ñ€Ñ–Ðº_Ñ€Ð¾ÐºÐ¸_Ñ€Ð¾ÐºÑ–Ð²"
    };
    return "m" === c ? b ? "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°" : "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ" : "h" === c ? b ? "Ð³Ð¾Ð´Ð¸Ð½Ð°" : "Ð³Ð¾Ð´Ð¸Ð½Ñƒ" : a + " " + fe(d[c], +a);
  }

  function he(a, b) {
    var c = {
      nominative: "Ð½ÐµÐ´Ñ–Ð»Ñ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"),
      accusative: "Ð½ÐµÐ´Ñ–Ð»ÑŽ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†ÑŽ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ".split("_"),
      genitive: "Ð½ÐµÐ´Ñ–Ð»Ñ–_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»ÐºÐ°_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€ÐºÐ°_ÑÐµÑ€ÐµÐ´Ð¸_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³Ð°_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ–_ÑÑƒÐ±Ð¾Ñ‚Ð¸".split("_")
    },
        d = /(\[[Ð’Ð²Ð£Ñƒ]\]) ?dddd/.test(b) ? "accusative" : /\[?(?:Ð¼Ð¸Ð½ÑƒÐ»Ð¾Ñ—|Ð½Ð°ÑÑ‚ÑƒÐ¿Ð½Ð¾Ñ—)? ?\] ?dddd/.test(b) ? "genitive" : "nominative";
    return c[d][a.day()];
  }

  function ie(a) {
    return function () {
      return a + "Ð¾" + (11 === this.hours() ? "Ð±" : "") + "] LT";
    };
  }

  var je, ke;
  ke = Array.prototype.some ? Array.prototype.some : function (a) {
    for (var b = Object(this), c = b.length >>> 0, d = 0; c > d; d++) {
      if (d in b && a.call(this, b[d], d, b)) return !0;
    }

    return !1;
  }; // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.

  var le = a.momentProperties = [],
      me = !1,
      ne = {};
  a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;
  var oe;
  oe = Object.keys ? Object.keys : function (a) {
    var b,
        c = [];

    for (b in a) {
      h(a, b) && c.push(b);
    }

    return c;
  };
  var pe,
      qe = {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  },
      re = {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  },
      se = "Invalid date",
      te = "%d",
      ue = /\d{1,2}/,
      ve = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  },
      we = {},
      xe = {},
      ye = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      ze = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      Ae = {},
      Be = {},
      Ce = /\d/,
      De = /\d\d/,
      Ee = /\d{3}/,
      Fe = /\d{4}/,
      Ge = /[+-]?\d{6}/,
      He = /\d\d?/,
      Ie = /\d\d\d\d?/,
      Je = /\d\d\d\d\d\d?/,
      Ke = /\d{1,3}/,
      Le = /\d{1,4}/,
      Me = /[+-]?\d{1,6}/,
      Ne = /\d+/,
      Oe = /[+-]?\d+/,
      Pe = /Z|[+-]\d\d:?\d\d/gi,
      Qe = /Z|[+-]\d\d(?::?\d\d)?/gi,
      Re = /[+-]?\d+(\.\d{1,3})?/,
      Se = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
      Te = {},
      Ue = {},
      Ve = 0,
      We = 1,
      Xe = 2,
      Ye = 3,
      Ze = 4,
      $e = 5,
      _e = 6,
      af = 7,
      bf = 8;
  pe = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
    // I know
    var b;

    for (b = 0; b < this.length; ++b) {
      if (this[b] === a) return b;
    }

    return -1;
  }, T("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }), T("MMM", 0, 0, function (a) {
    return this.localeData().monthsShort(this, a);
  }), T("MMMM", 0, 0, function (a) {
    return this.localeData().months(this, a);
  }), I("month", "M"), L("month", 8), Y("M", He), Y("MM", He, De), Y("MMM", function (a, b) {
    return b.monthsShortRegex(a);
  }), Y("MMMM", function (a, b) {
    return b.monthsRegex(a);
  }), aa(["M", "MM"], function (a, b) {
    b[We] = t(a) - 1;
  }), aa(["MMM", "MMMM"], function (a, b, c, d) {
    var e = c._locale.monthsParse(a, d, c._strict);

    null != e ? b[We] = e : l(c).invalidMonth = a;
  }); // LOCALES

  var cf = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
      df = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ef = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      ff = Se,
      gf = Se; // FORMATTING

  T("Y", 0, 0, function () {
    var a = this.year();
    return 9999 >= a ? "" + a : "+" + a;
  }), T(0, ["YY", 2], 0, function () {
    return this.year() % 100;
  }), T(0, ["YYYY", 4], 0, "year"), T(0, ["YYYYY", 5], 0, "year"), T(0, ["YYYYYY", 6, !0], 0, "year"), // ALIASES
  I("year", "y"), // PRIORITIES
  L("year", 1), // PARSING
  Y("Y", Oe), Y("YY", He, De), Y("YYYY", Le, Fe), Y("YYYYY", Me, Ge), Y("YYYYYY", Me, Ge), aa(["YYYYY", "YYYYYY"], Ve), aa("YYYY", function (b, c) {
    c[Ve] = 2 === b.length ? a.parseTwoDigitYear(b) : t(b);
  }), aa("YY", function (b, c) {
    c[Ve] = a.parseTwoDigitYear(b);
  }), aa("Y", function (a, b) {
    b[Ve] = parseInt(a, 10);
  }), // HOOKS
  a.parseTwoDigitYear = function (a) {
    return t(a) + (t(a) > 68 ? 1900 : 2e3);
  }; // MOMENTS

  var hf = N("FullYear", !0); // FORMATTING

  T("w", ["ww", 2], "wo", "week"), T("W", ["WW", 2], "Wo", "isoWeek"), // ALIASES
  I("week", "w"), I("isoWeek", "W"), // PRIORITIES
  L("week", 5), L("isoWeek", 5), // PARSING
  Y("w", He), Y("ww", He, De), Y("W", He), Y("WW", He, De), ba(["w", "ww", "W", "WW"], function (a, b, c, d) {
    b[d.substr(0, 1)] = t(a);
  });
  var jf = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
  }; // FORMATTING

  T("d", 0, "do", "day"), T("dd", 0, 0, function (a) {
    return this.localeData().weekdaysMin(this, a);
  }), T("ddd", 0, 0, function (a) {
    return this.localeData().weekdaysShort(this, a);
  }), T("dddd", 0, 0, function (a) {
    return this.localeData().weekdays(this, a);
  }), T("e", 0, 0, "weekday"), T("E", 0, 0, "isoWeekday"), // ALIASES
  I("day", "d"), I("weekday", "e"), I("isoWeekday", "E"), // PRIORITY
  L("day", 11), L("weekday", 11), L("isoWeekday", 11), // PARSING
  Y("d", He), Y("e", He), Y("E", He), Y("dd", function (a, b) {
    return b.weekdaysMinRegex(a);
  }), Y("ddd", function (a, b) {
    return b.weekdaysShortRegex(a);
  }), Y("dddd", function (a, b) {
    return b.weekdaysRegex(a);
  }), ba(["dd", "ddd", "dddd"], function (a, b, c, d) {
    var e = c._locale.weekdaysParse(a, d, c._strict); // if we didn't get a weekday name, mark the date as invalid


    null != e ? b.d = e : l(c).invalidWeekday = a;
  }), ba(["d", "e", "E"], function (a, b, c, d) {
    b[d] = t(a);
  }); // LOCALES

  var kf = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      lf = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      mf = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      nf = Se,
      of = Se,
      pf = Se;
  T("H", ["HH", 2], 0, "hour"), T("h", ["hh", 2], 0, Qa), T("k", ["kk", 2], 0, Ra), T("hmm", 0, 0, function () {
    return "" + Qa.apply(this) + S(this.minutes(), 2);
  }), T("hmmss", 0, 0, function () {
    return "" + Qa.apply(this) + S(this.minutes(), 2) + S(this.seconds(), 2);
  }), T("Hmm", 0, 0, function () {
    return "" + this.hours() + S(this.minutes(), 2);
  }), T("Hmmss", 0, 0, function () {
    return "" + this.hours() + S(this.minutes(), 2) + S(this.seconds(), 2);
  }), Sa("a", !0), Sa("A", !1), // ALIASES
  I("hour", "h"), // PRIORITY
  L("hour", 13), Y("a", Ta), Y("A", Ta), Y("H", He), Y("h", He), Y("HH", He, De), Y("hh", He, De), Y("hmm", Ie), Y("hmmss", Je), Y("Hmm", Ie), Y("Hmmss", Je), aa(["H", "HH"], Ye), aa(["a", "A"], function (a, b, c) {
    c._isPm = c._locale.isPM(a), c._meridiem = a;
  }), aa(["h", "hh"], function (a, b, c) {
    b[Ye] = t(a), l(c).bigHour = !0;
  }), aa("hmm", function (a, b, c) {
    var d = a.length - 2;
    b[Ye] = t(a.substr(0, d)), b[Ze] = t(a.substr(d)), l(c).bigHour = !0;
  }), aa("hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;
    b[Ye] = t(a.substr(0, d)), b[Ze] = t(a.substr(d, 2)), b[$e] = t(a.substr(e)), l(c).bigHour = !0;
  }), aa("Hmm", function (a, b, c) {
    var d = a.length - 2;
    b[Ye] = t(a.substr(0, d)), b[Ze] = t(a.substr(d));
  }), aa("Hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;
    b[Ye] = t(a.substr(0, d)), b[Ze] = t(a.substr(d, 2)), b[$e] = t(a.substr(e));
  });
  var qf,
      rf = /[ap]\.?m?\.?/i,
      sf = N("Hours", !0),
      tf = {
    calendar: qe,
    longDateFormat: re,
    invalidDate: se,
    ordinal: te,
    ordinalParse: ue,
    relativeTime: ve,
    months: df,
    monthsShort: ef,
    week: jf,
    weekdays: kf,
    weekdaysMin: mf,
    weekdaysShort: lf,
    meridiemParse: rf
  },
      uf = {},
      vf = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
      wf = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
      xf = /Z|[+-]\d\d(?::?\d\d)?/,
      yf = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], // YYYYMM is NOT allowed by the standard
  ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
      zf = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
      Af = /^\/?Date\((\-?\d+)/i;
  a.createFromInputFallback = w("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) {
    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
  }), // constant that refers to the ISO standard
  a.ISO_8601 = function () {};

  var Bf = w("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var a = rb.apply(null, arguments);
    return this.isValid() && a.isValid() ? this > a ? this : a : n();
  }),
      Cf = w("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var a = rb.apply(null, arguments);
    return this.isValid() && a.isValid() ? a > this ? this : a : n();
  }),
      Df = function Df() {
    return Date.now ? Date.now() : +new Date();
  };

  xb("Z", ":"), xb("ZZ", ""), // PARSING
  Y("Z", Qe), Y("ZZ", Qe), aa(["Z", "ZZ"], function (a, b, c) {
    c._useUTC = !0, c._tzm = yb(Qe, a);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var Ef = /([\+\-]|\d\d)/gi; // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.

  a.updateOffset = function () {}; // ASP.NET json date format regex


  var Ff = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
      Gf = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
  Mb.fn = vb.prototype;
  var Hf = Rb(1, "add"),
      If = Rb(-1, "subtract");
  a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  var Jf = w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
    return void 0 === a ? this.localeData() : this.locale(a);
  }); // FORMATTING

  T(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }), T(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
  }), xc("gggg", "weekYear"), xc("ggggg", "weekYear"), xc("GGGG", "isoWeekYear"), xc("GGGGG", "isoWeekYear"), // ALIASES
  I("weekYear", "gg"), I("isoWeekYear", "GG"), // PRIORITY
  L("weekYear", 1), L("isoWeekYear", 1), // PARSING
  Y("G", Oe), Y("g", Oe), Y("GG", He, De), Y("gg", He, De), Y("GGGG", Le, Fe), Y("gggg", Le, Fe), Y("GGGGG", Me, Ge), Y("ggggg", Me, Ge), ba(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
    b[d.substr(0, 2)] = t(a);
  }), ba(["gg", "GG"], function (b, c, d, e) {
    c[e] = a.parseTwoDigitYear(b);
  }), // FORMATTING
  T("Q", 0, "Qo", "quarter"), // ALIASES
  I("quarter", "Q"), // PRIORITY
  L("quarter", 7), // PARSING
  Y("Q", Ce), aa("Q", function (a, b) {
    b[We] = 3 * (t(a) - 1);
  }), // FORMATTING
  T("D", ["DD", 2], "Do", "date"), // ALIASES
  I("date", "D"), // PRIOROITY
  L("date", 9), // PARSING
  Y("D", He), Y("DD", He, De), Y("Do", function (a, b) {
    return a ? b._ordinalParse : b._ordinalParseLenient;
  }), aa(["D", "DD"], Xe), aa("Do", function (a, b) {
    b[Xe] = t(a.match(He)[0], 10);
  }); // MOMENTS

  var Kf = N("Date", !0); // FORMATTING

  T("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), // ALIASES
  I("dayOfYear", "DDD"), // PRIORITY
  L("dayOfYear", 4), // PARSING
  Y("DDD", Ke), Y("DDDD", Ee), aa(["DDD", "DDDD"], function (a, b, c) {
    c._dayOfYear = t(a);
  }), // FORMATTING
  T("m", ["mm", 2], 0, "minute"), // ALIASES
  I("minute", "m"), // PRIORITY
  L("minute", 14), // PARSING
  Y("m", He), Y("mm", He, De), aa(["m", "mm"], Ze); // MOMENTS

  var Lf = N("Minutes", !1); // FORMATTING

  T("s", ["ss", 2], 0, "second"), // ALIASES
  I("second", "s"), // PRIORITY
  L("second", 15), // PARSING
  Y("s", He), Y("ss", He, De), aa(["s", "ss"], $e); // MOMENTS

  var Mf = N("Seconds", !1); // FORMATTING

  T("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), T(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
  }), T(0, ["SSS", 3], 0, "millisecond"), T(0, ["SSSS", 4], 0, function () {
    return 10 * this.millisecond();
  }), T(0, ["SSSSS", 5], 0, function () {
    return 100 * this.millisecond();
  }), T(0, ["SSSSSS", 6], 0, function () {
    return 1e3 * this.millisecond();
  }), T(0, ["SSSSSSS", 7], 0, function () {
    return 1e4 * this.millisecond();
  }), T(0, ["SSSSSSSS", 8], 0, function () {
    return 1e5 * this.millisecond();
  }), T(0, ["SSSSSSSSS", 9], 0, function () {
    return 1e6 * this.millisecond();
  }), // ALIASES
  I("millisecond", "ms"), // PRIORITY
  L("millisecond", 16), // PARSING
  Y("S", Ke, Ce), Y("SS", Ke, De), Y("SSS", Ke, Ee);
  var Nf;

  for (Nf = "SSSS"; Nf.length <= 9; Nf += "S") {
    Y(Nf, Ne);
  }

  for (Nf = "S"; Nf.length <= 9; Nf += "S") {
    aa(Nf, Gc);
  } // MOMENTS


  var Of = N("Milliseconds", !1); // FORMATTING

  T("z", 0, 0, "zoneAbbr"), T("zz", 0, 0, "zoneName");
  var Pf = q.prototype;
  Pf.add = Hf, Pf.calendar = Ub, Pf.clone = Vb, Pf.diff = ac, Pf.endOf = mc, Pf.format = ec, Pf.from = fc, Pf.fromNow = gc, Pf.to = hc, Pf.toNow = ic, Pf.get = Q, Pf.invalidAt = vc, Pf.isAfter = Wb, Pf.isBefore = Xb, Pf.isBetween = Yb, Pf.isSame = Zb, Pf.isSameOrAfter = $b, Pf.isSameOrBefore = _b, Pf.isValid = tc, Pf.lang = Jf, Pf.locale = jc, Pf.localeData = kc, Pf.max = Cf, Pf.min = Bf, Pf.parsingFlags = uc, Pf.set = R, Pf.startOf = lc, Pf.subtract = If, Pf.toArray = qc, Pf.toObject = rc, Pf.toDate = pc, Pf.toISOString = dc, Pf.toJSON = sc, Pf.toString = cc, Pf.unix = oc, Pf.valueOf = nc, Pf.creationData = wc, // Year
  Pf.year = hf, Pf.isLeapYear = qa, // Week Year
  Pf.weekYear = yc, Pf.isoWeekYear = zc, // Quarter
  Pf.quarter = Pf.quarters = Ec, // Month
  Pf.month = ja, Pf.daysInMonth = ka, // Week
  Pf.week = Pf.weeks = Aa, Pf.isoWeek = Pf.isoWeeks = Ba, Pf.weeksInYear = Bc, Pf.isoWeeksInYear = Ac, // Day
  Pf.date = Kf, Pf.day = Pf.days = Ja, Pf.weekday = Ka, Pf.isoWeekday = La, Pf.dayOfYear = Fc, // Hour
  Pf.hour = Pf.hours = sf, // Minute
  Pf.minute = Pf.minutes = Lf, // Second
  Pf.second = Pf.seconds = Mf, // Millisecond
  Pf.millisecond = Pf.milliseconds = Of, // Offset
  Pf.utcOffset = Bb, Pf.utc = Db, Pf.local = Eb, Pf.parseZone = Fb, Pf.hasAlignedHourOffset = Gb, Pf.isDST = Hb, Pf.isLocal = Jb, Pf.isUtcOffset = Kb, Pf.isUtc = Lb, Pf.isUTC = Lb, // Timezone
  Pf.zoneAbbr = Hc, Pf.zoneName = Ic, // Deprecations
  Pf.dates = w("dates accessor is deprecated. Use date instead.", Kf), Pf.months = w("months accessor is deprecated. Use month instead", ja), Pf.years = w("years accessor is deprecated. Use year instead", hf), Pf.zone = w("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Cb), Pf.isDSTShifted = w("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ib);
  var Qf = Pf,
      Rf = B.prototype;
  Rf.calendar = C, Rf.longDateFormat = D, Rf.invalidDate = E, Rf.ordinal = F, Rf.preparse = Lc, Rf.postformat = Lc, Rf.relativeTime = G, Rf.pastFuture = H, Rf.set = z, // Month
  Rf.months = ea, Rf.monthsShort = fa, Rf.monthsParse = ha, Rf.monthsRegex = ma, Rf.monthsShortRegex = la, // Week
  Rf.week = xa, Rf.firstDayOfYear = za, Rf.firstDayOfWeek = ya, // Day of Week
  Rf.weekdays = Ea, Rf.weekdaysMin = Ga, Rf.weekdaysShort = Fa, Rf.weekdaysParse = Ia, Rf.weekdaysRegex = Ma, Rf.weekdaysShortRegex = Na, Rf.weekdaysMinRegex = Oa, // Hours
  Rf.isPM = Ua, Rf.meridiem = Va, Za("en", {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === t(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    }
  }), // Side effect imports
  a.lang = w("moment.lang is deprecated. Use moment.locale instead.", Za), a.langData = w("moment.langData is deprecated. Use moment.localeData instead.", ab);

  var Sf = Math.abs,
      Tf = cd("ms"),
      Uf = cd("s"),
      Vf = cd("m"),
      Wf = cd("h"),
      Xf = cd("d"),
      Yf = cd("w"),
      Zf = cd("M"),
      $f = cd("y"),
      _f = ed("milliseconds"),
      ag = ed("seconds"),
      bg = ed("minutes"),
      cg = ed("hours"),
      dg = ed("days"),
      eg = ed("months"),
      fg = ed("years"),
      gg = Math.round,
      hg = {
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month
    M: 11
  },
      ig = Math.abs,
      jg = vb.prototype;

  jg.abs = Uc, jg.add = Wc, jg.subtract = Xc, jg.as = ad, jg.asMilliseconds = Tf, jg.asSeconds = Uf, jg.asMinutes = Vf, jg.asHours = Wf, jg.asDays = Xf, jg.asWeeks = Yf, jg.asMonths = Zf, jg.asYears = $f, jg.valueOf = bd, jg._bubble = Zc, jg.get = dd, jg.milliseconds = _f, jg.seconds = ag, jg.minutes = bg, jg.hours = cg, jg.days = dg, jg.weeks = fd, jg.months = eg, jg.years = fg, jg.humanize = kd, jg.toISOString = ld, jg.toString = ld, jg.toJSON = ld, jg.locale = jc, jg.localeData = kc, // Deprecations
  jg.toIsoString = w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", ld), jg.lang = Jf, // Side effect imports
  // FORMATTING
  T("X", 0, 0, "unix"), T("x", 0, 0, "valueOf"), // PARSING
  Y("x", Oe), Y("X", Re), aa("X", function (a, b, c) {
    c._d = new Date(1e3 * parseFloat(a, 10));
  }), aa("x", function (a, b, c) {
    c._d = new Date(t(a));
  }), a.version = "2.14.1", b(rb), a.fn = Qf, a.min = tb, a.max = ub, a.now = Df, a.utc = j, a.unix = Jc, a.months = Pc, a.isDate = f, a.locale = Za, a.invalid = n, a.duration = Mb, a.isMoment = r, a.weekdays = Rc, a.parseZone = Kc, a.localeData = ab, a.isDuration = wb, a.monthsShort = Qc, a.weekdaysMin = Tc, a.defineLocale = $a, a.updateLocale = _a, a.locales = bb, a.weekdaysShort = Sc, a.normalizeUnits = J, a.relativeTimeRounding = id, a.relativeTimeThreshold = jd, a.calendarFormat = Tb, a.prototype = Qf;

  var kg = a,
      lg = (kg.defineLocale("af", {
    months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
    monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
    weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
    weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
    weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
    meridiemParse: /vm|nm/i,
    isPM: function isPM(a) {
      return /^nm$/i.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? c ? "vm" : "VM" : c ? "nm" : "NM";
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Vandag om] LT",
      nextDay: "[MÃ´re om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[Gister om] LT",
      lastWeek: "[Laas] dddd [om] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "oor %s",
      past: "%s gelede",
      s: "'n paar sekondes",
      m: "'n minuut",
      mm: "%d minute",
      h: "'n uur",
      hh: "%d ure",
      d: "'n dag",
      dd: "%d dae",
      M: "'n maand",
      MM: "%d maande",
      y: "'n jaar",
      yy: "%d jaar"
    },
    ordinalParse: /\d{1,2}(ste|de)/,
    ordinal: function ordinal(a) {
      return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de");
    },
    week: {
      dow: 1,
      // Maandag is die eerste dag van die week.
      doy: 4
    }
  }), kg.defineLocale("ar-ma", {
    months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"),
    monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"),
    weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥ØªÙ†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
    weekdaysShort: "Ø§Ø­Ø¯_Ø§ØªÙ†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
    weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ÙÙŠ %s",
      past: "Ù…Ù†Ø° %s",
      s: "Ø«ÙˆØ§Ù†",
      m: "Ø¯Ù‚ÙŠÙ‚Ø©",
      mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
      h: "Ø³Ø§Ø¹Ø©",
      hh: "%d Ø³Ø§Ø¹Ø§Øª",
      d: "ÙŠÙˆÙ…",
      dd: "%d Ø£ÙŠØ§Ù…",
      M: "Ø´Ù‡Ø±",
      MM: "%d Ø£Ø´Ù‡Ø±",
      y: "Ø³Ù†Ø©",
      yy: "%d Ø³Ù†ÙˆØ§Øª"
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12
    }
  }), {
    1: "Ù¡",
    2: "Ù¢",
    3: "Ù£",
    4: "Ù¤",
    5: "Ù¥",
    6: "Ù¦",
    7: "Ù§",
    8: "Ù¨",
    9: "Ù©",
    0: "Ù "
  }),
      mg = {
    "Ù¡": "1",
    "Ù¢": "2",
    "Ù£": "3",
    "Ù¤": "4",
    "Ù¥": "5",
    "Ù¦": "6",
    "Ù§": "7",
    "Ù¨": "8",
    "Ù©": "9",
    "Ù ": "0"
  },
      ng = (kg.defineLocale("ar-sa", {
    months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠÙˆ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆ_Ø£ØºØ³Ø·Ø³_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
    monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠÙˆ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆ_Ø£ØºØ³Ø·Ø³_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
    weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
    weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
    weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /Øµ|Ù…/,
    isPM: function isPM(a) {
      return "Ù…" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "Øµ" : "Ù…";
    },
    calendar: {
      sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ÙÙŠ %s",
      past: "Ù…Ù†Ø° %s",
      s: "Ø«ÙˆØ§Ù†",
      m: "Ø¯Ù‚ÙŠÙ‚Ø©",
      mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
      h: "Ø³Ø§Ø¹Ø©",
      hh: "%d Ø³Ø§Ø¹Ø§Øª",
      d: "ÙŠÙˆÙ…",
      dd: "%d Ø£ÙŠØ§Ù…",
      M: "Ø´Ù‡Ø±",
      MM: "%d Ø£Ø´Ù‡Ø±",
      y: "Ø³Ù†Ø©",
      yy: "%d Ø³Ù†ÙˆØ§Øª"
    },
    preparse: function preparse(a) {
      return a.replace(/[Ù¡Ù¢Ù£Ù¤Ù¥Ù¦Ù§Ù¨Ù©Ù ]/g, function (a) {
        return mg[a];
      }).replace(/ØŒ/g, ",");
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return lg[a];
      }).replace(/,/g, "ØŒ");
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12
    }
  }), kg.defineLocale("ar-tn", {
    months: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
    monthsShort: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
    weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
    weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
    weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ÙÙŠ %s",
      past: "Ù…Ù†Ø° %s",
      s: "Ø«ÙˆØ§Ù†",
      m: "Ø¯Ù‚ÙŠÙ‚Ø©",
      mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
      h: "Ø³Ø§Ø¹Ø©",
      hh: "%d Ø³Ø§Ø¹Ø§Øª",
      d: "ÙŠÙˆÙ…",
      dd: "%d Ø£ÙŠØ§Ù…",
      M: "Ø´Ù‡Ø±",
      MM: "%d Ø£Ø´Ù‡Ø±",
      y: "Ø³Ù†Ø©",
      yy: "%d Ø³Ù†ÙˆØ§Øª"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    1: "Ù¡",
    2: "Ù¢",
    3: "Ù£",
    4: "Ù¤",
    5: "Ù¥",
    6: "Ù¦",
    7: "Ù§",
    8: "Ù¨",
    9: "Ù©",
    0: "Ù "
  }),
      og = {
    "Ù¡": "1",
    "Ù¢": "2",
    "Ù£": "3",
    "Ù¤": "4",
    "Ù¥": "5",
    "Ù¦": "6",
    "Ù§": "7",
    "Ù¨": "8",
    "Ù©": "9",
    "Ù ": "0"
  },
      pg = function pg(a) {
    return 0 === a ? 0 : 1 === a ? 1 : 2 === a ? 2 : a % 100 >= 3 && 10 >= a % 100 ? 3 : a % 100 >= 11 ? 4 : 5;
  },
      qg = {
    s: ["Ø£Ù‚Ù„ Ù…Ù† Ø«Ø§Ù†ÙŠØ©", "Ø«Ø§Ù†ÙŠØ© ÙˆØ§Ø­Ø¯Ø©", ["Ø«Ø§Ù†ÙŠØªØ§Ù†", "Ø«Ø§Ù†ÙŠØªÙŠÙ†"], "%d Ø«ÙˆØ§Ù†", "%d Ø«Ø§Ù†ÙŠØ©", "%d Ø«Ø§Ù†ÙŠØ©"],
    m: ["Ø£Ù‚Ù„ Ù…Ù† Ø¯Ù‚ÙŠÙ‚Ø©", "Ø¯Ù‚ÙŠÙ‚Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø¯Ù‚ÙŠÙ‚ØªØ§Ù†", "Ø¯Ù‚ÙŠÙ‚ØªÙŠÙ†"], "%d Ø¯Ù‚Ø§Ø¦Ù‚", "%d Ø¯Ù‚ÙŠÙ‚Ø©", "%d Ø¯Ù‚ÙŠÙ‚Ø©"],
    h: ["Ø£Ù‚Ù„ Ù…Ù† Ø³Ø§Ø¹Ø©", "Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø³Ø§Ø¹ØªØ§Ù†", "Ø³Ø§Ø¹ØªÙŠÙ†"], "%d Ø³Ø§Ø¹Ø§Øª", "%d Ø³Ø§Ø¹Ø©", "%d Ø³Ø§Ø¹Ø©"],
    d: ["Ø£Ù‚Ù„ Ù…Ù† ÙŠÙˆÙ…", "ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯", ["ÙŠÙˆÙ…Ø§Ù†", "ÙŠÙˆÙ…ÙŠÙ†"], "%d Ø£ÙŠØ§Ù…", "%d ÙŠÙˆÙ…Ù‹Ø§", "%d ÙŠÙˆÙ…"],
    M: ["Ø£Ù‚Ù„ Ù…Ù† Ø´Ù‡Ø±", "Ø´Ù‡Ø± ÙˆØ§Ø­Ø¯", ["Ø´Ù‡Ø±Ø§Ù†", "Ø´Ù‡Ø±ÙŠÙ†"], "%d Ø£Ø´Ù‡Ø±", "%d Ø´Ù‡Ø±Ø§", "%d Ø´Ù‡Ø±"],
    y: ["Ø£Ù‚Ù„ Ù…Ù† Ø¹Ø§Ù…", "Ø¹Ø§Ù… ÙˆØ§Ø­Ø¯", ["Ø¹Ø§Ù…Ø§Ù†", "Ø¹Ø§Ù…ÙŠÙ†"], "%d Ø£Ø¹ÙˆØ§Ù…", "%d Ø¹Ø§Ù…Ù‹Ø§", "%d Ø¹Ø§Ù…"]
  },
      rg = function rg(a) {
    return function (b, c, d, e) {
      var f = pg(b),
          g = qg[a][pg(b)];
      return 2 === f && (g = g[c ? 0 : 1]), g.replace(/%d/i, b);
    };
  },
      sg = ["ÙƒØ§Ù†ÙˆÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ ÙŠÙ†Ø§ÙŠØ±", "Ø´Ø¨Ø§Ø· ÙØ¨Ø±Ø§ÙŠØ±", "Ø¢Ø°Ø§Ø± Ù…Ø§Ø±Ø³", "Ù†ÙŠØ³Ø§Ù† Ø£Ø¨Ø±ÙŠÙ„", "Ø£ÙŠØ§Ø± Ù…Ø§ÙŠÙˆ", "Ø­Ø²ÙŠØ±Ø§Ù† ÙŠÙˆÙ†ÙŠÙˆ", "ØªÙ…ÙˆØ² ÙŠÙˆÙ„ÙŠÙˆ", "Ø¢Ø¨ Ø£ØºØ³Ø·Ø³", "Ø£ÙŠÙ„ÙˆÙ„ Ø³Ø¨ØªÙ…Ø¨Ø±", "ØªØ´Ø±ÙŠÙ† Ø§Ù„Ø£ÙˆÙ„ Ø£ÙƒØªÙˆØ¨Ø±", "ØªØ´Ø±ÙŠÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ Ù†ÙˆÙÙ…Ø¨Ø±", "ÙƒØ§Ù†ÙˆÙ† Ø§Ù„Ø£ÙˆÙ„ Ø¯ÙŠØ³Ù…Ø¨Ø±"],
      tg = (kg.defineLocale("ar", {
    months: sg,
    monthsShort: sg,
    weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
    weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
    weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "D/â€M/â€YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /Øµ|Ù…/,
    isPM: function isPM(a) {
      return "Ù…" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "Øµ" : "Ù…";
    },
    calendar: {
      sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextDay: "[ØºØ¯Ù‹Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      nextWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastDay: "[Ø£Ù…Ø³ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      lastWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "Ø¨Ø¹Ø¯ %s",
      past: "Ù…Ù†Ø° %s",
      s: rg("s"),
      m: rg("m"),
      mm: rg("m"),
      h: rg("h"),
      hh: rg("h"),
      d: rg("d"),
      dd: rg("d"),
      M: rg("M"),
      MM: rg("M"),
      y: rg("y"),
      yy: rg("y")
    },
    preparse: function preparse(a) {
      return a.replace(/\u200f/g, "").replace(/[Ù¡Ù¢Ù£Ù¤Ù¥Ù¦Ù§Ù¨Ù©Ù ]/g, function (a) {
        return og[a];
      }).replace(/ØŒ/g, ",");
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return ng[a];
      }).replace(/,/g, "ØŒ");
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12
    }
  }), {
    1: "-inci",
    5: "-inci",
    8: "-inci",
    70: "-inci",
    80: "-inci",
    2: "-nci",
    7: "-nci",
    20: "-nci",
    50: "-nci",
    3: "-Ã¼ncÃ¼",
    4: "-Ã¼ncÃ¼",
    100: "-Ã¼ncÃ¼",
    6: "-ncÄ±",
    9: "-uncu",
    10: "-uncu",
    30: "-uncu",
    60: "-Ä±ncÄ±",
    90: "-Ä±ncÄ±"
  }),
      ug = (kg.defineLocale("az", {
    months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
    monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
    weekdays: "Bazar_Bazar ertÉ™si_Ã‡É™rÅŸÉ™nbÉ™ axÅŸamÄ±_Ã‡É™rÅŸÉ™nbÉ™_CÃ¼mÉ™ axÅŸamÄ±_CÃ¼mÉ™_ÅžÉ™nbÉ™".split("_"),
    weekdaysShort: "Baz_BzE_Ã‡Ax_Ã‡É™r_CAx_CÃ¼m_ÅžÉ™n".split("_"),
    weekdaysMin: "Bz_BE_Ã‡A_Ã‡É™_CA_CÃ¼_ÅžÉ™".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[bugÃ¼n saat] LT",
      nextDay: "[sabah saat] LT",
      nextWeek: "[gÉ™lÉ™n hÉ™ftÉ™] dddd [saat] LT",
      lastDay: "[dÃ¼nÉ™n] LT",
      lastWeek: "[keÃ§É™n hÉ™ftÉ™] dddd [saat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s sonra",
      past: "%s É™vvÉ™l",
      s: "birneÃ§É™ saniyyÉ™",
      m: "bir dÉ™qiqÉ™",
      mm: "%d dÉ™qiqÉ™",
      h: "bir saat",
      hh: "%d saat",
      d: "bir gÃ¼n",
      dd: "%d gÃ¼n",
      M: "bir ay",
      MM: "%d ay",
      y: "bir il",
      yy: "%d il"
    },
    meridiemParse: /gecÉ™|sÉ™hÉ™r|gÃ¼ndÃ¼z|axÅŸam/,
    isPM: function isPM(a) {
      return /^(gÃ¼ndÃ¼z|axÅŸam)$/.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "gecÉ™" : 12 > a ? "sÉ™hÉ™r" : 17 > a ? "gÃ¼ndÃ¼z" : "axÅŸam";
    },
    ordinalParse: /\d{1,2}-(Ä±ncÄ±|inci|nci|Ã¼ncÃ¼|ncÄ±|uncu)/,
    ordinal: function ordinal(a) {
      if (0 === a) // special case for zero
        return a + "-Ä±ncÄ±";
      var b = a % 10,
          c = a % 100 - b,
          d = a >= 100 ? 100 : null;
      return a + (tg[b] || tg[c] || tg[d]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("be", {
    months: {
      format: "ÑÑ‚ÑƒÐ´Ð·ÐµÐ½Ñ_Ð»ÑŽÑ‚Ð°Ð³Ð°_ÑÐ°ÐºÐ°Ð²Ñ–ÐºÐ°_ÐºÑ€Ð°ÑÐ°Ð²Ñ–ÐºÐ°_Ñ‚Ñ€Ð°ÑžÐ½Ñ_Ñ‡ÑÑ€Ð²ÐµÐ½Ñ_Ð»Ñ–Ð¿ÐµÐ½Ñ_Ð¶Ð½Ñ–ÑžÐ½Ñ_Ð²ÐµÑ€Ð°ÑÐ½Ñ_ÐºÐ°ÑÑ‚Ñ€Ñ‹Ñ‡Ð½Ñ–ÐºÐ°_Ð»Ñ–ÑÑ‚Ð°Ð¿Ð°Ð´Ð°_ÑÐ½ÐµÐ¶Ð½Ñ".split("_"),
      standalone: "ÑÑ‚ÑƒÐ´Ð·ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ñ‹_ÑÐ°ÐºÐ°Ð²Ñ–Ðº_ÐºÑ€Ð°ÑÐ°Ð²Ñ–Ðº_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÑÑ€Ð²ÐµÐ½ÑŒ_Ð»Ñ–Ð¿ÐµÐ½ÑŒ_Ð¶Ð½Ñ–Ð²ÐµÐ½ÑŒ_Ð²ÐµÑ€Ð°ÑÐµÐ½ÑŒ_ÐºÐ°ÑÑ‚Ñ€Ñ‹Ñ‡Ð½Ñ–Ðº_Ð»Ñ–ÑÑ‚Ð°Ð¿Ð°Ð´_ÑÐ½ÐµÐ¶Ð°Ð½ÑŒ".split("_")
    },
    monthsShort: "ÑÑ‚ÑƒÐ´_Ð»ÑŽÑ‚_ÑÐ°Ðº_ÐºÑ€Ð°Ñ_Ñ‚Ñ€Ð°Ð²_Ñ‡ÑÑ€Ð²_Ð»Ñ–Ð¿_Ð¶Ð½Ñ–Ð²_Ð²ÐµÑ€_ÐºÐ°ÑÑ‚_Ð»Ñ–ÑÑ‚_ÑÐ½ÐµÐ¶".split("_"),
    weekdays: {
      format: "Ð½ÑÐ´Ð·ÐµÐ»ÑŽ_Ð¿Ð°Ð½ÑÐ´Ð·ÐµÐ»Ð°Ðº_Ð°ÑžÑ‚Ð¾Ñ€Ð°Ðº_ÑÐµÑ€Ð°Ð´Ñƒ_Ñ‡Ð°Ñ†Ð²ÐµÑ€_Ð¿ÑÑ‚Ð½Ñ–Ñ†Ñƒ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ".split("_"),
      standalone: "Ð½ÑÐ´Ð·ÐµÐ»Ñ_Ð¿Ð°Ð½ÑÐ´Ð·ÐµÐ»Ð°Ðº_Ð°ÑžÑ‚Ð¾Ñ€Ð°Ðº_ÑÐµÑ€Ð°Ð´Ð°_Ñ‡Ð°Ñ†Ð²ÐµÑ€_Ð¿ÑÑ‚Ð½Ñ–Ñ†Ð°_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"),
      isFormat: /\[ ?[Ð’Ð²] ?(?:Ð¼Ñ–Ð½ÑƒÐ»ÑƒÑŽ|Ð½Ð°ÑÑ‚ÑƒÐ¿Ð½ÑƒÑŽ)? ?\] ?dddd/
    },
    weekdaysShort: "Ð½Ð´_Ð¿Ð½_Ð°Ñ‚_ÑÑ€_Ñ‡Ñ†_Ð¿Ñ‚_ÑÐ±".split("_"),
    weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð°Ñ‚_ÑÑ€_Ñ‡Ñ†_Ð¿Ñ‚_ÑÐ±".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY Ð³.",
      LLL: "D MMMM YYYY Ð³., HH:mm",
      LLLL: "dddd, D MMMM YYYY Ð³., HH:mm"
    },
    calendar: {
      sameDay: "[Ð¡Ñ‘Ð½Ð½Ñ Ñž] LT",
      nextDay: "[Ð—Ð°ÑžÑ‚Ñ€Ð° Ñž] LT",
      lastDay: "[Ð£Ñ‡Ð¾Ñ€Ð° Ñž] LT",
      nextWeek: function nextWeek() {
        return "[Ð£] dddd [Ñž] LT";
      },
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return "[Ð£ Ð¼Ñ–Ð½ÑƒÐ»ÑƒÑŽ] dddd [Ñž] LT";

          case 1:
          case 2:
          case 4:
            return "[Ð£ Ð¼Ñ–Ð½ÑƒÐ»Ñ‹] dddd [Ñž] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "Ð¿Ñ€Ð°Ð· %s",
      past: "%s Ñ‚Ð°Ð¼Ñƒ",
      s: "Ð½ÐµÐºÐ°Ð»ÑŒÐºÑ– ÑÐµÐºÑƒÐ½Ð´",
      m: nd,
      mm: nd,
      h: nd,
      hh: nd,
      d: "Ð´Ð·ÐµÐ½ÑŒ",
      dd: nd,
      M: "Ð¼ÐµÑÑÑ†",
      MM: nd,
      y: "Ð³Ð¾Ð´",
      yy: nd
    },
    meridiemParse: /Ð½Ð¾Ñ‡Ñ‹|Ñ€Ð°Ð½Ñ–Ñ†Ñ‹|Ð´Ð½Ñ|Ð²ÐµÑ‡Ð°Ñ€Ð°/,
    isPM: function isPM(a) {
      return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡Ð°Ñ€Ð°)$/.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "Ð½Ð¾Ñ‡Ñ‹" : 12 > a ? "Ñ€Ð°Ð½Ñ–Ñ†Ñ‹" : 17 > a ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡Ð°Ñ€Ð°";
    },
    ordinalParse: /\d{1,2}-(Ñ–|Ñ‹|Ð³Ð°)/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "M":
        case "d":
        case "DDD":
        case "w":
        case "W":
          return a % 10 !== 2 && a % 10 !== 3 || a % 100 === 12 || a % 100 === 13 ? a + "-Ñ‹" : a + "-Ñ–";

        case "D":
          return a + "-Ð³Ð°";

        default:
          return a;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("bg", {
    months: "ÑÐ½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸".split("_"),
    monthsShort: "ÑÐ½Ñ€_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»Ð¸_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº".split("_"),
    weekdays: "Ð½ÐµÐ´ÐµÐ»Ñ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÑÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÑŠÑ€Ñ‚ÑŠÐº_Ð¿ÐµÑ‚ÑŠÐº_ÑÑŠÐ±Ð¾Ñ‚Ð°".split("_"),
    weekdaysShort: "Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ñ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÑŠÐ±".split("_"),
    weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "D.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[Ð”Ð½ÐµÑ Ð²] LT",
      nextDay: "[Ð£Ñ‚Ñ€Ðµ Ð²] LT",
      nextWeek: "dddd [Ð²] LT",
      lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return "[Ð’ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð°Ñ‚Ð°] dddd [Ð²] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[Ð’ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð¸Ñ] dddd [Ð²] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "ÑÐ»ÐµÐ´ %s",
      past: "Ð¿Ñ€ÐµÐ´Ð¸ %s",
      s: "Ð½ÑÐºÐ¾Ð»ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸",
      m: "Ð¼Ð¸Ð½ÑƒÑ‚Ð°",
      mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸",
      h: "Ñ‡Ð°Ñ",
      hh: "%d Ñ‡Ð°ÑÐ°",
      d: "Ð´ÐµÐ½",
      dd: "%d Ð´Ð½Ð¸",
      M: "Ð¼ÐµÑÐµÑ†",
      MM: "%d Ð¼ÐµÑÐµÑ†Ð°",
      y: "Ð³Ð¾Ð´Ð¸Ð½Ð°",
      yy: "%d Ð³Ð¾Ð´Ð¸Ð½Ð¸"
    },
    ordinalParse: /\d{1,2}-(ÐµÐ²|ÐµÐ½|Ñ‚Ð¸|Ð²Ð¸|Ñ€Ð¸|Ð¼Ð¸)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = a % 100;
      return 0 === a ? a + "-ÐµÐ²" : 0 === c ? a + "-ÐµÐ½" : c > 10 && 20 > c ? a + "-Ñ‚Ð¸" : 1 === b ? a + "-Ð²Ð¸" : 2 === b ? a + "-Ñ€Ð¸" : 7 === b || 8 === b ? a + "-Ð¼Ð¸" : a + "-Ñ‚Ð¸";
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), {
    1: "à§§",
    2: "à§¨",
    3: "à§©",
    4: "à§ª",
    5: "à§«",
    6: "à§¬",
    7: "à§­",
    8: "à§®",
    9: "à§¯",
    0: "à§¦"
  }),
      vg = {
    "à§§": "1",
    "à§¨": "2",
    "à§©": "3",
    "à§ª": "4",
    "à§«": "5",
    "à§¬": "6",
    "à§­": "7",
    "à§®": "8",
    "à§¯": "9",
    "à§¦": "0"
  },
      wg = (kg.defineLocale("bn", {
    months: "à¦œà¦¾à¦¨à§à§Ÿà¦¾à¦°à§€_à¦«à§‡à¦¬à§à§Ÿà¦¾à¦°à§€_à¦®à¦¾à¦°à§à¦š_à¦à¦ªà§à¦°à¦¿à¦²_à¦®à§‡_à¦œà§à¦¨_à¦œà§à¦²à¦¾à¦‡_à¦…à¦—à¦¾à¦¸à§à¦Ÿ_à¦¸à§‡à¦ªà§à¦Ÿà§‡à¦®à§à¦¬à¦°_à¦…à¦•à§à¦Ÿà§‹à¦¬à¦°_à¦¨à¦­à§‡à¦®à§à¦¬à¦°_à¦¡à¦¿à¦¸à§‡à¦®à§à¦¬à¦°".split("_"),
    monthsShort: "à¦œà¦¾à¦¨à§_à¦«à§‡à¦¬_à¦®à¦¾à¦°à§à¦š_à¦à¦ªà¦°_à¦®à§‡_à¦œà§à¦¨_à¦œà§à¦²_à¦…à¦—_à¦¸à§‡à¦ªà§à¦Ÿ_à¦…à¦•à§à¦Ÿà§‹_à¦¨à¦­_à¦¡à¦¿à¦¸à§‡à¦®à§".split("_"),
    weekdays: "à¦°à¦¬à¦¿à¦¬à¦¾à¦°_à¦¸à§‹à¦®à¦¬à¦¾à¦°_à¦®à¦™à§à¦—à¦²à¦¬à¦¾à¦°_à¦¬à§à¦§à¦¬à¦¾à¦°_à¦¬à§ƒà¦¹à¦¸à§à¦ªà¦¤à§à¦¤à¦¿à¦¬à¦¾à¦°_à¦¶à§à¦•à§à¦°à¦¬à¦¾à¦°_à¦¶à¦¨à¦¿à¦¬à¦¾à¦°".split("_"),
    weekdaysShort: "à¦°à¦¬à¦¿_à¦¸à§‹à¦®_à¦®à¦™à§à¦—à¦²_à¦¬à§à¦§_à¦¬à§ƒà¦¹à¦¸à§à¦ªà¦¤à§à¦¤à¦¿_à¦¶à§à¦•à§à¦°_à¦¶à¦¨à¦¿".split("_"),
    weekdaysMin: "à¦°à¦¬_à¦¸à¦®_à¦®à¦™à§à¦—_à¦¬à§_à¦¬à§à¦°à¦¿à¦¹_à¦¶à§_à¦¶à¦¨à¦¿".split("_"),
    longDateFormat: {
      LT: "A h:mm à¦¸à¦®à§Ÿ",
      LTS: "A h:mm:ss à¦¸à¦®à§Ÿ",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm à¦¸à¦®à§Ÿ",
      LLLL: "dddd, D MMMM YYYY, A h:mm à¦¸à¦®à§Ÿ"
    },
    calendar: {
      sameDay: "[à¦†à¦œ] LT",
      nextDay: "[à¦†à¦—à¦¾à¦®à§€à¦•à¦¾à¦²] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à¦—à¦¤à¦•à¦¾à¦²] LT",
      lastWeek: "[à¦—à¦¤] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à¦ªà¦°à§‡",
      past: "%s à¦†à¦—à§‡",
      s: "à¦•à§Ÿà§‡à¦• à¦¸à§‡à¦•à§‡à¦¨à§à¦¡",
      m: "à¦à¦• à¦®à¦¿à¦¨à¦¿à¦Ÿ",
      mm: "%d à¦®à¦¿à¦¨à¦¿à¦Ÿ",
      h: "à¦à¦• à¦˜à¦¨à§à¦Ÿà¦¾",
      hh: "%d à¦˜à¦¨à§à¦Ÿà¦¾",
      d: "à¦à¦• à¦¦à¦¿à¦¨",
      dd: "%d à¦¦à¦¿à¦¨",
      M: "à¦à¦• à¦®à¦¾à¦¸",
      MM: "%d à¦®à¦¾à¦¸",
      y: "à¦à¦• à¦¬à¦›à¦°",
      yy: "%d à¦¬à¦›à¦°"
    },
    preparse: function preparse(a) {
      return a.replace(/[à§§à§¨à§©à§ªà§«à§¬à§­à§®à§¯à§¦]/g, function (a) {
        return vg[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return ug[a];
      });
    },
    meridiemParse: /à¦°à¦¾à¦¤|à¦¸à¦•à¦¾à¦²|à¦¦à§à¦ªà§à¦°|à¦¬à¦¿à¦•à¦¾à¦²|à¦°à¦¾à¦¤/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à¦°à¦¾à¦¤" === b && a >= 4 || "à¦¦à§à¦ªà§à¦°" === b && 5 > a || "à¦¬à¦¿à¦•à¦¾à¦²" === b ? a + 12 : a;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à¦°à¦¾à¦¤" : 10 > a ? "à¦¸à¦•à¦¾à¦²" : 17 > a ? "à¦¦à§à¦ªà§à¦°" : 20 > a ? "à¦¬à¦¿à¦•à¦¾à¦²" : "à¦°à¦¾à¦¤";
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), {
    1: "à¼¡",
    2: "à¼¢",
    3: "à¼£",
    4: "à¼¤",
    5: "à¼¥",
    6: "à¼¦",
    7: "à¼§",
    8: "à¼¨",
    9: "à¼©",
    0: "à¼ "
  }),
      xg = {
    "à¼¡": "1",
    "à¼¢": "2",
    "à¼£": "3",
    "à¼¤": "4",
    "à¼¥": "5",
    "à¼¦": "6",
    "à¼§": "7",
    "à¼¨": "8",
    "à¼©": "9",
    "à¼ ": "0"
  },
      yg = (kg.defineLocale("bo", {
    months: "à½Ÿà¾³à¼‹à½–à¼‹à½‘à½„à¼‹à½”à½¼_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½‰à½²à½¦à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½¦à½´à½˜à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½žà½²à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½£à¾”à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à¾²à½´à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½‘à½´à½“à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½¢à¾’à¾±à½‘à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à½‚à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½…à½²à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½‰à½²à½¦à¼‹à½”".split("_"),
    monthsShort: "à½Ÿà¾³à¼‹à½–à¼‹à½‘à½„à¼‹à½”à½¼_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½‰à½²à½¦à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½¦à½´à½˜à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½žà½²à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½£à¾”à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à¾²à½´à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½‘à½´à½“à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½¢à¾’à¾±à½‘à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à½‚à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½…à½²à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½‰à½²à½¦à¼‹à½”".split("_"),
    weekdays: "à½‚à½Ÿà½ à¼‹à½‰à½²à¼‹à½˜à¼‹_à½‚à½Ÿà½ à¼‹à½Ÿà¾³à¼‹à½–à¼‹_à½‚à½Ÿà½ à¼‹à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½‚à½Ÿà½ à¼‹à½£à¾·à½‚à¼‹à½”à¼‹_à½‚à½Ÿà½ à¼‹à½•à½´à½¢à¼‹à½–à½´_à½‚à½Ÿà½ à¼‹à½”à¼‹à½¦à½„à½¦à¼‹_à½‚à½Ÿà½ à¼‹à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"),
    weekdaysShort: "à½‰à½²à¼‹à½˜à¼‹_à½Ÿà¾³à¼‹à½–à¼‹_à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½£à¾·à½‚à¼‹à½”à¼‹_à½•à½´à½¢à¼‹à½–à½´_à½”à¼‹à½¦à½„à½¦à¼‹_à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"),
    weekdaysMin: "à½‰à½²à¼‹à½˜à¼‹_à½Ÿà¾³à¼‹à½–à¼‹_à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½£à¾·à½‚à¼‹à½”à¼‹_à½•à½´à½¢à¼‹à½–à½´_à½”à¼‹à½¦à½„à½¦à¼‹_à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"),
    longDateFormat: {
      LT: "A h:mm",
      LTS: "A h:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm",
      LLLL: "dddd, D MMMM YYYY, A h:mm"
    },
    calendar: {
      sameDay: "[à½‘à½²à¼‹à½¢à½²à½„] LT",
      nextDay: "[à½¦à½„à¼‹à½‰à½²à½“] LT",
      nextWeek: "[à½–à½‘à½´à½“à¼‹à½•à¾²à½‚à¼‹à½¢à¾—à½ºà½¦à¼‹à½˜], LT",
      lastDay: "[à½à¼‹à½¦à½„] LT",
      lastWeek: "[à½–à½‘à½´à½“à¼‹à½•à¾²à½‚à¼‹à½˜à½à½ à¼‹à½˜] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à½£à¼‹",
      past: "%s à½¦à¾”à½“à¼‹à½£",
      s: "à½£à½˜à¼‹à½¦à½„",
      m: "à½¦à¾à½¢à¼‹à½˜à¼‹à½‚à½…à½²à½‚",
      mm: "%d à½¦à¾à½¢à¼‹à½˜",
      h: "à½†à½´à¼‹à½šà½¼à½‘à¼‹à½‚à½…à½²à½‚",
      hh: "%d à½†à½´à¼‹à½šà½¼à½‘",
      d: "à½‰à½²à½“à¼‹à½‚à½…à½²à½‚",
      dd: "%d à½‰à½²à½“à¼‹",
      M: "à½Ÿà¾³à¼‹à½–à¼‹à½‚à½…à½²à½‚",
      MM: "%d à½Ÿà¾³à¼‹à½–",
      y: "à½£à½¼à¼‹à½‚à½…à½²à½‚",
      yy: "%d à½£à½¼"
    },
    preparse: function preparse(a) {
      return a.replace(/[à¼¡à¼¢à¼£à¼¤à¼¥à¼¦à¼§à¼¨à¼©à¼ ]/g, function (a) {
        return xg[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return wg[a];
      });
    },
    meridiemParse: /à½˜à½šà½“à¼‹à½˜à½¼|à½žà½¼à½‚à½¦à¼‹à½€à½¦|à½‰à½²à½“à¼‹à½‚à½´à½„|à½‘à½‚à½¼à½„à¼‹à½‘à½‚|à½˜à½šà½“à¼‹à½˜à½¼/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à½˜à½šà½“à¼‹à½˜à½¼" === b && a >= 4 || "à½‰à½²à½“à¼‹à½‚à½´à½„" === b && 5 > a || "à½‘à½‚à½¼à½„à¼‹à½‘à½‚" === b ? a + 12 : a;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à½˜à½šà½“à¼‹à½˜à½¼" : 10 > a ? "à½žà½¼à½‚à½¦à¼‹à½€à½¦" : 17 > a ? "à½‰à½²à½“à¼‹à½‚à½´à½„" : 20 > a ? "à½‘à½‚à½¼à½„à¼‹à½‘à½‚" : "à½˜à½šà½“à¼‹à½˜à½¼";
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), kg.defineLocale("br", {
    months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
    monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
    weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
    weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
    weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "h[e]mm A",
      LTS: "h[e]mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D [a viz] MMMM YYYY",
      LLL: "D [a viz] MMMM YYYY h[e]mm A",
      LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
    },
    calendar: {
      sameDay: "[Hiziv da] LT",
      nextDay: "[Warc'hoazh da] LT",
      nextWeek: "dddd [da] LT",
      lastDay: "[Dec'h da] LT",
      lastWeek: "dddd [paset da] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "a-benn %s",
      past: "%s 'zo",
      s: "un nebeud segondennoÃ¹",
      m: "ur vunutenn",
      mm: od,
      h: "un eur",
      hh: "%d eur",
      d: "un devezh",
      dd: od,
      M: "ur miz",
      MM: od,
      y: "ur bloaz",
      yy: pd
    },
    ordinalParse: /\d{1,2}(aÃ±|vet)/,
    ordinal: function ordinal(a) {
      var b = 1 === a ? "aÃ±" : "vet";
      return a + b;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("bs", {
    months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
    monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
    weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
    weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danas u] LT",
      nextDay: "[sutra u] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";

          case 3:
            return "[u] [srijedu] [u] LT";

          case 6:
            return "[u] [subotu] [u] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      },
      lastDay: "[juÄer u] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
          case 3:
            return "[proÅ¡lu] dddd [u] LT";

          case 6:
            return "[proÅ¡le] [subote] [u] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[proÅ¡li] dddd [u] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "prije %s",
      s: "par sekundi",
      m: td,
      mm: td,
      h: td,
      hh: td,
      d: "dan",
      dd: td,
      M: "mjesec",
      MM: td,
      y: "godinu",
      yy: td
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("ca", {
    months: "gener_febrer_marÃ§_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
    monthsShort: "gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
    monthsParseExact: !0,
    weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
    weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
    weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: function sameDay() {
        return "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT";
      },
      nextDay: function nextDay() {
        return "[demÃ  a " + (1 !== this.hours() ? "les" : "la") + "] LT";
      },
      nextWeek: function nextWeek() {
        return "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT";
      },
      lastDay: function lastDay() {
        return "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT";
      },
      lastWeek: function lastWeek() {
        return "[el] dddd [passat a " + (1 !== this.hours() ? "les" : "la") + "] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "en %s",
      past: "fa %s",
      s: "uns segons",
      m: "un minut",
      mm: "%d minuts",
      h: "una hora",
      hh: "%d hores",
      d: "un dia",
      dd: "%d dies",
      M: "un mes",
      MM: "%d mesos",
      y: "un any",
      yy: "%d anys"
    },
    ordinalParse: /\d{1,2}(r|n|t|Ã¨|a)/,
    ordinal: function ordinal(a, b) {
      var c = 1 === a ? "r" : 2 === a ? "n" : 3 === a ? "r" : 4 === a ? "t" : "Ã¨";
      return "w" !== b && "W" !== b || (c = "a"), a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), "leden_Ãºnor_bÅ™ezen_duben_kvÄ›ten_Äerven_Äervenec_srpen_zÃ¡Å™Ã­_Å™Ã­jen_listopad_prosinec".split("_")),
      zg = "led_Ãºno_bÅ™e_dub_kvÄ›_Ävn_Ävc_srp_zÃ¡Å™_Å™Ã­j_lis_pro".split("_"),
      Ag = (kg.defineLocale("cs", {
    months: yg,
    monthsShort: zg,
    monthsParse: function (a, b) {
      var c,
          d = [];

      for (c = 0; 12 > c; c++) {
        // use custom parser to solve problem with July (Äervenec)
        d[c] = new RegExp("^" + a[c] + "$|^" + b[c] + "$", "i");
      }

      return d;
    }(yg, zg),
    shortMonthsParse: function (a) {
      var b,
          c = [];

      for (b = 0; 12 > b; b++) {
        c[b] = new RegExp("^" + a[b] + "$", "i");
      }

      return c;
    }(zg),
    longMonthsParse: function (a) {
      var b,
          c = [];

      for (b = 0; 12 > b; b++) {
        c[b] = new RegExp("^" + a[b] + "$", "i");
      }

      return c;
    }(yg),
    weekdays: "nedÄ›le_pondÄ›lÃ­_ÃºterÃ½_stÅ™eda_Ätvrtek_pÃ¡tek_sobota".split("_"),
    weekdaysShort: "ne_po_Ãºt_st_Ät_pÃ¡_so".split("_"),
    weekdaysMin: "ne_po_Ãºt_st_Ät_pÃ¡_so".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd D. MMMM YYYY H:mm",
      l: "D. M. YYYY"
    },
    calendar: {
      sameDay: "[dnes v] LT",
      nextDay: "[zÃ­tra v] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[v nedÄ›li v] LT";

          case 1:
          case 2:
            return "[v] dddd [v] LT";

          case 3:
            return "[ve stÅ™edu v] LT";

          case 4:
            return "[ve Ätvrtek v] LT";

          case 5:
            return "[v pÃ¡tek v] LT";

          case 6:
            return "[v sobotu v] LT";
        }
      },
      lastDay: "[vÄera v] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
            return "[minulou nedÄ›li v] LT";

          case 1:
          case 2:
            return "[minulÃ©] dddd [v] LT";

          case 3:
            return "[minulou stÅ™edu v] LT";

          case 4:
          case 5:
            return "[minulÃ½] dddd [v] LT";

          case 6:
            return "[minulou sobotu v] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "pÅ™ed %s",
      s: vd,
      m: vd,
      mm: vd,
      h: vd,
      hh: vd,
      d: vd,
      dd: vd,
      M: vd,
      MM: vd,
      y: vd,
      yy: vd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("cv", {
    months: "ÐºÓ‘Ñ€Ð»Ð°Ñ‡_Ð½Ð°Ñ€Ó‘Ñ_Ð¿ÑƒÑˆ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó—Ñ€Ñ‚Ð¼Ðµ_ÑƒÑ‚Ó‘_Ò«ÑƒÑ€Ð»Ð°_Ð°Ð²Ó‘Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°ÑˆÑ‚Ð°Ð²".split("_"),
    monthsShort: "ÐºÓ‘Ñ€_Ð½Ð°Ñ€_Ð¿ÑƒÑˆ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó—Ñ€_ÑƒÑ‚Ó‘_Ò«ÑƒÑ€_Ð°Ð²Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°Ñˆ".split("_"),
    weekdays: "Ð²Ñ‹Ñ€ÑÐ°Ñ€Ð½Ð¸ÐºÑƒÐ½_Ñ‚ÑƒÐ½Ñ‚Ð¸ÐºÑƒÐ½_Ñ‹Ñ‚Ð»Ð°Ñ€Ð¸ÐºÑƒÐ½_ÑŽÐ½ÐºÑƒÐ½_ÐºÓ—Ò«Ð½ÐµÑ€Ð½Ð¸ÐºÑƒÐ½_ÑÑ€Ð½ÐµÐºÑƒÐ½_ÑˆÓ‘Ð¼Ð°Ñ‚ÐºÑƒÐ½".split("_"),
    weekdaysShort: "Ð²Ñ‹Ñ€_Ñ‚ÑƒÐ½_Ñ‹Ñ‚Ð»_ÑŽÐ½_ÐºÓ—Ò«_ÑÑ€Ð½_ÑˆÓ‘Ð¼".split("_"),
    weekdaysMin: "Ð²Ñ€_Ñ‚Ð½_Ñ‹Ñ‚_ÑŽÐ½_ÐºÒ«_ÑÑ€_ÑˆÐ¼".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—]",
      LLL: "YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—], HH:mm",
      LLLL: "dddd, YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—], HH:mm"
    },
    calendar: {
      sameDay: "[ÐŸÐ°ÑÐ½] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
      nextDay: "[Ð«Ñ€Ð°Ð½] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
      lastDay: "[Ó–Ð½ÐµÑ€] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
      nextWeek: "[ÒªÐ¸Ñ‚ÐµÑ] dddd LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
      lastWeek: "[Ð˜Ñ€Ñ‚Ð½Ó—] dddd LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
      sameElse: "L"
    },
    relativeTime: {
      future: function future(a) {
        var b = /ÑÐµÑ…ÐµÑ‚$/i.exec(a) ? "Ñ€ÐµÐ½" : /Ò«ÑƒÐ»$/i.exec(a) ? "Ñ‚Ð°Ð½" : "Ñ€Ð°Ð½";
        return a + b;
      },
      past: "%s ÐºÐ°ÑÐ»Ð»Ð°",
      s: "Ð¿Ó—Ñ€-Ð¸Ðº Ò«ÐµÐºÐºÑƒÐ½Ñ‚",
      m: "Ð¿Ó—Ñ€ Ð¼Ð¸Ð½ÑƒÑ‚",
      mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚",
      h: "Ð¿Ó—Ñ€ ÑÐµÑ…ÐµÑ‚",
      hh: "%d ÑÐµÑ…ÐµÑ‚",
      d: "Ð¿Ó—Ñ€ ÐºÑƒÐ½",
      dd: "%d ÐºÑƒÐ½",
      M: "Ð¿Ó—Ñ€ ÑƒÐ¹Ó‘Ñ…",
      MM: "%d ÑƒÐ¹Ó‘Ñ…",
      y: "Ð¿Ó—Ñ€ Ò«ÑƒÐ»",
      yy: "%d Ò«ÑƒÐ»"
    },
    ordinalParse: /\d{1,2}-Ð¼Ó—Ñˆ/,
    ordinal: "%d-Ð¼Ó—Ñˆ",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("cy", {
    months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
    monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
    weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
    weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
    weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
    weekdaysParseExact: !0,
    // time formats are the same as en-gb
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Heddiw am] LT",
      nextDay: "[Yfory am] LT",
      nextWeek: "dddd [am] LT",
      lastDay: "[Ddoe am] LT",
      lastWeek: "dddd [diwethaf am] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "mewn %s",
      past: "%s yn Ã´l",
      s: "ychydig eiliadau",
      m: "munud",
      mm: "%d munud",
      h: "awr",
      hh: "%d awr",
      d: "diwrnod",
      dd: "%d diwrnod",
      M: "mis",
      MM: "%d mis",
      y: "blwyddyn",
      yy: "%d flynedd"
    },
    ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
    // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
    ordinal: function ordinal(a) {
      var b = a,
          c = "",
          d = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", // 1af to 10fed
      "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"];
      return b > 20 ? c = 40 === b || 50 === b || 60 === b || 80 === b || 100 === b ? "fed" : "ain" : b > 0 && (c = d[b]), a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("da", {
    months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays: "sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag".split("_"),
    weekdaysShort: "sÃ¸n_man_tir_ons_tor_fre_lÃ¸r".split("_"),
    weekdaysMin: "sÃ¸_ma_ti_on_to_fr_lÃ¸".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd [d.] D. MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[I dag kl.] LT",
      nextDay: "[I morgen kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[I gÃ¥r kl.] LT",
      lastWeek: "[sidste] dddd [kl] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "%s siden",
      s: "fÃ¥ sekunder",
      m: "et minut",
      mm: "%d minutter",
      h: "en time",
      hh: "%d timer",
      d: "en dag",
      dd: "%d dage",
      M: "en mÃ¥ned",
      MM: "%d mÃ¥neder",
      y: "et Ã¥r",
      yy: "%d Ã¥r"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("de-at", {
    months: "JÃ¤nner_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "JÃ¤n._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
    monthsParseExact: !0,
    weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd, D. MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[heute um] LT [Uhr]",
      sameElse: "L",
      nextDay: "[morgen um] LT [Uhr]",
      nextWeek: "dddd [um] LT [Uhr]",
      lastDay: "[gestern um] LT [Uhr]",
      lastWeek: "[letzten] dddd [um] LT [Uhr]"
    },
    relativeTime: {
      future: "in %s",
      past: "vor %s",
      s: "ein paar Sekunden",
      m: wd,
      mm: "%d Minuten",
      h: wd,
      hh: "%d Stunden",
      d: wd,
      dd: wd,
      M: wd,
      MM: wd,
      y: wd,
      yy: wd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("de", {
    months: "Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
    monthsParseExact: !0,
    weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd, D. MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[heute um] LT [Uhr]",
      sameElse: "L",
      nextDay: "[morgen um] LT [Uhr]",
      nextWeek: "dddd [um] LT [Uhr]",
      lastDay: "[gestern um] LT [Uhr]",
      lastWeek: "[letzten] dddd [um] LT [Uhr]"
    },
    relativeTime: {
      future: "in %s",
      past: "vor %s",
      s: "ein paar Sekunden",
      m: xd,
      mm: "%d Minuten",
      h: xd,
      hh: "%d Stunden",
      d: xd,
      dd: xd,
      M: xd,
      MM: xd,
      y: xd,
      yy: xd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), ["Þ–Þ¬Þ‚ÞªÞ‡Þ¦ÞƒÞ©", "ÞŠÞ¬Þ„Þ°ÞƒÞªÞ‡Þ¦ÞƒÞ©", "Þ‰Þ§ÞƒÞ¨Þ—Þª", "Þ‡Þ­Þ•Þ°ÞƒÞ©ÞÞª", "Þ‰Þ­", "Þ–Þ«Þ‚Þ°", "Þ–ÞªÞÞ¦Þ‡Þ¨", "Þ‡Þ¯ÞŽÞ¦ÞÞ°Þ“Þª", "ÞÞ¬Þ•Þ°Þ“Þ¬Þ‰Þ°Þ„Þ¦ÞƒÞª", "Þ‡Þ®Þ†Þ°Þ“Þ¯Þ„Þ¦ÞƒÞª", "Þ‚Þ®ÞˆÞ¬Þ‰Þ°Þ„Þ¦ÞƒÞª", "Þ‘Þ¨ÞÞ¬Þ‰Þ°Þ„Þ¦ÞƒÞª"]),
      Bg = ["Þ‡Þ§Þ‹Þ¨Þ‡Þ°ÞŒÞ¦", "Þ€Þ¯Þ‰Þ¦", "Þ‡Þ¦Þ‚Þ°ÞŽÞ§ÞƒÞ¦", "Þ„ÞªÞ‹Þ¦", "Þ„ÞªÞƒÞ§ÞÞ°ÞŠÞ¦ÞŒÞ¨", "Þ€ÞªÞ†ÞªÞƒÞª", "Þ€Þ®Þ‚Þ¨Þ€Þ¨ÞƒÞª"],
      Cg = (kg.defineLocale("dv", {
    months: Ag,
    monthsShort: Ag,
    weekdays: Bg,
    weekdaysShort: Bg,
    weekdaysMin: "Þ‡Þ§Þ‹Þ¨_Þ€Þ¯Þ‰Þ¦_Þ‡Þ¦Þ‚Þ°_Þ„ÞªÞ‹Þ¦_Þ„ÞªÞƒÞ§_Þ€ÞªÞ†Þª_Þ€Þ®Þ‚Þ¨".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "D/M/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /Þ‰Þ†|Þ‰ÞŠ/,
    isPM: function isPM(a) {
      return "Þ‰ÞŠ" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "Þ‰Þ†" : "Þ‰ÞŠ";
    },
    calendar: {
      sameDay: "[Þ‰Þ¨Þ‡Þ¦Þ‹Þª] LT",
      nextDay: "[Þ‰Þ§Þ‹Þ¦Þ‰Þ§] LT",
      nextWeek: "dddd LT",
      lastDay: "[Þ‡Þ¨Þ‡Þ°Þ”Þ¬] LT",
      lastWeek: "[ÞŠÞ§Þ‡Þ¨ÞŒÞªÞˆÞ¨] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ÞŒÞ¬ÞƒÞ­ÞŽÞ¦Þ‡Þ¨ %s",
      past: "Þ†ÞªÞƒÞ¨Þ‚Þ° %s",
      s: "ÞÞ¨Þ†ÞªÞ‚Þ°ÞŒÞªÞ†Þ®Þ…Þ¬Þ‡Þ°",
      m: "Þ‰Þ¨Þ‚Þ¨Þ“Þ¬Þ‡Þ°",
      mm: "Þ‰Þ¨Þ‚Þ¨Þ“Þª %d",
      h: "ÞŽÞ¦Þ‘Þ¨Þ‡Þ¨ÞƒÞ¬Þ‡Þ°",
      hh: "ÞŽÞ¦Þ‘Þ¨Þ‡Þ¨ÞƒÞª %d",
      d: "Þ‹ÞªÞˆÞ¦Þ€Þ¬Þ‡Þ°",
      dd: "Þ‹ÞªÞˆÞ¦ÞÞ° %d",
      M: "Þ‰Þ¦Þ€Þ¬Þ‡Þ°",
      MM: "Þ‰Þ¦ÞÞ° %d",
      y: "Þ‡Þ¦Þ€Þ¦ÞƒÞ¬Þ‡Þ°",
      yy: "Þ‡Þ¦Þ€Þ¦ÞƒÞª %d"
    },
    preparse: function preparse(a) {
      return a.replace(/ØŒ/g, ",");
    },
    postformat: function postformat(a) {
      return a.replace(/,/g, "ØŒ");
    },
    week: {
      dow: 7,
      // Sunday is the first day of the week.
      doy: 12
    }
  }), kg.defineLocale("el", {
    monthsNominativeEl: "Î™Î±Î½Î¿Ï…Î¬ÏÎ¹Î¿Ï‚_Î¦ÎµÎ²ÏÎ¿Ï…Î¬ÏÎ¹Î¿Ï‚_ÎœÎ¬ÏÏ„Î¹Î¿Ï‚_Î‘Ï€ÏÎ¯Î»Î¹Î¿Ï‚_ÎœÎ¬Î¹Î¿Ï‚_Î™Î¿ÏÎ½Î¹Î¿Ï‚_Î™Î¿ÏÎ»Î¹Î¿Ï‚_Î‘ÏÎ³Î¿Ï…ÏƒÏ„Î¿Ï‚_Î£ÎµÏ€Ï„Î­Î¼Î²ÏÎ¹Î¿Ï‚_ÎŸÎºÏ„ÏŽÎ²ÏÎ¹Î¿Ï‚_ÎÎ¿Î­Î¼Î²ÏÎ¹Î¿Ï‚_Î”ÎµÎºÎ­Î¼Î²ÏÎ¹Î¿Ï‚".split("_"),
    monthsGenitiveEl: "Î™Î±Î½Î¿Ï…Î±ÏÎ¯Î¿Ï…_Î¦ÎµÎ²ÏÎ¿Ï…Î±ÏÎ¯Î¿Ï…_ÎœÎ±ÏÏ„Î¯Î¿Ï…_Î‘Ï€ÏÎ¹Î»Î¯Î¿Ï…_ÎœÎ±ÎÎ¿Ï…_Î™Î¿Ï…Î½Î¯Î¿Ï…_Î™Î¿Ï…Î»Î¯Î¿Ï…_Î‘Ï…Î³Î¿ÏÏƒÏ„Î¿Ï…_Î£ÎµÏ€Ï„ÎµÎ¼Î²ÏÎ¯Î¿Ï…_ÎŸÎºÏ„Ï‰Î²ÏÎ¯Î¿Ï…_ÎÎ¿ÎµÎ¼Î²ÏÎ¯Î¿Ï…_Î”ÎµÎºÎµÎ¼Î²ÏÎ¯Î¿Ï…".split("_"),
    months: function months(a, b) {
      return /D/.test(b.substring(0, b.indexOf("MMMM"))) ? this._monthsGenitiveEl[a.month()] : this._monthsNominativeEl[a.month()];
    },
    monthsShort: "Î™Î±Î½_Î¦ÎµÎ²_ÎœÎ±Ï_Î‘Ï€Ï_ÎœÎ±ÏŠ_Î™Î¿Ï…Î½_Î™Î¿Ï…Î»_Î‘Ï…Î³_Î£ÎµÏ€_ÎŸÎºÏ„_ÎÎ¿Îµ_Î”ÎµÎº".split("_"),
    weekdays: "ÎšÏ…ÏÎ¹Î±ÎºÎ®_Î”ÎµÏ…Ï„Î­ÏÎ±_Î¤ÏÎ¯Ï„Î·_Î¤ÎµÏ„Î¬ÏÏ„Î·_Î Î­Î¼Ï€Ï„Î·_Î Î±ÏÎ±ÏƒÎºÎµÏ…Î®_Î£Î¬Î²Î²Î±Ï„Î¿".split("_"),
    weekdaysShort: "ÎšÏ…Ï_Î”ÎµÏ…_Î¤ÏÎ¹_Î¤ÎµÏ„_Î ÎµÎ¼_Î Î±Ï_Î£Î±Î²".split("_"),
    weekdaysMin: "ÎšÏ…_Î”Îµ_Î¤Ï_Î¤Îµ_Î Îµ_Î Î±_Î£Î±".split("_"),
    meridiem: function meridiem(a, b, c) {
      return a > 11 ? c ? "Î¼Î¼" : "ÎœÎœ" : c ? "Ï€Î¼" : "Î Îœ";
    },
    isPM: function isPM(a) {
      return "Î¼" === (a + "").toLowerCase()[0];
    },
    meridiemParse: /[Î Îœ]\.?Îœ?\.?/i,
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY h:mm A",
      LLLL: "dddd, D MMMM YYYY h:mm A"
    },
    calendarEl: {
      sameDay: "[Î£Î®Î¼ÎµÏÎ± {}] LT",
      nextDay: "[Î‘ÏÏÎ¹Î¿ {}] LT",
      nextWeek: "dddd [{}] LT",
      lastDay: "[Î§Î¸ÎµÏ‚ {}] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 6:
            return "[Ï„Î¿ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î¿] dddd [{}] LT";

          default:
            return "[Ï„Î·Î½ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î·] dddd [{}] LT";
        }
      },
      sameElse: "L"
    },
    calendar: function calendar(a, b) {
      var c = this._calendarEl[a],
          d = b && b.hours();
      return y(c) && (c = c.apply(b)), c.replace("{}", d % 12 === 1 ? "ÏƒÏ„Î·" : "ÏƒÏ„Î¹Ï‚");
    },
    relativeTime: {
      future: "ÏƒÎµ %s",
      past: "%s Ï€ÏÎ¹Î½",
      s: "Î»Î¯Î³Î± Î´ÎµÏ…Ï„ÎµÏÏŒÎ»ÎµÏ€Ï„Î±",
      m: "Î­Î½Î± Î»ÎµÏ€Ï„ÏŒ",
      mm: "%d Î»ÎµÏ€Ï„Î¬",
      h: "Î¼Î¯Î± ÏŽÏÎ±",
      hh: "%d ÏŽÏÎµÏ‚",
      d: "Î¼Î¯Î± Î¼Î­ÏÎ±",
      dd: "%d Î¼Î­ÏÎµÏ‚",
      M: "Î­Î½Î±Ï‚ Î¼Î®Î½Î±Ï‚",
      MM: "%d Î¼Î®Î½ÎµÏ‚",
      y: "Î­Î½Î±Ï‚ Ï‡ÏÏŒÎ½Î¿Ï‚",
      yy: "%d Ï‡ÏÏŒÎ½Î¹Î±"
    },
    ordinalParse: /\d{1,2}Î·/,
    ordinal: "%dÎ·",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("en-au", {
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY h:mm A",
      LLLL: "dddd, D MMMM YYYY h:mm A"
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("en-ca", {
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "YYYY-MM-DD",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A"
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    }
  }), kg.defineLocale("en-gb", {
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("en-ie", {
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("en-nz", {
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY h:mm A",
      LLLL: "dddd, D MMMM YYYY h:mm A"
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("eo", {
    months: "januaro_februaro_marto_aprilo_majo_junio_julio_aÅ­gusto_septembro_oktobro_novembro_decembro".split("_"),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aÅ­g_sep_okt_nov_dec".split("_"),
    weekdays: "DimanÄ‰o_Lundo_Mardo_Merkredo_Ä´aÅ­do_Vendredo_Sabato".split("_"),
    weekdaysShort: "Dim_Lun_Mard_Merk_Ä´aÅ­_Ven_Sab".split("_"),
    weekdaysMin: "Di_Lu_Ma_Me_Ä´a_Ve_Sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "D[-an de] MMMM, YYYY",
      LLL: "D[-an de] MMMM, YYYY HH:mm",
      LLLL: "dddd, [la] D[-an de] MMMM, YYYY HH:mm"
    },
    meridiemParse: /[ap]\.t\.m/i,
    isPM: function isPM(a) {
      return "p" === a.charAt(0).toLowerCase();
    },
    meridiem: function meridiem(a, b, c) {
      return a > 11 ? c ? "p.t.m." : "P.T.M." : c ? "a.t.m." : "A.T.M.";
    },
    calendar: {
      sameDay: "[HodiaÅ­ je] LT",
      nextDay: "[MorgaÅ­ je] LT",
      nextWeek: "dddd [je] LT",
      lastDay: "[HieraÅ­ je] LT",
      lastWeek: "[pasinta] dddd [je] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "je %s",
      past: "antaÅ­ %s",
      s: "sekundoj",
      m: "minuto",
      mm: "%d minutoj",
      h: "horo",
      hh: "%d horoj",
      d: "tago",
      //ne 'diurno', Ä‰ar estas uzita por proksimumo
      dd: "%d tagoj",
      M: "monato",
      MM: "%d monatoj",
      y: "jaro",
      yy: "%d jaroj"
    },
    ordinalParse: /\d{1,2}a/,
    ordinal: "%da",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_")),
      Dg = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      Eg = (kg.defineLocale("es-do", {
    months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
    monthsShort: function monthsShort(a, b) {
      return /-MMM-/.test(b) ? Dg[a.month()] : Cg[a.month()];
    },
    monthsParseExact: !0,
    weekdays: "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"),
    weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
    weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY h:mm A",
      LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
    },
    calendar: {
      sameDay: function sameDay() {
        return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      nextDay: function nextDay() {
        return "[maÃ±ana a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      nextWeek: function nextWeek() {
        return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      lastDay: function lastDay() {
        return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      lastWeek: function lastWeek() {
        return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "en %s",
      past: "hace %s",
      s: "unos segundos",
      m: "un minuto",
      mm: "%d minutos",
      h: "una hora",
      hh: "%d horas",
      d: "un dÃ­a",
      dd: "%d dÃ­as",
      M: "un mes",
      MM: "%d meses",
      y: "un aÃ±o",
      yy: "%d aÃ±os"
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: "%dÂº",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_")),
      Fg = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      Gg = (kg.defineLocale("es", {
    months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
    monthsShort: function monthsShort(a, b) {
      return /-MMM-/.test(b) ? Fg[a.month()] : Eg[a.month()];
    },
    monthsParseExact: !0,
    weekdays: "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"),
    weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
    weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY H:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
    },
    calendar: {
      sameDay: function sameDay() {
        return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      nextDay: function nextDay() {
        return "[maÃ±ana a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      nextWeek: function nextWeek() {
        return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      lastDay: function lastDay() {
        return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      lastWeek: function lastWeek() {
        return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "en %s",
      past: "hace %s",
      s: "unos segundos",
      m: "un minuto",
      mm: "%d minutos",
      h: "una hora",
      hh: "%d horas",
      d: "un dÃ­a",
      dd: "%d dÃ­as",
      M: "un mes",
      MM: "%d meses",
      y: "un aÃ±o",
      yy: "%d aÃ±os"
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: "%dÂº",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("et", {
    months: "jaanuar_veebruar_mÃ¤rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
    monthsShort: "jaan_veebr_mÃ¤rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
    weekdays: "pÃ¼hapÃ¤ev_esmaspÃ¤ev_teisipÃ¤ev_kolmapÃ¤ev_neljapÃ¤ev_reede_laupÃ¤ev".split("_"),
    weekdaysShort: "P_E_T_K_N_R_L".split("_"),
    weekdaysMin: "P_E_T_K_N_R_L".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[TÃ¤na,] LT",
      nextDay: "[Homme,] LT",
      nextWeek: "[JÃ¤rgmine] dddd LT",
      lastDay: "[Eile,] LT",
      lastWeek: "[Eelmine] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s pÃ¤rast",
      past: "%s tagasi",
      s: yd,
      m: yd,
      mm: yd,
      h: yd,
      hh: yd,
      d: yd,
      dd: "%d pÃ¤eva",
      M: yd,
      MM: yd,
      y: yd,
      yy: yd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("eu", {
    months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
    monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
    monthsParseExact: !0,
    weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
    weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
    weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "YYYY[ko] MMMM[ren] D[a]",
      LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
      LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
      l: "YYYY-M-D",
      ll: "YYYY[ko] MMM D[a]",
      lll: "YYYY[ko] MMM D[a] HH:mm",
      llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
    },
    calendar: {
      sameDay: "[gaur] LT[etan]",
      nextDay: "[bihar] LT[etan]",
      nextWeek: "dddd LT[etan]",
      lastDay: "[atzo] LT[etan]",
      lastWeek: "[aurreko] dddd LT[etan]",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s barru",
      past: "duela %s",
      s: "segundo batzuk",
      m: "minutu bat",
      mm: "%d minutu",
      h: "ordu bat",
      hh: "%d ordu",
      d: "egun bat",
      dd: "%d egun",
      M: "hilabete bat",
      MM: "%d hilabete",
      y: "urte bat",
      yy: "%d urte"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), {
    1: "Û±",
    2: "Û²",
    3: "Û³",
    4: "Û´",
    5: "Ûµ",
    6: "Û¶",
    7: "Û·",
    8: "Û¸",
    9: "Û¹",
    0: "Û°"
  }),
      Hg = {
    "Û±": "1",
    "Û²": "2",
    "Û³": "3",
    "Û´": "4",
    "Ûµ": "5",
    "Û¶": "6",
    "Û·": "7",
    "Û¸": "8",
    "Û¹": "9",
    "Û°": "0"
  },
      Ig = (kg.defineLocale("fa", {
    months: "Ú˜Ø§Ù†ÙˆÛŒÙ‡_ÙÙˆØ±ÛŒÙ‡_Ù…Ø§Ø±Ø³_Ø¢ÙˆØ±ÛŒÙ„_Ù…Ù‡_Ú˜ÙˆØ¦Ù†_Ú˜ÙˆØ¦ÛŒÙ‡_Ø§ÙˆØª_Ø³Ù¾ØªØ§Ù…Ø¨Ø±_Ø§Ú©ØªØ¨Ø±_Ù†ÙˆØ§Ù…Ø¨Ø±_Ø¯Ø³Ø§Ù…Ø¨Ø±".split("_"),
    monthsShort: "Ú˜Ø§Ù†ÙˆÛŒÙ‡_ÙÙˆØ±ÛŒÙ‡_Ù…Ø§Ø±Ø³_Ø¢ÙˆØ±ÛŒÙ„_Ù…Ù‡_Ú˜ÙˆØ¦Ù†_Ú˜ÙˆØ¦ÛŒÙ‡_Ø§ÙˆØª_Ø³Ù¾ØªØ§Ù…Ø¨Ø±_Ø§Ú©ØªØ¨Ø±_Ù†ÙˆØ§Ù…Ø¨Ø±_Ø¯Ø³Ø§Ù…Ø¨Ø±".split("_"),
    weekdays: "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡_Ø¯ÙˆØ´Ù†Ø¨Ù‡_Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡_Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡_Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡_Ø¬Ù…Ø¹Ù‡_Ø´Ù†Ø¨Ù‡".split("_"),
    weekdaysShort: "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡_Ø¯ÙˆØ´Ù†Ø¨Ù‡_Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡_Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡_Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡_Ø¬Ù…Ø¹Ù‡_Ø´Ù†Ø¨Ù‡".split("_"),
    weekdaysMin: "ÛŒ_Ø¯_Ø³_Ú†_Ù¾_Ø¬_Ø´".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    meridiemParse: /Ù‚Ø¨Ù„ Ø§Ø² Ø¸Ù‡Ø±|Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±/,
    isPM: function isPM(a) {
      return /Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±/.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "Ù‚Ø¨Ù„ Ø§Ø² Ø¸Ù‡Ø±" : "Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±";
    },
    calendar: {
      sameDay: "[Ø§Ù…Ø±ÙˆØ² Ø³Ø§Ø¹Øª] LT",
      nextDay: "[ÙØ±Ø¯Ø§ Ø³Ø§Ø¹Øª] LT",
      nextWeek: "dddd [Ø³Ø§Ø¹Øª] LT",
      lastDay: "[Ø¯ÛŒØ±ÙˆØ² Ø³Ø§Ø¹Øª] LT",
      lastWeek: "dddd [Ù¾ÛŒØ´] [Ø³Ø§Ø¹Øª] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "Ø¯Ø± %s",
      past: "%s Ù¾ÛŒØ´",
      s: "Ú†Ù†Ø¯ÛŒÙ† Ø«Ø§Ù†ÛŒÙ‡",
      m: "ÛŒÚ© Ø¯Ù‚ÛŒÙ‚Ù‡",
      mm: "%d Ø¯Ù‚ÛŒÙ‚Ù‡",
      h: "ÛŒÚ© Ø³Ø§Ø¹Øª",
      hh: "%d Ø³Ø§Ø¹Øª",
      d: "ÛŒÚ© Ø±ÙˆØ²",
      dd: "%d Ø±ÙˆØ²",
      M: "ÛŒÚ© Ù…Ø§Ù‡",
      MM: "%d Ù…Ø§Ù‡",
      y: "ÛŒÚ© Ø³Ø§Ù„",
      yy: "%d Ø³Ø§Ù„"
    },
    preparse: function preparse(a) {
      return a.replace(/[Û°-Û¹]/g, function (a) {
        return Hg[a];
      }).replace(/ØŒ/g, ",");
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return Gg[a];
      }).replace(/,/g, "ØŒ");
    },
    ordinalParse: /\d{1,2}Ù…/,
    ordinal: "%dÙ…",
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12
    }
  }), "nolla yksi kaksi kolme neljÃ¤ viisi kuusi seitsemÃ¤n kahdeksan yhdeksÃ¤n".split(" ")),
      Jg = ["nolla", "yhden", "kahden", "kolmen", "neljÃ¤n", "viiden", "kuuden", Ig[7], Ig[8], Ig[9]],
      Kg = (kg.defineLocale("fi", {
    months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesÃ¤kuu_heinÃ¤kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
    monthsShort: "tammi_helmi_maalis_huhti_touko_kesÃ¤_heinÃ¤_elo_syys_loka_marras_joulu".split("_"),
    weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
    weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
    weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD.MM.YYYY",
      LL: "Do MMMM[ta] YYYY",
      LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
      LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
      l: "D.M.YYYY",
      ll: "Do MMM YYYY",
      lll: "Do MMM YYYY, [klo] HH.mm",
      llll: "ddd, Do MMM YYYY, [klo] HH.mm"
    },
    calendar: {
      sameDay: "[tÃ¤nÃ¤Ã¤n] [klo] LT",
      nextDay: "[huomenna] [klo] LT",
      nextWeek: "dddd [klo] LT",
      lastDay: "[eilen] [klo] LT",
      lastWeek: "[viime] dddd[na] [klo] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s pÃ¤Ã¤stÃ¤",
      past: "%s sitten",
      s: zd,
      m: zd,
      mm: zd,
      h: zd,
      hh: zd,
      d: zd,
      dd: zd,
      M: zd,
      MM: zd,
      y: zd,
      yy: zd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("fo", {
    months: "januar_februar_mars_aprÃ­l_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
    weekdays: "sunnudagur_mÃ¡nadagur_tÃ½sdagur_mikudagur_hÃ³sdagur_frÃ­ggjadagur_leygardagur".split("_"),
    weekdaysShort: "sun_mÃ¡n_tÃ½s_mik_hÃ³s_frÃ­_ley".split("_"),
    weekdaysMin: "su_mÃ¡_tÃ½_mi_hÃ³_fr_le".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D. MMMM, YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ã dag kl.] LT",
      nextDay: "[Ã morgin kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[Ã gjÃ¡r kl.] LT",
      lastWeek: "[sÃ­Ã°stu] dddd [kl] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "um %s",
      past: "%s sÃ­Ã°ani",
      s: "fÃ¡ sekund",
      m: "ein minutt",
      mm: "%d minuttir",
      h: "ein tÃ­mi",
      hh: "%d tÃ­mar",
      d: "ein dagur",
      dd: "%d dagar",
      M: "ein mÃ¡naÃ°i",
      MM: "%d mÃ¡naÃ°ir",
      y: "eitt Ã¡r",
      yy: "%d Ã¡r"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("fr-ca", {
    months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"),
    monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"),
    monthsParseExact: !0,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Aujourd'hui Ã ] LT",
      nextDay: "[Demain Ã ] LT",
      nextWeek: "dddd [Ã ] LT",
      lastDay: "[Hier Ã ] LT",
      lastWeek: "dddd [dernier Ã ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans"
    },
    ordinalParse: /\d{1,2}(er|e)/,
    ordinal: function ordinal(a) {
      return a + (1 === a ? "er" : "e");
    }
  }), kg.defineLocale("fr-ch", {
    months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"),
    monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"),
    monthsParseExact: !0,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Aujourd'hui Ã ] LT",
      nextDay: "[Demain Ã ] LT",
      nextWeek: "dddd [Ã ] LT",
      lastDay: "[Hier Ã ] LT",
      lastWeek: "dddd [dernier Ã ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans"
    },
    ordinalParse: /\d{1,2}(er|e)/,
    ordinal: function ordinal(a) {
      return a + (1 === a ? "er" : "e");
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("fr", {
    months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"),
    monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"),
    monthsParseExact: !0,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Aujourd'hui Ã ] LT",
      nextDay: "[Demain Ã ] LT",
      nextWeek: "dddd [Ã ] LT",
      lastDay: "[Hier Ã ] LT",
      lastWeek: "dddd [dernier Ã ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans"
    },
    ordinalParse: /\d{1,2}(er|)/,
    ordinal: function ordinal(a) {
      return a + (1 === a ? "er" : "");
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_")),
      Lg = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
      Mg = (kg.defineLocale("fy", {
    months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
    monthsShort: function monthsShort(a, b) {
      return /-MMM-/.test(b) ? Lg[a.month()] : Kg[a.month()];
    },
    monthsParseExact: !0,
    weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
    weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
    weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[hjoed om] LT",
      nextDay: "[moarn om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[juster om] LT",
      lastWeek: "[Ã´frÃ»ne] dddd [om] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "oer %s",
      past: "%s lyn",
      s: "in pear sekonden",
      m: "ien minÃºt",
      mm: "%d minuten",
      h: "ien oere",
      hh: "%d oeren",
      d: "ien dei",
      dd: "%d dagen",
      M: "ien moanne",
      MM: "%d moannen",
      y: "ien jier",
      yy: "%d jierren"
    },
    ordinalParse: /\d{1,2}(ste|de)/,
    ordinal: function ordinal(a) {
      return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de");
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), ["Am Faoilleach", "An Gearran", "Am MÃ rt", "An Giblean", "An CÃ¨itean", "An t-Ã’gmhios", "An t-Iuchar", "An LÃ¹nastal", "An t-Sultain", "An DÃ mhair", "An t-Samhain", "An DÃ¹bhlachd"]),
      Ng = ["Faoi", "Gear", "MÃ rt", "Gibl", "CÃ¨it", "Ã’gmh", "Iuch", "LÃ¹n", "Sult", "DÃ mh", "Samh", "DÃ¹bh"],
      Og = ["DidÃ²mhnaich", "Diluain", "DimÃ irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
      Pg = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
      Qg = ["DÃ²", "Lu", "MÃ ", "Ci", "Ar", "Ha", "Sa"],
      Rg = (kg.defineLocale("gd", {
    months: Mg,
    monthsShort: Ng,
    monthsParseExact: !0,
    weekdays: Og,
    weekdaysShort: Pg,
    weekdaysMin: Qg,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[An-diugh aig] LT",
      nextDay: "[A-mÃ ireach aig] LT",
      nextWeek: "dddd [aig] LT",
      lastDay: "[An-dÃ¨ aig] LT",
      lastWeek: "dddd [seo chaidh] [aig] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ann an %s",
      past: "bho chionn %s",
      s: "beagan diogan",
      m: "mionaid",
      mm: "%d mionaidean",
      h: "uair",
      hh: "%d uairean",
      d: "latha",
      dd: "%d latha",
      M: "mÃ¬os",
      MM: "%d mÃ¬osan",
      y: "bliadhna",
      yy: "%d bliadhna"
    },
    ordinalParse: /\d{1,2}(d|na|mh)/,
    ordinal: function ordinal(a) {
      var b = 1 === a ? "d" : a % 10 === 2 ? "na" : "mh";
      return a + b;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("gl", {
    months: "Xaneiro_Febreiro_Marzo_Abril_Maio_XuÃ±o_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
    monthsShort: "Xan._Feb._Mar._Abr._Mai._XuÃ±._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "Domingo_Luns_Martes_MÃ©rcores_Xoves_Venres_SÃ¡bado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._MÃ©r._Xov._Ven._SÃ¡b.".split("_"),
    weekdaysMin: "Do_Lu_Ma_MÃ©_Xo_Ve_SÃ¡".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: function sameDay() {
        return "[hoxe " + (1 !== this.hours() ? "Ã¡s" : "Ã¡") + "] LT";
      },
      nextDay: function nextDay() {
        return "[maÃ±Ã¡ " + (1 !== this.hours() ? "Ã¡s" : "Ã¡") + "] LT";
      },
      nextWeek: function nextWeek() {
        return "dddd [" + (1 !== this.hours() ? "Ã¡s" : "a") + "] LT";
      },
      lastDay: function lastDay() {
        return "[onte " + (1 !== this.hours() ? "Ã¡" : "a") + "] LT";
      },
      lastWeek: function lastWeek() {
        return "[o] dddd [pasado " + (1 !== this.hours() ? "Ã¡s" : "a") + "] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: function future(a) {
        return "uns segundos" === a ? "nuns segundos" : "en " + a;
      },
      past: "hai %s",
      s: "uns segundos",
      m: "un minuto",
      mm: "%d minutos",
      h: "unha hora",
      hh: "%d horas",
      d: "un dÃ­a",
      dd: "%d dÃ­as",
      M: "un mes",
      MM: "%d meses",
      y: "un ano",
      yy: "%d anos"
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: "%dÂº",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("he", {
    months: "×™× ×•××¨_×¤×‘×¨×•××¨_×ž×¨×¥_××¤×¨×™×œ_×ž××™_×™×•× ×™_×™×•×œ×™_××•×’×•×¡×˜_×¡×¤×˜×ž×‘×¨_××•×§×˜×•×‘×¨_× ×•×‘×ž×‘×¨_×“×¦×ž×‘×¨".split("_"),
    monthsShort: "×™× ×•×³_×¤×‘×¨×³_×ž×¨×¥_××¤×¨×³_×ž××™_×™×•× ×™_×™×•×œ×™_××•×’×³_×¡×¤×˜×³_××•×§×³_× ×•×‘×³_×“×¦×ž×³".split("_"),
    weekdays: "×¨××©×•×Ÿ_×©× ×™_×©×œ×™×©×™_×¨×‘×™×¢×™_×—×ž×™×©×™_×©×™×©×™_×©×‘×ª".split("_"),
    weekdaysShort: "××³_×‘×³_×’×³_×“×³_×”×³_×•×³_×©×³".split("_"),
    weekdaysMin: "×_×‘_×’_×“_×”_×•_×©".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [×‘]MMMM YYYY",
      LLL: "D [×‘]MMMM YYYY HH:mm",
      LLLL: "dddd, D [×‘]MMMM YYYY HH:mm",
      l: "D/M/YYYY",
      ll: "D MMM YYYY",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd, D MMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[×”×™×•× ×‘Ö¾]LT",
      nextDay: "[×ž×—×¨ ×‘Ö¾]LT",
      nextWeek: "dddd [×‘×©×¢×”] LT",
      lastDay: "[××ª×ž×•×œ ×‘Ö¾]LT",
      lastWeek: "[×‘×™×•×] dddd [×”××—×¨×•×Ÿ ×‘×©×¢×”] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "×‘×¢×•×“ %s",
      past: "×œ×¤× ×™ %s",
      s: "×ž×¡×¤×¨ ×©× ×™×•×ª",
      m: "×“×§×”",
      mm: "%d ×“×§×•×ª",
      h: "×©×¢×”",
      hh: function hh(a) {
        return 2 === a ? "×©×¢×ª×™×™×" : a + " ×©×¢×•×ª";
      },
      d: "×™×•×",
      dd: function dd(a) {
        return 2 === a ? "×™×•×ž×™×™×" : a + " ×™×ž×™×";
      },
      M: "×—×•×“×©",
      MM: function MM(a) {
        return 2 === a ? "×—×•×“×©×™×™×" : a + " ×—×•×“×©×™×";
      },
      y: "×©× ×”",
      yy: function yy(a) {
        return 2 === a ? "×©× ×ª×™×™×" : a % 10 === 0 && 10 !== a ? a + " ×©× ×”" : a + " ×©× ×™×";
      }
    },
    meridiemParse: /××—×”"×¦|×œ×¤× ×”"×¦|××—×¨×™ ×”×¦×”×¨×™×™×|×œ×¤× ×™ ×”×¦×”×¨×™×™×|×œ×¤× ×•×ª ×‘×•×§×¨|×‘×‘×•×§×¨|×‘×¢×¨×‘/i,
    isPM: function isPM(a) {
      return /^(××—×”"×¦|××—×¨×™ ×”×¦×”×¨×™×™×|×‘×¢×¨×‘)$/.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 5 > a ? "×œ×¤× ×•×ª ×‘×•×§×¨" : 10 > a ? "×‘×‘×•×§×¨" : 12 > a ? c ? '×œ×¤× ×”"×¦' : "×œ×¤× ×™ ×”×¦×”×¨×™×™×" : 18 > a ? c ? '××—×”"×¦' : "××—×¨×™ ×”×¦×”×¨×™×™×" : "×‘×¢×¨×‘";
    }
  }), {
    1: "à¥§",
    2: "à¥¨",
    3: "à¥©",
    4: "à¥ª",
    5: "à¥«",
    6: "à¥¬",
    7: "à¥­",
    8: "à¥®",
    9: "à¥¯",
    0: "à¥¦"
  }),
      Sg = {
    "à¥§": "1",
    "à¥¨": "2",
    "à¥©": "3",
    "à¥ª": "4",
    "à¥«": "5",
    "à¥¬": "6",
    "à¥­": "7",
    "à¥®": "8",
    "à¥¯": "9",
    "à¥¦": "0"
  },
      Tg = (kg.defineLocale("hi", {
    months: "à¤œà¤¨à¤µà¤°à¥€_à¤«à¤¼à¤°à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¥ˆà¤²_à¤®à¤ˆ_à¤œà¥‚à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤¸à¥à¤¤_à¤¸à¤¿à¤¤à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‚à¤¬à¤°_à¤¨à¤µà¤®à¥à¤¬à¤°_à¤¦à¤¿à¤¸à¤®à¥à¤¬à¤°".split("_"),
    monthsShort: "à¤œà¤¨._à¤«à¤¼à¤°._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¥ˆ._à¤®à¤ˆ_à¤œà¥‚à¤¨_à¤œà¥à¤²._à¤…à¤—._à¤¸à¤¿à¤¤._à¤…à¤•à¥à¤Ÿà¥‚._à¤¨à¤µ._à¤¦à¤¿à¤¸.".split("_"),
    monthsParseExact: !0,
    weekdays: "à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤²à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°".split("_"),
    weekdaysShort: "à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤²_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿".split("_"),
    weekdaysMin: "à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶".split("_"),
    longDateFormat: {
      LT: "A h:mm à¤¬à¤œà¥‡",
      LTS: "A h:mm:ss à¤¬à¤œà¥‡",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm à¤¬à¤œà¥‡",
      LLLL: "dddd, D MMMM YYYY, A h:mm à¤¬à¤œà¥‡"
    },
    calendar: {
      sameDay: "[à¤†à¤œ] LT",
      nextDay: "[à¤•à¤²] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à¤•à¤²] LT",
      lastWeek: "[à¤ªà¤¿à¤›à¤²à¥‡] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à¤®à¥‡à¤‚",
      past: "%s à¤ªà¤¹à¤²à¥‡",
      s: "à¤•à¥à¤› à¤¹à¥€ à¤•à¥à¤·à¤£",
      m: "à¤à¤• à¤®à¤¿à¤¨à¤Ÿ",
      mm: "%d à¤®à¤¿à¤¨à¤Ÿ",
      h: "à¤à¤• à¤˜à¤‚à¤Ÿà¤¾",
      hh: "%d à¤˜à¤‚à¤Ÿà¥‡",
      d: "à¤à¤• à¤¦à¤¿à¤¨",
      dd: "%d à¤¦à¤¿à¤¨",
      M: "à¤à¤• à¤®à¤¹à¥€à¤¨à¥‡",
      MM: "%d à¤®à¤¹à¥€à¤¨à¥‡",
      y: "à¤à¤• à¤µà¤°à¥à¤·",
      yy: "%d à¤µà¤°à¥à¤·"
    },
    preparse: function preparse(a) {
      return a.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function (a) {
        return Sg[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return Rg[a];
      });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /à¤°à¤¾à¤¤|à¤¸à¥à¤¬à¤¹|à¤¦à¥‹à¤ªà¤¹à¤°|à¤¶à¤¾à¤®/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à¤°à¤¾à¤¤" === b ? 4 > a ? a : a + 12 : "à¤¸à¥à¤¬à¤¹" === b ? a : "à¤¦à¥‹à¤ªà¤¹à¤°" === b ? a >= 10 ? a : a + 12 : "à¤¶à¤¾à¤®" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à¤°à¤¾à¤¤" : 10 > a ? "à¤¸à¥à¤¬à¤¹" : 17 > a ? "à¤¦à¥‹à¤ªà¤¹à¤°" : 20 > a ? "à¤¶à¤¾à¤®" : "à¤°à¤¾à¤¤";
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), kg.defineLocale("hr", {
    months: {
      format: "sijeÄnja_veljaÄe_oÅ¾ujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),
      standalone: "sijeÄanj_veljaÄa_oÅ¾ujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")
    },
    monthsShort: "sij._velj._oÅ¾u._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
    weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
    weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danas u] LT",
      nextDay: "[sutra u] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";

          case 3:
            return "[u] [srijedu] [u] LT";

          case 6:
            return "[u] [subotu] [u] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      },
      lastDay: "[juÄer u] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
          case 3:
            return "[proÅ¡lu] dddd [u] LT";

          case 6:
            return "[proÅ¡le] [subote] [u] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[proÅ¡li] dddd [u] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "prije %s",
      s: "par sekundi",
      m: Bd,
      mm: Bd,
      h: Bd,
      hh: Bd,
      d: "dan",
      dd: Bd,
      M: "mjesec",
      MM: Bd,
      y: "godinu",
      yy: Bd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), "vasÃ¡rnap hÃ©tfÅ‘n kedden szerdÃ¡n csÃ¼tÃ¶rtÃ¶kÃ¶n pÃ©nteken szombaton".split(" ")),
      Ug = (kg.defineLocale("hu", {
    months: "januÃ¡r_februÃ¡r_mÃ¡rcius_Ã¡prilis_mÃ¡jus_jÃºnius_jÃºlius_augusztus_szeptember_oktÃ³ber_november_december".split("_"),
    monthsShort: "jan_feb_mÃ¡rc_Ã¡pr_mÃ¡j_jÃºn_jÃºl_aug_szept_okt_nov_dec".split("_"),
    weekdays: "vasÃ¡rnap_hÃ©tfÅ‘_kedd_szerda_csÃ¼tÃ¶rtÃ¶k_pÃ©ntek_szombat".split("_"),
    weekdaysShort: "vas_hÃ©t_kedd_sze_csÃ¼t_pÃ©n_szo".split("_"),
    weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "YYYY.MM.DD.",
      LL: "YYYY. MMMM D.",
      LLL: "YYYY. MMMM D. H:mm",
      LLLL: "YYYY. MMMM D., dddd H:mm"
    },
    meridiemParse: /de|du/i,
    isPM: function isPM(a) {
      return "u" === a.charAt(1).toLowerCase();
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? c === !0 ? "de" : "DE" : c === !0 ? "du" : "DU";
    },
    calendar: {
      sameDay: "[ma] LT[-kor]",
      nextDay: "[holnap] LT[-kor]",
      nextWeek: function nextWeek() {
        return Dd.call(this, !0);
      },
      lastDay: "[tegnap] LT[-kor]",
      lastWeek: function lastWeek() {
        return Dd.call(this, !1);
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "%s mÃºlva",
      past: "%s",
      s: Cd,
      m: Cd,
      mm: Cd,
      h: Cd,
      hh: Cd,
      d: Cd,
      dd: Cd,
      M: Cd,
      MM: Cd,
      y: Cd,
      yy: Cd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("hy-am", {
    months: {
      format: "Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€Õ«_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€Õ«_Õ´Õ¡Ö€Õ¿Õ«_Õ¡ÕºÖ€Õ«Õ¬Õ«_Õ´Õ¡ÕµÕ«Õ½Õ«_Õ°Õ¸Ö‚Õ¶Õ«Õ½Õ«_Õ°Õ¸Ö‚Õ¬Õ«Õ½Õ«_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½Õ«_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«".split("_"),
      standalone: "Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€_Õ´Õ¡Ö€Õ¿_Õ¡ÕºÖ€Õ«Õ¬_Õ´Õ¡ÕµÕ«Õ½_Õ°Õ¸Ö‚Õ¶Õ«Õ½_Õ°Õ¸Ö‚Õ¬Õ«Õ½_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€".split("_")
    },
    monthsShort: "Õ°Õ¶Õ¾_ÖƒÕ¿Ö€_Õ´Ö€Õ¿_Õ¡ÕºÖ€_Õ´ÕµÕ½_Õ°Õ¶Õ½_Õ°Õ¬Õ½_Ö…Õ£Õ½_Õ½ÕºÕ¿_Õ°Õ¯Õ¿_Õ¶Õ´Õ¢_Õ¤Õ¯Õ¿".split("_"),
    weekdays: "Õ¯Õ«Ö€Õ¡Õ¯Õ«_Õ¥Ö€Õ¯Õ¸Ö‚Õ·Õ¡Õ¢Õ©Õ«_Õ¥Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ¹Õ¸Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ°Õ«Õ¶Õ£Õ·Õ¡Õ¢Õ©Õ«_Õ¸Ö‚Ö€Õ¢Õ¡Õ©_Õ·Õ¡Õ¢Õ¡Õ©".split("_"),
    weekdaysShort: "Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©".split("_"),
    weekdaysMin: "Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY Õ©.",
      LLL: "D MMMM YYYY Õ©., HH:mm",
      LLLL: "dddd, D MMMM YYYY Õ©., HH:mm"
    },
    calendar: {
      sameDay: "[Õ¡ÕµÕ½Ö…Ö€] LT",
      nextDay: "[Õ¾Õ¡Õ²Õ¨] LT",
      lastDay: "[Õ¥Ö€Õ¥Õ¯] LT",
      nextWeek: function nextWeek() {
        return "dddd [Ö…Ö€Õ¨ ÕªÕ¡Õ´Õ¨] LT";
      },
      lastWeek: function lastWeek() {
        return "[Õ¡Õ¶ÖÕ¡Õ®] dddd [Ö…Ö€Õ¨ ÕªÕ¡Õ´Õ¨] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "%s Õ°Õ¥Õ¿Õ¸",
      past: "%s Õ¡Õ¼Õ¡Õ»",
      s: "Õ´Õ« Ö„Õ¡Õ¶Õ« Õ¾Õ¡ÕµÖ€Õ¯ÕµÕ¡Õ¶",
      m: "Ö€Õ¸ÕºÕ¥",
      mm: "%d Ö€Õ¸ÕºÕ¥",
      h: "ÕªÕ¡Õ´",
      hh: "%d ÕªÕ¡Õ´",
      d: "Ö…Ö€",
      dd: "%d Ö…Ö€",
      M: "Õ¡Õ´Õ«Õ½",
      MM: "%d Õ¡Õ´Õ«Õ½",
      y: "Õ¿Õ¡Ö€Õ«",
      yy: "%d Õ¿Õ¡Ö€Õ«"
    },
    meridiemParse: /Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡|Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡|ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡|Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶/,
    isPM: function isPM(a) {
      return /^(ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡|Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶)$/.test(a);
    },
    meridiem: function meridiem(a) {
      return 4 > a ? "Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡" : 12 > a ? "Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡" : 17 > a ? "ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡" : "Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶";
    },
    ordinalParse: /\d{1,2}|\d{1,2}-(Õ«Õ¶|Ö€Õ¤)/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "DDD":
        case "w":
        case "W":
        case "DDDo":
          return 1 === a ? a + "-Õ«Õ¶" : a + "-Ö€Õ¤";

        default:
          return a;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("id", {
    months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
    weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
    weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
    weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [pukul] HH.mm",
      LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "pagi" === b ? a : "siang" === b ? a >= 11 ? a : a + 12 : "sore" === b || "malam" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 11 > a ? "pagi" : 15 > a ? "siang" : 19 > a ? "sore" : "malam";
    },
    calendar: {
      sameDay: "[Hari ini pukul] LT",
      nextDay: "[Besok pukul] LT",
      nextWeek: "dddd [pukul] LT",
      lastDay: "[Kemarin pukul] LT",
      lastWeek: "dddd [lalu pukul] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dalam %s",
      past: "%s yang lalu",
      s: "beberapa detik",
      m: "semenit",
      mm: "%d menit",
      h: "sejam",
      hh: "%d jam",
      d: "sehari",
      dd: "%d hari",
      M: "sebulan",
      MM: "%d bulan",
      y: "setahun",
      yy: "%d tahun"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("is", {
    months: "janÃºar_febrÃºar_mars_aprÃ­l_maÃ­_jÃºnÃ­_jÃºlÃ­_Ã¡gÃºst_september_oktÃ³ber_nÃ³vember_desember".split("_"),
    monthsShort: "jan_feb_mar_apr_maÃ­_jÃºn_jÃºl_Ã¡gÃº_sep_okt_nÃ³v_des".split("_"),
    weekdays: "sunnudagur_mÃ¡nudagur_Ã¾riÃ°judagur_miÃ°vikudagur_fimmtudagur_fÃ¶studagur_laugardagur".split("_"),
    weekdaysShort: "sun_mÃ¡n_Ã¾ri_miÃ°_fim_fÃ¶s_lau".split("_"),
    weekdaysMin: "Su_MÃ¡_Ãžr_Mi_Fi_FÃ¶_La".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY [kl.] H:mm",
      LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
    },
    calendar: {
      sameDay: "[Ã­ dag kl.] LT",
      nextDay: "[Ã¡ morgun kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[Ã­ gÃ¦r kl.] LT",
      lastWeek: "[sÃ­Ã°asta] dddd [kl.] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "eftir %s",
      past: "fyrir %s sÃ­Ã°an",
      s: Fd,
      m: Fd,
      mm: Fd,
      h: "klukkustund",
      hh: Fd,
      d: Fd,
      dd: Fd,
      M: Fd,
      MM: Fd,
      y: Fd,
      yy: Fd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("it", {
    months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
    monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
    weekdays: "Domenica_LunedÃ¬_MartedÃ¬_MercoledÃ¬_GiovedÃ¬_VenerdÃ¬_Sabato".split("_"),
    weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
    weekdaysMin: "Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Oggi alle] LT",
      nextDay: "[Domani alle] LT",
      nextWeek: "dddd [alle] LT",
      lastDay: "[Ieri alle] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
            return "[la scorsa] dddd [alle] LT";

          default:
            return "[lo scorso] dddd [alle] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: function future(a) {
        return (/^[0-9].+$/.test(a) ? "tra" : "in") + " " + a;
      },
      past: "%s fa",
      s: "alcuni secondi",
      m: "un minuto",
      mm: "%d minuti",
      h: "un'ora",
      hh: "%d ore",
      d: "un giorno",
      dd: "%d giorni",
      M: "un mese",
      MM: "%d mesi",
      y: "un anno",
      yy: "%d anni"
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: "%dÂº",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("ja", {
    months: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
    monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
    weekdays: "æ—¥æ›œæ—¥_æœˆæ›œæ—¥_ç«æ›œæ—¥_æ°´æ›œæ—¥_æœ¨æ›œæ—¥_é‡‘æ›œæ—¥_åœŸæ›œæ—¥".split("_"),
    weekdaysShort: "æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ".split("_"),
    weekdaysMin: "æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ".split("_"),
    longDateFormat: {
      LT: "Ahæ™‚måˆ†",
      LTS: "Ahæ™‚måˆ†sç§’",
      L: "YYYY/MM/DD",
      LL: "YYYYå¹´MæœˆDæ—¥",
      LLL: "YYYYå¹´MæœˆDæ—¥Ahæ™‚måˆ†",
      LLLL: "YYYYå¹´MæœˆDæ—¥Ahæ™‚måˆ† dddd"
    },
    meridiemParse: /åˆå‰|åˆå¾Œ/i,
    isPM: function isPM(a) {
      return "åˆå¾Œ" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "åˆå‰" : "åˆå¾Œ";
    },
    calendar: {
      sameDay: "[ä»Šæ—¥] LT",
      nextDay: "[æ˜Žæ—¥] LT",
      nextWeek: "[æ¥é€±]dddd LT",
      lastDay: "[æ˜¨æ—¥] LT",
      lastWeek: "[å‰é€±]dddd LT",
      sameElse: "L"
    },
    ordinalParse: /\d{1,2}æ—¥/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "d":
        case "D":
        case "DDD":
          return a + "æ—¥";

        default:
          return a;
      }
    },
    relativeTime: {
      future: "%så¾Œ",
      past: "%så‰",
      s: "æ•°ç§’",
      m: "1åˆ†",
      mm: "%dåˆ†",
      h: "1æ™‚é–“",
      hh: "%dæ™‚é–“",
      d: "1æ—¥",
      dd: "%dæ—¥",
      M: "1ãƒ¶æœˆ",
      MM: "%dãƒ¶æœˆ",
      y: "1å¹´",
      yy: "%då¹´"
    }
  }), kg.defineLocale("jv", {
    months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
    weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
    weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
    weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [pukul] HH.mm",
      LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
    },
    meridiemParse: /enjing|siyang|sonten|ndalu/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "enjing" === b ? a : "siyang" === b ? a >= 11 ? a : a + 12 : "sonten" === b || "ndalu" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 11 > a ? "enjing" : 15 > a ? "siyang" : 19 > a ? "sonten" : "ndalu";
    },
    calendar: {
      sameDay: "[Dinten puniko pukul] LT",
      nextDay: "[Mbenjang pukul] LT",
      nextWeek: "dddd [pukul] LT",
      lastDay: "[Kala wingi pukul] LT",
      lastWeek: "dddd [kepengker pukul] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "wonten ing %s",
      past: "%s ingkang kepengker",
      s: "sawetawis detik",
      m: "setunggal menit",
      mm: "%d menit",
      h: "setunggal jam",
      hh: "%d jam",
      d: "sedinten",
      dd: "%d dinten",
      M: "sewulan",
      MM: "%d wulan",
      y: "setaun",
      yy: "%d taun"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("ka", {
    months: {
      standalone: "áƒ˜áƒáƒœáƒ•áƒáƒ áƒ˜_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ˜_áƒ›áƒáƒ áƒ¢áƒ˜_áƒáƒžáƒ áƒ˜áƒšáƒ˜_áƒ›áƒáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ˜_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ˜_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜".split("_"),
      format: "áƒ˜áƒáƒœáƒ•áƒáƒ áƒ¡_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ¡_áƒ›áƒáƒ áƒ¢áƒ¡_áƒáƒžáƒ áƒ˜áƒšáƒ˜áƒ¡_áƒ›áƒáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ¡_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ¡_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ¡_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡".split("_")
    },
    monthsShort: "áƒ˜áƒáƒœ_áƒ—áƒ”áƒ‘_áƒ›áƒáƒ _áƒáƒžáƒ _áƒ›áƒáƒ˜_áƒ˜áƒ•áƒœ_áƒ˜áƒ•áƒš_áƒáƒ’áƒ•_áƒ¡áƒ”áƒ¥_áƒáƒ¥áƒ¢_áƒœáƒáƒ”_áƒ“áƒ”áƒ™".split("_"),
    weekdays: {
      standalone: "áƒ™áƒ•áƒ˜áƒ áƒ_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ˜_áƒ¨áƒáƒ‘áƒáƒ—áƒ˜".split("_"),
      format: "áƒ™áƒ•áƒ˜áƒ áƒáƒ¡_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ¡_áƒ¨áƒáƒ‘áƒáƒ—áƒ¡".split("_"),
      isFormat: /(áƒ¬áƒ˜áƒœáƒ|áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’)/
    },
    weekdaysShort: "áƒ™áƒ•áƒ˜_áƒáƒ áƒ¨_áƒ¡áƒáƒ›_áƒáƒ—áƒ®_áƒ®áƒ£áƒ—_áƒžáƒáƒ _áƒ¨áƒáƒ‘".split("_"),
    weekdaysMin: "áƒ™áƒ•_áƒáƒ _áƒ¡áƒ_áƒáƒ—_áƒ®áƒ£_áƒžáƒ_áƒ¨áƒ".split("_"),
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY h:mm A",
      LLLL: "dddd, D MMMM YYYY h:mm A"
    },
    calendar: {
      sameDay: "[áƒ“áƒ¦áƒ”áƒ¡] LT[-áƒ–áƒ”]",
      nextDay: "[áƒ®áƒ•áƒáƒš] LT[-áƒ–áƒ”]",
      lastDay: "[áƒ’áƒ£áƒ¨áƒ˜áƒœ] LT[-áƒ–áƒ”]",
      nextWeek: "[áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’] dddd LT[-áƒ–áƒ”]",
      lastWeek: "[áƒ¬áƒ˜áƒœáƒ] dddd LT-áƒ–áƒ”",
      sameElse: "L"
    },
    relativeTime: {
      future: function future(a) {
        return /(áƒ¬áƒáƒ›áƒ˜|áƒ¬áƒ£áƒ—áƒ˜|áƒ¡áƒáƒáƒ—áƒ˜|áƒ¬áƒ”áƒšáƒ˜)/.test(a) ? a.replace(/áƒ˜$/, "áƒ¨áƒ˜") : a + "áƒ¨áƒ˜";
      },
      past: function past(a) {
        return /(áƒ¬áƒáƒ›áƒ˜|áƒ¬áƒ£áƒ—áƒ˜|áƒ¡áƒáƒáƒ—áƒ˜|áƒ“áƒ¦áƒ”|áƒ—áƒ•áƒ”)/.test(a) ? a.replace(/(áƒ˜|áƒ”)$/, "áƒ˜áƒ¡ áƒ¬áƒ˜áƒœ") : /áƒ¬áƒ”áƒšáƒ˜/.test(a) ? a.replace(/áƒ¬áƒ”áƒšáƒ˜$/, "áƒ¬áƒšáƒ˜áƒ¡ áƒ¬áƒ˜áƒœ") : void 0;
      },
      s: "áƒ áƒáƒ›áƒ“áƒ”áƒœáƒ˜áƒ›áƒ” áƒ¬áƒáƒ›áƒ˜",
      m: "áƒ¬áƒ£áƒ—áƒ˜",
      mm: "%d áƒ¬áƒ£áƒ—áƒ˜",
      h: "áƒ¡áƒáƒáƒ—áƒ˜",
      hh: "%d áƒ¡áƒáƒáƒ—áƒ˜",
      d: "áƒ“áƒ¦áƒ”",
      dd: "%d áƒ“áƒ¦áƒ”",
      M: "áƒ—áƒ•áƒ”",
      MM: "%d áƒ—áƒ•áƒ”",
      y: "áƒ¬áƒ”áƒšáƒ˜",
      yy: "%d áƒ¬áƒ”áƒšáƒ˜"
    },
    ordinalParse: /0|1-áƒšáƒ˜|áƒ›áƒ”-\d{1,2}|\d{1,2}-áƒ”/,
    ordinal: function ordinal(a) {
      return 0 === a ? a : 1 === a ? a + "-áƒšáƒ˜" : 20 > a || 100 >= a && a % 20 === 0 || a % 100 === 0 ? "áƒ›áƒ”-" + a : a + "-áƒ”";
    },
    week: {
      dow: 1,
      doy: 7
    }
  }), {
    0: "-ÑˆÑ–",
    1: "-ÑˆÑ–",
    2: "-ÑˆÑ–",
    3: "-ÑˆÑ–",
    4: "-ÑˆÑ–",
    5: "-ÑˆÑ–",
    6: "-ÑˆÑ‹",
    7: "-ÑˆÑ–",
    8: "-ÑˆÑ–",
    9: "-ÑˆÑ‹",
    10: "-ÑˆÑ‹",
    20: "-ÑˆÑ‹",
    30: "-ÑˆÑ‹",
    40: "-ÑˆÑ‹",
    50: "-ÑˆÑ–",
    60: "-ÑˆÑ‹",
    70: "-ÑˆÑ–",
    80: "-ÑˆÑ–",
    90: "-ÑˆÑ‹",
    100: "-ÑˆÑ–"
  }),
      Vg = (kg.defineLocale("kk", {
    months: "Ò›Ð°Ò£Ñ‚Ð°Ñ€_Ð°Ò›Ð¿Ð°Ð½_Ð½Ð°ÑƒÑ€Ñ‹Ð·_ÑÓ™ÑƒÑ–Ñ€_Ð¼Ð°Ð¼Ñ‹Ñ€_Ð¼Ð°ÑƒÑÑ‹Ð¼_ÑˆÑ–Ð»Ð´Ðµ_Ñ‚Ð°Ð¼Ñ‹Ð·_Ò›Ñ‹Ñ€ÐºÒ¯Ð¹ÐµÐº_Ò›Ð°Ð·Ð°Ð½_Ò›Ð°Ñ€Ð°ÑˆÐ°_Ð¶ÐµÐ»Ñ‚Ð¾Ò›ÑÐ°Ð½".split("_"),
    monthsShort: "Ò›Ð°Ò£_Ð°Ò›Ð¿_Ð½Ð°Ñƒ_ÑÓ™Ñƒ_Ð¼Ð°Ð¼_Ð¼Ð°Ñƒ_ÑˆÑ–Ð»_Ñ‚Ð°Ð¼_Ò›Ñ‹Ñ€_Ò›Ð°Ð·_Ò›Ð°Ñ€_Ð¶ÐµÐ»".split("_"),
    weekdays: "Ð¶ÐµÐºÑÐµÐ½Ð±Ñ–_Ð´Ò¯Ð¹ÑÐµÐ½Ð±Ñ–_ÑÐµÐ¹ÑÐµÐ½Ð±Ñ–_ÑÓ™Ñ€ÑÐµÐ½Ð±Ñ–_Ð±ÐµÐ¹ÑÐµÐ½Ð±Ñ–_Ð¶Ò±Ð¼Ð°_ÑÐµÐ½Ð±Ñ–".split("_"),
    weekdaysShort: "Ð¶ÐµÐº_Ð´Ò¯Ð¹_ÑÐµÐ¹_ÑÓ™Ñ€_Ð±ÐµÐ¹_Ð¶Ò±Ð¼_ÑÐµÐ½".split("_"),
    weekdaysMin: "Ð¶Ðº_Ð´Ð¹_ÑÐ¹_ÑÑ€_Ð±Ð¹_Ð¶Ð¼_ÑÐ½".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ð‘Ò¯Ð³Ñ–Ð½ ÑÐ°Ò“Ð°Ñ‚] LT",
      nextDay: "[Ð•Ñ€Ñ‚ÐµÒ£ ÑÐ°Ò“Ð°Ñ‚] LT",
      nextWeek: "dddd [ÑÐ°Ò“Ð°Ñ‚] LT",
      lastDay: "[ÐšÐµÑˆÐµ ÑÐ°Ò“Ð°Ñ‚] LT",
      lastWeek: "[Ó¨Ñ‚ÐºÐµÐ½ Ð°Ð¿Ñ‚Ð°Ð½Ñ‹Ò£] dddd [ÑÐ°Ò“Ð°Ñ‚] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s Ñ–ÑˆÑ–Ð½Ð´Ðµ",
      past: "%s Ð±Ò±Ñ€Ñ‹Ð½",
      s: "Ð±Ñ–Ñ€Ð½ÐµÑˆÐµ ÑÐµÐºÑƒÐ½Ð´",
      m: "Ð±Ñ–Ñ€ Ð¼Ð¸Ð½ÑƒÑ‚",
      mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚",
      h: "Ð±Ñ–Ñ€ ÑÐ°Ò“Ð°Ñ‚",
      hh: "%d ÑÐ°Ò“Ð°Ñ‚",
      d: "Ð±Ñ–Ñ€ ÐºÒ¯Ð½",
      dd: "%d ÐºÒ¯Ð½",
      M: "Ð±Ñ–Ñ€ Ð°Ð¹",
      MM: "%d Ð°Ð¹",
      y: "Ð±Ñ–Ñ€ Ð¶Ñ‹Ð»",
      yy: "%d Ð¶Ñ‹Ð»"
    },
    ordinalParse: /\d{1,2}-(ÑˆÑ–|ÑˆÑ‹)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = a >= 100 ? 100 : null;
      return a + (Ug[a] || Ug[b] || Ug[c]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("km", {
    months: "áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž¸áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼".split("_"),
    monthsShort: "áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž¸áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼".split("_"),
    weekdays: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"),
    weekdaysShort: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"),
    weekdaysMin: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[ážáŸ’áž„áŸƒáž“áŸáŸ‡ áž˜áŸ‰áŸ„áž„] LT",
      nextDay: "[ážŸáŸ’áž¢áŸ‚áž€ áž˜áŸ‰áŸ„áž„] LT",
      nextWeek: "dddd [áž˜áŸ‰áŸ„áž„] LT",
      lastDay: "[áž˜áŸ’ážŸáž·áž›áž˜áž·áž‰ áž˜áŸ‰áŸ„áž„] LT",
      lastWeek: "dddd [ážŸáž”áŸ’ážáž¶áž áŸáž˜áž»áž“] [áž˜áŸ‰áŸ„áž„] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sáž‘áŸ€áž",
      past: "%sáž˜áž»áž“",
      s: "áž”áŸ‰áž»áž“áŸ’áž˜áž¶áž“ážœáž·áž“áž¶áž‘áž¸",
      m: "áž˜áž½áž™áž“áž¶áž‘áž¸",
      mm: "%d áž“áž¶áž‘áž¸",
      h: "áž˜áž½áž™áž˜áŸ‰áŸ„áž„",
      hh: "%d áž˜áŸ‰áŸ„áž„",
      d: "áž˜áž½áž™ážáŸ’áž„áŸƒ",
      dd: "%d ážáŸ’áž„áŸƒ",
      M: "áž˜áž½áž™ážáŸ‚",
      MM: "%d ážáŸ‚",
      y: "áž˜áž½áž™áž†áŸ’áž“áž¶áŸ†",
      yy: "%d áž†áŸ’áž“áž¶áŸ†"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("ko", {
    months: "1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”".split("_"),
    monthsShort: "1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”".split("_"),
    weekdays: "ì¼ìš”ì¼_ì›”ìš”ì¼_í™”ìš”ì¼_ìˆ˜ìš”ì¼_ëª©ìš”ì¼_ê¸ˆìš”ì¼_í† ìš”ì¼".split("_"),
    weekdaysShort: "ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† ".split("_"),
    weekdaysMin: "ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† ".split("_"),
    longDateFormat: {
      LT: "A hì‹œ më¶„",
      LTS: "A hì‹œ më¶„ sì´ˆ",
      L: "YYYY.MM.DD",
      LL: "YYYYë…„ MMMM Dì¼",
      LLL: "YYYYë…„ MMMM Dì¼ A hì‹œ më¶„",
      LLLL: "YYYYë…„ MMMM Dì¼ dddd A hì‹œ më¶„"
    },
    calendar: {
      sameDay: "ì˜¤ëŠ˜ LT",
      nextDay: "ë‚´ì¼ LT",
      nextWeek: "dddd LT",
      lastDay: "ì–´ì œ LT",
      lastWeek: "ì§€ë‚œì£¼ dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s í›„",
      past: "%s ì „",
      s: "ëª‡ ì´ˆ",
      ss: "%dì´ˆ",
      m: "ì¼ë¶„",
      mm: "%dë¶„",
      h: "í•œ ì‹œê°„",
      hh: "%dì‹œê°„",
      d: "í•˜ë£¨",
      dd: "%dì¼",
      M: "í•œ ë‹¬",
      MM: "%dë‹¬",
      y: "ì¼ ë…„",
      yy: "%dë…„"
    },
    ordinalParse: /\d{1,2}ì¼/,
    ordinal: "%dì¼",
    meridiemParse: /ì˜¤ì „|ì˜¤í›„/,
    isPM: function isPM(a) {
      return "ì˜¤í›„" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "ì˜¤ì „" : "ì˜¤í›„";
    }
  }), {
    0: "-Ñ‡Ò¯",
    1: "-Ñ‡Ð¸",
    2: "-Ñ‡Ð¸",
    3: "-Ñ‡Ò¯",
    4: "-Ñ‡Ò¯",
    5: "-Ñ‡Ð¸",
    6: "-Ñ‡Ñ‹",
    7: "-Ñ‡Ð¸",
    8: "-Ñ‡Ð¸",
    9: "-Ñ‡Ñƒ",
    10: "-Ñ‡Ñƒ",
    20: "-Ñ‡Ñ‹",
    30: "-Ñ‡Ñƒ",
    40: "-Ñ‡Ñ‹",
    50: "-Ñ‡Ò¯",
    60: "-Ñ‡Ñ‹",
    70: "-Ñ‡Ð¸",
    80: "-Ñ‡Ð¸",
    90: "-Ñ‡Ñƒ",
    100: "-Ñ‡Ò¯"
  }),
      Wg = (kg.defineLocale("ky", {
    months: "ÑÐ½Ð²Ð°Ñ€ÑŒ_Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»ÑŒ_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_Ð¾ÐºÑ‚ÑÐ±Ñ€ÑŒ_Ð½Ð¾ÑÐ±Ñ€ÑŒ_Ð´ÐµÐºÐ°Ð±Ñ€ÑŒ".split("_"),
    monthsShort: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"),
    weekdays: "Ð–ÐµÐºÑˆÐµÐ¼Ð±Ð¸_Ð”Ò¯Ð¹ÑˆÓ©Ð¼Ð±Ò¯_Ð¨ÐµÐ¹ÑˆÐµÐ¼Ð±Ð¸_Ð¨Ð°Ñ€ÑˆÐµÐ¼Ð±Ð¸_Ð‘ÐµÐ¹ÑˆÐµÐ¼Ð±Ð¸_Ð–ÑƒÐ¼Ð°_Ð˜ÑˆÐµÐ¼Ð±Ð¸".split("_"),
    weekdaysShort: "Ð–ÐµÐº_Ð”Ò¯Ð¹_Ð¨ÐµÐ¹_Ð¨Ð°Ñ€_Ð‘ÐµÐ¹_Ð–ÑƒÐ¼_Ð˜ÑˆÐµ".split("_"),
    weekdaysMin: "Ð–Ðº_Ð”Ð¹_Ð¨Ð¹_Ð¨Ñ€_Ð‘Ð¹_Ð–Ð¼_Ð˜Ñˆ".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ð‘Ò¯Ð³Ò¯Ð½ ÑÐ°Ð°Ñ‚] LT",
      nextDay: "[Ð­Ñ€Ñ‚ÐµÒ£ ÑÐ°Ð°Ñ‚] LT",
      nextWeek: "dddd [ÑÐ°Ð°Ñ‚] LT",
      lastDay: "[ÐšÐµÑ‡Ðµ ÑÐ°Ð°Ñ‚] LT",
      lastWeek: "[Ó¨Ñ‚ÐºÐµÐ½ Ð°Ð¿Ñ‚Ð°Ð½Ñ‹Ð½] dddd [ÐºÒ¯Ð½Ò¯] [ÑÐ°Ð°Ñ‚] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s Ð¸Ñ‡Ð¸Ð½Ð´Ðµ",
      past: "%s Ð¼ÑƒÑ€ÑƒÐ½",
      s: "Ð±Ð¸Ñ€Ð½ÐµÑ‡Ðµ ÑÐµÐºÑƒÐ½Ð´",
      m: "Ð±Ð¸Ñ€ Ð¼Ò¯Ð½Ó©Ñ‚",
      mm: "%d Ð¼Ò¯Ð½Ó©Ñ‚",
      h: "Ð±Ð¸Ñ€ ÑÐ°Ð°Ñ‚",
      hh: "%d ÑÐ°Ð°Ñ‚",
      d: "Ð±Ð¸Ñ€ ÐºÒ¯Ð½",
      dd: "%d ÐºÒ¯Ð½",
      M: "Ð±Ð¸Ñ€ Ð°Ð¹",
      MM: "%d Ð°Ð¹",
      y: "Ð±Ð¸Ñ€ Ð¶Ñ‹Ð»",
      yy: "%d Ð¶Ñ‹Ð»"
    },
    ordinalParse: /\d{1,2}-(Ñ‡Ð¸|Ñ‡Ñ‹|Ñ‡Ò¯|Ñ‡Ñƒ)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = a >= 100 ? 100 : null;
      return a + (Vg[a] || Vg[b] || Vg[c]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("lb", {
    months: "Januar_Februar_MÃ¤erz_AbrÃ«ll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
    monthsParseExact: !0,
    weekdays: "Sonndeg_MÃ©indeg_DÃ«nschdeg_MÃ«ttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
    weekdaysShort: "So._MÃ©._DÃ«._MÃ«._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_MÃ©_DÃ«_MÃ«_Do_Fr_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm [Auer]",
      LTS: "H:mm:ss [Auer]",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm [Auer]",
      LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
    },
    calendar: {
      sameDay: "[Haut um] LT",
      sameElse: "L",
      nextDay: "[Muer um] LT",
      nextWeek: "dddd [um] LT",
      lastDay: "[GÃ«schter um] LT",
      lastWeek: function lastWeek() {
        // Different date string for 'DÃ«nschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
        switch (this.day()) {
          case 2:
          case 4:
            return "[Leschten] dddd [um] LT";

          default:
            return "[Leschte] dddd [um] LT";
        }
      }
    },
    relativeTime: {
      future: Hd,
      past: Id,
      s: "e puer Sekonnen",
      m: Gd,
      mm: "%d Minutten",
      h: Gd,
      hh: "%d Stonnen",
      d: Gd,
      dd: "%d Deeg",
      M: Gd,
      MM: "%d MÃ©int",
      y: Gd,
      yy: "%d Joer"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("lo", {
    months: "àº¡àº±àº‡àºàº­àº™_àºàº¸àº¡àºžàº²_àº¡àºµàº™àº²_à»€àº¡àºªàº²_àºžàº¶àº”àºªàº°àºžàº²_àº¡àº´àº–àº¸àº™àº²_àºà»àº¥àº°àºàº»àº”_àºªàº´àº‡àº«àº²_àºàº±àº™àºàº²_àº•àº¸àº¥àº²_àºžàº°àºˆàº´àº_àº—àº±àº™àº§àº²".split("_"),
    monthsShort: "àº¡àº±àº‡àºàº­àº™_àºàº¸àº¡àºžàº²_àº¡àºµàº™àº²_à»€àº¡àºªàº²_àºžàº¶àº”àºªàº°àºžàº²_àº¡àº´àº–àº¸àº™àº²_àºà»àº¥àº°àºàº»àº”_àºªàº´àº‡àº«àº²_àºàº±àº™àºàº²_àº•àº¸àº¥àº²_àºžàº°àºˆàº´àº_àº—àº±àº™àº§àº²".split("_"),
    weekdays: "àº­àº²àº—àº´àº”_àºˆàº±àº™_àº­àº±àº‡àº„àº²àº™_àºžàº¸àº”_àºžàº°àº«àº±àº”_àºªàº¸àº_à»€àºªàº»àº²".split("_"),
    weekdaysShort: "àº—àº´àº”_àºˆàº±àº™_àº­àº±àº‡àº„àº²àº™_àºžàº¸àº”_àºžàº°àº«àº±àº”_àºªàº¸àº_à»€àºªàº»àº²".split("_"),
    weekdaysMin: "àº—_àºˆ_àº­àº„_àºž_àºžàº«_àºªàº_àºª".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "àº§àº±àº™dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /àº•àº­àº™à»€àºŠàº»à»‰àº²|àº•àº­àº™à»àº¥àº‡/,
    isPM: function isPM(a) {
      return "àº•àº­àº™à»àº¥àº‡" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "àº•àº­àº™à»€àºŠàº»à»‰àº²" : "àº•àº­àº™à»àº¥àº‡";
    },
    calendar: {
      sameDay: "[àº¡àº·à»‰àº™àºµà»‰à»€àº§àº¥àº²] LT",
      nextDay: "[àº¡àº·à»‰àº­àº·à»ˆàº™à»€àº§àº¥àº²] LT",
      nextWeek: "[àº§àº±àº™]dddd[à»œà»‰àº²à»€àº§àº¥àº²] LT",
      lastDay: "[àº¡àº·à»‰àº§àº²àº™àº™àºµà»‰à»€àº§àº¥àº²] LT",
      lastWeek: "[àº§àº±àº™]dddd[à»àº¥à»‰àº§àº™àºµà»‰à»€àº§àº¥àº²] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "àº­àºµàº %s",
      past: "%sàºœà»ˆàº²àº™àº¡àº²",
      s: "àºšà»à»ˆà»€àº—àº»à»ˆàº²à»ƒàº”àº§àº´àº™àº²àº—àºµ",
      m: "1 àº™àº²àº—àºµ",
      mm: "%d àº™àº²àº—àºµ",
      h: "1 àºŠàº»à»ˆàº§à»‚àº¡àº‡",
      hh: "%d àºŠàº»à»ˆàº§à»‚àº¡àº‡",
      d: "1 àº¡àº·à»‰",
      dd: "%d àº¡àº·à»‰",
      M: "1 à»€àº”àº·àº­àº™",
      MM: "%d à»€àº”àº·àº­àº™",
      y: "1 àº›àºµ",
      yy: "%d àº›àºµ"
    },
    ordinalParse: /(àº—àºµà»ˆ)\d{1,2}/,
    ordinal: function ordinal(a) {
      return "àº—àºµà»ˆ" + a;
    }
  }), {
    m: "minutÄ—_minutÄ—s_minutÄ™",
    mm: "minutÄ—s_minuÄiÅ³_minutes",
    h: "valanda_valandos_valandÄ…",
    hh: "valandos_valandÅ³_valandas",
    d: "diena_dienos_dienÄ…",
    dd: "dienos_dienÅ³_dienas",
    M: "mÄ—nuo_mÄ—nesio_mÄ—nesÄ¯",
    MM: "mÄ—nesiai_mÄ—nesiÅ³_mÄ—nesius",
    y: "metai_metÅ³_metus",
    yy: "metai_metÅ³_metus"
  }),
      Xg = (kg.defineLocale("lt", {
    months: {
      format: "sausio_vasario_kovo_balandÅ¾io_geguÅ¾Ä—s_birÅ¾elio_liepos_rugpjÅ«Äio_rugsÄ—jo_spalio_lapkriÄio_gruodÅ¾io".split("_"),
      standalone: "sausis_vasaris_kovas_balandis_geguÅ¾Ä—_birÅ¾elis_liepa_rugpjÅ«tis_rugsÄ—jis_spalis_lapkritis_gruodis".split("_"),
      isFormat: /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?|MMMM?(\[[^\[\]]*\]|\s+)+D[oD]?/
    },
    monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
    weekdays: {
      format: "sekmadienÄ¯_pirmadienÄ¯_antradienÄ¯_treÄiadienÄ¯_ketvirtadienÄ¯_penktadienÄ¯_Å¡eÅ¡tadienÄ¯".split("_"),
      standalone: "sekmadienis_pirmadienis_antradienis_treÄiadienis_ketvirtadienis_penktadienis_Å¡eÅ¡tadienis".split("_"),
      isFormat: /dddd HH:mm/
    },
    weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Å eÅ¡".split("_"),
    weekdaysMin: "S_P_A_T_K_Pn_Å ".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "YYYY [m.] MMMM D [d.]",
      LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
      LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
      l: "YYYY-MM-DD",
      ll: "YYYY [m.] MMMM D [d.]",
      lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
      llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
    },
    calendar: {
      sameDay: "[Å iandien] LT",
      nextDay: "[Rytoj] LT",
      nextWeek: "dddd LT",
      lastDay: "[Vakar] LT",
      lastWeek: "[PraÄ—jusÄ¯] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "po %s",
      past: "prieÅ¡ %s",
      s: Kd,
      m: Ld,
      mm: Od,
      h: Ld,
      hh: Od,
      d: Ld,
      dd: Od,
      M: Ld,
      MM: Od,
      y: Ld,
      yy: Od
    },
    ordinalParse: /\d{1,2}-oji/,
    ordinal: function ordinal(a) {
      return a + "-oji";
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    m: "minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes".split("_"),
    mm: "minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes".split("_"),
    h: "stundas_stundÄm_stunda_stundas".split("_"),
    hh: "stundas_stundÄm_stunda_stundas".split("_"),
    d: "dienas_dienÄm_diena_dienas".split("_"),
    dd: "dienas_dienÄm_diena_dienas".split("_"),
    M: "mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i".split("_"),
    MM: "mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i".split("_"),
    y: "gada_gadiem_gads_gadi".split("_"),
    yy: "gada_gadiem_gads_gadi".split("_")
  }),
      Yg = (kg.defineLocale("lv", {
    months: "janvÄris_februÄris_marts_aprÄ«lis_maijs_jÅ«nijs_jÅ«lijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
    monthsShort: "jan_feb_mar_apr_mai_jÅ«n_jÅ«l_aug_sep_okt_nov_dec".split("_"),
    weekdays: "svÄ“tdiena_pirmdiena_otrdiena_treÅ¡diena_ceturtdiena_piektdiena_sestdiena".split("_"),
    weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
    weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY.",
      LL: "YYYY. [gada] D. MMMM",
      LLL: "YYYY. [gada] D. MMMM, HH:mm",
      LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
    },
    calendar: {
      sameDay: "[Å odien pulksten] LT",
      nextDay: "[RÄ«t pulksten] LT",
      nextWeek: "dddd [pulksten] LT",
      lastDay: "[Vakar pulksten] LT",
      lastWeek: "[PagÄjuÅ¡Ä] dddd [pulksten] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "pÄ“c %s",
      past: "pirms %s",
      s: Sd,
      m: Rd,
      mm: Qd,
      h: Rd,
      hh: Qd,
      d: Rd,
      dd: Qd,
      M: Rd,
      MM: Qd,
      y: Rd,
      yy: Qd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    words: {
      //Different grammatical cases
      m: ["jedan minut", "jednog minuta"],
      mm: ["minut", "minuta", "minuta"],
      h: ["jedan sat", "jednog sata"],
      hh: ["sat", "sata", "sati"],
      dd: ["dan", "dana", "dana"],
      MM: ["mjesec", "mjeseca", "mjeseci"],
      yy: ["godina", "godine", "godina"]
    },
    correctGrammaticalCase: function correctGrammaticalCase(a, b) {
      return 1 === a ? b[0] : a >= 2 && 4 >= a ? b[1] : b[2];
    },
    translate: function translate(a, b, c) {
      var d = Yg.words[c];
      return 1 === c.length ? b ? d[0] : d[1] : a + " " + Yg.correctGrammaticalCase(a, d);
    }
  }),
      Zg = (kg.defineLocale("me", {
    months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
    monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
    weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
    weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danas u] LT",
      nextDay: "[sjutra u] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";

          case 3:
            return "[u] [srijedu] [u] LT";

          case 6:
            return "[u] [subotu] [u] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      },
      lastDay: "[juÄe u] LT",
      lastWeek: function lastWeek() {
        var a = ["[proÅ¡le] [nedjelje] [u] LT", "[proÅ¡log] [ponedjeljka] [u] LT", "[proÅ¡log] [utorka] [u] LT", "[proÅ¡le] [srijede] [u] LT", "[proÅ¡log] [Äetvrtka] [u] LT", "[proÅ¡log] [petka] [u] LT", "[proÅ¡le] [subote] [u] LT"];
        return a[this.day()];
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "prije %s",
      s: "nekoliko sekundi",
      m: Yg.translate,
      mm: Yg.translate,
      h: Yg.translate,
      hh: Yg.translate,
      d: "dan",
      dd: Yg.translate,
      M: "mjesec",
      MM: Yg.translate,
      y: "godinu",
      yy: Yg.translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("mk", {
    months: "Ñ˜Ð°Ð½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½Ð¸_Ñ˜ÑƒÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸".split("_"),
    monthsShort: "Ñ˜Ð°Ð½_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº".split("_"),
    weekdays: "Ð½ÐµÐ´ÐµÐ»Ð°_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð¾Ðº_Ð¿ÐµÑ‚Ð¾Ðº_ÑÐ°Ð±Ð¾Ñ‚Ð°".split("_"),
    weekdaysShort: "Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ðµ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÐ°Ð±".split("_"),
    weekdaysMin: "Ð½e_Ð¿o_Ð²Ñ‚_ÑÑ€_Ñ‡Ðµ_Ð¿Ðµ_Ña".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "D.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[Ð”ÐµÐ½ÐµÑ Ð²Ð¾] LT",
      nextDay: "[Ð£Ñ‚Ñ€Ðµ Ð²Ð¾] LT",
      nextWeek: "[Ð’Ð¾] dddd [Ð²Ð¾] LT",
      lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²Ð¾] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return "[Ð˜Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð°Ñ‚Ð°] dddd [Ð²Ð¾] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[Ð˜Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð¸Ð¾Ñ‚] dddd [Ð²Ð¾] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "Ð¿Ð¾ÑÐ»Ðµ %s",
      past: "Ð¿Ñ€ÐµÐ´ %s",
      s: "Ð½ÐµÐºÐ¾Ð»ÐºÑƒ ÑÐµÐºÑƒÐ½Ð´Ð¸",
      m: "Ð¼Ð¸Ð½ÑƒÑ‚Ð°",
      mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸",
      h: "Ñ‡Ð°Ñ",
      hh: "%d Ñ‡Ð°ÑÐ°",
      d: "Ð´ÐµÐ½",
      dd: "%d Ð´ÐµÐ½Ð°",
      M: "Ð¼ÐµÑÐµÑ†",
      MM: "%d Ð¼ÐµÑÐµÑ†Ð¸",
      y: "Ð³Ð¾Ð´Ð¸Ð½Ð°",
      yy: "%d Ð³Ð¾Ð´Ð¸Ð½Ð¸"
    },
    ordinalParse: /\d{1,2}-(ÐµÐ²|ÐµÐ½|Ñ‚Ð¸|Ð²Ð¸|Ñ€Ð¸|Ð¼Ð¸)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = a % 100;
      return 0 === a ? a + "-ÐµÐ²" : 0 === c ? a + "-ÐµÐ½" : c > 10 && 20 > c ? a + "-Ñ‚Ð¸" : 1 === b ? a + "-Ð²Ð¸" : 2 === b ? a + "-Ñ€Ð¸" : 7 === b || 8 === b ? a + "-Ð¼Ð¸" : a + "-Ñ‚Ð¸";
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("ml", {
    months: "à´œà´¨àµà´µà´°à´¿_à´«àµ†à´¬àµà´°àµà´µà´°à´¿_à´®à´¾àµ¼à´šàµà´šàµ_à´à´ªàµà´°à´¿àµ½_à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ_à´“à´—à´¸àµà´±àµà´±àµ_à´¸àµ†à´ªàµà´±àµà´±à´‚à´¬àµ¼_à´’à´•àµà´Ÿàµ‹à´¬àµ¼_à´¨à´µà´‚à´¬àµ¼_à´¡à´¿à´¸à´‚à´¬àµ¼".split("_"),
    monthsShort: "à´œà´¨àµ._à´«àµ†à´¬àµà´°àµ._à´®à´¾àµ¼._à´à´ªàµà´°à´¿._à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ._à´“à´—._à´¸àµ†à´ªàµà´±àµà´±._à´’à´•àµà´Ÿàµ‹._à´¨à´µà´‚._à´¡à´¿à´¸à´‚.".split("_"),
    monthsParseExact: !0,
    weekdays: "à´žà´¾à´¯à´±à´¾à´´àµà´š_à´¤à´¿à´™àµà´•à´³à´¾à´´àµà´š_à´šàµŠà´µàµà´µà´¾à´´àµà´š_à´¬àµà´§à´¨à´¾à´´àµà´š_à´µàµà´¯à´¾à´´à´¾à´´àµà´š_à´µàµ†à´³àµà´³à´¿à´¯à´¾à´´àµà´š_à´¶à´¨à´¿à´¯à´¾à´´àµà´š".split("_"),
    weekdaysShort: "à´žà´¾à´¯àµ¼_à´¤à´¿à´™àµà´•àµ¾_à´šàµŠà´µàµà´µ_à´¬àµà´§àµ»_à´µàµà´¯à´¾à´´à´‚_à´µàµ†à´³àµà´³à´¿_à´¶à´¨à´¿".split("_"),
    weekdaysMin: "à´žà´¾_à´¤à´¿_à´šàµŠ_à´¬àµ_à´µàµà´¯à´¾_à´µàµ†_à´¶".split("_"),
    longDateFormat: {
      LT: "A h:mm -à´¨àµ",
      LTS: "A h:mm:ss -à´¨àµ",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm -à´¨àµ",
      LLLL: "dddd, D MMMM YYYY, A h:mm -à´¨àµ"
    },
    calendar: {
      sameDay: "[à´‡à´¨àµà´¨àµ] LT",
      nextDay: "[à´¨à´¾à´³àµ†] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à´‡à´¨àµà´¨à´²àµ†] LT",
      lastWeek: "[à´•à´´à´¿à´žàµà´ž] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à´•à´´à´¿à´žàµà´žàµ",
      past: "%s à´®àµàµ»à´ªàµ",
      s: "à´…àµ½à´ª à´¨à´¿à´®à´¿à´·à´™àµà´™àµ¾",
      m: "à´’à´°àµ à´®à´¿à´¨à´¿à´±àµà´±àµ",
      mm: "%d à´®à´¿à´¨à´¿à´±àµà´±àµ",
      h: "à´’à´°àµ à´®à´£à´¿à´•àµà´•àµ‚àµ¼",
      hh: "%d à´®à´£à´¿à´•àµà´•àµ‚àµ¼",
      d: "à´’à´°àµ à´¦à´¿à´µà´¸à´‚",
      dd: "%d à´¦à´¿à´µà´¸à´‚",
      M: "à´’à´°àµ à´®à´¾à´¸à´‚",
      MM: "%d à´®à´¾à´¸à´‚",
      y: "à´’à´°àµ à´µàµ¼à´·à´‚",
      yy: "%d à´µàµ¼à´·à´‚"
    },
    meridiemParse: /à´°à´¾à´¤àµà´°à´¿|à´°à´¾à´µà´¿à´²àµ†|à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ|à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚|à´°à´¾à´¤àµà´°à´¿/i,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à´°à´¾à´¤àµà´°à´¿" === b && a >= 4 || "à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ" === b || "à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚" === b ? a + 12 : a;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à´°à´¾à´¤àµà´°à´¿" : 12 > a ? "à´°à´¾à´µà´¿à´²àµ†" : 17 > a ? "à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ" : 20 > a ? "à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚" : "à´°à´¾à´¤àµà´°à´¿";
    }
  }), {
    1: "à¥§",
    2: "à¥¨",
    3: "à¥©",
    4: "à¥ª",
    5: "à¥«",
    6: "à¥¬",
    7: "à¥­",
    8: "à¥®",
    9: "à¥¯",
    0: "à¥¦"
  }),
      $g = {
    "à¥§": "1",
    "à¥¨": "2",
    "à¥©": "3",
    "à¥ª": "4",
    "à¥«": "5",
    "à¥¬": "6",
    "à¥­": "7",
    "à¥®": "8",
    "à¥¯": "9",
    "à¥¦": "0"
  },
      _g = (kg.defineLocale("mr", {
    months: "à¤œà¤¾à¤¨à¥‡à¤µà¤¾à¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤¾à¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤à¤ªà¥à¤°à¤¿à¤²_à¤®à¥‡_à¤œà¥‚à¤¨_à¤œà¥à¤²à¥ˆ_à¤‘à¤—à¤¸à¥à¤Ÿ_à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚à¤¬à¤°_à¤‘à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤‚à¤¬à¤°".split("_"),
    monthsShort: "à¤œà¤¾à¤¨à¥‡._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š._à¤à¤ªà¥à¤°à¤¿._à¤®à¥‡._à¤œà¥‚à¤¨._à¤œà¥à¤²à¥ˆ._à¤‘à¤—._à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚._à¤‘à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚._à¤¡à¤¿à¤¸à¥‡à¤‚.".split("_"),
    monthsParseExact: !0,
    weekdays: "à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤³à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°".split("_"),
    weekdaysShort: "à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤³_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿".split("_"),
    weekdaysMin: "à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶".split("_"),
    longDateFormat: {
      LT: "A h:mm à¤µà¤¾à¤œà¤¤à¤¾",
      LTS: "A h:mm:ss à¤µà¤¾à¤œà¤¤à¤¾",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾",
      LLLL: "dddd, D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾"
    },
    calendar: {
      sameDay: "[à¤†à¤œ] LT",
      nextDay: "[à¤‰à¤¦à¥à¤¯à¤¾] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à¤•à¤¾à¤²] LT",
      lastWeek: "[à¤®à¤¾à¤—à¥€à¤²] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sà¤®à¤§à¥à¤¯à¥‡",
      past: "%sà¤ªà¥‚à¤°à¥à¤µà¥€",
      s: Td,
      m: Td,
      mm: Td,
      h: Td,
      hh: Td,
      d: Td,
      dd: Td,
      M: Td,
      MM: Td,
      y: Td,
      yy: Td
    },
    preparse: function preparse(a) {
      return a.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function (a) {
        return $g[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return Zg[a];
      });
    },
    meridiemParse: /à¤°à¤¾à¤¤à¥à¤°à¥€|à¤¸à¤•à¤¾à¤³à¥€|à¤¦à¥à¤ªà¤¾à¤°à¥€|à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à¤°à¤¾à¤¤à¥à¤°à¥€" === b ? 4 > a ? a : a + 12 : "à¤¸à¤•à¤¾à¤³à¥€" === b ? a : "à¤¦à¥à¤ªà¤¾à¤°à¥€" === b ? a >= 10 ? a : a + 12 : "à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à¤°à¤¾à¤¤à¥à¤°à¥€" : 10 > a ? "à¤¸à¤•à¤¾à¤³à¥€" : 17 > a ? "à¤¦à¥à¤ªà¤¾à¤°à¥€" : 20 > a ? "à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€" : "à¤°à¤¾à¤¤à¥à¤°à¥€";
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), kg.defineLocale("ms-my", {
    months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
    monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
    weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
    weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
    weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [pukul] HH.mm",
      LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "pagi" === b ? a : "tengahari" === b ? a >= 11 ? a : a + 12 : "petang" === b || "malam" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 11 > a ? "pagi" : 15 > a ? "tengahari" : 19 > a ? "petang" : "malam";
    },
    calendar: {
      sameDay: "[Hari ini pukul] LT",
      nextDay: "[Esok pukul] LT",
      nextWeek: "dddd [pukul] LT",
      lastDay: "[Kelmarin pukul] LT",
      lastWeek: "dddd [lepas pukul] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dalam %s",
      past: "%s yang lepas",
      s: "beberapa saat",
      m: "seminit",
      mm: "%d minit",
      h: "sejam",
      hh: "%d jam",
      d: "sehari",
      dd: "%d hari",
      M: "sebulan",
      MM: "%d bulan",
      y: "setahun",
      yy: "%d tahun"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("ms", {
    months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
    monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
    weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
    weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
    weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [pukul] HH.mm",
      LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "pagi" === b ? a : "tengahari" === b ? a >= 11 ? a : a + 12 : "petang" === b || "malam" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 11 > a ? "pagi" : 15 > a ? "tengahari" : 19 > a ? "petang" : "malam";
    },
    calendar: {
      sameDay: "[Hari ini pukul] LT",
      nextDay: "[Esok pukul] LT",
      nextWeek: "dddd [pukul] LT",
      lastDay: "[Kelmarin pukul] LT",
      lastWeek: "dddd [lepas pukul] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dalam %s",
      past: "%s yang lepas",
      s: "beberapa saat",
      m: "seminit",
      mm: "%d minit",
      h: "sejam",
      hh: "%d jam",
      d: "sehari",
      dd: "%d hari",
      M: "sebulan",
      MM: "%d bulan",
      y: "setahun",
      yy: "%d tahun"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), {
    1: "á",
    2: "á‚",
    3: "áƒ",
    4: "á„",
    5: "á…",
    6: "á†",
    7: "á‡",
    8: "áˆ",
    9: "á‰",
    0: "á€"
  }),
      ah = {
    "á": "1",
    "á‚": "2",
    "áƒ": "3",
    "á„": "4",
    "á…": "5",
    "á†": "6",
    "á‡": "7",
    "áˆ": "8",
    "á‰": "9",
    "á€": "0"
  },
      bh = (kg.defineLocale("my", {
    months: "á€‡á€”á€ºá€”á€á€«á€›á€®_á€–á€±á€–á€±á€¬á€ºá€á€«á€›á€®_á€™á€á€º_á€§á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€‡á€°á€œá€­á€¯á€„á€º_á€žá€¼á€‚á€¯á€á€º_á€…á€€á€ºá€á€„á€ºá€˜á€¬_á€¡á€±á€¬á€€á€ºá€á€­á€¯á€˜á€¬_á€”á€­á€¯á€á€„á€ºá€˜á€¬_á€’á€®á€‡á€„á€ºá€˜á€¬".split("_"),
    monthsShort: "á€‡á€”á€º_á€–á€±_á€™á€á€º_á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€œá€­á€¯á€„á€º_á€žá€¼_á€…á€€á€º_á€¡á€±á€¬á€€á€º_á€”á€­á€¯_á€’á€®".split("_"),
    weekdays: "á€á€”á€„á€ºá€¹á€‚á€”á€½á€±_á€á€”á€„á€ºá€¹á€œá€¬_á€¡á€„á€ºá€¹á€‚á€«_á€—á€¯á€’á€¹á€“á€Ÿá€°á€¸_á€€á€¼á€¬á€žá€•á€á€±á€¸_á€žá€±á€¬á€€á€¼á€¬_á€…á€”á€±".split("_"),
    weekdaysShort: "á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±".split("_"),
    weekdaysMin: "á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[á€šá€”á€±.] LT [á€™á€¾á€¬]",
      nextDay: "[á€™á€”á€€á€ºá€–á€¼á€”á€º] LT [á€™á€¾á€¬]",
      nextWeek: "dddd LT [á€™á€¾á€¬]",
      lastDay: "[á€™á€”á€±.á€€] LT [á€™á€¾á€¬]",
      lastWeek: "[á€•á€¼á€®á€¸á€á€²á€·á€žá€±á€¬] dddd LT [á€™á€¾á€¬]",
      sameElse: "L"
    },
    relativeTime: {
      future: "á€œá€¬á€™á€Šá€ºá€· %s á€™á€¾á€¬",
      past: "á€œá€½á€”á€ºá€á€²á€·á€žá€±á€¬ %s á€€",
      s: "á€…á€€á€¹á€€á€”á€º.á€¡á€”á€Šá€ºá€¸á€„á€šá€º",
      m: "á€á€…á€ºá€™á€­á€”á€…á€º",
      mm: "%d á€™á€­á€”á€…á€º",
      h: "á€á€…á€ºá€”á€¬á€›á€®",
      hh: "%d á€”á€¬á€›á€®",
      d: "á€á€…á€ºá€›á€€á€º",
      dd: "%d á€›á€€á€º",
      M: "á€á€…á€ºá€œ",
      MM: "%d á€œ",
      y: "á€á€…á€ºá€”á€¾á€…á€º",
      yy: "%d á€”á€¾á€…á€º"
    },
    preparse: function preparse(a) {
      return a.replace(/[áá‚áƒá„á…á†á‡áˆá‰á€]/g, function (a) {
        return ah[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return _g[a];
      });
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("nb", {
    months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
    monthsParseExact: !0,
    weekdays: "sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag".split("_"),
    weekdaysShort: "sÃ¸._ma._ti._on._to._fr._lÃ¸.".split("_"),
    weekdaysMin: "sÃ¸_ma_ti_on_to_fr_lÃ¸".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY [kl.] HH:mm",
      LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
    },
    calendar: {
      sameDay: "[i dag kl.] LT",
      nextDay: "[i morgen kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[i gÃ¥r kl.] LT",
      lastWeek: "[forrige] dddd [kl.] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "%s siden",
      s: "noen sekunder",
      m: "ett minutt",
      mm: "%d minutter",
      h: "en time",
      hh: "%d timer",
      d: "en dag",
      dd: "%d dager",
      M: "en mÃ¥ned",
      MM: "%d mÃ¥neder",
      y: "ett Ã¥r",
      yy: "%d Ã¥r"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    1: "à¥§",
    2: "à¥¨",
    3: "à¥©",
    4: "à¥ª",
    5: "à¥«",
    6: "à¥¬",
    7: "à¥­",
    8: "à¥®",
    9: "à¥¯",
    0: "à¥¦"
  }),
      ch = {
    "à¥§": "1",
    "à¥¨": "2",
    "à¥©": "3",
    "à¥ª": "4",
    "à¥«": "5",
    "à¥¬": "6",
    "à¥­": "7",
    "à¥®": "8",
    "à¥¯": "9",
    "à¥¦": "0"
  },
      dh = (kg.defineLocale("ne", {
    months: "à¤œà¤¨à¤µà¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿à¤²_à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤·à¥à¤Ÿ_à¤¸à¥‡à¤ªà¥à¤Ÿà¥‡à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤­à¥‡à¤®à¥à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤®à¥à¤¬à¤°".split("_"),
    monthsShort: "à¤œà¤¨._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿._à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ._à¤…à¤—._à¤¸à¥‡à¤ªà¥à¤Ÿ._à¤…à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤­à¥‡._à¤¡à¤¿à¤¸à¥‡.".split("_"),
    monthsParseExact: !0,
    weekdays: "à¤†à¤‡à¤¤à¤¬à¤¾à¤°_à¤¸à¥‹à¤®à¤¬à¤¾à¤°_à¤®à¤™à¥à¤—à¤²à¤¬à¤¾à¤°_à¤¬à¥à¤§à¤¬à¤¾à¤°_à¤¬à¤¿à¤¹à¤¿à¤¬à¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤¬à¤¾à¤°_à¤¶à¤¨à¤¿à¤¬à¤¾à¤°".split("_"),
    weekdaysShort: "à¤†à¤‡à¤¤._à¤¸à¥‹à¤®._à¤®à¤™à¥à¤—à¤²._à¤¬à¥à¤§._à¤¬à¤¿à¤¹à¤¿._à¤¶à¥à¤•à¥à¤°._à¤¶à¤¨à¤¿.".split("_"),
    weekdaysMin: "à¤†._à¤¸à¥‹._à¤®à¤‚._à¤¬à¥._à¤¬à¤¿._à¤¶à¥._à¤¶.".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡",
      LTS: "Aà¤•à¥‹ h:mm:ss à¤¬à¤œà¥‡",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡",
      LLLL: "dddd, D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡"
    },
    preparse: function preparse(a) {
      return a.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function (a) {
        return ch[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return bh[a];
      });
    },
    meridiemParse: /à¤°à¤¾à¤¤à¤¿|à¤¬à¤¿à¤¹à¤¾à¤¨|à¤¦à¤¿à¤‰à¤à¤¸à¥‹|à¤¸à¤¾à¤à¤/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à¤°à¤¾à¤¤à¤¿" === b ? 4 > a ? a : a + 12 : "à¤¬à¤¿à¤¹à¤¾à¤¨" === b ? a : "à¤¦à¤¿à¤‰à¤à¤¸à¥‹" === b ? a >= 10 ? a : a + 12 : "à¤¸à¤¾à¤à¤" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 3 > a ? "à¤°à¤¾à¤¤à¤¿" : 12 > a ? "à¤¬à¤¿à¤¹à¤¾à¤¨" : 16 > a ? "à¤¦à¤¿à¤‰à¤à¤¸à¥‹" : 20 > a ? "à¤¸à¤¾à¤à¤" : "à¤°à¤¾à¤¤à¤¿";
    },
    calendar: {
      sameDay: "[à¤†à¤œ] LT",
      nextDay: "[à¤­à¥‹à¤²à¤¿] LT",
      nextWeek: "[à¤†à¤‰à¤à¤¦à¥‹] dddd[,] LT",
      lastDay: "[à¤¹à¤¿à¤œà¥‹] LT",
      lastWeek: "[à¤—à¤à¤•à¥‹] dddd[,] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sà¤®à¤¾",
      past: "%s à¤…à¤—à¤¾à¤¡à¤¿",
      s: "à¤•à¥‡à¤¹à¥€ à¤•à¥à¤·à¤£",
      m: "à¤à¤• à¤®à¤¿à¤¨à¥‡à¤Ÿ",
      mm: "%d à¤®à¤¿à¤¨à¥‡à¤Ÿ",
      h: "à¤à¤• à¤˜à¤£à¥à¤Ÿà¤¾",
      hh: "%d à¤˜à¤£à¥à¤Ÿà¤¾",
      d: "à¤à¤• à¤¦à¤¿à¤¨",
      dd: "%d à¤¦à¤¿à¤¨",
      M: "à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾",
      MM: "%d à¤®à¤¹à¤¿à¤¨à¤¾",
      y: "à¤à¤• à¤¬à¤°à¥à¤·",
      yy: "%d à¤¬à¤°à¥à¤·"
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")),
      eh = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
      fh = (kg.defineLocale("nl", {
    months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
    monthsShort: function monthsShort(a, b) {
      return /-MMM-/.test(b) ? eh[a.month()] : dh[a.month()];
    },
    monthsParseExact: !0,
    weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
    weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
    weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[vandaag om] LT",
      nextDay: "[morgen om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[gisteren om] LT",
      lastWeek: "[afgelopen] dddd [om] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "over %s",
      past: "%s geleden",
      s: "een paar seconden",
      m: "Ã©Ã©n minuut",
      mm: "%d minuten",
      h: "Ã©Ã©n uur",
      hh: "%d uur",
      d: "Ã©Ã©n dag",
      dd: "%d dagen",
      M: "Ã©Ã©n maand",
      MM: "%d maanden",
      y: "Ã©Ã©n jaar",
      yy: "%d jaar"
    },
    ordinalParse: /\d{1,2}(ste|de)/,
    ordinal: function ordinal(a) {
      return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de");
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("nn", {
    months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
    weekdays: "sundag_mÃ¥ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
    weekdaysShort: "sun_mÃ¥n_tys_ons_tor_fre_lau".split("_"),
    weekdaysMin: "su_mÃ¥_ty_on_to_fr_lÃ¸".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY [kl.] H:mm",
      LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
    },
    calendar: {
      sameDay: "[I dag klokka] LT",
      nextDay: "[I morgon klokka] LT",
      nextWeek: "dddd [klokka] LT",
      lastDay: "[I gÃ¥r klokka] LT",
      lastWeek: "[FÃ¸regÃ¥ande] dddd [klokka] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "%s sidan",
      s: "nokre sekund",
      m: "eit minutt",
      mm: "%d minutt",
      h: "ein time",
      hh: "%d timar",
      d: "ein dag",
      dd: "%d dagar",
      M: "ein mÃ¥nad",
      MM: "%d mÃ¥nader",
      y: "eit Ã¥r",
      yy: "%d Ã¥r"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    1: "à©§",
    2: "à©¨",
    3: "à©©",
    4: "à©ª",
    5: "à©«",
    6: "à©¬",
    7: "à©­",
    8: "à©®",
    9: "à©¯",
    0: "à©¦"
  }),
      gh = {
    "à©§": "1",
    "à©¨": "2",
    "à©©": "3",
    "à©ª": "4",
    "à©«": "5",
    "à©¬": "6",
    "à©­": "7",
    "à©®": "8",
    "à©¯": "9",
    "à©¦": "0"
  },
      hh = (kg.defineLocale("pa-in", {
    // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
    months: "à¨œà¨¨à¨µà¨°à©€_à¨«à¨¼à¨°à¨µà¨°à©€_à¨®à¨¾à¨°à¨š_à¨…à¨ªà©à¨°à©ˆà¨²_à¨®à¨ˆ_à¨œà©‚à¨¨_à¨œà©à¨²à¨¾à¨ˆ_à¨…à¨—à¨¸à¨¤_à¨¸à¨¤à©°à¨¬à¨°_à¨…à¨•à¨¤à©‚à¨¬à¨°_à¨¨à¨µà©°à¨¬à¨°_à¨¦à¨¸à©°à¨¬à¨°".split("_"),
    monthsShort: "à¨œà¨¨à¨µà¨°à©€_à¨«à¨¼à¨°à¨µà¨°à©€_à¨®à¨¾à¨°à¨š_à¨…à¨ªà©à¨°à©ˆà¨²_à¨®à¨ˆ_à¨œà©‚à¨¨_à¨œà©à¨²à¨¾à¨ˆ_à¨…à¨—à¨¸à¨¤_à¨¸à¨¤à©°à¨¬à¨°_à¨…à¨•à¨¤à©‚à¨¬à¨°_à¨¨à¨µà©°à¨¬à¨°_à¨¦à¨¸à©°à¨¬à¨°".split("_"),
    weekdays: "à¨à¨¤à¨µà¨¾à¨°_à¨¸à©‹à¨®à¨µà¨¾à¨°_à¨®à©°à¨—à¨²à¨µà¨¾à¨°_à¨¬à©à¨§à¨µà¨¾à¨°_à¨µà©€à¨°à¨µà¨¾à¨°_à¨¸à¨¼à©à©±à¨•à¨°à¨µà¨¾à¨°_à¨¸à¨¼à¨¨à©€à¨šà¨°à¨µà¨¾à¨°".split("_"),
    weekdaysShort: "à¨à¨¤_à¨¸à©‹à¨®_à¨®à©°à¨—à¨²_à¨¬à©à¨§_à¨µà©€à¨°_à¨¸à¨¼à©à¨•à¨°_à¨¸à¨¼à¨¨à©€".split("_"),
    weekdaysMin: "à¨à¨¤_à¨¸à©‹à¨®_à¨®à©°à¨—à¨²_à¨¬à©à¨§_à¨µà©€à¨°_à¨¸à¨¼à©à¨•à¨°_à¨¸à¨¼à¨¨à©€".split("_"),
    longDateFormat: {
      LT: "A h:mm à¨µà¨œà©‡",
      LTS: "A h:mm:ss à¨µà¨œà©‡",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm à¨µà¨œà©‡",
      LLLL: "dddd, D MMMM YYYY, A h:mm à¨µà¨œà©‡"
    },
    calendar: {
      sameDay: "[à¨…à¨œ] LT",
      nextDay: "[à¨•à¨²] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à¨•à¨²] LT",
      lastWeek: "[à¨ªà¨¿à¨›à¨²à©‡] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à¨µà¨¿à©±à¨š",
      past: "%s à¨ªà¨¿à¨›à¨²à©‡",
      s: "à¨•à©à¨ à¨¸à¨•à¨¿à©°à¨Ÿ",
      m: "à¨‡à¨• à¨®à¨¿à©°à¨Ÿ",
      mm: "%d à¨®à¨¿à©°à¨Ÿ",
      h: "à¨‡à©±à¨• à¨˜à©°à¨Ÿà¨¾",
      hh: "%d à¨˜à©°à¨Ÿà©‡",
      d: "à¨‡à©±à¨• à¨¦à¨¿à¨¨",
      dd: "%d à¨¦à¨¿à¨¨",
      M: "à¨‡à©±à¨• à¨®à¨¹à©€à¨¨à¨¾",
      MM: "%d à¨®à¨¹à©€à¨¨à©‡",
      y: "à¨‡à©±à¨• à¨¸à¨¾à¨²",
      yy: "%d à¨¸à¨¾à¨²"
    },
    preparse: function preparse(a) {
      return a.replace(/[à©§à©¨à©©à©ªà©«à©¬à©­à©®à©¯à©¦]/g, function (a) {
        return gh[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return fh[a];
      });
    },
    // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
    meridiemParse: /à¨°à¨¾à¨¤|à¨¸à¨µà©‡à¨°|à¨¦à©à¨ªà¨¹à¨¿à¨°|à¨¸à¨¼à¨¾à¨®/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à¨°à¨¾à¨¤" === b ? 4 > a ? a : a + 12 : "à¨¸à¨µà©‡à¨°" === b ? a : "à¨¦à©à¨ªà¨¹à¨¿à¨°" === b ? a >= 10 ? a : a + 12 : "à¨¸à¨¼à¨¾à¨®" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à¨°à¨¾à¨¤" : 10 > a ? "à¨¸à¨µà©‡à¨°" : 17 > a ? "à¨¦à©à¨ªà¨¹à¨¿à¨°" : 20 > a ? "à¨¸à¨¼à¨¾à¨®" : "à¨°à¨¾à¨¤";
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), "styczeÅ„_luty_marzec_kwiecieÅ„_maj_czerwiec_lipiec_sierpieÅ„_wrzesieÅ„_paÅºdziernik_listopad_grudzieÅ„".split("_")),
      ih = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrzeÅ›nia_paÅºdziernika_listopada_grudnia".split("_"),
      jh = (kg.defineLocale("pl", {
    months: function months(a, b) {
      return "" === b ? "(" + ih[a.month()] + "|" + hh[a.month()] + ")" : /D MMMM/.test(b) ? ih[a.month()] : hh[a.month()];
    },
    monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paÅº_lis_gru".split("_"),
    weekdays: "niedziela_poniedziaÅ‚ek_wtorek_Å›roda_czwartek_piÄ…tek_sobota".split("_"),
    weekdaysShort: "nie_pon_wt_Å›r_czw_pt_sb".split("_"),
    weekdaysMin: "Nd_Pn_Wt_Åšr_Cz_Pt_So".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[DziÅ› o] LT",
      nextDay: "[Jutro o] LT",
      nextWeek: "[W] dddd [o] LT",
      lastDay: "[Wczoraj o] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
            return "[W zeszÅ‚Ä… niedzielÄ™ o] LT";

          case 3:
            return "[W zeszÅ‚Ä… Å›rodÄ™ o] LT";

          case 6:
            return "[W zeszÅ‚Ä… sobotÄ™ o] LT";

          default:
            return "[W zeszÅ‚y] dddd [o] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "%s temu",
      s: "kilka sekund",
      m: Vd,
      mm: Vd,
      h: Vd,
      hh: Vd,
      d: "1 dzieÅ„",
      dd: "%d dni",
      M: "miesiÄ…c",
      MM: Vd,
      y: "rok",
      yy: Vd
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("pt-br", {
    months: "Janeiro_Fevereiro_MarÃ§o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
    monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    weekdays: "Domingo_Segunda-feira_TerÃ§a-feira_Quarta-feira_Quinta-feira_Sexta-feira_SÃ¡bado".split("_"),
    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b".split("_"),
    weekdaysMin: "Dom_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡b".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY [Ã s] HH:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY [Ã s] HH:mm"
    },
    calendar: {
      sameDay: "[Hoje Ã s] LT",
      nextDay: "[AmanhÃ£ Ã s] LT",
      nextWeek: "dddd [Ã s] LT",
      lastDay: "[Ontem Ã s] LT",
      lastWeek: function lastWeek() {
        // Saturday + Sunday
        return 0 === this.day() || 6 === this.day() ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "em %s",
      past: "%s atrÃ¡s",
      s: "poucos segundos",
      m: "um minuto",
      mm: "%d minutos",
      h: "uma hora",
      hh: "%d horas",
      d: "um dia",
      dd: "%d dias",
      M: "um mÃªs",
      MM: "%d meses",
      y: "um ano",
      yy: "%d anos"
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: "%dÂº"
  }), kg.defineLocale("pt", {
    months: "Janeiro_Fevereiro_MarÃ§o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
    monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    weekdays: "Domingo_Segunda-Feira_TerÃ§a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_SÃ¡bado".split("_"),
    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b".split("_"),
    weekdaysMin: "Dom_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡b".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY HH:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Hoje Ã s] LT",
      nextDay: "[AmanhÃ£ Ã s] LT",
      nextWeek: "dddd [Ã s] LT",
      lastDay: "[Ontem Ã s] LT",
      lastWeek: function lastWeek() {
        // Saturday + Sunday
        return 0 === this.day() || 6 === this.day() ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "em %s",
      past: "hÃ¡ %s",
      s: "segundos",
      m: "um minuto",
      mm: "%d minutos",
      h: "uma hora",
      hh: "%d horas",
      d: "um dia",
      dd: "%d dias",
      M: "um mÃªs",
      MM: "%d meses",
      y: "um ano",
      yy: "%d anos"
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: "%dÂº",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("ro", {
    months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
    monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "duminicÄƒ_luni_marÈ›i_miercuri_joi_vineri_sÃ¢mbÄƒtÄƒ".split("_"),
    weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_SÃ¢m".split("_"),
    weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_SÃ¢".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[azi la] LT",
      nextDay: "[mÃ¢ine la] LT",
      nextWeek: "dddd [la] LT",
      lastDay: "[ieri la] LT",
      lastWeek: "[fosta] dddd [la] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "peste %s",
      past: "%s Ã®n urmÄƒ",
      s: "cÃ¢teva secunde",
      m: "un minut",
      mm: Wd,
      h: "o orÄƒ",
      hh: Wd,
      d: "o zi",
      dd: Wd,
      M: "o lunÄƒ",
      MM: Wd,
      y: "un an",
      yy: Wd
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), [/^ÑÐ½Ð²/i, /^Ñ„ÐµÐ²/i, /^Ð¼Ð°Ñ€/i, /^Ð°Ð¿Ñ€/i, /^Ð¼Ð°[Ð¹Ñ]/i, /^Ð¸ÑŽÐ½/i, /^Ð¸ÑŽÐ»/i, /^Ð°Ð²Ð³/i, /^ÑÐµÐ½/i, /^Ð¾ÐºÑ‚/i, /^Ð½Ð¾Ñ/i, /^Ð´ÐµÐº/i]),
      kh = (kg.defineLocale("ru", {
    months: {
      format: "ÑÐ½Ð²Ð°Ñ€Ñ_Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ_Ð¼Ð°Ñ€Ñ‚Ð°_Ð°Ð¿Ñ€ÐµÐ»Ñ_Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³ÑƒÑÑ‚Ð°_ÑÐµÐ½Ñ‚ÑÐ±Ñ€Ñ_Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ_Ð½Ð¾ÑÐ±Ñ€Ñ_Ð´ÐµÐºÐ°Ð±Ñ€Ñ".split("_"),
      standalone: "ÑÐ½Ð²Ð°Ñ€ÑŒ_Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»ÑŒ_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_Ð¾ÐºÑ‚ÑÐ±Ñ€ÑŒ_Ð½Ð¾ÑÐ±Ñ€ÑŒ_Ð´ÐµÐºÐ°Ð±Ñ€ÑŒ".split("_")
    },
    monthsShort: {
      // Ð¿Ð¾ CLDR Ð¸Ð¼ÐµÐ½Ð½Ð¾ "Ð¸ÑŽÐ»." Ð¸ "Ð¸ÑŽÐ½.", Ð½Ð¾ ÐºÐ°ÐºÐ¾Ð¹ ÑÐ¼Ñ‹ÑÐ» Ð¼ÐµÐ½ÑÑ‚ÑŒ Ð±ÑƒÐºÐ²Ñƒ Ð½Ð° Ñ‚Ð¾Ñ‡ÐºÑƒ ?
      format: "ÑÐ½Ð²._Ñ„ÐµÐ²Ñ€._Ð¼Ð°Ñ€._Ð°Ð¿Ñ€._Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³._ÑÐµÐ½Ñ‚._Ð¾ÐºÑ‚._Ð½Ð¾ÑÐ±._Ð´ÐµÐº.".split("_"),
      standalone: "ÑÐ½Ð²._Ñ„ÐµÐ²Ñ€._Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€._Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³._ÑÐµÐ½Ñ‚._Ð¾ÐºÑ‚._Ð½Ð¾ÑÐ±._Ð´ÐµÐº.".split("_")
    },
    weekdays: {
      standalone: "Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³_Ð¿ÑÑ‚Ð½Ð¸Ñ†Ð°_ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°".split("_"),
      format: "Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³_Ð¿ÑÑ‚Ð½Ð¸Ñ†Ñƒ_ÑÑƒÐ±Ð±Ð¾Ñ‚Ñƒ".split("_"),
      isFormat: /\[ ?[Ð’Ð²] ?(?:Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ|ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ|ÑÑ‚Ñƒ)? ?\] ?dddd/
    },
    weekdaysShort: "Ð²Ñ_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
    weekdaysMin: "Ð²Ñ_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
    monthsParse: jh,
    longMonthsParse: jh,
    shortMonthsParse: jh,
    // Ð¿Ð¾Ð»Ð½Ñ‹Ðµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ñ Ñ Ð¿Ð°Ð´ÐµÐ¶Ð°Ð¼Ð¸, Ð¿Ð¾ Ñ‚Ñ€Ð¸ Ð±ÑƒÐºÐ²Ñ‹, Ð´Ð»Ñ Ð½ÐµÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ñ…, Ð¿Ð¾ 4 Ð±ÑƒÐºÐ²Ñ‹, ÑÐ¾ÐºÑ€Ð°Ñ‰ÐµÐ½Ð¸Ñ Ñ Ñ‚Ð¾Ñ‡ÐºÐ¾Ð¹ Ð¸ Ð±ÐµÐ· Ñ‚Ð¾Ñ‡ÐºÐ¸
    monthsRegex: /^(ÑÐ½Ð²Ð°Ñ€[ÑŒÑ]|ÑÐ½Ð²\.?|Ñ„ÐµÐ²Ñ€Ð°Ð»[ÑŒÑ]|Ñ„ÐµÐ²Ñ€?\.?|Ð¼Ð°Ñ€Ñ‚Ð°?|Ð¼Ð°Ñ€\.?|Ð°Ð¿Ñ€ÐµÐ»[ÑŒÑ]|Ð°Ð¿Ñ€\.?|Ð¼Ð°[Ð¹Ñ]|Ð¸ÑŽÐ½[ÑŒÑ]|Ð¸ÑŽÐ½\.?|Ð¸ÑŽÐ»[ÑŒÑ]|Ð¸ÑŽÐ»\.?|Ð°Ð²Ð³ÑƒÑÑ‚Ð°?|Ð°Ð²Ð³\.?|ÑÐµÐ½Ñ‚ÑÐ±Ñ€[ÑŒÑ]|ÑÐµÐ½Ñ‚?\.?|Ð¾ÐºÑ‚ÑÐ±Ñ€[ÑŒÑ]|Ð¾ÐºÑ‚\.?|Ð½Ð¾ÑÐ±Ñ€[ÑŒÑ]|Ð½Ð¾ÑÐ±?\.?|Ð´ÐµÐºÐ°Ð±Ñ€[ÑŒÑ]|Ð´ÐµÐº\.?)/i,
    // ÐºÐ¾Ð¿Ð¸Ñ Ð¿Ñ€ÐµÐ´Ñ‹Ð´ÑƒÑ‰ÐµÐ³Ð¾
    monthsShortRegex: /^(ÑÐ½Ð²Ð°Ñ€[ÑŒÑ]|ÑÐ½Ð²\.?|Ñ„ÐµÐ²Ñ€Ð°Ð»[ÑŒÑ]|Ñ„ÐµÐ²Ñ€?\.?|Ð¼Ð°Ñ€Ñ‚Ð°?|Ð¼Ð°Ñ€\.?|Ð°Ð¿Ñ€ÐµÐ»[ÑŒÑ]|Ð°Ð¿Ñ€\.?|Ð¼Ð°[Ð¹Ñ]|Ð¸ÑŽÐ½[ÑŒÑ]|Ð¸ÑŽÐ½\.?|Ð¸ÑŽÐ»[ÑŒÑ]|Ð¸ÑŽÐ»\.?|Ð°Ð²Ð³ÑƒÑÑ‚Ð°?|Ð°Ð²Ð³\.?|ÑÐµÐ½Ñ‚ÑÐ±Ñ€[ÑŒÑ]|ÑÐµÐ½Ñ‚?\.?|Ð¾ÐºÑ‚ÑÐ±Ñ€[ÑŒÑ]|Ð¾ÐºÑ‚\.?|Ð½Ð¾ÑÐ±Ñ€[ÑŒÑ]|Ð½Ð¾ÑÐ±?\.?|Ð´ÐµÐºÐ°Ð±Ñ€[ÑŒÑ]|Ð´ÐµÐº\.?)/i,
    // Ð¿Ð¾Ð»Ð½Ñ‹Ðµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ñ Ñ Ð¿Ð°Ð´ÐµÐ¶Ð°Ð¼Ð¸
    monthsStrictRegex: /^(ÑÐ½Ð²Ð°Ñ€[ÑÑŒ]|Ñ„ÐµÐ²Ñ€Ð°Ð»[ÑÑŒ]|Ð¼Ð°Ñ€Ñ‚Ð°?|Ð°Ð¿Ñ€ÐµÐ»[ÑÑŒ]|Ð¼Ð°[ÑÐ¹]|Ð¸ÑŽÐ½[ÑÑŒ]|Ð¸ÑŽÐ»[ÑÑŒ]|Ð°Ð²Ð³ÑƒÑÑ‚Ð°?|ÑÐµÐ½Ñ‚ÑÐ±Ñ€[ÑÑŒ]|Ð¾ÐºÑ‚ÑÐ±Ñ€[ÑÑŒ]|Ð½Ð¾ÑÐ±Ñ€[ÑÑŒ]|Ð´ÐµÐºÐ°Ð±Ñ€[ÑÑŒ])/i,
    // Ð’Ñ‹Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ, ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ðµ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑÑ‚Ð²ÑƒÐµÑ‚ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ ÑÐ¾ÐºÑ€Ð°Ñ‰Ñ‘Ð½Ð½Ñ‹Ð¼ Ñ„Ð¾Ñ€Ð¼Ð°Ð¼
    monthsShortStrictRegex: /^(ÑÐ½Ð²\.|Ñ„ÐµÐ²Ñ€?\.|Ð¼Ð°Ñ€[Ñ‚.]|Ð°Ð¿Ñ€\.|Ð¼Ð°[ÑÐ¹]|Ð¸ÑŽÐ½[ÑŒÑ.]|Ð¸ÑŽÐ»[ÑŒÑ.]|Ð°Ð²Ð³\.|ÑÐµÐ½Ñ‚?\.|Ð¾ÐºÑ‚\.|Ð½Ð¾ÑÐ±?\.|Ð´ÐµÐº\.)/i,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY Ð³.",
      LLL: "D MMMM YYYY Ð³., HH:mm",
      LLLL: "dddd, D MMMM YYYY Ð³., HH:mm"
    },
    calendar: {
      sameDay: "[Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ Ð²] LT",
      nextDay: "[Ð—Ð°Ð²Ñ‚Ñ€Ð° Ð²] LT",
      lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²] LT",
      nextWeek: function nextWeek(a) {
        if (a.week() === this.week()) return 2 === this.day() ? "[Ð’Ð¾] dddd [Ð²] LT" : "[Ð’] dddd [Ð²] LT";

        switch (this.day()) {
          case 0:
            return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐµ] dddd [Ð²] LT";

          case 1:
          case 2:
          case 4:
            return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ð¹] dddd [Ð²] LT";

          case 3:
          case 5:
          case 6:
            return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ] dddd [Ð²] LT";
        }
      },
      lastWeek: function lastWeek(a) {
        if (a.week() === this.week()) return 2 === this.day() ? "[Ð’Ð¾] dddd [Ð²] LT" : "[Ð’] dddd [Ð²] LT";

        switch (this.day()) {
          case 0:
            return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ðµ] dddd [Ð²] LT";

          case 1:
          case 2:
          case 4:
            return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ñ‹Ð¹] dddd [Ð²] LT";

          case 3:
          case 5:
          case 6:
            return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ] dddd [Ð²] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "Ñ‡ÐµÑ€ÐµÐ· %s",
      past: "%s Ð½Ð°Ð·Ð°Ð´",
      s: "Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´",
      m: Yd,
      mm: Yd,
      h: "Ñ‡Ð°Ñ",
      hh: Yd,
      d: "Ð´ÐµÐ½ÑŒ",
      dd: Yd,
      M: "Ð¼ÐµÑÑÑ†",
      MM: Yd,
      y: "Ð³Ð¾Ð´",
      yy: Yd
    },
    meridiemParse: /Ð½Ð¾Ñ‡Ð¸|ÑƒÑ‚Ñ€Ð°|Ð´Ð½Ñ|Ð²ÐµÑ‡ÐµÑ€Ð°/i,
    isPM: function isPM(a) {
      return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡ÐµÑ€Ð°)$/.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "Ð½Ð¾Ñ‡Ð¸" : 12 > a ? "ÑƒÑ‚Ñ€Ð°" : 17 > a ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡ÐµÑ€Ð°";
    },
    ordinalParse: /\d{1,2}-(Ð¹|Ð³Ð¾|Ñ)/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "M":
        case "d":
        case "DDD":
          return a + "-Ð¹";

        case "D":
          return a + "-Ð³Ð¾";

        case "w":
        case "W":
          return a + "-Ñ";

        default:
          return a;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("se", {
    months: "oÄ‘Ä‘ajagemÃ¡nnu_guovvamÃ¡nnu_njukÄamÃ¡nnu_cuoÅ‹omÃ¡nnu_miessemÃ¡nnu_geassemÃ¡nnu_suoidnemÃ¡nnu_borgemÃ¡nnu_ÄakÄamÃ¡nnu_golggotmÃ¡nnu_skÃ¡bmamÃ¡nnu_juovlamÃ¡nnu".split("_"),
    monthsShort: "oÄ‘Ä‘j_guov_njuk_cuo_mies_geas_suoi_borg_ÄakÄ_golg_skÃ¡b_juov".split("_"),
    weekdays: "sotnabeaivi_vuossÃ¡rga_maÅ‹Å‹ebÃ¡rga_gaskavahkku_duorastat_bearjadat_lÃ¡vvardat".split("_"),
    weekdaysShort: "sotn_vuos_maÅ‹_gask_duor_bear_lÃ¡v".split("_"),
    weekdaysMin: "s_v_m_g_d_b_L".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "MMMM D. [b.] YYYY",
      LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
      LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
    },
    calendar: {
      sameDay: "[otne ti] LT",
      nextDay: "[ihttin ti] LT",
      nextWeek: "dddd [ti] LT",
      lastDay: "[ikte ti] LT",
      lastWeek: "[ovddit] dddd [ti] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s geaÅ¾es",
      past: "maÅ‹it %s",
      s: "moadde sekunddat",
      m: "okta minuhta",
      mm: "%d minuhtat",
      h: "okta diimmu",
      hh: "%d diimmut",
      d: "okta beaivi",
      dd: "%d beaivvit",
      M: "okta mÃ¡nnu",
      MM: "%d mÃ¡nut",
      y: "okta jahki",
      yy: "%d jagit"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("si", {
    months: "à¶¢à¶±à·€à·à¶»à·’_à¶´à·™à¶¶à¶»à·€à·à¶»à·’_à¶¸à·à¶»à·Šà¶­à·”_à¶…à¶´à·Šâ€à¶»à·šà¶½à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·à·ƒà·Šà¶­à·”_à·ƒà·à¶´à·Šà¶­à·à¶¸à·Šà¶¶à¶»à·Š_à¶”à¶šà·Šà¶­à·à¶¶à¶»à·Š_à¶±à·œà·€à·à¶¸à·Šà¶¶à¶»à·Š_à¶¯à·™à·ƒà·à¶¸à·Šà¶¶à¶»à·Š".split("_"),
    monthsShort: "à¶¢à¶±_à¶´à·™à¶¶_à¶¸à·à¶»à·Š_à¶…à¶´à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·_à·ƒà·à¶´à·Š_à¶”à¶šà·Š_à¶±à·œà·€à·_à¶¯à·™à·ƒà·".split("_"),
    weekdays: "à¶‰à¶»à·’à¶¯à·_à·ƒà¶³à·”à¶¯à·_à¶…à¶Ÿà·„à¶»à·”à·€à·à¶¯à·_à¶¶à¶¯à·à¶¯à·_à¶¶à·Šâ€à¶»à·„à·ƒà·Šà¶´à¶­à·’à¶±à·Šà¶¯à·_à·ƒà·’à¶šà·”à¶»à·à¶¯à·_à·ƒà·™à¶±à·ƒà·”à¶»à·à¶¯à·".split("_"),
    weekdaysShort: "à¶‰à¶»à·’_à·ƒà¶³à·”_à¶…à¶Ÿ_à¶¶à¶¯à·_à¶¶à·Šâ€à¶»à·„_à·ƒà·’à¶šà·”_à·ƒà·™à¶±".split("_"),
    weekdaysMin: "à¶‰_à·ƒ_à¶…_à¶¶_à¶¶à·Šâ€à¶»_à·ƒà·’_à·ƒà·™".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "a h:mm",
      LTS: "a h:mm:ss",
      L: "YYYY/MM/DD",
      LL: "YYYY MMMM D",
      LLL: "YYYY MMMM D, a h:mm",
      LLLL: "YYYY MMMM D [à·€à·à¶±à·’] dddd, a h:mm:ss"
    },
    calendar: {
      sameDay: "[à¶…à¶¯] LT[à¶§]",
      nextDay: "[à·„à·™à¶§] LT[à¶§]",
      nextWeek: "dddd LT[à¶§]",
      lastDay: "[à¶Šà¶ºà·š] LT[à¶§]",
      lastWeek: "[à¶´à·ƒà·”à¶œà·’à¶º] dddd LT[à¶§]",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sà¶šà·’à¶±à·Š",
      past: "%sà¶šà¶§ à¶´à·™à¶»",
      s: "à¶­à¶­à·Šà¶´à¶» à¶šà·’à·„à·’à¶´à¶º",
      m: "à¶¸à·’à¶±à·’à¶­à·Šà¶­à·”à·€",
      mm: "à¶¸à·’à¶±à·’à¶­à·Šà¶­à·” %d",
      h: "à¶´à·à¶º",
      hh: "à¶´à·à¶º %d",
      d: "à¶¯à·’à¶±à¶º",
      dd: "à¶¯à·’à¶± %d",
      M: "à¶¸à·à·ƒà¶º",
      MM: "à¶¸à·à·ƒ %d",
      y: "à·€à·ƒà¶»",
      yy: "à·€à·ƒà¶» %d"
    },
    ordinalParse: /\d{1,2} à·€à·à¶±à·’/,
    ordinal: function ordinal(a) {
      return a + " à·€à·à¶±à·’";
    },
    meridiemParse: /à¶´à·™à¶» à·€à¶»à·”|à¶´à·ƒà·Š à·€à¶»à·”|à¶´à·™.à·€|à¶´.à·€./,
    isPM: function isPM(a) {
      return "à¶´.à·€." === a || "à¶´à·ƒà·Š à·€à¶»à·”" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return a > 11 ? c ? "à¶´.à·€." : "à¶´à·ƒà·Š à·€à¶»à·”" : c ? "à¶´à·™.à·€." : "à¶´à·™à¶» à·€à¶»à·”";
    }
  }), "januÃ¡r_februÃ¡r_marec_aprÃ­l_mÃ¡j_jÃºn_jÃºl_august_september_oktÃ³ber_november_december".split("_")),
      lh = "jan_feb_mar_apr_mÃ¡j_jÃºn_jÃºl_aug_sep_okt_nov_dec".split("_"),
      mh = (kg.defineLocale("sk", {
    months: kh,
    monthsShort: lh,
    weekdays: "nedeÄ¾a_pondelok_utorok_streda_Å¡tvrtok_piatok_sobota".split("_"),
    weekdaysShort: "ne_po_ut_st_Å¡t_pi_so".split("_"),
    weekdaysMin: "ne_po_ut_st_Å¡t_pi_so".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[dnes o] LT",
      nextDay: "[zajtra o] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[v nedeÄ¾u o] LT";

          case 1:
          case 2:
            return "[v] dddd [o] LT";

          case 3:
            return "[v stredu o] LT";

          case 4:
            return "[vo Å¡tvrtok o] LT";

          case 5:
            return "[v piatok o] LT";

          case 6:
            return "[v sobotu o] LT";
        }
      },
      lastDay: "[vÄera o] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
            return "[minulÃº nedeÄ¾u o] LT";

          case 1:
          case 2:
            return "[minulÃ½] dddd [o] LT";

          case 3:
            return "[minulÃº stredu o] LT";

          case 4:
          case 5:
            return "[minulÃ½] dddd [o] LT";

          case 6:
            return "[minulÃº sobotu o] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "pred %s",
      s: $d,
      m: $d,
      mm: $d,
      h: $d,
      hh: $d,
      d: $d,
      dd: $d,
      M: $d,
      MM: $d,
      y: $d,
      yy: $d
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("sl", {
    months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
    monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedelja_ponedeljek_torek_sreda_Äetrtek_petek_sobota".split("_"),
    weekdaysShort: "ned._pon._tor._sre._Äet._pet._sob.".split("_"),
    weekdaysMin: "ne_po_to_sr_Äe_pe_so".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danes ob] LT",
      nextDay: "[jutri ob] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[v] [nedeljo] [ob] LT";

          case 3:
            return "[v] [sredo] [ob] LT";

          case 6:
            return "[v] [soboto] [ob] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[v] dddd [ob] LT";
        }
      },
      lastDay: "[vÄeraj ob] LT",
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
            return "[prejÅ¡njo] [nedeljo] [ob] LT";

          case 3:
            return "[prejÅ¡njo] [sredo] [ob] LT";

          case 6:
            return "[prejÅ¡njo] [soboto] [ob] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[prejÅ¡nji] dddd [ob] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "Äez %s",
      past: "pred %s",
      s: _d,
      m: _d,
      mm: _d,
      h: _d,
      hh: _d,
      d: _d,
      dd: _d,
      M: _d,
      MM: _d,
      y: _d,
      yy: _d
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("sq", {
    months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_NÃ«ntor_Dhjetor".split("_"),
    monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_NÃ«n_Dhj".split("_"),
    weekdays: "E Diel_E HÃ«nÃ«_E MartÃ«_E MÃ«rkurÃ«_E Enjte_E Premte_E ShtunÃ«".split("_"),
    weekdaysShort: "Die_HÃ«n_Mar_MÃ«r_Enj_Pre_Sht".split("_"),
    weekdaysMin: "D_H_Ma_MÃ«_E_P_Sh".split("_"),
    weekdaysParseExact: !0,
    meridiemParse: /PD|MD/,
    isPM: function isPM(a) {
      return "M" === a.charAt(0);
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "PD" : "MD";
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Sot nÃ«] LT",
      nextDay: "[NesÃ«r nÃ«] LT",
      nextWeek: "dddd [nÃ«] LT",
      lastDay: "[Dje nÃ«] LT",
      lastWeek: "dddd [e kaluar nÃ«] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "nÃ« %s",
      past: "%s mÃ« parÃ«",
      s: "disa sekonda",
      m: "njÃ« minutÃ«",
      mm: "%d minuta",
      h: "njÃ« orÃ«",
      hh: "%d orÃ«",
      d: "njÃ« ditÃ«",
      dd: "%d ditÃ«",
      M: "njÃ« muaj",
      MM: "%d muaj",
      y: "njÃ« vit",
      yy: "%d vite"
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    words: {
      //Different grammatical cases
      m: ["Ñ˜ÐµÐ´Ð°Ð½ Ð¼Ð¸Ð½ÑƒÑ‚", "Ñ˜ÐµÐ´Ð½Ðµ Ð¼Ð¸Ð½ÑƒÑ‚Ðµ"],
      mm: ["Ð¼Ð¸Ð½ÑƒÑ‚", "Ð¼Ð¸Ð½ÑƒÑ‚Ðµ", "Ð¼Ð¸Ð½ÑƒÑ‚Ð°"],
      h: ["Ñ˜ÐµÐ´Ð°Ð½ ÑÐ°Ñ‚", "Ñ˜ÐµÐ´Ð½Ð¾Ð³ ÑÐ°Ñ‚Ð°"],
      hh: ["ÑÐ°Ñ‚", "ÑÐ°Ñ‚Ð°", "ÑÐ°Ñ‚Ð¸"],
      dd: ["Ð´Ð°Ð½", "Ð´Ð°Ð½Ð°", "Ð´Ð°Ð½Ð°"],
      MM: ["Ð¼ÐµÑÐµÑ†", "Ð¼ÐµÑÐµÑ†Ð°", "Ð¼ÐµÑÐµÑ†Ð¸"],
      yy: ["Ð³Ð¾Ð´Ð¸Ð½Ð°", "Ð³Ð¾Ð´Ð¸Ð½Ðµ", "Ð³Ð¾Ð´Ð¸Ð½Ð°"]
    },
    correctGrammaticalCase: function correctGrammaticalCase(a, b) {
      return 1 === a ? b[0] : a >= 2 && 4 >= a ? b[1] : b[2];
    },
    translate: function translate(a, b, c) {
      var d = mh.words[c];
      return 1 === c.length ? b ? d[0] : d[1] : a + " " + mh.correctGrammaticalCase(a, d);
    }
  }),
      nh = (kg.defineLocale("sr-cyrl", {
    months: "Ñ˜Ð°Ð½ÑƒÐ°Ñ€_Ñ„ÐµÐ±Ñ€ÑƒÐ°Ñ€_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€_Ð¾ÐºÑ‚Ð¾Ð±Ð°Ñ€_Ð½Ð¾Ð²ÐµÐ¼Ð±Ð°Ñ€_Ð´ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€".split("_"),
    monthsShort: "Ñ˜Ð°Ð½._Ñ„ÐµÐ±._Ð¼Ð°Ñ€._Ð°Ð¿Ñ€._Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³._ÑÐµÐ¿._Ð¾ÐºÑ‚._Ð½Ð¾Ð²._Ð´ÐµÑ†.".split("_"),
    monthsParseExact: !0,
    weekdays: "Ð½ÐµÐ´ÐµÑ™Ð°_Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™Ð°Ðº_ÑƒÑ‚Ð¾Ñ€Ð°Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð°Ðº_Ð¿ÐµÑ‚Ð°Ðº_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"),
    weekdaysShort: "Ð½ÐµÐ´._Ð¿Ð¾Ð½._ÑƒÑ‚Ð¾._ÑÑ€Ðµ._Ñ‡ÐµÑ‚._Ð¿ÐµÑ‚._ÑÑƒÐ±.".split("_"),
    weekdaysMin: "Ð½Ðµ_Ð¿Ð¾_ÑƒÑ‚_ÑÑ€_Ñ‡Ðµ_Ð¿Ðµ_ÑÑƒ".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[Ð´Ð°Ð½Ð°Ñ Ñƒ] LT",
      nextDay: "[ÑÑƒÑ‚Ñ€Ð° Ñƒ] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[Ñƒ] [Ð½ÐµÐ´ÐµÑ™Ñƒ] [Ñƒ] LT";

          case 3:
            return "[Ñƒ] [ÑÑ€ÐµÐ´Ñƒ] [Ñƒ] LT";

          case 6:
            return "[Ñƒ] [ÑÑƒÐ±Ð¾Ñ‚Ñƒ] [Ñƒ] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[Ñƒ] dddd [Ñƒ] LT";
        }
      },
      lastDay: "[Ñ˜ÑƒÑ‡Ðµ Ñƒ] LT",
      lastWeek: function lastWeek() {
        var a = ["[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [Ð½ÐµÐ´ÐµÑ™Ðµ] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [ÑƒÑ‚Ð¾Ñ€ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑ€ÐµÐ´Ðµ] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿ÐµÑ‚ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑƒÐ±Ð¾Ñ‚Ðµ] [Ñƒ] LT"];
        return a[this.day()];
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "Ð·Ð° %s",
      past: "Ð¿Ñ€Ðµ %s",
      s: "Ð½ÐµÐºÐ¾Ð»Ð¸ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸",
      m: mh.translate,
      mm: mh.translate,
      h: mh.translate,
      hh: mh.translate,
      d: "Ð´Ð°Ð½",
      dd: mh.translate,
      M: "Ð¼ÐµÑÐµÑ†",
      MM: mh.translate,
      y: "Ð³Ð¾Ð´Ð¸Ð½Ñƒ",
      yy: mh.translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), {
    words: {
      //Different grammatical cases
      m: ["jedan minut", "jedne minute"],
      mm: ["minut", "minute", "minuta"],
      h: ["jedan sat", "jednog sata"],
      hh: ["sat", "sata", "sati"],
      dd: ["dan", "dana", "dana"],
      MM: ["mesec", "meseca", "meseci"],
      yy: ["godina", "godine", "godina"]
    },
    correctGrammaticalCase: function correctGrammaticalCase(a, b) {
      return 1 === a ? b[0] : a >= 2 && 4 >= a ? b[1] : b[2];
    },
    translate: function translate(a, b, c) {
      var d = nh.words[c];
      return 1 === c.length ? b ? d[0] : d[1] : a + " " + nh.correctGrammaticalCase(a, d);
    }
  }),
      oh = (kg.defineLocale("sr", {
    months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
    monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedelja_ponedeljak_utorak_sreda_Äetvrtak_petak_subota".split("_"),
    weekdaysShort: "ned._pon._uto._sre._Äet._pet._sub.".split("_"),
    weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danas u] LT",
      nextDay: "[sutra u] LT",
      nextWeek: function nextWeek() {
        switch (this.day()) {
          case 0:
            return "[u] [nedelju] [u] LT";

          case 3:
            return "[u] [sredu] [u] LT";

          case 6:
            return "[u] [subotu] [u] LT";

          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      },
      lastDay: "[juÄe u] LT",
      lastWeek: function lastWeek() {
        var a = ["[proÅ¡le] [nedelje] [u] LT", "[proÅ¡log] [ponedeljka] [u] LT", "[proÅ¡log] [utorka] [u] LT", "[proÅ¡le] [srede] [u] LT", "[proÅ¡log] [Äetvrtka] [u] LT", "[proÅ¡log] [petka] [u] LT", "[proÅ¡le] [subote] [u] LT"];
        return a[this.day()];
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "pre %s",
      s: "nekoliko sekundi",
      m: nh.translate,
      mm: nh.translate,
      h: nh.translate,
      hh: nh.translate,
      d: "dan",
      dd: nh.translate,
      M: "mesec",
      MM: nh.translate,
      y: "godinu",
      yy: nh.translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("ss", {
    months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
    monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
    weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
    weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
    weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY h:mm A",
      LLLL: "dddd, D MMMM YYYY h:mm A"
    },
    calendar: {
      sameDay: "[Namuhla nga] LT",
      nextDay: "[Kusasa nga] LT",
      nextWeek: "dddd [nga] LT",
      lastDay: "[Itolo nga] LT",
      lastWeek: "dddd [leliphelile] [nga] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "nga %s",
      past: "wenteka nga %s",
      s: "emizuzwana lomcane",
      m: "umzuzu",
      mm: "%d emizuzu",
      h: "lihora",
      hh: "%d emahora",
      d: "lilanga",
      dd: "%d emalanga",
      M: "inyanga",
      MM: "%d tinyanga",
      y: "umnyaka",
      yy: "%d iminyaka"
    },
    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
    meridiem: function meridiem(a, b, c) {
      return 11 > a ? "ekuseni" : 15 > a ? "emini" : 19 > a ? "entsambama" : "ebusuku";
    },
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "ekuseni" === b ? a : "emini" === b ? a >= 11 ? a : a + 12 : "entsambama" === b || "ebusuku" === b ? 0 === a ? 0 : a + 12 : void 0;
    },
    ordinalParse: /\d{1,2}/,
    ordinal: "%d",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("sv", {
    months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays: "sÃ¶ndag_mÃ¥ndag_tisdag_onsdag_torsdag_fredag_lÃ¶rdag".split("_"),
    weekdaysShort: "sÃ¶n_mÃ¥n_tis_ons_tor_fre_lÃ¶r".split("_"),
    weekdaysMin: "sÃ¶_mÃ¥_ti_on_to_fr_lÃ¶".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [kl.] HH:mm",
      LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd D MMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Idag] LT",
      nextDay: "[Imorgon] LT",
      lastDay: "[IgÃ¥r] LT",
      nextWeek: "[PÃ¥] dddd LT",
      lastWeek: "[I] dddd[s] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "fÃ¶r %s sedan",
      s: "nÃ¥gra sekunder",
      m: "en minut",
      mm: "%d minuter",
      h: "en timme",
      hh: "%d timmar",
      d: "en dag",
      dd: "%d dagar",
      M: "en mÃ¥nad",
      MM: "%d mÃ¥nader",
      y: "ett Ã¥r",
      yy: "%d Ã¥r"
    },
    ordinalParse: /\d{1,2}(e|a)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "e" : 1 === b ? "a" : 2 === b ? "a" : "e";
      return a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("sw", {
    months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
    monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
    weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
    weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
    weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[leo saa] LT",
      nextDay: "[kesho saa] LT",
      nextWeek: "[wiki ijayo] dddd [saat] LT",
      lastDay: "[jana] LT",
      lastWeek: "[wiki iliyopita] dddd [saat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s baadaye",
      past: "tokea %s",
      s: "hivi punde",
      m: "dakika moja",
      mm: "dakika %d",
      h: "saa limoja",
      hh: "masaa %d",
      d: "siku moja",
      dd: "masiku %d",
      M: "mwezi mmoja",
      MM: "miezi %d",
      y: "mwaka mmoja",
      yy: "miaka %d"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), {
    1: "à¯§",
    2: "à¯¨",
    3: "à¯©",
    4: "à¯ª",
    5: "à¯«",
    6: "à¯¬",
    7: "à¯­",
    8: "à¯®",
    9: "à¯¯",
    0: "à¯¦"
  }),
      ph = {
    "à¯§": "1",
    "à¯¨": "2",
    "à¯©": "3",
    "à¯ª": "4",
    "à¯«": "5",
    "à¯¬": "6",
    "à¯­": "7",
    "à¯®": "8",
    "à¯¯": "9",
    "à¯¦": "0"
  },
      qh = (kg.defineLocale("ta", {
    months: "à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯".split("_"),
    monthsShort: "à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯".split("_"),
    weekdays: "à®žà®¾à®¯à®¿à®±à¯à®±à¯à®•à¯à®•à®¿à®´à®®à¯ˆ_à®¤à®¿à®™à¯à®•à®Ÿà¯à®•à®¿à®´à®®à¯ˆ_à®šà¯†à®µà¯à®µà®¾à®¯à¯à®•à®¿à®´à®®à¯ˆ_à®ªà¯à®¤à®©à¯à®•à®¿à®´à®®à¯ˆ_à®µà®¿à®¯à®¾à®´à®•à¯à®•à®¿à®´à®®à¯ˆ_à®µà¯†à®³à¯à®³à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ_à®šà®©à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ".split("_"),
    weekdaysShort: "à®žà®¾à®¯à®¿à®±à¯_à®¤à®¿à®™à¯à®•à®³à¯_à®šà¯†à®µà¯à®µà®¾à®¯à¯_à®ªà¯à®¤à®©à¯_à®µà®¿à®¯à®¾à®´à®©à¯_à®µà¯†à®³à¯à®³à®¿_à®šà®©à®¿".split("_"),
    weekdaysMin: "à®žà®¾_à®¤à®¿_à®šà¯†_à®ªà¯_à®µà®¿_à®µà¯†_à®š".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, HH:mm",
      LLLL: "dddd, D MMMM YYYY, HH:mm"
    },
    calendar: {
      sameDay: "[à®‡à®©à¯à®±à¯] LT",
      nextDay: "[à®¨à®¾à®³à¯ˆ] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à®¨à¯‡à®±à¯à®±à¯] LT",
      lastWeek: "[à®•à®Ÿà®¨à¯à®¤ à®µà®¾à®°à®®à¯] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à®‡à®²à¯",
      past: "%s à®®à¯à®©à¯",
      s: "à®’à®°à¯ à®šà®¿à®² à®µà®¿à®¨à®¾à®Ÿà®¿à®•à®³à¯",
      m: "à®’à®°à¯ à®¨à®¿à®®à®¿à®Ÿà®®à¯",
      mm: "%d à®¨à®¿à®®à®¿à®Ÿà®™à¯à®•à®³à¯",
      h: "à®’à®°à¯ à®®à®£à®¿ à®¨à¯‡à®°à®®à¯",
      hh: "%d à®®à®£à®¿ à®¨à¯‡à®°à®®à¯",
      d: "à®’à®°à¯ à®¨à®¾à®³à¯",
      dd: "%d à®¨à®¾à®Ÿà¯à®•à®³à¯",
      M: "à®’à®°à¯ à®®à®¾à®¤à®®à¯",
      MM: "%d à®®à®¾à®¤à®™à¯à®•à®³à¯",
      y: "à®’à®°à¯ à®µà®°à¯à®Ÿà®®à¯",
      yy: "%d à®†à®£à¯à®Ÿà¯à®•à®³à¯"
    },
    ordinalParse: /\d{1,2}à®µà®¤à¯/,
    ordinal: function ordinal(a) {
      return a + "à®µà®¤à¯";
    },
    preparse: function preparse(a) {
      return a.replace(/[à¯§à¯¨à¯©à¯ªà¯«à¯¬à¯­à¯®à¯¯à¯¦]/g, function (a) {
        return ph[a];
      });
    },
    postformat: function postformat(a) {
      return a.replace(/\d/g, function (a) {
        return oh[a];
      });
    },
    // refer http://ta.wikipedia.org/s/1er1
    meridiemParse: /à®¯à®¾à®®à®®à¯|à®µà¯ˆà®•à®±à¯ˆ|à®•à®¾à®²à¯ˆ|à®¨à®£à¯à®ªà®•à®²à¯|à®Žà®±à¯à®ªà®¾à®Ÿà¯|à®®à®¾à®²à¯ˆ/,
    meridiem: function meridiem(a, b, c) {
      return 2 > a ? " à®¯à®¾à®®à®®à¯" : 6 > a ? " à®µà¯ˆà®•à®±à¯ˆ" : 10 > a ? " à®•à®¾à®²à¯ˆ" : 14 > a ? " à®¨à®£à¯à®ªà®•à®²à¯" : 18 > a ? " à®Žà®±à¯à®ªà®¾à®Ÿà¯" : 22 > a ? " à®®à®¾à®²à¯ˆ" : " à®¯à®¾à®®à®®à¯";
    },
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à®¯à®¾à®®à®®à¯" === b ? 2 > a ? a : a + 12 : "à®µà¯ˆà®•à®±à¯ˆ" === b || "à®•à®¾à®²à¯ˆ" === b ? a : "à®¨à®£à¯à®ªà®•à®²à¯" === b && a >= 10 ? a : a + 12;
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), kg.defineLocale("te", {
    months: "à°œà°¨à°µà°°à°¿_à°«à°¿à°¬à±à°°à°µà°°à°¿_à°®à°¾à°°à±à°šà°¿_à°à°ªà±à°°à°¿à°²à±_à°®à±‡_à°œà±‚à°¨à±_à°œà±‚à°²à±†à±–_à°†à°—à°¸à±à°Ÿà±_à°¸à±†à°ªà±à°Ÿà±†à°‚à°¬à°°à±_à°…à°•à±à°Ÿà±‹à°¬à°°à±_à°¨à°µà°‚à°¬à°°à±_à°¡à°¿à°¸à±†à°‚à°¬à°°à±".split("_"),
    monthsShort: "à°œà°¨._à°«à°¿à°¬à±à°°._à°®à°¾à°°à±à°šà°¿_à°à°ªà±à°°à°¿._à°®à±‡_à°œà±‚à°¨à±_à°œà±‚à°²à±†à±–_à°†à°—._à°¸à±†à°ªà±._à°…à°•à±à°Ÿà±‹._à°¨à°µ._à°¡à°¿à°¸à±†.".split("_"),
    monthsParseExact: !0,
    weekdays: "à°†à°¦à°¿à°µà°¾à°°à°‚_à°¸à±‹à°®à°µà°¾à°°à°‚_à°®à°‚à°—à°³à°µà°¾à°°à°‚_à°¬à±à°§à°µà°¾à°°à°‚_à°—à±à°°à±à°µà°¾à°°à°‚_à°¶à±à°•à±à°°à°µà°¾à°°à°‚_à°¶à°¨à°¿à°µà°¾à°°à°‚".split("_"),
    weekdaysShort: "à°†à°¦à°¿_à°¸à±‹à°®_à°®à°‚à°—à°³_à°¬à±à°§_à°—à±à°°à±_à°¶à±à°•à±à°°_à°¶à°¨à°¿".split("_"),
    weekdaysMin: "à°†_à°¸à±‹_à°®à°‚_à°¬à±_à°—à±_à°¶à±_à°¶".split("_"),
    longDateFormat: {
      LT: "A h:mm",
      LTS: "A h:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm",
      LLLL: "dddd, D MMMM YYYY, A h:mm"
    },
    calendar: {
      sameDay: "[à°¨à±‡à°¡à±] LT",
      nextDay: "[à°°à±‡à°ªà±] LT",
      nextWeek: "dddd, LT",
      lastDay: "[à°¨à°¿à°¨à±à°¨] LT",
      lastWeek: "[à°—à°¤] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s à°²à±‹",
      past: "%s à°•à±à°°à°¿à°¤à°‚",
      s: "à°•à±Šà°¨à±à°¨à°¿ à°•à±à°·à°£à°¾à°²à±",
      m: "à°’à°• à°¨à°¿à°®à°¿à°·à°‚",
      mm: "%d à°¨à°¿à°®à°¿à°·à°¾à°²à±",
      h: "à°’à°• à°—à°‚à°Ÿ",
      hh: "%d à°—à°‚à°Ÿà°²à±",
      d: "à°’à°• à°°à±‹à°œà±",
      dd: "%d à°°à±‹à°œà±à°²à±",
      M: "à°’à°• à°¨à±†à°²",
      MM: "%d à°¨à±†à°²à°²à±",
      y: "à°’à°• à°¸à°‚à°µà°¤à±à°¸à°°à°‚",
      yy: "%d à°¸à°‚à°µà°¤à±à°¸à°°à°¾à°²à±"
    },
    ordinalParse: /\d{1,2}à°µ/,
    ordinal: "%dà°µ",
    meridiemParse: /à°°à°¾à°¤à±à°°à°¿|à°‰à°¦à°¯à°‚|à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚|à°¸à°¾à°¯à°‚à°¤à±à°°à°‚/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "à°°à°¾à°¤à±à°°à°¿" === b ? 4 > a ? a : a + 12 : "à°‰à°¦à°¯à°‚" === b ? a : "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚" === b ? a >= 10 ? a : a + 12 : "à°¸à°¾à°¯à°‚à°¤à±à°°à°‚" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "à°°à°¾à°¤à±à°°à°¿" : 10 > a ? "à°‰à°¦à°¯à°‚" : 17 > a ? "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚" : 20 > a ? "à°¸à°¾à°¯à°‚à°¤à±à°°à°‚" : "à°°à°¾à°¤à±à°°à°¿";
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
    }
  }), kg.defineLocale("th", {
    months: "à¸¡à¸à¸£à¸²à¸„à¸¡_à¸à¸¸à¸¡à¸ à¸²à¸žà¸±à¸™à¸˜à¹Œ_à¸¡à¸µà¸™à¸²à¸„à¸¡_à¹€à¸¡à¸©à¸²à¸¢à¸™_à¸žà¸¤à¸©à¸ à¸²à¸„à¸¡_à¸¡à¸´à¸–à¸¸à¸™à¸²à¸¢à¸™_à¸à¸£à¸à¸Žà¸²à¸„à¸¡_à¸ªà¸´à¸‡à¸«à¸²à¸„à¸¡_à¸à¸±à¸™à¸¢à¸²à¸¢à¸™_à¸•à¸¸à¸¥à¸²à¸„à¸¡_à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²à¸¢à¸™_à¸˜à¸±à¸™à¸§à¸²à¸„à¸¡".split("_"),
    monthsShort: "à¸¡.à¸„._à¸.à¸ž._à¸¡à¸µ.à¸„._à¹€à¸¡.à¸¢._à¸ž.à¸„._à¸¡à¸´.à¸¢._à¸.à¸„._à¸ª.à¸„._à¸.à¸¢._à¸•.à¸„._à¸ž.à¸¢._à¸˜.à¸„.".split("_"),
    monthsParseExact: !0,
    weekdays: "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ªà¸šà¸”à¸µ_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ".split("_"),
    weekdaysShort: "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ª_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ".split("_"),
    // yes, three characters difference
    weekdaysMin: "à¸­à¸²._à¸ˆ._à¸­._à¸ž._à¸žà¸¤._à¸¨._à¸ª.".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ",
      LTS: "H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ s à¸§à¸´à¸™à¸²à¸—à¸µ",
      L: "YYYY/MM/DD",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY à¹€à¸§à¸¥à¸² H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ",
      LLLL: "à¸§à¸±à¸™ddddà¸—à¸µà¹ˆ D MMMM YYYY à¹€à¸§à¸¥à¸² H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ"
    },
    meridiemParse: /à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡|à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡/,
    isPM: function isPM(a) {
      return "à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡" === a;
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? "à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡" : "à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡";
    },
    calendar: {
      sameDay: "[à¸§à¸±à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT",
      nextDay: "[à¸žà¸£à¸¸à¹ˆà¸‡à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT",
      nextWeek: "dddd[à¸«à¸™à¹‰à¸² à¹€à¸§à¸¥à¸²] LT",
      lastDay: "[à¹€à¸¡à¸·à¹ˆà¸­à¸§à¸²à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT",
      lastWeek: "[à¸§à¸±à¸™]dddd[à¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§ à¹€à¸§à¸¥à¸²] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "à¸­à¸µà¸ %s",
      past: "%sà¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§",
      s: "à¹„à¸¡à¹ˆà¸à¸µà¹ˆà¸§à¸´à¸™à¸²à¸—à¸µ",
      m: "1 à¸™à¸²à¸—à¸µ",
      mm: "%d à¸™à¸²à¸—à¸µ",
      h: "1 à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡",
      hh: "%d à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡",
      d: "1 à¸§à¸±à¸™",
      dd: "%d à¸§à¸±à¸™",
      M: "1 à¹€à¸”à¸·à¸­à¸™",
      MM: "%d à¹€à¸”à¸·à¸­à¸™",
      y: "1 à¸›à¸µ",
      yy: "%d à¸›à¸µ"
    }
  }), kg.defineLocale("tl-ph", {
    months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
    monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
    weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
    weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
    weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "MM/D/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY HH:mm",
      LLLL: "dddd, MMMM DD, YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ngayon sa] LT",
      nextDay: "[Bukas sa] LT",
      nextWeek: "dddd [sa] LT",
      lastDay: "[Kahapon sa] LT",
      lastWeek: "dddd [huling linggo] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "sa loob ng %s",
      past: "%s ang nakalipas",
      s: "ilang segundo",
      m: "isang minuto",
      mm: "%d minuto",
      h: "isang oras",
      hh: "%d oras",
      d: "isang araw",
      dd: "%d araw",
      M: "isang buwan",
      MM: "%d buwan",
      y: "isang taon",
      yy: "%d taon"
    },
    ordinalParse: /\d{1,2}/,
    ordinal: function ordinal(a) {
      return a;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), "pagh_waâ€™_chaâ€™_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_")),
      rh = (kg.defineLocale("tlh", {
    months: "teraâ€™ jar waâ€™_teraâ€™ jar chaâ€™_teraâ€™ jar wej_teraâ€™ jar loS_teraâ€™ jar vagh_teraâ€™ jar jav_teraâ€™ jar Soch_teraâ€™ jar chorgh_teraâ€™ jar Hut_teraâ€™ jar waâ€™maH_teraâ€™ jar waâ€™maH waâ€™_teraâ€™ jar waâ€™maH chaâ€™".split("_"),
    monthsShort: "jar waâ€™_jar chaâ€™_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar waâ€™maH_jar waâ€™maH waâ€™_jar waâ€™maH chaâ€™".split("_"),
    monthsParseExact: !0,
    weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
    weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
    weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[DaHjaj] LT",
      nextDay: "[waâ€™leS] LT",
      nextWeek: "LLL",
      lastDay: "[waâ€™Huâ€™] LT",
      lastWeek: "LLL",
      sameElse: "L"
    },
    relativeTime: {
      future: ae,
      past: be,
      s: "puS lup",
      m: "waâ€™ tup",
      mm: ce,
      h: "waâ€™ rep",
      hh: ce,
      d: "waâ€™ jaj",
      dd: ce,
      M: "waâ€™ jar",
      MM: ce,
      y: "waâ€™ DIS",
      yy: ce
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), {
    1: "'inci",
    5: "'inci",
    8: "'inci",
    70: "'inci",
    80: "'inci",
    2: "'nci",
    7: "'nci",
    20: "'nci",
    50: "'nci",
    3: "'Ã¼ncÃ¼",
    4: "'Ã¼ncÃ¼",
    100: "'Ã¼ncÃ¼",
    6: "'ncÄ±",
    9: "'uncu",
    10: "'uncu",
    30: "'uncu",
    60: "'Ä±ncÄ±",
    90: "'Ä±ncÄ±"
  }),
      sh = (kg.defineLocale("tr", {
    months: "Ocak_Åžubat_Mart_Nisan_MayÄ±s_Haziran_Temmuz_AÄŸustos_EylÃ¼l_Ekim_KasÄ±m_AralÄ±k".split("_"),
    monthsShort: "Oca_Åžub_Mar_Nis_May_Haz_Tem_AÄŸu_Eyl_Eki_Kas_Ara".split("_"),
    weekdays: "Pazar_Pazartesi_SalÄ±_Ã‡arÅŸamba_PerÅŸembe_Cuma_Cumartesi".split("_"),
    weekdaysShort: "Paz_Pts_Sal_Ã‡ar_Per_Cum_Cts".split("_"),
    weekdaysMin: "Pz_Pt_Sa_Ã‡a_Pe_Cu_Ct".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[bugÃ¼n saat] LT",
      nextDay: "[yarÄ±n saat] LT",
      nextWeek: "[haftaya] dddd [saat] LT",
      lastDay: "[dÃ¼n] LT",
      lastWeek: "[geÃ§en hafta] dddd [saat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s sonra",
      past: "%s Ã¶nce",
      s: "birkaÃ§ saniye",
      m: "bir dakika",
      mm: "%d dakika",
      h: "bir saat",
      hh: "%d saat",
      d: "bir gÃ¼n",
      dd: "%d gÃ¼n",
      M: "bir ay",
      MM: "%d ay",
      y: "bir yÄ±l",
      yy: "%d yÄ±l"
    },
    ordinalParse: /\d{1,2}'(inci|nci|Ã¼ncÃ¼|ncÄ±|uncu|Ä±ncÄ±)/,
    ordinal: function ordinal(a) {
      if (0 === a) // special case for zero
        return a + "'Ä±ncÄ±";
      var b = a % 10,
          c = a % 100 - b,
          d = a >= 100 ? 100 : null;
      return a + (rh[b] || rh[c] || rh[d]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("tzl", {
    months: "Januar_Fevraglh_MarÃ§_AvrÃ¯u_Mai_GÃ¼n_Julia_Guscht_Setemvar_ListopÃ¤ts_Noemvar_Zecemvar".split("_"),
    monthsShort: "Jan_Fev_Mar_Avr_Mai_GÃ¼n_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
    weekdays: "SÃºladi_LÃºneÃ§i_Maitzi_MÃ¡rcuri_XhÃºadi_ViÃ©nerÃ§i_SÃ¡turi".split("_"),
    weekdaysShort: "SÃºl_LÃºn_Mai_MÃ¡r_XhÃº_ViÃ©_SÃ¡t".split("_"),
    weekdaysMin: "SÃº_LÃº_Ma_MÃ¡_Xh_Vi_SÃ¡".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM [dallas] YYYY",
      LLL: "D. MMMM [dallas] YYYY HH.mm",
      LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
    },
    meridiemParse: /d\'o|d\'a/i,
    isPM: function isPM(a) {
      return "d'o" === a.toLowerCase();
    },
    meridiem: function meridiem(a, b, c) {
      return a > 11 ? c ? "d'o" : "D'O" : c ? "d'a" : "D'A";
    },
    calendar: {
      sameDay: "[oxhi Ã ] LT",
      nextDay: "[demÃ  Ã ] LT",
      nextWeek: "dddd [Ã ] LT",
      lastDay: "[ieiri Ã ] LT",
      lastWeek: "[sÃ¼r el] dddd [lasteu Ã ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "osprei %s",
      past: "ja%s",
      s: ee,
      m: ee,
      mm: ee,
      h: ee,
      hh: ee,
      d: ee,
      dd: ee,
      M: ee,
      MM: ee,
      y: ee,
      yy: ee
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("tzm-latn", {
    months: "innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir".split("_"),
    monthsShort: "innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir".split("_"),
    weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"),
    weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"),
    weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[asdkh g] LT",
      nextDay: "[aska g] LT",
      nextWeek: "dddd [g] LT",
      lastDay: "[assant g] LT",
      lastWeek: "dddd [g] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dadkh s yan %s",
      past: "yan %s",
      s: "imik",
      m: "minuá¸",
      mm: "%d minuá¸",
      h: "saÉ›a",
      hh: "%d tassaÉ›in",
      d: "ass",
      dd: "%d ossan",
      M: "ayowr",
      MM: "%d iyyirn",
      y: "asgas",
      yy: "%d isgasn"
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12
    }
  }), kg.defineLocale("tzm", {
    months: "âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”".split("_"),
    monthsShort: "âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”".split("_"),
    weekdays: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"),
    weekdaysShort: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"),
    weekdaysMin: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[â´°âµ™â´·âµ… â´´] LT",
      nextDay: "[â´°âµ™â´½â´° â´´] LT",
      nextWeek: "dddd [â´´] LT",
      lastDay: "[â´°âµšâ´°âµâµœ â´´] LT",
      lastWeek: "dddd [â´´] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "â´·â´°â´·âµ… âµ™ âµ¢â´°âµ %s",
      past: "âµ¢â´°âµ %s",
      s: "âµ‰âµŽâµ‰â´½",
      m: "âµŽâµ‰âµâµ“â´º",
      mm: "%d âµŽâµ‰âµâµ“â´º",
      h: "âµ™â´°âµ„â´°",
      hh: "%d âµœâ´°âµ™âµ™â´°âµ„âµ‰âµ",
      d: "â´°âµ™âµ™",
      dd: "%d oâµ™âµ™â´°âµ",
      M: "â´°âµ¢oâµ“âµ”",
      MM: "%d âµ‰âµ¢âµ¢âµ‰âµ”âµ",
      y: "â´°âµ™â´³â´°âµ™",
      yy: "%d âµ‰âµ™â´³â´°âµ™âµ"
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12
    }
  }), kg.defineLocale("uk", {
    months: {
      format: "ÑÑ–Ñ‡Ð½Ñ_Ð»ÑŽÑ‚Ð¾Ð³Ð¾_Ð±ÐµÑ€ÐµÐ·Ð½Ñ_ÐºÐ²Ñ–Ñ‚Ð½Ñ_Ñ‚Ñ€Ð°Ð²Ð½Ñ_Ñ‡ÐµÑ€Ð²Ð½Ñ_Ð»Ð¸Ð¿Ð½Ñ_ÑÐµÑ€Ð¿Ð½Ñ_Ð²ÐµÑ€ÐµÑÐ½Ñ_Ð¶Ð¾Ð²Ñ‚Ð½Ñ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´Ð°_Ð³Ñ€ÑƒÐ´Ð½Ñ".split("_"),
      standalone: "ÑÑ–Ñ‡ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ð¸Ð¹_Ð±ÐµÑ€ÐµÐ·ÐµÐ½ÑŒ_ÐºÐ²Ñ–Ñ‚ÐµÐ½ÑŒ_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÐµÑ€Ð²ÐµÐ½ÑŒ_Ð»Ð¸Ð¿ÐµÐ½ÑŒ_ÑÐµÑ€Ð¿ÐµÐ½ÑŒ_Ð²ÐµÑ€ÐµÑÐµÐ½ÑŒ_Ð¶Ð¾Ð²Ñ‚ÐµÐ½ÑŒ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´_Ð³Ñ€ÑƒÐ´ÐµÐ½ÑŒ".split("_")
    },
    monthsShort: "ÑÑ–Ñ‡_Ð»ÑŽÑ‚_Ð±ÐµÑ€_ÐºÐ²Ñ–Ñ‚_Ñ‚Ñ€Ð°Ð²_Ñ‡ÐµÑ€Ð²_Ð»Ð¸Ð¿_ÑÐµÑ€Ð¿_Ð²ÐµÑ€_Ð¶Ð¾Ð²Ñ‚_Ð»Ð¸ÑÑ‚_Ð³Ñ€ÑƒÐ´".split("_"),
    weekdays: he,
    weekdaysShort: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
    weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY Ñ€.",
      LLL: "D MMMM YYYY Ñ€., HH:mm",
      LLLL: "dddd, D MMMM YYYY Ñ€., HH:mm"
    },
    calendar: {
      sameDay: ie("[Ð¡ÑŒÐ¾Ð³Ð¾Ð´Ð½Ñ– "),
      nextDay: ie("[Ð—Ð°Ð²Ñ‚Ñ€Ð° "),
      lastDay: ie("[Ð’Ñ‡Ð¾Ñ€Ð° "),
      nextWeek: ie("[Ð£] dddd ["),
      lastWeek: function lastWeek() {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return ie("[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ñ—] dddd [").call(this);

          case 1:
          case 2:
          case 4:
            return ie("[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ð³Ð¾] dddd [").call(this);
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "Ð·Ð° %s",
      past: "%s Ñ‚Ð¾Ð¼Ñƒ",
      s: "Ð´ÐµÐºÑ–Ð»ÑŒÐºÐ° ÑÐµÐºÑƒÐ½Ð´",
      m: ge,
      mm: ge,
      h: "Ð³Ð¾Ð´Ð¸Ð½Ñƒ",
      hh: ge,
      d: "Ð´ÐµÐ½ÑŒ",
      dd: ge,
      M: "Ð¼Ñ–ÑÑÑ†ÑŒ",
      MM: ge,
      y: "Ñ€Ñ–Ðº",
      yy: ge
    },
    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
    meridiemParse: /Ð½Ð¾Ñ‡Ñ–|Ñ€Ð°Ð½ÐºÑƒ|Ð´Ð½Ñ|Ð²ÐµÑ‡Ð¾Ñ€Ð°/,
    isPM: function isPM(a) {
      return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡Ð¾Ñ€Ð°)$/.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 4 > a ? "Ð½Ð¾Ñ‡Ñ–" : 12 > a ? "Ñ€Ð°Ð½ÐºÑƒ" : 17 > a ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡Ð¾Ñ€Ð°";
    },
    ordinalParse: /\d{1,2}-(Ð¹|Ð³Ð¾)/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "M":
        case "d":
        case "DDD":
        case "w":
        case "W":
          return a + "-Ð¹";

        case "D":
          return a + "-Ð³Ð¾";

        default:
          return a;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("uz", {
    months: "ÑÐ½Ð²Ð°Ñ€_Ñ„ÐµÐ²Ñ€Ð°Ð»_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€_Ð¾ÐºÑ‚ÑÐ±Ñ€_Ð½Ð¾ÑÐ±Ñ€_Ð´ÐµÐºÐ°Ð±Ñ€".split("_"),
    monthsShort: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"),
    weekdays: "Ð¯ÐºÑˆÐ°Ð½Ð±Ð°_Ð”ÑƒÑˆÐ°Ð½Ð±Ð°_Ð¡ÐµÑˆÐ°Ð½Ð±Ð°_Ð§Ð¾Ñ€ÑˆÐ°Ð½Ð±Ð°_ÐŸÐ°Ð¹ÑˆÐ°Ð½Ð±Ð°_Ð–ÑƒÐ¼Ð°_Ð¨Ð°Ð½Ð±Ð°".split("_"),
    weekdaysShort: "Ð¯ÐºÑˆ_Ð”ÑƒÑˆ_Ð¡ÐµÑˆ_Ð§Ð¾Ñ€_ÐŸÐ°Ð¹_Ð–ÑƒÐ¼_Ð¨Ð°Ð½".split("_"),
    weekdaysMin: "Ð¯Ðº_Ð”Ñƒ_Ð¡Ðµ_Ð§Ð¾_ÐŸÐ°_Ð–Ñƒ_Ð¨Ð°".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "D MMMM YYYY, dddd HH:mm"
    },
    calendar: {
      sameDay: "[Ð‘ÑƒÐ³ÑƒÐ½ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
      nextDay: "[Ð­Ñ€Ñ‚Ð°Ð³Ð°] LT [Ð´Ð°]",
      nextWeek: "dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
      lastDay: "[ÐšÐµÑ‡Ð° ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
      lastWeek: "[Ð£Ñ‚Ð³Ð°Ð½] dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
      sameElse: "L"
    },
    relativeTime: {
      future: "Ð¯ÐºÐ¸Ð½ %s Ð¸Ñ‡Ð¸Ð´Ð°",
      past: "Ð‘Ð¸Ñ€ Ð½ÐµÑ‡Ð° %s Ð¾Ð»Ð´Ð¸Ð½",
      s: "Ñ„ÑƒÑ€ÑÐ°Ñ‚",
      m: "Ð±Ð¸Ñ€ Ð´Ð°ÐºÐ¸ÐºÐ°",
      mm: "%d Ð´Ð°ÐºÐ¸ÐºÐ°",
      h: "Ð±Ð¸Ñ€ ÑÐ¾Ð°Ñ‚",
      hh: "%d ÑÐ¾Ð°Ñ‚",
      d: "Ð±Ð¸Ñ€ ÐºÑƒÐ½",
      dd: "%d ÐºÑƒÐ½",
      M: "Ð±Ð¸Ñ€ Ð¾Ð¹",
      MM: "%d Ð¾Ð¹",
      y: "Ð±Ð¸Ñ€ Ð¹Ð¸Ð»",
      yy: "%d Ð¹Ð¸Ð»"
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7
    }
  }), kg.defineLocale("vi", {
    months: "thÃ¡ng 1_thÃ¡ng 2_thÃ¡ng 3_thÃ¡ng 4_thÃ¡ng 5_thÃ¡ng 6_thÃ¡ng 7_thÃ¡ng 8_thÃ¡ng 9_thÃ¡ng 10_thÃ¡ng 11_thÃ¡ng 12".split("_"),
    monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
    monthsParseExact: !0,
    weekdays: "chá»§ nháº­t_thá»© hai_thá»© ba_thá»© tÆ°_thá»© nÄƒm_thá»© sÃ¡u_thá»© báº£y".split("_"),
    weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysParseExact: !0,
    meridiemParse: /sa|ch/i,
    isPM: function isPM(a) {
      return /^ch$/i.test(a);
    },
    meridiem: function meridiem(a, b, c) {
      return 12 > a ? c ? "sa" : "SA" : c ? "ch" : "CH";
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM [nÄƒm] YYYY",
      LLL: "D MMMM [nÄƒm] YYYY HH:mm",
      LLLL: "dddd, D MMMM [nÄƒm] YYYY HH:mm",
      l: "DD/M/YYYY",
      ll: "D MMM YYYY",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd, D MMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[HÃ´m nay lÃºc] LT",
      nextDay: "[NgÃ y mai lÃºc] LT",
      nextWeek: "dddd [tuáº§n tá»›i lÃºc] LT",
      lastDay: "[HÃ´m qua lÃºc] LT",
      lastWeek: "dddd [tuáº§n rá»“i lÃºc] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s tá»›i",
      past: "%s trÆ°á»›c",
      s: "vÃ i giÃ¢y",
      m: "má»™t phÃºt",
      mm: "%d phÃºt",
      h: "má»™t giá»",
      hh: "%d giá»",
      d: "má»™t ngÃ y",
      dd: "%d ngÃ y",
      M: "má»™t thÃ¡ng",
      MM: "%d thÃ¡ng",
      y: "má»™t nÄƒm",
      yy: "%d nÄƒm"
    },
    ordinalParse: /\d{1,2}/,
    ordinal: function ordinal(a) {
      return a;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("x-pseudo", {
    months: "J~Ã¡Ã±ÃºÃ¡~rÃ½_F~Ã©brÃº~Ã¡rÃ½_~MÃ¡rc~h_Ãp~rÃ­l_~MÃ¡Ã½_~JÃºÃ±Ã©~_JÃºl~Ã½_ÃÃº~gÃºst~_SÃ©p~tÃ©mb~Ã©r_Ã“~ctÃ³b~Ã©r_Ã‘~Ã³vÃ©m~bÃ©r_~DÃ©cÃ©~mbÃ©r".split("_"),
    monthsShort: "J~Ã¡Ã±_~FÃ©b_~MÃ¡r_~Ãpr_~MÃ¡Ã½_~JÃºÃ±_~JÃºl_~ÃÃºg_~SÃ©p_~Ã“ct_~Ã‘Ã³v_~DÃ©c".split("_"),
    monthsParseExact: !0,
    weekdays: "S~ÃºÃ±dÃ¡~Ã½_MÃ³~Ã±dÃ¡Ã½~_TÃºÃ©~sdÃ¡Ã½~_WÃ©d~Ã±Ã©sd~Ã¡Ã½_T~hÃºrs~dÃ¡Ã½_~FrÃ­d~Ã¡Ã½_S~Ã¡tÃºr~dÃ¡Ã½".split("_"),
    weekdaysShort: "S~ÃºÃ±_~MÃ³Ã±_~TÃºÃ©_~WÃ©d_~ThÃº_~FrÃ­_~SÃ¡t".split("_"),
    weekdaysMin: "S~Ãº_MÃ³~_TÃº_~WÃ©_T~h_Fr~_SÃ¡".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[T~Ã³dÃ¡~Ã½ Ã¡t] LT",
      nextDay: "[T~Ã³mÃ³~rrÃ³~w Ã¡t] LT",
      nextWeek: "dddd [Ã¡t] LT",
      lastDay: "[Ã~Ã©st~Ã©rdÃ¡~Ã½ Ã¡t] LT",
      lastWeek: "[L~Ã¡st] dddd [Ã¡t] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "Ã­~Ã± %s",
      past: "%s Ã¡~gÃ³",
      s: "Ã¡ ~fÃ©w ~sÃ©cÃ³~Ã±ds",
      m: "Ã¡ ~mÃ­Ã±~ÃºtÃ©",
      mm: "%d m~Ã­Ã±Ãº~tÃ©s",
      h: "Ã¡~Ã± hÃ³~Ãºr",
      hh: "%d h~Ã³Ãºrs",
      d: "Ã¡ ~dÃ¡Ã½",
      dd: "%d d~Ã¡Ã½s",
      M: "Ã¡ ~mÃ³Ã±~th",
      MM: "%d m~Ã³Ã±t~hs",
      y: "Ã¡ ~Ã½Ã©Ã¡r",
      yy: "%d Ã½~Ã©Ã¡rs"
    },
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("zh-cn", {
    months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
    monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
    weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
    weekdaysShort: "å‘¨æ—¥_å‘¨ä¸€_å‘¨äºŒ_å‘¨ä¸‰_å‘¨å››_å‘¨äº”_å‘¨å…­".split("_"),
    weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
    longDateFormat: {
      LT: "Ahç‚¹mmåˆ†",
      LTS: "Ahç‚¹måˆ†sç§’",
      L: "YYYY-MM-DD",
      LL: "YYYYå¹´MMMDæ—¥",
      LLL: "YYYYå¹´MMMDæ—¥Ahç‚¹mmåˆ†",
      LLLL: "YYYYå¹´MMMDæ—¥ddddAhç‚¹mmåˆ†",
      l: "YYYY-MM-DD",
      ll: "YYYYå¹´MMMDæ—¥",
      lll: "YYYYå¹´MMMDæ—¥Ahç‚¹mmåˆ†",
      llll: "YYYYå¹´MMMDæ—¥ddddAhç‚¹mmåˆ†"
    },
    meridiemParse: /å‡Œæ™¨|æ—©ä¸Š|ä¸Šåˆ|ä¸­åˆ|ä¸‹åˆ|æ™šä¸Š/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "å‡Œæ™¨" === b || "æ—©ä¸Š" === b || "ä¸Šåˆ" === b ? a : "ä¸‹åˆ" === b || "æ™šä¸Š" === b ? a + 12 : a >= 11 ? a : a + 12;
    },
    meridiem: function meridiem(a, b, c) {
      var d = 100 * a + b;
      return 600 > d ? "å‡Œæ™¨" : 900 > d ? "æ—©ä¸Š" : 1130 > d ? "ä¸Šåˆ" : 1230 > d ? "ä¸­åˆ" : 1800 > d ? "ä¸‹åˆ" : "æ™šä¸Š";
    },
    calendar: {
      sameDay: function sameDay() {
        return 0 === this.minutes() ? "[ä»Šå¤©]Ah[ç‚¹æ•´]" : "[ä»Šå¤©]LT";
      },
      nextDay: function nextDay() {
        return 0 === this.minutes() ? "[æ˜Žå¤©]Ah[ç‚¹æ•´]" : "[æ˜Žå¤©]LT";
      },
      lastDay: function lastDay() {
        return 0 === this.minutes() ? "[æ˜¨å¤©]Ah[ç‚¹æ•´]" : "[æ˜¨å¤©]LT";
      },
      nextWeek: function nextWeek() {
        var a, b;
        return a = kg().startOf("week"), b = this.diff(a, "days") >= 7 ? "[ä¸‹]" : "[æœ¬]", 0 === this.minutes() ? b + "dddAhç‚¹æ•´" : b + "dddAhç‚¹mm";
      },
      lastWeek: function lastWeek() {
        var a, b;
        return a = kg().startOf("week"), b = this.unix() < a.unix() ? "[ä¸Š]" : "[æœ¬]", 0 === this.minutes() ? b + "dddAhç‚¹æ•´" : b + "dddAhç‚¹mm";
      },
      sameElse: "LL"
    },
    ordinalParse: /\d{1,2}(æ—¥|æœˆ|å‘¨)/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "d":
        case "D":
        case "DDD":
          return a + "æ—¥";

        case "M":
          return a + "æœˆ";

        case "w":
        case "W":
          return a + "å‘¨";

        default:
          return a;
      }
    },
    relativeTime: {
      future: "%så†…",
      past: "%så‰",
      s: "å‡ ç§’",
      m: "1 åˆ†é’Ÿ",
      mm: "%d åˆ†é’Ÿ",
      h: "1 å°æ—¶",
      hh: "%d å°æ—¶",
      d: "1 å¤©",
      dd: "%d å¤©",
      M: "1 ä¸ªæœˆ",
      MM: "%d ä¸ªæœˆ",
      y: "1 å¹´",
      yy: "%d å¹´"
    },
    week: {
      // GB/T 7408-1994ã€Šæ•°æ®å…ƒå’Œäº¤æ¢æ ¼å¼Â·ä¿¡æ¯äº¤æ¢Â·æ—¥æœŸå’Œæ—¶é—´è¡¨ç¤ºæ³•ã€‹ä¸ŽISO 8601:1988ç­‰æ•ˆ
      dow: 1,
      // Monday is the first day of the week.
      doy: 4
    }
  }), kg.defineLocale("zh-tw", {
    months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
    monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
    weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
    weekdaysShort: "é€±æ—¥_é€±ä¸€_é€±äºŒ_é€±ä¸‰_é€±å››_é€±äº”_é€±å…­".split("_"),
    weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
    longDateFormat: {
      LT: "Ahé»žmmåˆ†",
      LTS: "Ahé»žmåˆ†sç§’",
      L: "YYYYå¹´MMMDæ—¥",
      LL: "YYYYå¹´MMMDæ—¥",
      LLL: "YYYYå¹´MMMDæ—¥Ahé»žmmåˆ†",
      LLLL: "YYYYå¹´MMMDæ—¥ddddAhé»žmmåˆ†",
      l: "YYYYå¹´MMMDæ—¥",
      ll: "YYYYå¹´MMMDæ—¥",
      lll: "YYYYå¹´MMMDæ—¥Ahé»žmmåˆ†",
      llll: "YYYYå¹´MMMDæ—¥ddddAhé»žmmåˆ†"
    },
    meridiemParse: /å‡Œæ™¨|æ—©ä¸Š|ä¸Šåˆ|ä¸­åˆ|ä¸‹åˆ|æ™šä¸Š/,
    meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "å‡Œæ™¨" === b || "æ—©ä¸Š" === b || "ä¸Šåˆ" === b ? a : "ä¸­åˆ" === b ? a >= 11 ? a : a + 12 : "ä¸‹åˆ" === b || "æ™šä¸Š" === b ? a + 12 : void 0;
    },
    meridiem: function meridiem(a, b, c) {
      var d = 100 * a + b;
      return 600 > d ? "å‡Œæ™¨" : 900 > d ? "æ—©ä¸Š" : 1130 > d ? "ä¸Šåˆ" : 1230 > d ? "ä¸­åˆ" : 1800 > d ? "ä¸‹åˆ" : "æ™šä¸Š";
    },
    calendar: {
      sameDay: "[ä»Šå¤©]LT",
      nextDay: "[æ˜Žå¤©]LT",
      nextWeek: "[ä¸‹]ddddLT",
      lastDay: "[æ˜¨å¤©]LT",
      lastWeek: "[ä¸Š]ddddLT",
      sameElse: "L"
    },
    ordinalParse: /\d{1,2}(æ—¥|æœˆ|é€±)/,
    ordinal: function ordinal(a, b) {
      switch (b) {
        case "d":
        case "D":
        case "DDD":
          return a + "æ—¥";

        case "M":
          return a + "æœˆ";

        case "w":
        case "W":
          return a + "é€±";

        default:
          return a;
      }
    },
    relativeTime: {
      future: "%så…§",
      past: "%så‰",
      s: "å¹¾ç§’",
      m: "1 åˆ†é˜",
      mm: "%d åˆ†é˜",
      h: "1 å°æ™‚",
      hh: "%d å°æ™‚",
      d: "1 å¤©",
      dd: "%d å¤©",
      M: "1 å€‹æœˆ",
      MM: "%d å€‹æœˆ",
      y: "1 å¹´",
      yy: "%d å¹´"
    }
  }), kg);

  return sh.locale("en"), sh;
});
/*
Copyright 2014 Igor Vaynberg

Version: 3.5.4 Timestamp: Sun Aug 30 13:30:32 EDT 2015

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.
*/

!function (a) {
  "undefined" == typeof a.fn.each2 && a.extend(a.fn, {
    each2: function each2(b) {
      for (var c = a([0]), d = -1, e = this.length; ++d < e && (c.context = c[0] = this[d]) && b.call(c[0], d, c) !== !1;) {
        ;
      }

      return this;
    }
  });
}(jQuery), function (a, b) {
  "use strict";

  function n(b) {
    var c = a(document.createTextNode(""));
    b.before(c), c.before(b), c.remove();
  }

  function o(a) {
    function b(a) {
      return m[a] || a;
    }

    return a.replace(/[^\u0000-\u007E]/g, b);
  }

  function p(a, b) {
    for (var c = 0, d = b.length; d > c; c += 1) {
      if (r(a, b[c])) return c;
    }

    return -1;
  }

  function q() {
    var b = a(l);
    b.appendTo(document.body);
    var c = {
      width: b.width() - b[0].clientWidth,
      height: b.height() - b[0].clientHeight
    };
    return b.remove(), c;
  }

  function r(a, c) {
    return a === c ? !0 : a === b || c === b ? !1 : null === a || null === c ? !1 : a.constructor === String ? a + "" == c + "" : c.constructor === String ? c + "" == a + "" : !1;
  }

  function s(a, b, c) {
    var d, e, f;
    if (null === a || a.length < 1) return [];

    for (d = a.split(b), e = 0, f = d.length; f > e; e += 1) {
      d[e] = c(d[e]);
    }

    return d;
  }

  function t(a) {
    return a.outerWidth(!1) - a.width();
  }

  function u(c) {
    var d = "keyup-change-value";
    c.on("keydown", function () {
      a.data(c, d) === b && a.data(c, d, c.val());
    }), c.on("keyup", function () {
      var e = a.data(c, d);
      e !== b && c.val() !== e && (a.removeData(c, d), c.trigger("keyup-change"));
    });
  }

  function v(c) {
    c.on("mousemove", function (c) {
      var d = h;
      (d === b || d.x !== c.pageX || d.y !== c.pageY) && a(c.target).trigger("mousemove-filtered", c);
    });
  }

  function w(a, c, d) {
    d = d || b;
    var e;
    return function () {
      var b = arguments;
      window.clearTimeout(e), e = window.setTimeout(function () {
        c.apply(d, b);
      }, a);
    };
  }

  function x(a, b) {
    var c = w(a, function (a) {
      b.trigger("scroll-debounced", a);
    });
    b.on("scroll", function (a) {
      p(a.target, b.get()) >= 0 && c(a);
    });
  }

  function y(a) {
    a[0] !== document.activeElement && window.setTimeout(function () {
      var d,
          b = a[0],
          c = a.val().length;
      a.focus();
      var e = b.offsetWidth > 0 || b.offsetHeight > 0;
      e && b === document.activeElement && (b.setSelectionRange ? b.setSelectionRange(c, c) : b.createTextRange && (d = b.createTextRange(), d.collapse(!1), d.select()));
    }, 0);
  }

  function z(b) {
    b = a(b)[0];
    var c = 0,
        d = 0;
    if ("selectionStart" in b) c = b.selectionStart, d = b.selectionEnd - c;else if ("selection" in document) {
      b.focus();
      var e = document.selection.createRange();
      d = document.selection.createRange().text.length, e.moveStart("character", -b.value.length), c = e.text.length - d;
    }
    return {
      offset: c,
      length: d
    };
  }

  function A(a) {
    a.preventDefault(), a.stopPropagation();
  }

  function B(a) {
    a.preventDefault(), a.stopImmediatePropagation();
  }

  function C(b) {
    if (!g) {
      var c = b[0].currentStyle || window.getComputedStyle(b[0], null);
      g = a(document.createElement("div")).css({
        position: "absolute",
        left: "-10000px",
        top: "-10000px",
        display: "none",
        fontSize: c.fontSize,
        fontFamily: c.fontFamily,
        fontStyle: c.fontStyle,
        fontWeight: c.fontWeight,
        letterSpacing: c.letterSpacing,
        textTransform: c.textTransform,
        whiteSpace: "nowrap"
      }), g.attr("class", "select2-sizer"), a(document.body).append(g);
    }

    return g.text(b.val()), g.width();
  }

  function D(b, c, d) {
    var e,
        g,
        f = [];
    e = a.trim(b.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each2(function () {
      0 === this.indexOf("select2-") && f.push(this);
    })), e = a.trim(c.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each2(function () {
      0 !== this.indexOf("select2-") && (g = d(this), g && f.push(g));
    })), b.attr("class", f.join(" "));
  }

  function E(a, b, c, d) {
    var e = o(a.toUpperCase()).indexOf(o(b.toUpperCase())),
        f = b.length;
    return 0 > e ? void c.push(d(a)) : (c.push(d(a.substring(0, e))), c.push("<span class='select2-match'>"), c.push(d(a.substring(e, e + f))), c.push("</span>"), void c.push(d(a.substring(e + f, a.length))));
  }

  function F(a) {
    var b = {
      "\\": "&#92;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#47;"
    };
    return String(a).replace(/[&<>"'\/\\]/g, function (a) {
      return b[a];
    });
  }

  function G(c) {
    var d,
        e = null,
        f = c.quietMillis || 100,
        g = c.url,
        h = this;
    return function (i) {
      window.clearTimeout(d), d = window.setTimeout(function () {
        var d = c.data,
            f = g,
            j = c.transport || a.fn.select2.ajaxDefaults.transport,
            k = {
          type: c.type || "GET",
          cache: c.cache || !1,
          jsonpCallback: c.jsonpCallback || b,
          dataType: c.dataType || "json"
        },
            l = a.extend({}, a.fn.select2.ajaxDefaults.params, k);
        d = d ? d.call(h, i.term, i.page, i.context) : null, f = "function" == typeof f ? f.call(h, i.term, i.page, i.context) : f, e && "function" == typeof e.abort && e.abort(), c.params && (a.isFunction(c.params) ? a.extend(l, c.params.call(h)) : a.extend(l, c.params)), a.extend(l, {
          url: f,
          dataType: c.dataType,
          data: d,
          success: function success(a) {
            var b = c.results(a, i.page, i);
            i.callback(b);
          },
          error: function error(a, b, c) {
            var d = {
              hasError: !0,
              jqXHR: a,
              textStatus: b,
              errorThrown: c
            };
            i.callback(d);
          }
        }), e = j.call(h, l);
      }, f);
    };
  }

  function H(b) {
    var d,
        e,
        c = b,
        f = function f(a) {
      return "" + a.text;
    };

    a.isArray(c) && (e = c, c = {
      results: e
    }), a.isFunction(c) === !1 && (e = c, c = function c() {
      return e;
    });
    var g = c();
    return g.text && (f = g.text, a.isFunction(f) || (d = g.text, f = function f(a) {
      return a[d];
    })), function (b) {
      var _g2,
          d = b.term,
          e = {
        results: []
      };

      return "" === d ? void b.callback(c()) : (_g2 = function g(c, e) {
        var h, i;

        if (c = c[0], c.children) {
          h = {};

          for (i in c) {
            c.hasOwnProperty(i) && (h[i] = c[i]);
          }

          h.children = [], a(c.children).each2(function (a, b) {
            _g2(b, h.children);
          }), (h.children.length || b.matcher(d, f(h), c)) && e.push(h);
        } else b.matcher(d, f(c), c) && e.push(c);
      }, a(c().results).each2(function (a, b) {
        _g2(b, e.results);
      }), void b.callback(e));
    };
  }

  function I(c) {
    var d = a.isFunction(c);
    return function (e) {
      var f = e.term,
          g = {
        results: []
      },
          h = d ? c(e) : c;
      a.isArray(h) && (a(h).each(function () {
        var a = this.text !== b,
            c = a ? this.text : this;
        ("" === f || e.matcher(f, c)) && g.results.push(a ? this : {
          id: this,
          text: this
        });
      }), e.callback(g));
    };
  }

  function J(b, c) {
    if (a.isFunction(b)) return !0;
    if (!b) return !1;
    if ("string" == typeof b) return !0;
    throw new Error(c + " must be a string, function, or falsy value");
  }

  function K(b, c) {
    if (a.isFunction(b)) {
      var d = Array.prototype.slice.call(arguments, 2);
      return b.apply(c, d);
    }

    return b;
  }

  function L(b) {
    var c = 0;
    return a.each(b, function (a, b) {
      b.children ? c += L(b.children) : c++;
    }), c;
  }

  function M(a, c, d, e) {
    var h,
        i,
        j,
        k,
        l,
        f = a,
        g = !1;
    if (!e.createSearchChoice || !e.tokenSeparators || e.tokenSeparators.length < 1) return b;

    for (;;) {
      for (i = -1, j = 0, k = e.tokenSeparators.length; k > j && (l = e.tokenSeparators[j], i = a.indexOf(l), !(i >= 0)); j++) {
        ;
      }

      if (0 > i) break;

      if (h = a.substring(0, i), a = a.substring(i + l.length), h.length > 0 && (h = e.createSearchChoice.call(this, h, c), h !== b && null !== h && e.id(h) !== b && null !== e.id(h))) {
        for (g = !1, j = 0, k = c.length; k > j; j++) {
          if (r(e.id(h), e.id(c[j]))) {
            g = !0;
            break;
          }
        }

        g || d(h);
      }
    }

    return f !== a ? a : void 0;
  }

  function N() {
    var b = this;
    a.each(arguments, function (a, c) {
      b[c].remove(), b[c] = null;
    });
  }

  function O(b, c) {
    var d = function d() {};

    return d.prototype = new b(), d.prototype.constructor = d, d.prototype.parent = b.prototype, d.prototype = a.extend(d.prototype, c), d;
  }

  if (window.Select2 === b) {
    var c,
        d,
        e,
        f,
        g,
        i,
        j,
        h = {
      x: 0,
      y: 0
    },
        k = {
      TAB: 9,
      ENTER: 13,
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      HOME: 36,
      END: 35,
      BACKSPACE: 8,
      DELETE: 46,
      isArrow: function isArrow(a) {
        switch (a = a.which ? a.which : a) {
          case k.LEFT:
          case k.RIGHT:
          case k.UP:
          case k.DOWN:
            return !0;
        }

        return !1;
      },
      isControl: function isControl(a) {
        var b = a.which;

        switch (b) {
          case k.SHIFT:
          case k.CTRL:
          case k.ALT:
            return !0;
        }

        return a.metaKey ? !0 : !1;
      },
      isFunctionKey: function isFunctionKey(a) {
        return a = a.which ? a.which : a, a >= 112 && 123 >= a;
      }
    },
        l = "<div class='select2-measure-scrollbar'></div>",
        m = {
      "\u24B6": "A",
      "\uFF21": "A",
      "\xc0": "A",
      "\xc1": "A",
      "\xc2": "A",
      "\u1EA6": "A",
      "\u1EA4": "A",
      "\u1EAA": "A",
      "\u1EA8": "A",
      "\xc3": "A",
      "\u0100": "A",
      "\u0102": "A",
      "\u1EB0": "A",
      "\u1EAE": "A",
      "\u1EB4": "A",
      "\u1EB2": "A",
      "\u0226": "A",
      "\u01E0": "A",
      "\xc4": "A",
      "\u01DE": "A",
      "\u1EA2": "A",
      "\xc5": "A",
      "\u01FA": "A",
      "\u01CD": "A",
      "\u0200": "A",
      "\u0202": "A",
      "\u1EA0": "A",
      "\u1EAC": "A",
      "\u1EB6": "A",
      "\u1E00": "A",
      "\u0104": "A",
      "\u023A": "A",
      "\u2C6F": "A",
      "\uA732": "AA",
      "\xc6": "AE",
      "\u01FC": "AE",
      "\u01E2": "AE",
      "\uA734": "AO",
      "\uA736": "AU",
      "\uA738": "AV",
      "\uA73A": "AV",
      "\uA73C": "AY",
      "\u24B7": "B",
      "\uFF22": "B",
      "\u1E02": "B",
      "\u1E04": "B",
      "\u1E06": "B",
      "\u0243": "B",
      "\u0182": "B",
      "\u0181": "B",
      "\u24B8": "C",
      "\uFF23": "C",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\xc7": "C",
      "\u1E08": "C",
      "\u0187": "C",
      "\u023B": "C",
      "\uA73E": "C",
      "\u24B9": "D",
      "\uFF24": "D",
      "\u1E0A": "D",
      "\u010E": "D",
      "\u1E0C": "D",
      "\u1E10": "D",
      "\u1E12": "D",
      "\u1E0E": "D",
      "\u0110": "D",
      "\u018B": "D",
      "\u018A": "D",
      "\u0189": "D",
      "\uA779": "D",
      "\u01F1": "DZ",
      "\u01C4": "DZ",
      "\u01F2": "Dz",
      "\u01C5": "Dz",
      "\u24BA": "E",
      "\uFF25": "E",
      "\xc8": "E",
      "\xc9": "E",
      "\xca": "E",
      "\u1EC0": "E",
      "\u1EBE": "E",
      "\u1EC4": "E",
      "\u1EC2": "E",
      "\u1EBC": "E",
      "\u0112": "E",
      "\u1E14": "E",
      "\u1E16": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\xcb": "E",
      "\u1EBA": "E",
      "\u011A": "E",
      "\u0204": "E",
      "\u0206": "E",
      "\u1EB8": "E",
      "\u1EC6": "E",
      "\u0228": "E",
      "\u1E1C": "E",
      "\u0118": "E",
      "\u1E18": "E",
      "\u1E1A": "E",
      "\u0190": "E",
      "\u018E": "E",
      "\u24BB": "F",
      "\uFF26": "F",
      "\u1E1E": "F",
      "\u0191": "F",
      "\uA77B": "F",
      "\u24BC": "G",
      "\uFF27": "G",
      "\u01F4": "G",
      "\u011C": "G",
      "\u1E20": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u01E6": "G",
      "\u0122": "G",
      "\u01E4": "G",
      "\u0193": "G",
      "\uA7A0": "G",
      "\uA77D": "G",
      "\uA77E": "G",
      "\u24BD": "H",
      "\uFF28": "H",
      "\u0124": "H",
      "\u1E22": "H",
      "\u1E26": "H",
      "\u021E": "H",
      "\u1E24": "H",
      "\u1E28": "H",
      "\u1E2A": "H",
      "\u0126": "H",
      "\u2C67": "H",
      "\u2C75": "H",
      "\uA78D": "H",
      "\u24BE": "I",
      "\uFF29": "I",
      "\xcc": "I",
      "\xcd": "I",
      "\xce": "I",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u0130": "I",
      "\xcf": "I",
      "\u1E2E": "I",
      "\u1EC8": "I",
      "\u01CF": "I",
      "\u0208": "I",
      "\u020A": "I",
      "\u1ECA": "I",
      "\u012E": "I",
      "\u1E2C": "I",
      "\u0197": "I",
      "\u24BF": "J",
      "\uFF2A": "J",
      "\u0134": "J",
      "\u0248": "J",
      "\u24C0": "K",
      "\uFF2B": "K",
      "\u1E30": "K",
      "\u01E8": "K",
      "\u1E32": "K",
      "\u0136": "K",
      "\u1E34": "K",
      "\u0198": "K",
      "\u2C69": "K",
      "\uA740": "K",
      "\uA742": "K",
      "\uA744": "K",
      "\uA7A2": "K",
      "\u24C1": "L",
      "\uFF2C": "L",
      "\u013F": "L",
      "\u0139": "L",
      "\u013D": "L",
      "\u1E36": "L",
      "\u1E38": "L",
      "\u013B": "L",
      "\u1E3C": "L",
      "\u1E3A": "L",
      "\u0141": "L",
      "\u023D": "L",
      "\u2C62": "L",
      "\u2C60": "L",
      "\uA748": "L",
      "\uA746": "L",
      "\uA780": "L",
      "\u01C7": "LJ",
      "\u01C8": "Lj",
      "\u24C2": "M",
      "\uFF2D": "M",
      "\u1E3E": "M",
      "\u1E40": "M",
      "\u1E42": "M",
      "\u2C6E": "M",
      "\u019C": "M",
      "\u24C3": "N",
      "\uFF2E": "N",
      "\u01F8": "N",
      "\u0143": "N",
      "\xd1": "N",
      "\u1E44": "N",
      "\u0147": "N",
      "\u1E46": "N",
      "\u0145": "N",
      "\u1E4A": "N",
      "\u1E48": "N",
      "\u0220": "N",
      "\u019D": "N",
      "\uA790": "N",
      "\uA7A4": "N",
      "\u01CA": "NJ",
      "\u01CB": "Nj",
      "\u24C4": "O",
      "\uFF2F": "O",
      "\xd2": "O",
      "\xd3": "O",
      "\xd4": "O",
      "\u1ED2": "O",
      "\u1ED0": "O",
      "\u1ED6": "O",
      "\u1ED4": "O",
      "\xd5": "O",
      "\u1E4C": "O",
      "\u022C": "O",
      "\u1E4E": "O",
      "\u014C": "O",
      "\u1E50": "O",
      "\u1E52": "O",
      "\u014E": "O",
      "\u022E": "O",
      "\u0230": "O",
      "\xd6": "O",
      "\u022A": "O",
      "\u1ECE": "O",
      "\u0150": "O",
      "\u01D1": "O",
      "\u020C": "O",
      "\u020E": "O",
      "\u01A0": "O",
      "\u1EDC": "O",
      "\u1EDA": "O",
      "\u1EE0": "O",
      "\u1EDE": "O",
      "\u1EE2": "O",
      "\u1ECC": "O",
      "\u1ED8": "O",
      "\u01EA": "O",
      "\u01EC": "O",
      "\xd8": "O",
      "\u01FE": "O",
      "\u0186": "O",
      "\u019F": "O",
      "\uA74A": "O",
      "\uA74C": "O",
      "\u01A2": "OI",
      "\uA74E": "OO",
      "\u0222": "OU",
      "\u24C5": "P",
      "\uFF30": "P",
      "\u1E54": "P",
      "\u1E56": "P",
      "\u01A4": "P",
      "\u2C63": "P",
      "\uA750": "P",
      "\uA752": "P",
      "\uA754": "P",
      "\u24C6": "Q",
      "\uFF31": "Q",
      "\uA756": "Q",
      "\uA758": "Q",
      "\u024A": "Q",
      "\u24C7": "R",
      "\uFF32": "R",
      "\u0154": "R",
      "\u1E58": "R",
      "\u0158": "R",
      "\u0210": "R",
      "\u0212": "R",
      "\u1E5A": "R",
      "\u1E5C": "R",
      "\u0156": "R",
      "\u1E5E": "R",
      "\u024C": "R",
      "\u2C64": "R",
      "\uA75A": "R",
      "\uA7A6": "R",
      "\uA782": "R",
      "\u24C8": "S",
      "\uFF33": "S",
      "\u1E9E": "S",
      "\u015A": "S",
      "\u1E64": "S",
      "\u015C": "S",
      "\u1E60": "S",
      "\u0160": "S",
      "\u1E66": "S",
      "\u1E62": "S",
      "\u1E68": "S",
      "\u0218": "S",
      "\u015E": "S",
      "\u2C7E": "S",
      "\uA7A8": "S",
      "\uA784": "S",
      "\u24C9": "T",
      "\uFF34": "T",
      "\u1E6A": "T",
      "\u0164": "T",
      "\u1E6C": "T",
      "\u021A": "T",
      "\u0162": "T",
      "\u1E70": "T",
      "\u1E6E": "T",
      "\u0166": "T",
      "\u01AC": "T",
      "\u01AE": "T",
      "\u023E": "T",
      "\uA786": "T",
      "\uA728": "TZ",
      "\u24CA": "U",
      "\uFF35": "U",
      "\xd9": "U",
      "\xda": "U",
      "\xdb": "U",
      "\u0168": "U",
      "\u1E78": "U",
      "\u016A": "U",
      "\u1E7A": "U",
      "\u016C": "U",
      "\xdc": "U",
      "\u01DB": "U",
      "\u01D7": "U",
      "\u01D5": "U",
      "\u01D9": "U",
      "\u1EE6": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u01D3": "U",
      "\u0214": "U",
      "\u0216": "U",
      "\u01AF": "U",
      "\u1EEA": "U",
      "\u1EE8": "U",
      "\u1EEE": "U",
      "\u1EEC": "U",
      "\u1EF0": "U",
      "\u1EE4": "U",
      "\u1E72": "U",
      "\u0172": "U",
      "\u1E76": "U",
      "\u1E74": "U",
      "\u0244": "U",
      "\u24CB": "V",
      "\uFF36": "V",
      "\u1E7C": "V",
      "\u1E7E": "V",
      "\u01B2": "V",
      "\uA75E": "V",
      "\u0245": "V",
      "\uA760": "VY",
      "\u24CC": "W",
      "\uFF37": "W",
      "\u1E80": "W",
      "\u1E82": "W",
      "\u0174": "W",
      "\u1E86": "W",
      "\u1E84": "W",
      "\u1E88": "W",
      "\u2C72": "W",
      "\u24CD": "X",
      "\uFF38": "X",
      "\u1E8A": "X",
      "\u1E8C": "X",
      "\u24CE": "Y",
      "\uFF39": "Y",
      "\u1EF2": "Y",
      "\xdd": "Y",
      "\u0176": "Y",
      "\u1EF8": "Y",
      "\u0232": "Y",
      "\u1E8E": "Y",
      "\u0178": "Y",
      "\u1EF6": "Y",
      "\u1EF4": "Y",
      "\u01B3": "Y",
      "\u024E": "Y",
      "\u1EFE": "Y",
      "\u24CF": "Z",
      "\uFF3A": "Z",
      "\u0179": "Z",
      "\u1E90": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u1E92": "Z",
      "\u1E94": "Z",
      "\u01B5": "Z",
      "\u0224": "Z",
      "\u2C7F": "Z",
      "\u2C6B": "Z",
      "\uA762": "Z",
      "\u24D0": "a",
      "\uFF41": "a",
      "\u1E9A": "a",
      "\xe0": "a",
      "\xe1": "a",
      "\xe2": "a",
      "\u1EA7": "a",
      "\u1EA5": "a",
      "\u1EAB": "a",
      "\u1EA9": "a",
      "\xe3": "a",
      "\u0101": "a",
      "\u0103": "a",
      "\u1EB1": "a",
      "\u1EAF": "a",
      "\u1EB5": "a",
      "\u1EB3": "a",
      "\u0227": "a",
      "\u01E1": "a",
      "\xe4": "a",
      "\u01DF": "a",
      "\u1EA3": "a",
      "\xe5": "a",
      "\u01FB": "a",
      "\u01CE": "a",
      "\u0201": "a",
      "\u0203": "a",
      "\u1EA1": "a",
      "\u1EAD": "a",
      "\u1EB7": "a",
      "\u1E01": "a",
      "\u0105": "a",
      "\u2C65": "a",
      "\u0250": "a",
      "\uA733": "aa",
      "\xe6": "ae",
      "\u01FD": "ae",
      "\u01E3": "ae",
      "\uA735": "ao",
      "\uA737": "au",
      "\uA739": "av",
      "\uA73B": "av",
      "\uA73D": "ay",
      "\u24D1": "b",
      "\uFF42": "b",
      "\u1E03": "b",
      "\u1E05": "b",
      "\u1E07": "b",
      "\u0180": "b",
      "\u0183": "b",
      "\u0253": "b",
      "\u24D2": "c",
      "\uFF43": "c",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\xe7": "c",
      "\u1E09": "c",
      "\u0188": "c",
      "\u023C": "c",
      "\uA73F": "c",
      "\u2184": "c",
      "\u24D3": "d",
      "\uFF44": "d",
      "\u1E0B": "d",
      "\u010F": "d",
      "\u1E0D": "d",
      "\u1E11": "d",
      "\u1E13": "d",
      "\u1E0F": "d",
      "\u0111": "d",
      "\u018C": "d",
      "\u0256": "d",
      "\u0257": "d",
      "\uA77A": "d",
      "\u01F3": "dz",
      "\u01C6": "dz",
      "\u24D4": "e",
      "\uFF45": "e",
      "\xe8": "e",
      "\xe9": "e",
      "\xea": "e",
      "\u1EC1": "e",
      "\u1EBF": "e",
      "\u1EC5": "e",
      "\u1EC3": "e",
      "\u1EBD": "e",
      "\u0113": "e",
      "\u1E15": "e",
      "\u1E17": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\xeb": "e",
      "\u1EBB": "e",
      "\u011B": "e",
      "\u0205": "e",
      "\u0207": "e",
      "\u1EB9": "e",
      "\u1EC7": "e",
      "\u0229": "e",
      "\u1E1D": "e",
      "\u0119": "e",
      "\u1E19": "e",
      "\u1E1B": "e",
      "\u0247": "e",
      "\u025B": "e",
      "\u01DD": "e",
      "\u24D5": "f",
      "\uFF46": "f",
      "\u1E1F": "f",
      "\u0192": "f",
      "\uA77C": "f",
      "\u24D6": "g",
      "\uFF47": "g",
      "\u01F5": "g",
      "\u011D": "g",
      "\u1E21": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u01E7": "g",
      "\u0123": "g",
      "\u01E5": "g",
      "\u0260": "g",
      "\uA7A1": "g",
      "\u1D79": "g",
      "\uA77F": "g",
      "\u24D7": "h",
      "\uFF48": "h",
      "\u0125": "h",
      "\u1E23": "h",
      "\u1E27": "h",
      "\u021F": "h",
      "\u1E25": "h",
      "\u1E29": "h",
      "\u1E2B": "h",
      "\u1E96": "h",
      "\u0127": "h",
      "\u2C68": "h",
      "\u2C76": "h",
      "\u0265": "h",
      "\u0195": "hv",
      "\u24D8": "i",
      "\uFF49": "i",
      "\xec": "i",
      "\xed": "i",
      "\xee": "i",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\xef": "i",
      "\u1E2F": "i",
      "\u1EC9": "i",
      "\u01D0": "i",
      "\u0209": "i",
      "\u020B": "i",
      "\u1ECB": "i",
      "\u012F": "i",
      "\u1E2D": "i",
      "\u0268": "i",
      "\u0131": "i",
      "\u24D9": "j",
      "\uFF4A": "j",
      "\u0135": "j",
      "\u01F0": "j",
      "\u0249": "j",
      "\u24DA": "k",
      "\uFF4B": "k",
      "\u1E31": "k",
      "\u01E9": "k",
      "\u1E33": "k",
      "\u0137": "k",
      "\u1E35": "k",
      "\u0199": "k",
      "\u2C6A": "k",
      "\uA741": "k",
      "\uA743": "k",
      "\uA745": "k",
      "\uA7A3": "k",
      "\u24DB": "l",
      "\uFF4C": "l",
      "\u0140": "l",
      "\u013A": "l",
      "\u013E": "l",
      "\u1E37": "l",
      "\u1E39": "l",
      "\u013C": "l",
      "\u1E3D": "l",
      "\u1E3B": "l",
      "\u017F": "l",
      "\u0142": "l",
      "\u019A": "l",
      "\u026B": "l",
      "\u2C61": "l",
      "\uA749": "l",
      "\uA781": "l",
      "\uA747": "l",
      "\u01C9": "lj",
      "\u24DC": "m",
      "\uFF4D": "m",
      "\u1E3F": "m",
      "\u1E41": "m",
      "\u1E43": "m",
      "\u0271": "m",
      "\u026F": "m",
      "\u24DD": "n",
      "\uFF4E": "n",
      "\u01F9": "n",
      "\u0144": "n",
      "\xf1": "n",
      "\u1E45": "n",
      "\u0148": "n",
      "\u1E47": "n",
      "\u0146": "n",
      "\u1E4B": "n",
      "\u1E49": "n",
      "\u019E": "n",
      "\u0272": "n",
      "\u0149": "n",
      "\uA791": "n",
      "\uA7A5": "n",
      "\u01CC": "nj",
      "\u24DE": "o",
      "\uFF4F": "o",
      "\xf2": "o",
      "\xf3": "o",
      "\xf4": "o",
      "\u1ED3": "o",
      "\u1ED1": "o",
      "\u1ED7": "o",
      "\u1ED5": "o",
      "\xf5": "o",
      "\u1E4D": "o",
      "\u022D": "o",
      "\u1E4F": "o",
      "\u014D": "o",
      "\u1E51": "o",
      "\u1E53": "o",
      "\u014F": "o",
      "\u022F": "o",
      "\u0231": "o",
      "\xf6": "o",
      "\u022B": "o",
      "\u1ECF": "o",
      "\u0151": "o",
      "\u01D2": "o",
      "\u020D": "o",
      "\u020F": "o",
      "\u01A1": "o",
      "\u1EDD": "o",
      "\u1EDB": "o",
      "\u1EE1": "o",
      "\u1EDF": "o",
      "\u1EE3": "o",
      "\u1ECD": "o",
      "\u1ED9": "o",
      "\u01EB": "o",
      "\u01ED": "o",
      "\xf8": "o",
      "\u01FF": "o",
      "\u0254": "o",
      "\uA74B": "o",
      "\uA74D": "o",
      "\u0275": "o",
      "\u01A3": "oi",
      "\u0223": "ou",
      "\uA74F": "oo",
      "\u24DF": "p",
      "\uFF50": "p",
      "\u1E55": "p",
      "\u1E57": "p",
      "\u01A5": "p",
      "\u1D7D": "p",
      "\uA751": "p",
      "\uA753": "p",
      "\uA755": "p",
      "\u24E0": "q",
      "\uFF51": "q",
      "\u024B": "q",
      "\uA757": "q",
      "\uA759": "q",
      "\u24E1": "r",
      "\uFF52": "r",
      "\u0155": "r",
      "\u1E59": "r",
      "\u0159": "r",
      "\u0211": "r",
      "\u0213": "r",
      "\u1E5B": "r",
      "\u1E5D": "r",
      "\u0157": "r",
      "\u1E5F": "r",
      "\u024D": "r",
      "\u027D": "r",
      "\uA75B": "r",
      "\uA7A7": "r",
      "\uA783": "r",
      "\u24E2": "s",
      "\uFF53": "s",
      "\xdf": "s",
      "\u015B": "s",
      "\u1E65": "s",
      "\u015D": "s",
      "\u1E61": "s",
      "\u0161": "s",
      "\u1E67": "s",
      "\u1E63": "s",
      "\u1E69": "s",
      "\u0219": "s",
      "\u015F": "s",
      "\u023F": "s",
      "\uA7A9": "s",
      "\uA785": "s",
      "\u1E9B": "s",
      "\u24E3": "t",
      "\uFF54": "t",
      "\u1E6B": "t",
      "\u1E97": "t",
      "\u0165": "t",
      "\u1E6D": "t",
      "\u021B": "t",
      "\u0163": "t",
      "\u1E71": "t",
      "\u1E6F": "t",
      "\u0167": "t",
      "\u01AD": "t",
      "\u0288": "t",
      "\u2C66": "t",
      "\uA787": "t",
      "\uA729": "tz",
      "\u24E4": "u",
      "\uFF55": "u",
      "\xf9": "u",
      "\xfa": "u",
      "\xfb": "u",
      "\u0169": "u",
      "\u1E79": "u",
      "\u016B": "u",
      "\u1E7B": "u",
      "\u016D": "u",
      "\xfc": "u",
      "\u01DC": "u",
      "\u01D8": "u",
      "\u01D6": "u",
      "\u01DA": "u",
      "\u1EE7": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u01D4": "u",
      "\u0215": "u",
      "\u0217": "u",
      "\u01B0": "u",
      "\u1EEB": "u",
      "\u1EE9": "u",
      "\u1EEF": "u",
      "\u1EED": "u",
      "\u1EF1": "u",
      "\u1EE5": "u",
      "\u1E73": "u",
      "\u0173": "u",
      "\u1E77": "u",
      "\u1E75": "u",
      "\u0289": "u",
      "\u24E5": "v",
      "\uFF56": "v",
      "\u1E7D": "v",
      "\u1E7F": "v",
      "\u028B": "v",
      "\uA75F": "v",
      "\u028C": "v",
      "\uA761": "vy",
      "\u24E6": "w",
      "\uFF57": "w",
      "\u1E81": "w",
      "\u1E83": "w",
      "\u0175": "w",
      "\u1E87": "w",
      "\u1E85": "w",
      "\u1E98": "w",
      "\u1E89": "w",
      "\u2C73": "w",
      "\u24E7": "x",
      "\uFF58": "x",
      "\u1E8B": "x",
      "\u1E8D": "x",
      "\u24E8": "y",
      "\uFF59": "y",
      "\u1EF3": "y",
      "\xfd": "y",
      "\u0177": "y",
      "\u1EF9": "y",
      "\u0233": "y",
      "\u1E8F": "y",
      "\xff": "y",
      "\u1EF7": "y",
      "\u1E99": "y",
      "\u1EF5": "y",
      "\u01B4": "y",
      "\u024F": "y",
      "\u1EFF": "y",
      "\u24E9": "z",
      "\uFF5A": "z",
      "\u017A": "z",
      "\u1E91": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u1E93": "z",
      "\u1E95": "z",
      "\u01B6": "z",
      "\u0225": "z",
      "\u0240": "z",
      "\u2C6C": "z",
      "\uA763": "z",
      "\u0386": "\u0391",
      "\u0388": "\u0395",
      "\u0389": "\u0397",
      "\u038A": "\u0399",
      "\u03AA": "\u0399",
      "\u038C": "\u039F",
      "\u038E": "\u03A5",
      "\u03AB": "\u03A5",
      "\u038F": "\u03A9",
      "\u03AC": "\u03B1",
      "\u03AD": "\u03B5",
      "\u03AE": "\u03B7",
      "\u03AF": "\u03B9",
      "\u03CA": "\u03B9",
      "\u0390": "\u03B9",
      "\u03CC": "\u03BF",
      "\u03CD": "\u03C5",
      "\u03CB": "\u03C5",
      "\u03B0": "\u03C5",
      "\u03C9": "\u03C9",
      "\u03C2": "\u03C3"
    };
    i = a(document), f = function () {
      var a = 1;
      return function () {
        return a++;
      };
    }(), c = O(Object, {
      bind: function bind(a) {
        var b = this;
        return function () {
          a.apply(b, arguments);
        };
      },
      init: function init(c) {
        var d,
            e,
            g = ".select2-results";
        this.opts = c = this.prepareOpts(c), this.id = c.id, c.element.data("select2") !== b && null !== c.element.data("select2") && c.element.data("select2").destroy(), this.container = this.createContainer(), this.liveRegion = a(".select2-hidden-accessible"), 0 == this.liveRegion.length && (this.liveRegion = a("<span>", {
          role: "status",
          "aria-live": "polite"
        }).addClass("select2-hidden-accessible").appendTo(document.body)), this.containerId = "s2id_" + (c.element.attr("id") || "autogen" + f()), this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.container.attr("title", c.element.attr("title")), this.body = a(document.body), D(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.attr("style", c.element.attr("style")), this.container.css(K(c.containerCss, this.opts.element)), this.container.addClass(K(c.containerCssClass, this.opts.element)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", A), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), D(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(K(c.dropdownCssClass, this.opts.element)), this.dropdown.data("select2", this), this.dropdown.on("click", A), this.results = d = this.container.find(g), this.search = e = this.container.find("input.select2-input"), this.queryCount = 0, this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", A), v(this.results), this.dropdown.on("mousemove-filtered", g, this.bind(this.highlightUnderEvent)), this.dropdown.on("touchstart touchmove touchend", g, this.bind(function (a) {
          this._touchEvent = !0, this.highlightUnderEvent(a);
        })), this.dropdown.on("touchmove", g, this.bind(this.touchMoved)), this.dropdown.on("touchstart touchend", g, this.bind(this.clearTouchMoved)), this.dropdown.on("click", this.bind(function (a) {
          this._touchEvent && (this._touchEvent = !1, this.selectHighlighted());
        })), x(80, this.results), this.dropdown.on("scroll-debounced", g, this.bind(this.loadMoreIfNeeded)), a(this.container).on("change", ".select2-input", function (a) {
          a.stopPropagation();
        }), a(this.dropdown).on("change", ".select2-input", function (a) {
          a.stopPropagation();
        }), a.fn.mousewheel && d.mousewheel(function (a, b, c, e) {
          var f = d.scrollTop();
          e > 0 && 0 >= f - e ? (d.scrollTop(0), A(a)) : 0 > e && d.get(0).scrollHeight - d.scrollTop() + e <= d.height() && (d.scrollTop(d.get(0).scrollHeight - d.height()), A(a));
        }), u(e), e.on("keyup-change input paste", this.bind(this.updateResults)), e.on("focus", function () {
          e.addClass("select2-focused");
        }), e.on("blur", function () {
          e.removeClass("select2-focused");
        }), this.dropdown.on("mouseup", g, this.bind(function (b) {
          a(b.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(b), this.selectHighlighted(b));
        })), this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function (a) {
          a.stopPropagation();
        }), this.lastSearchTerm = b, a.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== c.maximumInputLength && this.search.attr("maxlength", c.maximumInputLength);
        var h = c.element.prop("disabled");
        h === b && (h = !1), this.enable(!h);
        var i = c.element.prop("readonly");
        i === b && (i = !1), this.readonly(i), j = j || q(), this.autofocus = c.element.prop("autofocus"), c.element.prop("autofocus", !1), this.autofocus && this.focus(), this.search.attr("placeholder", c.searchInputPlaceholder);
      },
      destroy: function destroy() {
        var a = this.opts.element,
            c = a.data("select2"),
            d = this;
        this.close(), a.length && a[0].detachEvent && d._sync && a.each(function () {
          d._sync && this.detachEvent("onpropertychange", d._sync);
        }), this.propertyObserver && (this.propertyObserver.disconnect(), this.propertyObserver = null), this._sync = null, c !== b && (c.container.remove(), c.liveRegion.remove(), c.dropdown.remove(), a.removeData("select2").off(".select2"), a.is("input[type='hidden']") ? a.css("display", "") : (a.show().prop("autofocus", this.autofocus || !1), this.elementTabIndex ? a.attr({
          tabindex: this.elementTabIndex
        }) : a.removeAttr("tabindex"), a.show())), N.call(this, "container", "liveRegion", "dropdown", "results", "search");
      },
      optionToData: function optionToData(a) {
        return a.is("option") ? {
          id: a.prop("value"),
          text: a.text(),
          element: a.get(),
          css: a.attr("class"),
          disabled: a.prop("disabled"),
          locked: r(a.attr("locked"), "locked") || r(a.data("locked"), !0)
        } : a.is("optgroup") ? {
          text: a.attr("label"),
          children: [],
          element: a.get(),
          css: a.attr("class")
        } : void 0;
      },
      prepareOpts: function prepareOpts(c) {
        var d,
            e,
            g,
            h,
            i = this;

        if (d = c.element, "select" === d.get(0).tagName.toLowerCase() && (this.select = e = c.element), e && a.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
          if (this in c) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
        }), c.debug = c.debug || a.fn.select2.defaults.debug, c.debug && console && console.warn && (null != c.id && console.warn("Select2: The `id` option has been removed in Select2 4.0.0, consider renaming your `id` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"), null != c.text && console.warn("Select2: The `text` option has been removed in Select2 4.0.0, consider renaming your `text` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"), null != c.sortResults && console.warn("Select2: the `sortResults` option has been renamed to `sorter` in Select2 4.0.0. "), null != c.selectOnBlur && console.warn("Select2: The `selectOnBlur` option has been renamed to `selectOnClose` in Select2 4.0.0."), null != c.ajax && null != c.ajax.results && console.warn("Select2: The `ajax.results` option has been renamed to `ajax.processResults` in Select2 4.0.0."), null != c.formatNoResults && console.warn("Select2: The `formatNoResults` option has been renamed to `language.noResults` in Select2 4.0.0."), null != c.formatSearching && console.warn("Select2: The `formatSearching` option has been renamed to `language.searching` in Select2 4.0.0."), null != c.formatInputTooShort && console.warn("Select2: The `formatInputTooShort` option has been renamed to `language.inputTooShort` in Select2 4.0.0."), null != c.formatInputTooLong && console.warn("Select2: The `formatInputTooLong` option has been renamed to `language.inputTooLong` in Select2 4.0.0."), null != c.formatLoading && console.warn("Select2: The `formatLoading` option has been renamed to `language.loadingMore` in Select2 4.0.0."), null != c.formatSelectionTooBig && console.warn("Select2: The `formatSelectionTooBig` option has been renamed to `language.maximumSelected` in Select2 4.0.0."), c.element.data("select2Tags") && console.warn("Select2: The `data-select2-tags` attribute has been renamed to `data-tags` in Select2 4.0.0.")), null != c.element.data("tags")) {
          var j = c.element.data("tags");
          a.isArray(j) || (j = []), c.element.data("select2Tags", j);
        }

        if (null != c.sorter && (c.sortResults = c.sorter), null != c.selectOnClose && (c.selectOnBlur = c.selectOnClose), null != c.ajax && a.isFunction(c.ajax.processResults) && (c.ajax.results = c.ajax.processResults), null != c.language) {
          var k = c.language;
          a.isFunction(k.noMatches) && (c.formatNoMatches = k.noMatches), a.isFunction(k.searching) && (c.formatSearching = k.searching), a.isFunction(k.inputTooShort) && (c.formatInputTooShort = k.inputTooShort), a.isFunction(k.inputTooLong) && (c.formatInputTooLong = k.inputTooLong), a.isFunction(k.loadingMore) && (c.formatLoading = k.loadingMore), a.isFunction(k.maximumSelected) && (c.formatSelectionTooBig = k.maximumSelected);
        }

        if (c = a.extend({}, {
          populateResults: function populateResults(d, e, g) {
            var _h,
                j = this.opts.id,
                k = this.liveRegion;

            (_h = function h(d, e, l) {
              var m, n, o, p, q, r, s, t, u, v;
              d = c.sortResults(d, e, g);
              var w = [];

              for (m = 0, n = d.length; n > m; m += 1) {
                o = d[m], q = o.disabled === !0, p = !q && j(o) !== b, r = o.children && o.children.length > 0, s = a("<li></li>"), s.addClass("select2-results-dept-" + l), s.addClass("select2-result"), s.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"), q && s.addClass("select2-disabled"), r && s.addClass("select2-result-with-children"), s.addClass(i.opts.formatResultCssClass(o)), s.attr("role", "presentation"), t = a(document.createElement("div")), t.addClass("select2-result-label"), t.attr("id", "select2-result-label-" + f()), t.attr("role", "option"), v = c.formatResult(o, t, g, i.opts.escapeMarkup), v !== b && (t.html(v), s.append(t)), r && (u = a("<ul></ul>"), u.addClass("select2-result-sub"), _h(o.children, u, l + 1), s.append(u)), s.data("select2-data", o), w.push(s[0]);
              }

              e.append(w), k.text(c.formatMatches(d.length));
            })(e, d, 0);
          }
        }, a.fn.select2.defaults, c), "function" != typeof c.id && (g = c.id, c.id = function (a) {
          return a[g];
        }), a.isArray(c.element.data("select2Tags"))) {
          if ("tags" in c) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + c.element.attr("id");
          c.tags = c.element.data("select2Tags");
        }

        if (e ? (c.query = this.bind(function (a) {
          var f,
              g,
              _h2,
              c = {
            results: [],
            more: !1
          },
              e = a.term;

          _h2 = function h(b, c) {
            var d;
            b.is("option") ? a.matcher(e, b.text(), b) && c.push(i.optionToData(b)) : b.is("optgroup") && (d = i.optionToData(b), b.children().each2(function (a, b) {
              _h2(b, d.children);
            }), d.children.length > 0 && c.push(d));
          }, f = d.children(), this.getPlaceholder() !== b && f.length > 0 && (g = this.getPlaceholderOption(), g && (f = f.not(g))), f.each2(function (a, b) {
            _h2(b, c.results);
          }), a.callback(c);
        }), c.id = function (a) {
          return a.id;
        }) : "query" in c || ("ajax" in c ? (h = c.element.data("ajax-url"), h && h.length > 0 && (c.ajax.url = h), c.query = G.call(c.element, c.ajax)) : "data" in c ? c.query = H(c.data) : "tags" in c && (c.query = I(c.tags), c.createSearchChoice === b && (c.createSearchChoice = function (b) {
          return {
            id: a.trim(b),
            text: a.trim(b)
          };
        }), c.initSelection === b && (c.initSelection = function (b, d) {
          var e = [];
          a(s(b.val(), c.separator, c.transformVal)).each(function () {
            var b = {
              id: this,
              text: this
            },
                d = c.tags;
            a.isFunction(d) && (d = d()), a(d).each(function () {
              return r(this.id, b.id) ? (b = this, !1) : void 0;
            }), e.push(b);
          }), d(e);
        }))), "function" != typeof c.query) throw "query function not defined for Select2 " + c.element.attr("id");
        if ("top" === c.createSearchChoicePosition) c.createSearchChoicePosition = function (a, b) {
          a.unshift(b);
        };else if ("bottom" === c.createSearchChoicePosition) c.createSearchChoicePosition = function (a, b) {
          a.push(b);
        };else if ("function" != typeof c.createSearchChoicePosition) throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
        return c;
      },
      monitorSource: function monitorSource() {
        var d,
            c = this.opts.element,
            e = this;
        c.on("change.select2", this.bind(function (a) {
          this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection();
        })), this._sync = this.bind(function () {
          var a = c.prop("disabled");
          a === b && (a = !1), this.enable(!a);
          var d = c.prop("readonly");
          d === b && (d = !1), this.readonly(d), this.container && (D(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(K(this.opts.containerCssClass, this.opts.element))), this.dropdown && (D(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(K(this.opts.dropdownCssClass, this.opts.element)));
        }), c.length && c[0].attachEvent && c.each(function () {
          this.attachEvent("onpropertychange", e._sync);
        }), d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, d !== b && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new d(function (b) {
          a.each(b, e._sync);
        }), this.propertyObserver.observe(c.get(0), {
          attributes: !0,
          subtree: !1
        }));
      },
      triggerSelect: function triggerSelect(b) {
        var c = a.Event("select2-selecting", {
          val: this.id(b),
          object: b,
          choice: b
        });
        return this.opts.element.trigger(c), !c.isDefaultPrevented();
      },
      triggerChange: function triggerChange(b) {
        b = b || {}, b = a.extend({}, b, {
          type: "change",
          val: this.val()
        }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(b), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur();
      },
      isInterfaceEnabled: function isInterfaceEnabled() {
        return this.enabledInterface === !0;
      },
      enableInterface: function enableInterface() {
        var a = this._enabled && !this._readonly,
            b = !a;
        return a === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", b), this.close(), this.enabledInterface = a, !0);
      },
      enable: function enable(a) {
        a === b && (a = !0), this._enabled !== a && (this._enabled = a, this.opts.element.prop("disabled", !a), this.enableInterface());
      },
      disable: function disable() {
        this.enable(!1);
      },
      readonly: function readonly(a) {
        a === b && (a = !1), this._readonly !== a && (this._readonly = a, this.opts.element.prop("readonly", a), this.enableInterface());
      },
      opened: function opened() {
        return this.container ? this.container.hasClass("select2-dropdown-open") : !1;
      },
      positionDropdown: function positionDropdown() {
        var v,
            w,
            x,
            y,
            z,
            b = this.dropdown,
            c = this.container,
            d = c.offset(),
            e = c.outerHeight(!1),
            f = c.outerWidth(!1),
            g = b.outerHeight(!1),
            h = a(window),
            i = h.width(),
            k = h.height(),
            l = h.scrollLeft() + i,
            m = h.scrollTop() + k,
            n = d.top + e,
            o = d.left,
            p = m >= n + g,
            q = d.top - g >= h.scrollTop(),
            r = b.outerWidth(!1),
            s = function s() {
          return l >= o + r;
        },
            t = function t() {
          return d.left + l + c.outerWidth(!1) > r;
        },
            u = b.hasClass("select2-drop-above");

        u ? (w = !0, !q && p && (x = !0, w = !1)) : (w = !1, !p && q && (x = !0, w = !0)), x && (b.hide(), d = this.container.offset(), e = this.container.outerHeight(!1), f = this.container.outerWidth(!1), g = b.outerHeight(!1), l = h.scrollLeft() + i, m = h.scrollTop() + k, n = d.top + e, o = d.left, r = b.outerWidth(!1), b.show(), this.focusSearch()), this.opts.dropdownAutoWidth ? (z = a(".select2-results", b)[0], b.addClass("select2-drop-auto-width"), b.css("width", ""), r = b.outerWidth(!1) + (z.scrollHeight === z.clientHeight ? 0 : j.width), r > f ? f = r : r = f, g = b.outerHeight(!1)) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body.css("position") && (v = this.body.offset(), n -= v.top, o -= v.left), !s() && t() && (o = d.left + this.container.outerWidth(!1) - r), y = {
          left: o,
          width: f
        }, w ? (this.container.addClass("select2-drop-above"), b.addClass("select2-drop-above"), g = b.outerHeight(!1), y.top = d.top - g, y.bottom = "auto") : (y.top = n, y.bottom = "auto", this.container.removeClass("select2-drop-above"), b.removeClass("select2-drop-above")), y = a.extend(y, K(this.opts.dropdownCss, this.opts.element)), b.css(y);
      },
      shouldOpen: function shouldOpen() {
        var b;
        return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (b = a.Event("select2-opening"), this.opts.element.trigger(b), !b.isDefaultPrevented());
      },
      clearDropdownAlignmentPreference: function clearDropdownAlignmentPreference() {
        this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above");
      },
      open: function open() {
        return this.shouldOpen() ? (this.opening(), i.on("mousemove.select2Event", function (a) {
          h.x = a.pageX, h.y = a.pageY;
        }), !0) : !1;
      },
      opening: function opening() {
        var f,
            b = this.containerEventName,
            c = "scroll." + b,
            d = "resize." + b,
            e = "orientationchange." + b;
        this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body), f = a("#select2-drop-mask"), 0 === f.length && (f = a(document.createElement("div")), f.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), f.hide(), f.appendTo(this.body), f.on("mousedown touchstart click", function (b) {
          n(f);
          var d,
              c = a("#select2-drop");
          c.length > 0 && (d = c.data("select2"), d.opts.selectOnBlur && d.selectHighlighted({
            noFocus: !0
          }), d.close(), b.preventDefault(), b.stopPropagation());
        })), this.dropdown.prev()[0] !== f[0] && this.dropdown.before(f), a("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), f.show(), this.positionDropdown(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
        var g = this;
        this.container.parents().add(window).each(function () {
          a(this).on(d + " " + c + " " + e, function (a) {
            g.opened() && g.positionDropdown();
          });
        });
      },
      close: function close() {
        if (this.opened()) {
          var b = this.containerEventName,
              c = "scroll." + b,
              d = "resize." + b,
              e = "orientationchange." + b;
          this.container.parents().add(window).each(function () {
            a(this).off(c).off(d).off(e);
          }), this.clearDropdownAlignmentPreference(), a("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), i.off("mousemove.select2Event"), this.clearSearch(), this.search.removeClass("select2-active"), this.search.removeAttr("aria-activedescendant"), this.opts.element.trigger(a.Event("select2-close"));
        }
      },
      externalSearch: function externalSearch(a) {
        this.open(), this.search.val(a), this.updateResults(!1);
      },
      clearSearch: function clearSearch() {},
      prefillNextSearchTerm: function prefillNextSearchTerm() {
        if ("" !== this.search.val()) return !1;
        var a = this.opts.nextSearchTerm(this.data(), this.lastSearchTerm);
        return a !== b ? (this.search.val(a), this.search.select(), !0) : !1;
      },
      getMaximumSelectionSize: function getMaximumSelectionSize() {
        return K(this.opts.maximumSelectionSize, this.opts.element);
      },
      ensureHighlightVisible: function ensureHighlightVisible() {
        var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            b = this.results;

        if (d = this.highlight(), !(0 > d)) {
          if (0 == d) return void b.scrollTop(0);
          c = this.findHighlightableChoices().find(".select2-result-label"), e = a(c[d]), j = (e.offset() || {}).top || 0, f = j + e.outerHeight(!0), d === c.length - 1 && (i = b.find("li.select2-more-results"), i.length > 0 && (f = i.offset().top + i.outerHeight(!0))), g = b.offset().top + b.outerHeight(!1), f > g && b.scrollTop(b.scrollTop() + (f - g)), h = j - b.offset().top, 0 > h && "none" != e.css("display") && b.scrollTop(b.scrollTop() + h);
        }
      },
      findHighlightableChoices: function findHighlightableChoices() {
        return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)");
      },
      moveHighlight: function moveHighlight(b) {
        for (var c = this.findHighlightableChoices(), d = this.highlight(); d > -1 && d < c.length;) {
          d += b;
          var e = a(c[d]);

          if (e.hasClass("select2-result-selectable") && !e.hasClass("select2-disabled") && !e.hasClass("select2-selected")) {
            this.highlight(d);
            break;
          }
        }
      },
      highlight: function highlight(b) {
        var d,
            e,
            c = this.findHighlightableChoices();
        return 0 === arguments.length ? p(c.filter(".select2-highlighted")[0], c.get()) : (b >= c.length && (b = c.length - 1), 0 > b && (b = 0), this.removeHighlight(), d = a(c[b]), d.addClass("select2-highlighted"), this.search.attr("aria-activedescendant", d.find(".select2-result-label").attr("id")), this.ensureHighlightVisible(), this.liveRegion.text(d.text()), e = d.data("select2-data"), void (e && this.opts.element.trigger({
          type: "select2-highlight",
          val: this.id(e),
          choice: e
        })));
      },
      removeHighlight: function removeHighlight() {
        this.results.find(".select2-highlighted").removeClass("select2-highlighted");
      },
      touchMoved: function touchMoved() {
        this._touchMoved = !0;
      },
      clearTouchMoved: function clearTouchMoved() {
        this._touchMoved = !1;
      },
      countSelectableResults: function countSelectableResults() {
        return this.findHighlightableChoices().length;
      },
      highlightUnderEvent: function highlightUnderEvent(b) {
        var c = a(b.target).closest(".select2-result-selectable");

        if (c.length > 0 && !c.is(".select2-highlighted")) {
          var d = this.findHighlightableChoices();
          this.highlight(d.index(c));
        } else 0 == c.length && this.removeHighlight();
      },
      loadMoreIfNeeded: function loadMoreIfNeeded() {
        var c,
            a = this.results,
            b = a.find("li.select2-more-results"),
            d = this.resultsPage + 1,
            e = this,
            f = this.search.val(),
            g = this.context;
        0 !== b.length && (c = b.offset().top - a.offset().top - a.height(), c <= this.opts.loadMorePadding && (b.addClass("select2-active"), this.opts.query({
          element: this.opts.element,
          term: f,
          page: d,
          context: g,
          matcher: this.opts.matcher,
          callback: this.bind(function (c) {
            e.opened() && (e.opts.populateResults.call(this, a, c.results, {
              term: f,
              page: d,
              context: g
            }), e.postprocessResults(c, !1, !1), c.more === !0 ? (b.detach().appendTo(a).html(e.opts.escapeMarkup(K(e.opts.formatLoadMore, e.opts.element, d + 1))), window.setTimeout(function () {
              e.loadMoreIfNeeded();
            }, 10)) : b.remove(), e.positionDropdown(), e.resultsPage = d, e.context = c.context, this.opts.element.trigger({
              type: "select2-loaded",
              items: c
            }));
          })
        })));
      },
      tokenize: function tokenize() {},
      updateResults: function updateResults(c) {
        function m() {
          d.removeClass("select2-active"), h.positionDropdown(), e.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? h.liveRegion.text(e.text()) : h.liveRegion.text(h.opts.formatMatches(e.find('.select2-result-selectable:not(".select2-selected")').length));
        }

        function n(a) {
          e.html(a), m();
        }

        var g,
            i,
            l,
            d = this.search,
            e = this.results,
            f = this.opts,
            h = this,
            j = d.val(),
            k = a.data(this.container, "select2-last-term");

        if ((c === !0 || !k || !r(j, k)) && (a.data(this.container, "select2-last-term", j), c === !0 || this.showSearchInput !== !1 && this.opened())) {
          l = ++this.queryCount;
          var o = this.getMaximumSelectionSize();
          if (o >= 1 && (g = this.data(), a.isArray(g) && g.length >= o && J(f.formatSelectionTooBig, "formatSelectionTooBig"))) return void n("<li class='select2-selection-limit'>" + K(f.formatSelectionTooBig, f.element, o) + "</li>");
          if (d.val().length < f.minimumInputLength) return n(J(f.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + K(f.formatInputTooShort, f.element, d.val(), f.minimumInputLength) + "</li>" : ""), void (c && this.showSearch && this.showSearch(!0));
          if (f.maximumInputLength && d.val().length > f.maximumInputLength) return void n(J(f.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + K(f.formatInputTooLong, f.element, d.val(), f.maximumInputLength) + "</li>" : "");
          f.formatSearching && 0 === this.findHighlightableChoices().length && n("<li class='select2-searching'>" + K(f.formatSearching, f.element) + "</li>"), d.addClass("select2-active"), this.removeHighlight(), i = this.tokenize(), i != b && null != i && d.val(i), this.resultsPage = 1, f.query({
            element: f.element,
            term: d.val(),
            page: this.resultsPage,
            context: null,
            matcher: f.matcher,
            callback: this.bind(function (g) {
              var i;

              if (l == this.queryCount) {
                if (!this.opened()) return void this.search.removeClass("select2-active");
                if (g.hasError !== b && J(f.formatAjaxError, "formatAjaxError")) return void n("<li class='select2-ajax-error'>" + K(f.formatAjaxError, f.element, g.jqXHR, g.textStatus, g.errorThrown) + "</li>");
                if (this.context = g.context === b ? null : g.context, this.opts.createSearchChoice && "" !== d.val() && (i = this.opts.createSearchChoice.call(h, d.val(), g.results), i !== b && null !== i && h.id(i) !== b && null !== h.id(i) && 0 === a(g.results).filter(function () {
                  return r(h.id(this), h.id(i));
                }).length && this.opts.createSearchChoicePosition(g.results, i)), 0 === g.results.length && J(f.formatNoMatches, "formatNoMatches")) return n("<li class='select2-no-results'>" + K(f.formatNoMatches, f.element, d.val()) + "</li>"), void (this.showSearch && this.showSearch(d.val()));
                e.empty(), h.opts.populateResults.call(this, e, g.results, {
                  term: d.val(),
                  page: this.resultsPage,
                  context: null
                }), g.more === !0 && J(f.formatLoadMore, "formatLoadMore") && (e.append("<li class='select2-more-results'>" + f.escapeMarkup(K(f.formatLoadMore, f.element, this.resultsPage)) + "</li>"), window.setTimeout(function () {
                  h.loadMoreIfNeeded();
                }, 10)), this.postprocessResults(g, c), m(), this.opts.element.trigger({
                  type: "select2-loaded",
                  items: g
                });
              }
            })
          });
        }
      },
      cancel: function cancel() {
        this.close();
      },
      blur: function blur() {
        this.opts.selectOnBlur && this.selectHighlighted({
          noFocus: !0
        }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
      },
      focusSearch: function focusSearch() {
        y(this.search);
      },
      selectHighlighted: function selectHighlighted(a) {
        if (this._touchMoved) return void this.clearTouchMoved();
        var b = this.highlight(),
            c = this.results.find(".select2-highlighted"),
            d = c.closest(".select2-result").data("select2-data");
        d ? (this.highlight(b), this.onSelect(d, a)) : a && a.noFocus && this.close();
      },
      getPlaceholder: function getPlaceholder() {
        var a;
        return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((a = this.getPlaceholderOption()) !== b ? a.text() : b);
      },
      getPlaceholderOption: function getPlaceholderOption() {
        if (this.select) {
          var c = this.select.children("option").first();
          if (this.opts.placeholderOption !== b) return "first" === this.opts.placeholderOption && c || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
          if ("" === a.trim(c.text()) && "" === c.val()) return c;
        }
      },
      initContainerWidth: function initContainerWidth() {
        function b() {
          var b, c, d, e, f, g;
          if ("off" === this.opts.width) return null;
          if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";

          if ("copy" === this.opts.width || "resolve" === this.opts.width) {
            if (b = this.opts.element.attr("style"), "string" == typeof b) for (c = b.split(";"), e = 0, f = c.length; f > e; e += 1) {
              if (g = c[e].replace(/\s/g, ""), d = g.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== d && d.length >= 1) return d[1];
            }
            return "resolve" === this.opts.width ? (b = this.opts.element.css("width"), b.indexOf("%") > 0 ? b : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null;
          }

          return a.isFunction(this.opts.width) ? this.opts.width() : this.opts.width;
        }

        var c = b.call(this);
        null !== c && this.container.css("width", c);
      }
    }), d = O(c, {
      createContainer: function createContainer() {
        var b = a(document.createElement("div")).attr({
          "class": "select2-container"
        }).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>"].join(""));
        return b;
      },
      enableInterface: function enableInterface() {
        this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled());
      },
      opening: function opening() {
        var b, c, d;
        this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.opts.shouldFocusInput(this) && (this.search.focus(), b = this.search.get(0), b.createTextRange ? (c = b.createTextRange(), c.collapse(!1), c.select()) : b.setSelectionRange && (d = this.search.val().length, b.setSelectionRange(d, d))), this.prefillNextSearchTerm(), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(a.Event("select2-open"));
      },
      close: function close() {
        this.opened() && (this.parent.close.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus());
      },
      focus: function focus() {
        this.opened() ? this.close() : (this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus());
      },
      isFocused: function isFocused() {
        return this.container.hasClass("select2-container-active");
      },
      cancel: function cancel() {
        this.parent.cancel.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus();
      },
      destroy: function destroy() {
        a("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), N.call(this, "selection", "focusser");
      },
      initContainer: function initContainer() {
        var b,
            g,
            c = this.container,
            d = this.dropdown,
            e = f();
        this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0), this.selection = b = c.find(".select2-choice"), this.focusser = c.find(".select2-focusser"), b.find(".select2-chosen").attr("id", "select2-chosen-" + e), this.focusser.attr("aria-labelledby", "select2-chosen-" + e), this.results.attr("id", "select2-results-" + e), this.search.attr("aria-owns", "select2-results-" + e), this.focusser.attr("id", "s2id_autogen" + e), g = a("label[for='" + this.opts.element.attr("id") + "']"), this.opts.element.on("focus.select2", this.bind(function () {
          this.focus();
        })), this.focusser.prev().text(g.text()).attr("for", this.focusser.attr("id"));
        var h = this.opts.element.attr("title");
        this.opts.element.attr("title", h || g.text()), this.focusser.attr("tabindex", this.elementTabIndex), this.search.attr("id", this.focusser.attr("id") + "_search"), this.search.prev().text(a("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("keydown", this.bind(function (a) {
          if (this.isInterfaceEnabled() && 229 != a.keyCode) {
            if (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN) return void A(a);

            switch (a.which) {
              case k.UP:
              case k.DOWN:
                return this.moveHighlight(a.which === k.UP ? -1 : 1), void A(a);

              case k.ENTER:
                return this.selectHighlighted(), void A(a);

              case k.TAB:
                return void this.selectHighlighted({
                  noFocus: !0
                });

              case k.ESC:
                return this.cancel(a), void A(a);
            }
          }
        })), this.search.on("blur", this.bind(function (a) {
          document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function () {
            this.opened() && this.results && this.results.length > 1 && this.search.focus();
          }), 0);
        })), this.focusser.on("keydown", this.bind(function (a) {
          if (this.isInterfaceEnabled() && a.which !== k.TAB && !k.isControl(a) && !k.isFunctionKey(a) && a.which !== k.ESC) {
            if (this.opts.openOnEnter === !1 && a.which === k.ENTER) return void A(a);

            if (a.which == k.DOWN || a.which == k.UP || a.which == k.ENTER && this.opts.openOnEnter) {
              if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey) return;
              return this.open(), void A(a);
            }

            return a.which == k.DELETE || a.which == k.BACKSPACE ? (this.opts.allowClear && this.clear(), void A(a)) : void 0;
          }
        })), u(this.focusser), this.focusser.on("keyup-change input", this.bind(function (a) {
          if (this.opts.minimumResultsForSearch >= 0) {
            if (a.stopPropagation(), this.opened()) return;
            this.open();
          }
        })), b.on("mousedown touchstart", "abbr", this.bind(function (a) {
          this.isInterfaceEnabled() && (this.clear(), B(a), this.close(), this.selection && this.selection.focus());
        })), b.on("mousedown touchstart", this.bind(function (c) {
          n(b), this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), A(c);
        })), d.on("mousedown touchstart", this.bind(function () {
          this.opts.shouldFocusInput(this) && this.search.focus();
        })), b.on("focus", this.bind(function (a) {
          A(a);
        })), this.focusser.on("focus", this.bind(function () {
          this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.container.addClass("select2-container-active");
        })).on("blur", this.bind(function () {
          this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(a.Event("select2-blur")));
        })), this.search.on("focus", this.bind(function () {
          this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.container.addClass("select2-container-active");
        })), this.initContainerWidth(), this.opts.element.hide(), this.setPlaceholder();
      },
      clear: function clear(b) {
        var c = this.selection.data("select2-data");

        if (c) {
          var d = a.Event("select2-clearing");
          if (this.opts.element.trigger(d), d.isDefaultPrevented()) return;
          var e = this.getPlaceholderOption();
          this.opts.element.val(e ? e.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), b !== !1 && (this.opts.element.trigger({
            type: "select2-removed",
            val: this.id(c),
            choice: c
          }), this.triggerChange({
            removed: c
          }));
        }
      },
      initSelection: function initSelection() {
        if (this.isPlaceholderOptionSelected()) this.updateSelection(null), this.close(), this.setPlaceholder();else {
          var c = this;
          this.opts.initSelection.call(null, this.opts.element, function (a) {
            a !== b && null !== a && (c.updateSelection(a), c.close(), c.setPlaceholder(), c.lastSearchTerm = c.search.val());
          });
        }
      },
      isPlaceholderOptionSelected: function isPlaceholderOptionSelected() {
        var a;
        return this.getPlaceholder() === b ? !1 : (a = this.getPlaceholderOption()) !== b && a.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === b || null === this.opts.element.val();
      },
      prepareOpts: function prepareOpts() {
        var b = this.parent.prepareOpts.apply(this, arguments),
            c = this;
        return "select" === b.element.get(0).tagName.toLowerCase() ? b.initSelection = function (a, b) {
          var d = a.find("option").filter(function () {
            return this.selected && !this.disabled;
          });
          b(c.optionToData(d));
        } : "data" in b && (b.initSelection = b.initSelection || function (c, d) {
          var e = c.val(),
              f = null;
          b.query({
            matcher: function matcher(a, c, d) {
              var g = r(e, b.id(d));
              return g && (f = d), g;
            },
            callback: a.isFunction(d) ? function () {
              d(f);
            } : a.noop
          });
        }), b;
      },
      getPlaceholder: function getPlaceholder() {
        return this.select && this.getPlaceholderOption() === b ? b : this.parent.getPlaceholder.apply(this, arguments);
      },
      setPlaceholder: function setPlaceholder() {
        var a = this.getPlaceholder();

        if (this.isPlaceholderOptionSelected() && a !== b) {
          if (this.select && this.getPlaceholderOption() === b) return;
          this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear");
        }
      },
      postprocessResults: function postprocessResults(a, b, c) {
        var d = 0,
            e = this;

        if (this.findHighlightableChoices().each2(function (a, b) {
          return r(e.id(b.data("select2-data")), e.opts.element.val()) ? (d = a, !1) : void 0;
        }), c !== !1 && (b === !0 && d >= 0 ? this.highlight(d) : this.highlight(0)), b === !0) {
          var g = this.opts.minimumResultsForSearch;
          g >= 0 && this.showSearch(L(a.results) >= g);
        }
      },
      showSearch: function showSearch(b) {
        this.showSearchInput !== b && (this.showSearchInput = b, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !b), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !b), a(this.dropdown, this.container).toggleClass("select2-with-searchbox", b));
      },
      onSelect: function onSelect(a, b) {
        if (this.triggerSelect(a)) {
          var c = this.opts.element.val(),
              d = this.data();
          this.opts.element.val(this.id(a)), this.updateSelection(a), this.opts.element.trigger({
            type: "select2-selected",
            val: this.id(a),
            choice: a
          }), this.lastSearchTerm = this.search.val(), this.close(), b && b.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(), r(c, this.id(a)) || this.triggerChange({
            added: a,
            removed: d
          });
        }
      },
      updateSelection: function updateSelection(a) {
        var d,
            e,
            c = this.selection.find(".select2-chosen");
        this.selection.data("select2-data", a), c.empty(), null !== a && (d = this.opts.formatSelection(a, c, this.opts.escapeMarkup)), d !== b && c.append(d), e = this.opts.formatSelectionCssClass(a, c), e !== b && c.addClass(e), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== b && this.container.addClass("select2-allowclear");
      },
      val: function val() {
        var a,
            c = !1,
            d = null,
            e = this,
            f = this.data();
        if (0 === arguments.length) return this.opts.element.val();
        if (a = arguments[0], arguments.length > 1 && (c = arguments[1], this.opts.debug && console && console.warn && console.warn('Select2: The second option to `select2("val")` is not supported in Select2 4.0.0. The `change` event will always be triggered in 4.0.0.')), this.select) this.opts.debug && console && console.warn && console.warn('Select2: Setting the value on a <select> using `select2("val")` is no longer supported in 4.0.0. You can use the `.val(newValue).trigger("change")` method provided by jQuery instead.'), this.select.val(a).find("option").filter(function () {
          return this.selected;
        }).each2(function (a, b) {
          return d = e.optionToData(b), !1;
        }), this.updateSelection(d), this.setPlaceholder(), c && this.triggerChange({
          added: d,
          removed: f
        });else {
          if (!a && 0 !== a) return void this.clear(c);
          if (this.opts.initSelection === b) throw new Error("cannot call val() if initSelection() is not defined");
          this.opts.element.val(a), this.opts.initSelection(this.opts.element, function (a) {
            e.opts.element.val(a ? e.id(a) : ""), e.updateSelection(a), e.setPlaceholder(), c && e.triggerChange({
              added: a,
              removed: f
            });
          });
        }
      },
      clearSearch: function clearSearch() {
        this.search.val(""), this.focusser.val("");
      },
      data: function data(a) {
        var c,
            d = !1;
        return 0 === arguments.length ? (c = this.selection.data("select2-data"), c == b && (c = null), c) : (this.opts.debug && console && console.warn && console.warn('Select2: The `select2("data")` method can no longer set selected values in 4.0.0, consider using the `.val()` method instead.'), arguments.length > 1 && (d = arguments[1]), a ? (c = this.data(), this.opts.element.val(a ? this.id(a) : ""), this.updateSelection(a), d && this.triggerChange({
          added: a,
          removed: c
        })) : this.clear(d), void 0);
      }
    }), e = O(c, {
      createContainer: function createContainer() {
        var b = a(document.createElement("div")).attr({
          "class": "select2-container select2-container-multi"
        }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
        return b;
      },
      prepareOpts: function prepareOpts() {
        var b = this.parent.prepareOpts.apply(this, arguments),
            c = this;
        return "select" === b.element.get(0).tagName.toLowerCase() ? b.initSelection = function (a, b) {
          var d = [];
          a.find("option").filter(function () {
            return this.selected && !this.disabled;
          }).each2(function (a, b) {
            d.push(c.optionToData(b));
          }), b(d);
        } : "data" in b && (b.initSelection = b.initSelection || function (c, d) {
          var e = s(c.val(), b.separator, b.transformVal),
              f = [];
          b.query({
            matcher: function matcher(c, d, g) {
              var h = a.grep(e, function (a) {
                return r(a, b.id(g));
              }).length;
              return h && f.push(g), h;
            },
            callback: a.isFunction(d) ? function () {
              for (var a = [], c = 0; c < e.length; c++) {
                for (var g = e[c], h = 0; h < f.length; h++) {
                  var i = f[h];

                  if (r(g, b.id(i))) {
                    a.push(i), f.splice(h, 1);
                    break;
                  }
                }
              }

              d(a);
            } : a.noop
          });
        }), b;
      },
      selectChoice: function selectChoice(a) {
        var b = this.container.find(".select2-search-choice-focus");
        b.length && a && a[0] == b[0] || (b.length && this.opts.element.trigger("choice-deselected", b), b.removeClass("select2-search-choice-focus"), a && a.length && (this.close(), a.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", a)));
      },
      destroy: function destroy() {
        a("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), N.call(this, "searchContainer", "selection");
      },
      initContainer: function initContainer() {
        var c,
            b = ".select2-choices";
        this.searchContainer = this.container.find(".select2-search-field"), this.selection = c = this.container.find(b);
        var d = this;
        this.selection.on("click", ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)", function (b) {
          d.search[0].focus(), d.selectChoice(a(this));
        }), this.search.attr("id", "s2id_autogen" + f()), this.search.prev().text(a("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.opts.element.on("focus.select2", this.bind(function () {
          this.focus();
        })), this.search.on("input paste", this.bind(function () {
          this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && (this.opened() || this.open());
        })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function (a) {
          if (this.isInterfaceEnabled()) {
            ++this.keydowns;
            var b = c.find(".select2-search-choice-focus"),
                d = b.prev(".select2-search-choice:not(.select2-locked)"),
                e = b.next(".select2-search-choice:not(.select2-locked)"),
                f = z(this.search);

            if (b.length && (a.which == k.LEFT || a.which == k.RIGHT || a.which == k.BACKSPACE || a.which == k.DELETE || a.which == k.ENTER)) {
              var g = b;
              return a.which == k.LEFT && d.length ? g = d : a.which == k.RIGHT ? g = e.length ? e : null : a.which === k.BACKSPACE ? this.unselect(b.first()) && (this.search.width(10), g = d.length ? d : e) : a.which == k.DELETE ? this.unselect(b.first()) && (this.search.width(10), g = e.length ? e : null) : a.which == k.ENTER && (g = null), this.selectChoice(g), A(a), void (g && g.length || this.open());
            }

            if ((a.which === k.BACKSPACE && 1 == this.keydowns || a.which == k.LEFT) && 0 == f.offset && !f.length) return this.selectChoice(c.find(".select2-search-choice:not(.select2-locked)").last()), void A(a);
            if (this.selectChoice(null), this.opened()) switch (a.which) {
              case k.UP:
              case k.DOWN:
                return this.moveHighlight(a.which === k.UP ? -1 : 1), void A(a);

              case k.ENTER:
                return this.selectHighlighted(), void A(a);

              case k.TAB:
                return this.selectHighlighted({
                  noFocus: !0
                }), void this.close();

              case k.ESC:
                return this.cancel(a), void A(a);
            }

            if (a.which !== k.TAB && !k.isControl(a) && !k.isFunctionKey(a) && a.which !== k.BACKSPACE && a.which !== k.ESC) {
              if (a.which === k.ENTER) {
                if (this.opts.openOnEnter === !1) return;
                if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey) return;
              }

              this.open(), (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN) && A(a), a.which === k.ENTER && A(a);
            }
          }
        })), this.search.on("keyup", this.bind(function (a) {
          this.keydowns = 0, this.resizeSearch();
        })), this.search.on("blur", this.bind(function (b) {
          this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), b.stopImmediatePropagation(), this.opts.element.trigger(a.Event("select2-blur"));
        })), this.container.on("click", b, this.bind(function (b) {
          this.isInterfaceEnabled() && (a(b.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.open(), this.focusSearch(), b.preventDefault()));
        })), this.container.on("focus", b, this.bind(function () {
          this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder());
        })), this.initContainerWidth(), this.opts.element.hide(), this.clearSearch();
      },
      enableInterface: function enableInterface() {
        this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled());
      },
      initSelection: function initSelection() {
        if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
          var c = this;
          this.opts.initSelection.call(null, this.opts.element, function (a) {
            a !== b && null !== a && (c.updateSelection(a), c.close(), c.clearSearch());
          });
        }
      },
      clearSearch: function clearSearch() {
        var a = this.getPlaceholder(),
            c = this.getMaxSearchWidth();
        a !== b && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(a).addClass("select2-default"), this.search.width(c > 0 ? c : this.container.css("width"))) : this.search.val("").width(10);
      },
      clearPlaceholder: function clearPlaceholder() {
        this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default");
      },
      opening: function opening() {
        this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), this.prefillNextSearchTerm(), this.updateResults(!0), this.opts.shouldFocusInput(this) && this.search.focus(), this.opts.element.trigger(a.Event("select2-open"));
      },
      close: function close() {
        this.opened() && this.parent.close.apply(this, arguments);
      },
      focus: function focus() {
        this.close(), this.search.focus();
      },
      isFocused: function isFocused() {
        return this.search.hasClass("select2-focused");
      },
      updateSelection: function updateSelection(b) {
        var c = {},
            d = [],
            e = this;
        a(b).each(function () {
          e.id(this) in c || (c[e.id(this)] = 0, d.push(this));
        }), this.selection.find(".select2-search-choice").remove(), this.addSelectedChoice(d), e.postprocessResults();
      },
      tokenize: function tokenize() {
        var a = this.search.val();
        a = this.opts.tokenizer.call(this, a, this.data(), this.bind(this.onSelect), this.opts), null != a && a != b && (this.search.val(a), a.length > 0 && this.open());
      },
      onSelect: function onSelect(a, b) {
        this.triggerSelect(a) && "" !== a.text && (this.addSelectedChoice(a), this.opts.element.trigger({
          type: "selected",
          val: this.id(a),
          choice: a
        }), this.lastSearchTerm = this.search.val(), this.clearSearch(), this.updateResults(), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(a, !1, this.opts.closeOnSelect === !0), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.prefillNextSearchTerm() && this.updateResults(), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({
          added: a
        }), b && b.noFocus || this.focusSearch());
      },
      cancel: function cancel() {
        this.close(), this.focusSearch();
      },
      addSelectedChoice: function addSelectedChoice(b) {
        var c = this.getVal(),
            d = this;
        a(b).each(function () {
          c.push(d.createChoice(this));
        }), this.setVal(c);
      },
      createChoice: function createChoice(c) {
        var i,
            j,
            d = !c.locked,
            e = a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),
            f = a("<li class='select2-search-choice select2-locked'><div></div></li>"),
            g = d ? e : f,
            h = this.id(c);
        return i = this.opts.formatSelection(c, g.find("div"), this.opts.escapeMarkup), i != b && g.find("div").replaceWith(a("<div></div>").html(i)), j = this.opts.formatSelectionCssClass(c, g.find("div")), j != b && g.addClass(j), d && g.find(".select2-search-choice-close").on("mousedown", A).on("click dblclick", this.bind(function (b) {
          this.isInterfaceEnabled() && (this.unselect(a(b.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), A(b), this.close(), this.focusSearch());
        })).on("focus", this.bind(function () {
          this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"));
        })), g.data("select2-data", c), g.insertBefore(this.searchContainer), h;
      },
      unselect: function unselect(b) {
        var d,
            e,
            c = this.getVal();
        if (b = b.closest(".select2-search-choice"), 0 === b.length) throw "Invalid argument: " + b + ". Must be .select2-search-choice";

        if (d = b.data("select2-data")) {
          var f = a.Event("select2-removing");
          if (f.val = this.id(d), f.choice = d, this.opts.element.trigger(f), f.isDefaultPrevented()) return !1;

          for (; (e = p(this.id(d), c)) >= 0;) {
            c.splice(e, 1), this.setVal(c), this.select && this.postprocessResults();
          }

          return b.remove(), this.opts.element.trigger({
            type: "select2-removed",
            val: this.id(d),
            choice: d
          }), this.triggerChange({
            removed: d
          }), !0;
        }
      },
      postprocessResults: function postprocessResults(a, b, c) {
        var d = this.getVal(),
            e = this.results.find(".select2-result"),
            f = this.results.find(".select2-result-with-children"),
            g = this;
        e.each2(function (a, b) {
          var c = g.id(b.data("select2-data"));
          p(c, d) >= 0 && (b.addClass("select2-selected"), b.find(".select2-result-selectable").addClass("select2-selected"));
        }), f.each2(function (a, b) {
          b.is(".select2-result-selectable") || 0 !== b.find(".select2-result-selectable:not(.select2-selected)").length || b.addClass("select2-selected");
        }), -1 == this.highlight() && c !== !1 && this.opts.closeOnSelect === !0 && g.highlight(0), !this.opts.createSearchChoice && !e.filter(".select2-result:not(.select2-selected)").length > 0 && (!a || a && !a.more && 0 === this.results.find(".select2-no-results").length) && J(g.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + K(g.opts.formatNoMatches, g.opts.element, g.search.val()) + "</li>");
      },
      getMaxSearchWidth: function getMaxSearchWidth() {
        return this.selection.width() - t(this.search);
      },
      resizeSearch: function resizeSearch() {
        var a,
            b,
            c,
            d,
            e,
            f = t(this.search);
        a = C(this.search) + 10, b = this.search.offset().left, c = this.selection.width(), d = this.selection.offset().left, e = c - (b - d) - f, a > e && (e = c - f), 40 > e && (e = c - f), 0 >= e && (e = a), this.search.width(Math.floor(e));
      },
      getVal: function getVal() {
        var a;
        return this.select ? (a = this.select.val(), null === a ? [] : a) : (a = this.opts.element.val(), s(a, this.opts.separator, this.opts.transformVal));
      },
      setVal: function setVal(b) {
        if (this.select) this.select.val(b);else {
          var c = [],
              d = {};
          a(b).each(function () {
            this in d || (c.push(this), d[this] = 0);
          }), this.opts.element.val(0 === c.length ? "" : c.join(this.opts.separator));
        }
      },
      buildChangeDetails: function buildChangeDetails(a, b) {
        for (var b = b.slice(0), a = a.slice(0), c = 0; c < b.length; c++) {
          for (var d = 0; d < a.length; d++) {
            if (r(this.opts.id(b[c]), this.opts.id(a[d]))) {
              b.splice(c, 1), c--, a.splice(d, 1);
              break;
            }
          }
        }

        return {
          added: b,
          removed: a
        };
      },
      val: function val(c, d) {
        var e,
            f = this;
        if (0 === arguments.length) return this.getVal();
        if (e = this.data(), e.length || (e = []), !c && 0 !== c) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void (d && this.triggerChange({
          added: this.data(),
          removed: e
        }));
        if (this.setVal(c), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), d && this.triggerChange(this.buildChangeDetails(e, this.data()));else {
          if (this.opts.initSelection === b) throw new Error("val() cannot be called if initSelection() is not defined");
          this.opts.initSelection(this.opts.element, function (b) {
            var c = a.map(b, f.id);
            f.setVal(c), f.updateSelection(b), f.clearSearch(), d && f.triggerChange(f.buildChangeDetails(e, f.data()));
          });
        }
        this.clearSearch();
      },
      onSortStart: function onSortStart() {
        if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
        this.search.width(0), this.searchContainer.hide();
      },
      onSortEnd: function onSortEnd() {
        var b = [],
            c = this;
        this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function () {
          b.push(c.opts.id(a(this).data("select2-data")));
        }), this.setVal(b), this.triggerChange();
      },
      data: function data(b, c) {
        var e,
            f,
            d = this;
        return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function () {
          return a(this).data("select2-data");
        }).get() : (f = this.data(), b || (b = []), e = a.map(b, function (a) {
          return d.opts.id(a);
        }), this.setVal(e), this.updateSelection(b), this.clearSearch(), c && this.triggerChange(this.buildChangeDetails(f, this.data())), void 0);
      }
    }), a.fn.select2 = function () {
      var d,
          e,
          f,
          g,
          h,
          c = Array.prototype.slice.call(arguments, 0),
          i = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
          j = ["opened", "isFocused", "container", "dropdown"],
          k = ["val", "data"],
          l = {
        search: "externalSearch"
      };
      return this.each(function () {
        if (0 === c.length || "object" == _typeof(c[0])) d = 0 === c.length ? {} : a.extend({}, c[0]), d.element = a(this), "select" === d.element.get(0).tagName.toLowerCase() ? h = d.element.prop("multiple") : (h = d.multiple || !1, "tags" in d && (d.multiple = h = !0)), e = h ? new window.Select2["class"].multi() : new window.Select2["class"].single(), e.init(d);else {
          if ("string" != typeof c[0]) throw "Invalid arguments to select2 plugin: " + c;
          if (p(c[0], i) < 0) throw "Unknown method: " + c[0];
          if (g = b, e = a(this).data("select2"), e === b) return;
          if (f = c[0], "container" === f ? g = e.container : "dropdown" === f ? g = e.dropdown : (l[f] && (f = l[f]), g = e[f].apply(e, c.slice(1))), p(c[0], j) >= 0 || p(c[0], k) >= 0 && 1 == c.length) return !1;
        }
      }), g === b ? this : g;
    }, a.fn.select2.defaults = {
      debug: !1,
      width: "copy",
      loadMorePadding: 0,
      closeOnSelect: !0,
      openOnEnter: !0,
      containerCss: {},
      dropdownCss: {},
      containerCssClass: "",
      dropdownCssClass: "",
      formatResult: function formatResult(a, b, c, d) {
        var e = [];
        return E(this.text(a), c.term, e, d), e.join("");
      },
      transformVal: function transformVal(b) {
        return a.trim(b);
      },
      formatSelection: function formatSelection(a, c, d) {
        return a ? d(this.text(a)) : b;
      },
      sortResults: function sortResults(a, b, c) {
        return a;
      },
      formatResultCssClass: function formatResultCssClass(a) {
        return a.css;
      },
      formatSelectionCssClass: function formatSelectionCssClass(a, c) {
        return b;
      },
      minimumResultsForSearch: 0,
      minimumInputLength: 0,
      maximumInputLength: null,
      maximumSelectionSize: 0,
      id: function id(a) {
        return a == b ? null : a.id;
      },
      text: function text(b) {
        return b && this.data && this.data.text ? a.isFunction(this.data.text) ? this.data.text(b) : b[this.data.text] : b.text;
      },
      matcher: function matcher(a, b) {
        return o("" + b).toUpperCase().indexOf(o("" + a).toUpperCase()) >= 0;
      },
      separator: ",",
      tokenSeparators: [],
      tokenizer: M,
      escapeMarkup: F,
      blurOnChange: !1,
      selectOnBlur: !1,
      adaptContainerCssClass: function adaptContainerCssClass(a) {
        return a;
      },
      adaptDropdownCssClass: function adaptDropdownCssClass(a) {
        return null;
      },
      nextSearchTerm: function nextSearchTerm(a, c) {
        return b;
      },
      searchInputPlaceholder: "",
      createSearchChoicePosition: "top",
      shouldFocusInput: function shouldFocusInput(a) {
        var b = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
        return b && a.opts.minimumResultsForSearch < 0 ? !1 : !0;
      }
    }, a.fn.select2.locales = [], a.fn.select2.locales.en = {
      formatMatches: function formatMatches(a) {
        return 1 === a ? "One result is available, press enter to select it." : a + " results are available, use up and down arrow keys to navigate.";
      },
      formatNoMatches: function formatNoMatches() {
        return "No matches found";
      },
      formatAjaxError: function formatAjaxError(a, b, c) {
        return "Loading failed";
      },
      formatInputTooShort: function formatInputTooShort(a, b) {
        var c = b - a.length;
        return "Please enter " + c + " or more character" + (1 == c ? "" : "s");
      },
      formatInputTooLong: function formatInputTooLong(a, b) {
        var c = a.length - b;
        return "Please delete " + c + " character" + (1 == c ? "" : "s");
      },
      formatSelectionTooBig: function formatSelectionTooBig(a) {
        return "You can only select " + a + " item" + (1 == a ? "" : "s");
      },
      formatLoadMore: function formatLoadMore(a) {
        return "Loading more results\u2026";
      },
      formatSearching: function formatSearching() {
        return "Searching\u2026";
      }
    }, a.extend(a.fn.select2.defaults, a.fn.select2.locales.en), a.fn.select2.ajaxDefaults = {
      transport: a.ajax,
      params: {
        type: "GET",
        cache: !1,
        dataType: "json"
      }
    }, window.Select2 = {
      query: {
        ajax: G,
        local: H,
        tags: I
      },
      util: {
        debounce: w,
        markMatch: E,
        escapeMarkup: F,
        stripDiacritics: o
      },
      "class": {
        "abstract": c,
        single: d,
        multi: e
      }
    };
  }
}(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
],[[0,1]]]);