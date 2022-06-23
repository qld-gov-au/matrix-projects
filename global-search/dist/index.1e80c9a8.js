/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const e=globalThis.trustedTypes,s=e?e.createPolicy("lit-html",{createHTML:t=>t}):void 0,i=`lit$${(Math.random()+"").slice(9)}$`,r="?"+i,n=`<${r}>`,l=document,a=(t="")=>l.createComment(t),o=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,h=t=>{var e;return c(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},u=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,d=/-->/g,p=/>/g,$=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,g=/'/g,v=/"/g,_=/^(?:script|style|textarea|title)$/i,m=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),f=m(1),A=(m(2),Symbol.for("lit-noChange")),y=Symbol.for("lit-nothing"),b=new WeakMap,q=(t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let l=n._$litPart$;if(void 0===l){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=l=new w(e.insertBefore(a(),t),t,void 0,null!=s?s:{})}return l._$AI(t),l},k=l.createTreeWalker(l,129,null,!1),S=(t,e)=>{const r=t.length-1,l=[];let a,o=2===e?"<svg>":"",c=u;for(let e=0;e<r;e++){const s=t[e];let r,h,m=-1,f=0;for(;f<s.length&&(c.lastIndex=f,h=c.exec(s),null!==h);)f=c.lastIndex,c===u?"!--"===h[1]?c=d:void 0!==h[1]?c=p:void 0!==h[2]?(_.test(h[2])&&(a=RegExp("</"+h[2],"g")),c=$):void 0!==h[3]&&(c=$):c===$?">"===h[0]?(c=null!=a?a:u,m=-1):void 0===h[1]?m=-2:(m=c.lastIndex-h[2].length,r=h[1],c=void 0===h[3]?$:'"'===h[3]?v:g):c===v||c===g?c=$:c===d||c===p?c=u:(c=$,a=void 0);const A=c===$&&t[e+1].startsWith("/>")?" ":"";o+=c===u?s+n:m>=0?(l.push(r),s.slice(0,m)+"$lit$"+s.slice(m)+i+A):s+i+(-2===m?(l.push(void 0),e):A)}const h=o+(t[r]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==s?s.createHTML(h):h,l]};class H{static createElement(t,e){const s=l.createElement("template");return s.innerHTML=t,s}constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let o=0,c=0;const h=t.length-1,u=this.parts,[d,p]=S(t,s);if(this.el=H.createElement(d,n),k.currentNode=this.el.content,2===s){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(l=k.nextNode())&&u.length<h;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const e of l.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(i)){const s=p[c++];if(t.push(e),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(i),e=/([.?@])?(.*)/.exec(s);u.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?N:"?"===e[1]?C:"@"===e[1]?T:I})}else u.push({type:6,index:o})}for(const e of t)l.removeAttribute(e)}if(_.test(l.tagName)){const t=l.textContent.split(i),s=t.length-1;if(s>0){l.textContent=e?e.emptyScript:"";for(let e=0;e<s;e++)l.append(t[e],a()),k.nextNode(),u.push({type:2,index:++o});l.append(t[s],a())}}}else if(8===l.nodeType)if(l.data===r)u.push({type:2,index:o});else{let t=-1;for(;-1!==(t=l.data.indexOf(i,t+1));)u.push({type:7,index:o}),t+=i.length-1}o++}}}function P(t,e,s=t,i){var r,n,l,a;if(e===A)return e;let c=void 0!==i?null===(r=s._$Cl)||void 0===r?void 0:r[i]:s._$Cu;const h=o(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==h&&(null===(n=null==c?void 0:c._$AO)||void 0===n||n.call(c,!1),void 0===h?c=void 0:(c=new h(t),c._$AT(t,s,i)),void 0!==i?(null!==(l=(a=s)._$Cl)&&void 0!==l?l:a._$Cl=[])[i]=c:s._$Cu=c),void 0!==c&&(e=P(t,c._$AS(t,e.values),c,i)),e}class x{get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:l).importNode(s,!0);k.currentNode=r;let n=k.nextNode(),a=0,o=0,c=i[0];for(;void 0!==c;){if(a===c.index){let e;2===c.type?e=new w(n,n.nextSibling,this,t):1===c.type?e=new c.ctor(n,c.name,c.strings,this,t):6===c.type&&(e=new E(n,this,t)),this.v.push(e),c=i[++o]}a!==(null==c?void 0:c.index)&&(n=k.nextNode(),a++)}return r}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}}class w{get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),o(t)?t===y||null==t||""===t?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==A&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):h(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==y&&o(this._$AH)?this._$AA.nextSibling.data=t:this.k(l.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=H.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.m(s);else{const t=new x(r,this),e=t.p(this.options);t.m(s),this.k(e),this._$AH=t}}_$AC(t){let e=b.get(t.strings);return void 0===e&&b.set(t.strings,e=new H(t)),e}S(t){c(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new w(this.M(a()),this.M(a()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}constructor(t,e,s,i){var r;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=P(this,t,e,0),n=!o(t)||t!==this._$AH&&t!==A,n&&(this._$AH=t);else{const i=t;let l,a;for(t=r[0],l=0;l<r.length-1;l++)a=P(this,i[s+l],e,l),a===A&&(a=this._$AH[l]),n||(n=!o(a)||a!==this._$AH[l]),a===y?t=y:t!==y&&(t+=(null!=a?a:"")+r[l+1]),this._$AH[l]=a}n&&!i&&this.C(t)}C(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}constructor(t,e,s,i,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}}class N extends I{C(t){this.element[this.name]=t===y?void 0:t}constructor(){super(...arguments),this.type=3}}const M=e?e.emptyScript:"";class C extends I{C(t){t&&t!==y?this.element.setAttribute(this.name,M):this.element.removeAttribute(this.name)}constructor(){super(...arguments),this.type=4}}class T extends I{_$AI(t,e=this){var s;if((t=null!==(s=P(this,t,e,0))&&void 0!==s?s:y)===A)return;const i=this._$AH,r=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==y&&(i===y||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}}class E{get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}}const R=window.litHtmlPolyfillSupport;null==R||R(H,w),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.2.6");let B,U,D=t=>t;function L(t){return f(U||(U=D`<h2 class="search-results-summary">Featured results</h2>
    ${0}
  `),t.map(((t,e)=>f(B||(B=D`
                    <article class="qg-card qg-card__light-theme qg-card__clickable">
                        <div class="content">
                            <div class="details">
                                <h2 class="qg-card__title"><a href="https://find.search.qld.gov.au${0}" class="stretched-link">${0}</a></h2>
                                <p>${0}</p>
                            </div>
                        </div>
                    </article>`),t.linkUrl,t.titleHtml,t.descriptionHtml))))}const j=()=>{const t=new URLSearchParams(window.location.search);return{query:t.get("query")||"",profile:t.get("profile")||"",label:t.get("label")||"",filter:t.get("filter")||"",numRanks:parseInt(t.get("num_ranks"))||0,startRank:parseInt(t.get("start_rank"))||1,collection:t.get("collection")||"",scope:t.get("scope")||"",activePage:parseInt(t.get("page"))||1}},O=async t=>{const e=await fetch(""+("https://find.search.qld.gov.au/s/search.json?"+t));return await e.json()};let W,z,F,V,G=t=>t;function Q(t,e){const{resultPacket:s}=t,{totalMatching:i}=s.resultsSummary,r=j(),n=Math.ceil(i/10),l=Math.floor(parseInt(String(r.startRank/10))/10),a=`?query=${r.query}&num_ranks=${r.numRanks||10}&tiers=10&collection=${r.collection}&profile=${r.profile}&second_profile=&scope=${r.scope}&label=`,o=t=>{var e,s;t.preventDefault(),null===(e=document.getElementById("qg-search-results"))||void 0===e||e.scrollIntoView({behavior:"smooth"}),(null===(s=t.target)||void 0===s?void 0:s.href)&&setTimeout((()=>{var e,s;history.pushState({},"",t.target.href),O(null===(e=t.target)||void 0===e||null===(s=e.href)||void 0===s?void 0:s.split("?")[1]).then((t=>{q(it(null==t?void 0:t.response,r),document.getElementById("qg-search-results__container"))}))}))};if(n>1)return f(V||(V=G`
  <div class="pagination-container">
        <ul class="pagination">
            
            <li class="page-item">
                ${0}
            </li>
            ${0}
            <li class="page-item">
                ${0}
            </li>
            
        </ul>
    </div>
  `),r.startRank>1?f(W||(W=G`<a class="page-link"  @click="${0}" href="${0}&page=${0}&start_rank=${0}"><span aria-hidden="true">«</span> Previous</a>`),o,a,r.activePage-1,r.startRank-10):"",(c=10*l+1,h=function(){const t=10*l+10;return n>t?t:Math.ceil(n)}(),Array(h-c+1).fill(c).map(((t,e)=>c+e))).map((t=>{const e=a+`&page=${t}&start_rank=${(r.numRanks||10)*(t-1)+1}`,s=r.activePage===t?"active":"";return f(z||(z=G`<li class="page-item ${0}"><a class="page-link" @click="${0}"  href=${0}>${0}</a></li>`),s,o,e,t)})),n>r.activePage?f(F||(F=G`<a class="page-link" @click="${0}" href="${0}&page=${0}&start_rank=${0}">Next<span aria-hidden="true">&nbsp;»</span></a>`),o,a,r.activePage+1,r.startRank+10):"");var c,h}const Z=t=>{const e=t.toString().split("."),s=e[0],i=e[1];return s.replace(/\B(?=(\d{3})+(?!\d))/g,",")+(i?"."+i:"")},Y=t=>{const e=new Date(t),s=e.toLocaleString("en-AU",{month:"long"}),i=e.getFullYear();return e.getDate()+" "+s+" "+i};let J,K,X=t=>t;function tt(t){const{currStart:e,currEnd:s,totalMatching:i}=t.resultsSummary,{searchTerm:r}=t.contextualNavigation;return f(K||(K=X`<div id="qg-search-results">
        <h2 class="qg-search-results__summary">Search results for '${0}'</h2>
        <span class="qg-search-results__results-count">Showing results ${0} - ${0} of ${0}</span>
        <ul class="qg-search-results__results-list">
            ${0}
        </ul>
    </div>
  `),r,e,s,Z(i),t.results.map((t=>{return f(J||(J=X`
                <li class="qg-search-results__results-list-item">
                    <h3>
                        <a href="https://find.search.qld.gov.au${0}">${0}</a>
                    </h3>
                    <ul class="qg-search-results__results-list">
                        <li class="description"> ${0}</li>
                        <li class="meta"><span class="qg-search-results__url">${0}</span> - <span
                                class="file-size">${0}</span> - <span
                                class="date-updated">${0}</span></li>
                    </ul>
                </li>`),t.clickTrackingUrl,t.title.replace("| Queensland Government",""),t.metaData.C,t.indexUrl,(e=t.fileSize,Math.floor(e/1024)+"k"),Y(t.date));var e})))}let et,st=t=>t;function it(t,e){const{resultPacket:s,curator:i}=t,{exhibits:r}=i;return f(et||(et=st`
        ${0}
        ${0}
        ${0}
    `),r.length>0?L(r):"",tt(s),Q(t))}let rt,nt,lt=t=>t;function at(){let t="";j();const e=sessionStorage.getItem("fcLabel"),s=sessionStorage.getItem("fcProfile"),i=sessionStorage.getItem("fcScope"),r=t=>t.charAt(0).toUpperCase()+t.slice(1),n=t=>{const e=t.target.value;switch(e){case"qld":case"custom":sessionStorage.setItem("rcSelectedRadiobutton",e)}};return e?t=r(e):i?t=f(rt||(rt=lt`Results from <strong>${0}</strong>`),i):s&&(t=r(s)),window.addEventListener("load",(t=>{const e=document.querySelector(".qg-btn__filter");null==e||e.addEventListener("click",(t=>{})),null==e||e.dispatchEvent(new Event("click"))})),f(nt||(nt=lt`<div class="qg-filter-by-results">
              <p class="qg-filter-by-results__title">Filter results by</p>
              <form class="form qg-forms-v2 qg-filter-by-results__form">
              <ol class="questions pt-2">
                <li>
                  <fieldset>
                    <legend>
                      <span class="label">Content type</span>
                    </legend>
                    <ol class="choices qg-forms-v2__radio">
                      <li>
                        <input checked name="filterBy" id="customOption" type="radio" value="custom"
                               data-scope="${0}" 
                               data-profile="${0}"
                               data-label="${0}" @click="${0}" />
                        <label for="customOption">${0}</label>
                      </li>
                      <li>
                        <input name="filterBy" id="qld" type="radio" value="qld" data-profile='qld' data-scope='' @click="${0}" ?checked=${0}/>
                        <label for="qld">all Queensland Government</label>
                      </li>
                    </ol>
                  </fieldset>
                </li>
              </ol>
            </form>
            <button type="button" class="qg-btn qg-btn__filter btn-primary mb-2" @click="${0}">Apply filters</button>
           </div>`),i,s,e,n,t,n,"qld"===sessionStorage.getItem("rcSelectedRadiobutton"),(t=>{t.preventDefault();const e=new URLSearchParams(location.search),s=document.querySelector('input[name="filterBy"]:checked');e.set("scope",(null==s?void 0:s.getAttribute("data-scope"))||""),e.set("profile",(null==s?void 0:s.getAttribute("data-profile"))||""),e.set("page","1"),e.set("start_rank","1"),history.pushState({},"",`?${e.toString()}`),O(e.toString()).then((t=>{q(it(null==t?void 0:t.response),document.getElementById("qg-search-results__container"))}))}))}let ot,ct,ht=t=>t;function ut(t){var e,s;const{categories:i}=t;if("topic"===(null===(e=i[0])||void 0===e?void 0:e.name))return f(ct||(ct=ht` <p class="related-search__title">Related search</p>
        <section class="related-search__tags test">
            ${0}
        </section>`),null===(s=i[0])||void 0===s?void 0:s.clusters.map((t=>f(ot||(ot=ht`<a href="${0}&start_rank=1" class="qg-btn btn-outline-dark m-1">${0}</a>`),t.href,t.query))))}new class{setSessionStorage(){const t=this.urlParameter.profile,e=this.urlParameter.scope,s=this.urlParameter.label;t&&("qld"!==t||e)&&(sessionStorage.setItem("fcProfile",t),sessionStorage.setItem("fcScope",e)),s&&sessionStorage.setItem("fcLabel",s)}filterResultsTemplate(){const t=this.urlParameter.profile;(this.urlParameter.filter||t&&"qld"!==t||this.urlParameter.scope)&&q(at(),document.getElementById("qg-filter-by-results"))}constructor(){this.urlParameter=j(),this.setSessionStorage(),this.filterResultsTemplate()}},new class{async fetchData(){var t;null===(t=this.spinnerEl)||void 0===t||t.removeAttribute("hidden");const e=await fetch(`${this.funnelbackApiUrl}?query=${this.urlParameter.query}&num_ranks=${this.urlParameter.numRanks}&tiers=off&collection=${this.urlParameter.collection}&profile=${this.urlParameter.profile}&scope=${this.urlParameter.scope}&start_rank=${this.urlParameter.startRank}`);return await e.json()}processData(){this.fetchData().then((t=>{var e,s,i;null===(e=this.spinnerEl)||void 0===e||e.setAttribute("hidden",""),q(it(null==t?void 0:t.response,this.urlParameter),document.getElementById("qg-search-results__container")),q(ut(null==t||null===(s=t.response)||void 0===s||null===(i=s.resultPacket)||void 0===i?void 0:i.contextualNavigation),document.getElementById("related-search__tags"))}))}constructor(){this.urlParameter=j(),this.funnelbackApiUrl="https://find.search.qld.gov.au/s/search.json",this.spinnerEl=document.querySelector(".qg-search-results__spinner"),this.siteInput=document.querySelector(".qg-site-search__component .qg-search-site__input");const t=this.urlParameter.query;t&&(this.processData(),this.siteInput&&(this.siteInput.value=t))}};
//# sourceMappingURL=index.1e80c9a8.js.map