// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"17ZdQ":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ("reload" in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                if (asset.type === "js") {
                    if (typeof document !== "undefined") {
                        let script = document.createElement("script");
                        script.src = asset.url;
                        return new Promise((resolve, reject)=>{
                            var _document$head;
                            script.onload = ()=>resolve(script);
                            script.onerror = reject;
                            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                        });
                    } else if (typeof importScripts === "function") return new Promise((resolve, reject)=>{
                        try {
                            importScripts(asset.url);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
var _litHtml = require("lit-html");
var _searchResults = require("./template/search-results");
class SearchResults {
    constructor(){
        this.paginationOnPage = 10;
        this.spinnerEl = document.querySelector(".qg-search-results__spinner");
        this.siteInput = document.querySelector(".qg-site-search__component .qg-search-site__input");
        this.urlParams = new URLSearchParams(window.location.search);
    }
    parameterMap() {
        return {
            query: this.urlParams.get("query") || "",
            profile: this.urlParams.get("profile") || "",
            label: this.urlParams.get("label") || "",
            filter: this.urlParams.get("filter") || "",
            numRanks: parseInt(this.urlParams.get("num_ranks")) || 0,
            startRank: parseInt(this.urlParams.get("start_rank")) || 1,
            collection: this.urlParams.get("collection") || "",
            scope: this.urlParams.get("scope") || "",
            activePage: parseInt(this.urlParams.get("page")) || 1
        };
    }
    initialize() {
        let queryParam = this.parameterMap().query;
        if (queryParam) {
            this.processData();
            if (this.siteInput) this.siteInput.value = queryParam;
        }
    }
    async fetchData() {
        let params = this.parameterMap();
        this.spinnerEl?.removeAttribute("hidden");
        const response = await fetch(`https://find.search.qld.gov.au/s/search.json?query=${params.query}&num_ranks=${params.numRanks}&tiers=off&collection=${params.collection}&profile=${params.profile}&scope=${params.scope}&start_rank=${params.startRank}`);
        return await response.json();
    }
    processData() {
        this.fetchData().then((data)=>{
            this.spinnerEl?.setAttribute("hidden", "");
            (0, _litHtml.render)((0, _searchResults.searchResultsTemplate)(data.response.resultPacket, this.paginationOnPage, this.parameterMap()), document.getElementById("qg-search-results__container"));
        });
    }
}
const searchResults = new SearchResults();
searchResults.initialize();

},{"lit-html":"1cmQt","./template/search-results":"9HBzr"}],"1cmQt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_$LH", ()=>R);
parcelHelpers.export(exports, "html", ()=>$);
parcelHelpers.export(exports, "noChange", ()=>b);
parcelHelpers.export(exports, "nothing", ()=>w);
parcelHelpers.export(exports, "render", ()=>x);
parcelHelpers.export(exports, "svg", ()=>y);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var t;
const i = globalThis.trustedTypes, s = i ? i.createPolicy("lit-html", {
    createHTML: (t1)=>t1
}) : void 0, e = `lit$${(Math.random() + "").slice(9)}$`, o = "?" + e, n = `<${o}>`, l = document, h = (t2 = "")=>l.createComment(t2), r = (t3)=>null === t3 || "object" != typeof t3 && "function" != typeof t3, d = Array.isArray, u = (t4)=>{
    var i1;
    return d(t4) || "function" == typeof (null === (i1 = t4) || void 0 === i1 ? void 0 : i1[Symbol.iterator]);
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t5)=>(i2, ...s1)=>({
            _$litType$: t5,
            strings: i2,
            values: s1
        }), $ = p(1), y = p(2), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = new WeakMap, x = (t7, i3, s2)=>{
    var e1, o1;
    const n1 = null !== (e1 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e1 ? e1 : i3;
    let l1 = n1._$litPart$;
    if (void 0 === l1) {
        const t6 = null !== (o1 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o1 ? o1 : null;
        n1._$litPart$ = l1 = new N(i3.insertBefore(h(), t6), t6, void 0, null != s2 ? s2 : {});
    }
    return l1._$AI(t7), l1;
}, A = l.createTreeWalker(l, 129, null, !1), C = (t8, i5)=>{
    const o2 = t8.length - 1, l2 = [];
    let h1, r1 = 2 === i5 ? "<svg>" : "", d1 = c;
    for(let i4 = 0; i4 < o2; i4++){
        const s3 = t8[i4];
        let o3, u1, p1 = -1, $1 = 0;
        for(; $1 < s3.length && (d1.lastIndex = $1, u1 = d1.exec(s3), null !== u1);)$1 = d1.lastIndex, d1 === c ? "!--" === u1[1] ? d1 = v : void 0 !== u1[1] ? d1 = a : void 0 !== u1[2] ? (g.test(u1[2]) && (h1 = RegExp("</" + u1[2], "g")), d1 = f) : void 0 !== u1[3] && (d1 = f) : d1 === f ? ">" === u1[0] ? (d1 = null != h1 ? h1 : c, p1 = -1) : void 0 === u1[1] ? p1 = -2 : (p1 = d1.lastIndex - u1[2].length, o3 = u1[1], d1 = void 0 === u1[3] ? f : '"' === u1[3] ? m : _) : d1 === m || d1 === _ ? d1 = f : d1 === v || d1 === a ? d1 = c : (d1 = f, h1 = void 0);
        const y1 = d1 === f && t8[i4 + 1].startsWith("/>") ? " " : "";
        r1 += d1 === c ? s3 + n : p1 >= 0 ? (l2.push(o3), s3.slice(0, p1) + "$lit$" + s3.slice(p1) + e + y1) : s3 + e + (-2 === p1 ? (l2.push(void 0), i4) : y1);
    }
    const u2 = r1 + (t8[o2] || "<?>") + (2 === i5 ? "</svg>" : "");
    if (!Array.isArray(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [
        void 0 !== s ? s.createHTML(u2) : u2,
        l2
    ];
};
class E {
    constructor({ strings: t9 , _$litType$: s4  }, n2){
        let l3;
        this.parts = [];
        let r2 = 0, d2 = 0;
        const u3 = t9.length - 1, c1 = this.parts, [v1, a1] = C(t9, s4);
        if (this.el = E.createElement(v1, n2), A.currentNode = this.el.content, 2 === s4) {
            const t10 = this.el.content, i6 = t10.firstChild;
            i6.remove(), t10.append(...i6.childNodes);
        }
        for(; null !== (l3 = A.nextNode()) && c1.length < u3;){
            if (1 === l3.nodeType) {
                if (l3.hasAttributes()) {
                    const t11 = [];
                    for (const i8 of l3.getAttributeNames())if (i8.endsWith("$lit$") || i8.startsWith(e)) {
                        const s5 = a1[d2++];
                        if (t11.push(i8), void 0 !== s5) {
                            const t12 = l3.getAttribute(s5.toLowerCase() + "$lit$").split(e), i9 = /([.?@])?(.*)/.exec(s5);
                            c1.push({
                                type: 1,
                                index: r2,
                                name: i9[2],
                                strings: t12,
                                ctor: "." === i9[1] ? M : "?" === i9[1] ? H : "@" === i9[1] ? I : S
                            });
                        } else c1.push({
                            type: 6,
                            index: r2
                        });
                    }
                    for (const i7 of t11)l3.removeAttribute(i7);
                }
                if (g.test(l3.tagName)) {
                    const t13 = l3.textContent.split(e), s6 = t13.length - 1;
                    if (s6 > 0) {
                        l3.textContent = i ? i.emptyScript : "";
                        for(let i10 = 0; i10 < s6; i10++)l3.append(t13[i10], h()), A.nextNode(), c1.push({
                            type: 2,
                            index: ++r2
                        });
                        l3.append(t13[s6], h());
                    }
                }
            } else if (8 === l3.nodeType) {
                if (l3.data === o) c1.push({
                    type: 2,
                    index: r2
                });
                else {
                    let t14 = -1;
                    for(; -1 !== (t14 = l3.data.indexOf(e, t14 + 1));)c1.push({
                        type: 7,
                        index: r2
                    }), t14 += e.length - 1;
                }
            }
            r2++;
        }
    }
    static createElement(t15, i) {
        const s7 = l.createElement("template");
        return s7.innerHTML = t15, s7;
    }
}
function P(t16, i15, s8 = t16, e2) {
    var o4, n3, l4, h2;
    if (i15 === b) return i15;
    let d3 = void 0 !== e2 ? null === (o4 = s8._$Cl) || void 0 === o4 ? void 0 : o4[e2] : s8._$Cu;
    const u4 = r(i15) ? void 0 : i15._$litDirective$;
    return (null == d3 ? void 0 : d3.constructor) !== u4 && (null === (n3 = null == d3 ? void 0 : d3._$AO) || void 0 === n3 || n3.call(d3, !1), void 0 === u4 ? d3 = void 0 : (d3 = new u4(t16), d3._$AT(t16, s8, e2)), void 0 !== e2 ? (null !== (l4 = (h2 = s8)._$Cl) && void 0 !== l4 ? l4 : h2._$Cl = [])[e2] = d3 : s8._$Cu = d3), void 0 !== d3 && (i15 = P(t16, d3._$AS(t16, i15.values), d3, e2)), i15;
}
class V {
    constructor(t17, i16){
        this.v = [], this._$AN = void 0, this._$AD = t17, this._$AM = i16;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    p(t18) {
        var i17;
        const { el: { content: s9  } , parts: e3  } = this._$AD, o5 = (null !== (i17 = null == t18 ? void 0 : t18.creationScope) && void 0 !== i17 ? i17 : l).importNode(s9, !0);
        A.currentNode = o5;
        let n4 = A.nextNode(), h3 = 0, r3 = 0, d4 = e3[0];
        for(; void 0 !== d4;){
            if (h3 === d4.index) {
                let i18;
                2 === d4.type ? i18 = new N(n4, n4.nextSibling, this, t18) : 1 === d4.type ? i18 = new d4.ctor(n4, d4.name, d4.strings, this, t18) : 6 === d4.type && (i18 = new L(n4, this, t18)), this.v.push(i18), d4 = e3[++r3];
            }
            h3 !== (null == d4 ? void 0 : d4.index) && (n4 = A.nextNode(), h3++);
        }
        return o5;
    }
    m(t19) {
        let i19 = 0;
        for (const s10 of this.v)void 0 !== s10 && (void 0 !== s10.strings ? (s10._$AI(t19, s10, i19), i19 += s10.strings.length - 2) : s10._$AI(t19[i19])), i19++;
    }
}
class N {
    constructor(t20, i20, s11, e4){
        var o6;
        this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t20, this._$AB = i20, this._$AM = s11, this.options = e4, this._$Cg = null === (o6 = null == e4 ? void 0 : e4.isConnected) || void 0 === o6 || o6;
    }
    get _$AU() {
        var t21, i21;
        return null !== (i21 = null === (t21 = this._$AM) || void 0 === t21 ? void 0 : t21._$AU) && void 0 !== i21 ? i21 : this._$Cg;
    }
    get parentNode() {
        let t22 = this._$AA.parentNode;
        const i22 = this._$AM;
        return void 0 !== i22 && 11 === t22.nodeType && (t22 = i22.parentNode), t22;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t23, i23 = this) {
        t23 = P(this, t23, i23), r(t23) ? t23 === w || null == t23 || "" === t23 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t23 !== this._$AH && t23 !== b && this.$(t23) : void 0 !== t23._$litType$ ? this.T(t23) : void 0 !== t23.nodeType ? this.k(t23) : u(t23) ? this.S(t23) : this.$(t23);
    }
    M(t24, i24 = this._$AB) {
        return this._$AA.parentNode.insertBefore(t24, i24);
    }
    k(t25) {
        this._$AH !== t25 && (this._$AR(), this._$AH = this.M(t25));
    }
    $(t26) {
        this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t26 : this.k(l.createTextNode(t26)), this._$AH = t26;
    }
    T(t27) {
        var i25;
        const { values: s12 , _$litType$: e5  } = t27, o7 = "number" == typeof e5 ? this._$AC(t27) : (void 0 === e5.el && (e5.el = E.createElement(e5.h, this.options)), e5);
        if ((null === (i25 = this._$AH) || void 0 === i25 ? void 0 : i25._$AD) === o7) this._$AH.m(s12);
        else {
            const t28 = new V(o7, this), i26 = t28.p(this.options);
            t28.m(s12), this.k(i26), this._$AH = t28;
        }
    }
    _$AC(t29) {
        let i27 = T.get(t29.strings);
        return void 0 === i27 && T.set(t29.strings, i27 = new E(t29)), i27;
    }
    S(t30) {
        d(this._$AH) || (this._$AH = [], this._$AR());
        const i28 = this._$AH;
        let s13, e6 = 0;
        for (const o8 of t30)e6 === i28.length ? i28.push(s13 = new N(this.M(h()), this.M(h()), this, this.options)) : s13 = i28[e6], s13._$AI(o8), e6++;
        e6 < i28.length && (this._$AR(s13 && s13._$AB.nextSibling, e6), i28.length = e6);
    }
    _$AR(t31 = this._$AA.nextSibling, i29) {
        var s14;
        for(null === (s14 = this._$AP) || void 0 === s14 || s14.call(this, !1, !0, i29); t31 && t31 !== this._$AB;){
            const i30 = t31.nextSibling;
            t31.remove(), t31 = i30;
        }
    }
    setConnected(t32) {
        var i31;
        void 0 === this._$AM && (this._$Cg = t32, null === (i31 = this._$AP) || void 0 === i31 || i31.call(this, t32));
    }
}
class S {
    constructor(t33, i32, s15, e7, o9){
        this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t33, this.name = i32, this._$AM = e7, this.options = o9, s15.length > 2 || "" !== s15[0] || "" !== s15[1] ? (this._$AH = Array(s15.length - 1).fill(new String), this.strings = s15) : this._$AH = w;
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t34, i33 = this, s16, e9) {
        const o10 = this.strings;
        let n5 = !1;
        if (void 0 === o10) t34 = P(this, t34, i33, 0), n5 = !r(t34) || t34 !== this._$AH && t34 !== b, n5 && (this._$AH = t34);
        else {
            const e8 = t34;
            let l5, h4;
            for(t34 = o10[0], l5 = 0; l5 < o10.length - 1; l5++)h4 = P(this, e8[s16 + l5], i33, l5), h4 === b && (h4 = this._$AH[l5]), n5 || (n5 = !r(h4) || h4 !== this._$AH[l5]), h4 === w ? t34 = w : t34 !== w && (t34 += (null != h4 ? h4 : "") + o10[l5 + 1]), this._$AH[l5] = h4;
        }
        n5 && !e9 && this.C(t34);
    }
    C(t35) {
        t35 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t35 ? t35 : "");
    }
}
class M extends S {
    constructor(){
        super(...arguments), this.type = 3;
    }
    C(t36) {
        this.element[this.name] = t36 === w ? void 0 : t36;
    }
}
const k = i ? i.emptyScript : "";
class H extends S {
    constructor(){
        super(...arguments), this.type = 4;
    }
    C(t37) {
        t37 && t37 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
}
class I extends S {
    constructor(t38, i34, s17, e10, o11){
        super(t38, i34, s17, e10, o11), this.type = 5;
    }
    _$AI(t39, i35 = this) {
        var s18;
        if ((t39 = null !== (s18 = P(this, t39, i35, 0)) && void 0 !== s18 ? s18 : w) === b) return;
        const e11 = this._$AH, o12 = t39 === w && e11 !== w || t39.capture !== e11.capture || t39.once !== e11.once || t39.passive !== e11.passive, n6 = t39 !== w && (e11 === w || o12);
        o12 && this.element.removeEventListener(this.name, this, e11), n6 && this.element.addEventListener(this.name, this, t39), this._$AH = t39;
    }
    handleEvent(t40) {
        var i36, s19;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s19 = null === (i36 = this.options) || void 0 === i36 ? void 0 : i36.host) && void 0 !== s19 ? s19 : this.element, t40) : this._$AH.handleEvent(t40);
    }
}
class L {
    constructor(t41, i37, s20){
        this.element = t41, this.type = 6, this._$AN = void 0, this._$AM = i37, this.options = s20;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t42) {
        P(this, t42);
    }
}
const R = {
    L: "$lit$",
    P: e,
    V: o,
    I: 1,
    N: C,
    R: V,
    j: u,
    D: P,
    H: N,
    F: S,
    O: H,
    W: I,
    B: M,
    Z: L
}, z = window.litHtmlPolyfillSupport;
null == z || z(E, N), (null !== (t = globalThis.litHtmlVersions) && void 0 !== t ? t : globalThis.litHtmlVersions = []).push("2.2.5");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"9HBzr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "searchResultsTemplate", ()=>searchResultsTemplate);
var _litHtml = require("lit-html");
function searchResultsTemplate(resultPacket, paginationOnPage, paramMap) {
    const { searchTerm  } = resultPacket.contextualNavigation;
    const { currStart , currEnd , totalMatching  } = resultPacket.resultsSummary;
    const buildHref = `?query=${paramMap.query}&num_ranks=${paramMap.numRanks}&tiers=10&collection=${paramMap.collection}&profile=${paramMap.profile}&second_profile=&scope=${paramMap.scope}&label=`;
    let determineEndPage = function() {
        return paramMap.activePage > paginationOnPage;
    };
    return (0, _litHtml.html)`<div id="qg-search-results">
    <h2 class="qg-search-results__summary">Search results for '${searchTerm}'</h2>
    <span class="qg-search-results__results-count">Showing results ${currStart} - ${currEnd} of ${totalMatching}</span>
        <ul class="qg-search-results__results-list">
            ${resultPacket.results.map((result)=>(0, _litHtml.html)`
                <li class="qg-search-results__results-list-item"><h3><a
                        href="https://find.search.qld.gov.au/s/redirect?collection=qld-gov&amp;url=https%3A%2F%2Fwww.qld.gov.au%2Fjobs&amp;auth=O56U7a56%2BWuOaUDwHIcDzQ&amp;profile=qld&amp;rank=1&amp;query=jobs">${result.title}</a>
                </h3>
                    <ul class="qg-search-results__results-list">
                        <li class="description"> ${result.metaData.C}</li>
                        <li class="meta"><span class="qg-search-results__url">${result.indexUrl}</span> - <span
                                class="file-size">${result.fileSize}</span> - <span
                                class="date-updated">${result.date}</span></li>
                    </ul>
                </li>`)}
        </ul>
    </div> 
    <div class="pagination-container">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="${buildHref}&page=${paramMap.activePage - 1}&start_rank=${paramMap.startRank - 10}"><span aria-hidden="true">«</span> Previous</a>
            </li>
       
            ${[
        ...Array(paginationOnPage)
    ].map((value, index)=>{
        if (determineEndPage()) index += paginationOnPage + 1;
        else index += 1;
        let addParam = buildHref + `&page=${index}&start_rank=${paramMap.numRanks * index}`;
        let determineActivePage = paramMap.activePage === index ? "active" : "";
        return (0, _litHtml.html)`
                    <li class="page-item ${determineActivePage}"><a class="page-link" href=${paramMap.activePage !== index ? addParam : ""}>${index}</a>
                    </li>`;
    })}
            <li class="page-item">
                <a class="page-link" href="${buildHref}&page=${paramMap.activePage + 1}&start_rank=${paramMap.startRank + 10}">Next<span aria-hidden="true">&nbsp;»</span></a>
            </li>
        </ul>
    </div>`;
}

},{"lit-html":"1cmQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["17ZdQ","h7u1C"], "h7u1C", "parcelRequire3f6b")

//# sourceMappingURL=index.b71e74eb.js.map