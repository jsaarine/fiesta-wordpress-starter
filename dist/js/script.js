// console.log
window.console=window.console||{log:function(){}};

// classList.js
if("document"in self){if(!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))){(function(t){"use strict";if(!("Element"in t))return;var e="classList",i="prototype",n=t.Element[i],s=Object,r=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[i].indexOf||function(t){var e=0,i=this.length;for(;e<i;e++){if(e in this&&this[e]===t){return e}}return-1},o=function(t,e){this.name=t;this.code=DOMException[t];this.message=e},l=function(t,e){if(e===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(e)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")}return a.call(t,e)},c=function(t){var e=r.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],n=0,s=i.length;for(;n<s;n++){this.push(i[n])}this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=c[i]=[],f=function(){return new c(this)};o[i]=Error[i];u.item=function(t){return this[t]||null};u.contains=function(t){t+="";return l(this,t)!==-1};u.add=function(){var t=arguments,e=0,i=t.length,n,s=false;do{n=t[e]+"";if(l(this,n)===-1){this.push(n);s=true}}while(++e<i);if(s){this._updateClassName()}};u.remove=function(){var t=arguments,e=0,i=t.length,n,s=false,r;do{n=t[e]+"";r=l(this,n);while(r!==-1){this.splice(r,1);s=true;r=l(this,n)}}while(++e<i);if(s){this._updateClassName()}};u.toggle=function(t,e){t+="";var i=this.contains(t),n=i?e!==true&&"remove":e!==false&&"add";if(n){this[n](t)}if(e===true||e===false){return e}else{return!i}};u.toString=function(){return this.join(" ")};if(s.defineProperty){var h={get:f,enumerable:true,configurable:true};try{s.defineProperty(n,e,h)}catch(d){if(d.number===-2146823252){h.enumerable=false;s.defineProperty(n,e,h)}}}else if(s[i].__defineGetter__){n.__defineGetter__(e,f)}})(self)}else{(function(){"use strict";var t=document.createElement("_");t.classList.add("c1","c2");if(!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,n=arguments.length;for(i=0;i<n;i++){t=arguments[i];e.call(this,t)}}};e("add");e("remove")}t.classList.toggle("c3",false);if(t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){if(1 in arguments&&!this.contains(t)===!e){return e}else{return i.call(this,t)}}}t=null})()}}

// matchMedia.js
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css",t.id="matchmediajs-test",i.parentNode.insertBefore(t,i),n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=i:t.textContent=i,"1px"===n.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());

// CustomEvent
!function(){if("undefined"!=typeof window)try{var e=new window.CustomEvent("test",{cancelable:!0});if(e.preventDefault(),!0!==e.defaultPrevented)throw new Error("Could not prevent default")}catch(e){var t=function(e,t){var n,r;return t=t||{bubbles:!1,cancelable:!1,detail:void 0},(n=document.createEvent("CustomEvent")).initCustomEvent(e,t.bubbles,t.cancelable,t.detail),r=n.preventDefault,n.preventDefault=function(){r.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(e){this.defaultPrevented=!0}},n};t.prototype=window.Event.prototype,window.CustomEvent=t}}();

// NodeList.forEach
window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(o,t){t=t||window;for(var i=0;i<this.length;i++)o.call(t,this[i],i,this)});

// element-closest
"function"!=typeof Element.prototype.matches&&(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.webkitMatchesSelector||function(b){for(var c=this,d=(c.document||c.ownerDocument).querySelectorAll(b),e=0;d[e]&&d[e]!==c;)++e;return Boolean(d[e])}),"function"!=typeof Element.prototype.closest&&(Element.prototype.closest=function(b){for(var c=this;c&&1===c.nodeType;){if(c.matches(b))return c;c=c.parentNode}return null});

// rAF.js
!function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();

// smoothscroll
!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){var l,e,r,i;do{l=(o=o.parentNode)===t.body}while(!1===l&&!1===(r=p(e=o,"Y")&&a(e,"Y"),i=p(e,"X")&&a(e,"X"),r||i));return l=null,o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();

// IntersectionObserver
!function(f,_){"use strict";if("IntersectionObserver"in f&&"IntersectionObserverEntry"in f&&"intersectionRatio"in f.IntersectionObserverEntry.prototype)"isIntersecting"in f.IntersectionObserverEntry.prototype||Object.defineProperty(f.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var e=[];t.prototype.THROTTLE_TIMEOUT=100,t.prototype.POLL_INTERVAL=null,t.prototype.USE_MUTATION_OBSERVER=!0,t.prototype.observe=function(e){if(!this._observationTargets.some(function(t){return t.element==e})){if(!e||1!=e.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:e,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},t.prototype.unobserve=function(e){this._observationTargets=this._observationTargets.filter(function(t){return t.element!=e}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},t.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},t.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},t.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||1<t)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},t.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},t.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(n(f,"resize",this._checkForIntersections,!0),n(_,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in f&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(_,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},t.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,o(f,"resize",this._checkForIntersections,!0),o(_,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},t.prototype._checkForIntersections=function(){var h=this._rootIsInDom(),c=h?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(t){var e=t.element,n=m(e),o=this._rootContainsTarget(e),i=t.entry,r=h&&o&&this._computeTargetAndRootIntersection(e,c),s=t.entry=new a({time:f.performance&&performance.now&&performance.now(),target:e,boundingClientRect:n,rootBounds:c,intersectionRect:r});i?h&&o?this._hasCrossedThreshold(i,s)&&this._queuedEntries.push(s):i&&i.isIntersecting&&this._queuedEntries.push(s):this._queuedEntries.push(s)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},t.prototype._computeTargetAndRootIntersection=function(t,e){if("none"!=f.getComputedStyle(t).display){for(var n,o,i,r,s,h,c,a,u=m(t),l=v(t),p=!1;!p;){var d=null,g=1==l.nodeType?f.getComputedStyle(l):{};if("none"==g.display)return;if(l==this.root||l==_?(p=!0,d=e):l!=_.body&&l!=_.documentElement&&"visible"!=g.overflow&&(d=m(l)),d&&(n=d,o=u,void 0,i=Math.max(n.top,o.top),r=Math.min(n.bottom,o.bottom),s=Math.max(n.left,o.left),h=Math.min(n.right,o.right),a=r-i,!(u=0<=(c=h-s)&&0<=a&&{top:i,bottom:r,left:s,right:h,width:c,height:a})))break;l=v(l)}return u}},t.prototype._getRootRect=function(){var t;if(this.root)t=m(this.root);else{var e=_.documentElement,n=_.body;t={top:0,left:0,right:e.clientWidth||n.clientWidth,width:e.clientWidth||n.clientWidth,bottom:e.clientHeight||n.clientHeight,height:e.clientHeight||n.clientHeight}}return this._expandRectByRootMargin(t)},t.prototype._expandRectByRootMargin=function(n){var t=this._rootMarginValues.map(function(t,e){return"px"==t.unit?t.value:t.value*(e%2?n.width:n.height)/100}),e={top:n.top-t[0],right:n.right+t[1],bottom:n.bottom+t[2],left:n.left-t[3]};return e.width=e.right-e.left,e.height=e.bottom-e.top,e},t.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==n||r==o||r<n!=r<o)return!0}},t.prototype._rootIsInDom=function(){return!this.root||i(_,this.root)},t.prototype._rootContainsTarget=function(t){return i(this.root||_,t)},t.prototype._registerInstance=function(){e.indexOf(this)<0&&e.push(this)},t.prototype._unregisterInstance=function(){var t=e.indexOf(this);-1!=t&&e.splice(t,1)},f.IntersectionObserver=t,f.IntersectionObserverEntry=a}function a(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?Number((i/n).toFixed(4)):this.isIntersecting?1:0}function t(t,e){var n,o,i,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),o=this.THROTTLE_TIMEOUT,i=null,function(){i||(i=setTimeout(function(){n(),i=null},o))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function n(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function o(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function m(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function i(t,e){for(var n=e;n;){if(n==t)return!0;n=v(n)}return!1}function v(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e&&e.assignedSlot?e.assignedSlot.parentNode:e}}(window,document);

// promise-polyfill (taylorhakes)
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(){}function n(e){if(!(this instanceof n))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],f(e,this)}function t(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,n._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(f){return void r(t.promise,f)}o(t.promise,i)}else(1===e._state?o:r)(t.promise,e._value)})):e._deferreds.push(t)}function o(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var o=t.then;if(t instanceof n)return e._state=3,e._value=t,void i(e);if("function"==typeof o)return void f(function(e,n){return function(){e.apply(n,arguments)}}(o,t),e)}e._state=1,e._value=t,i(e)}catch(u){r(e,u)}}function r(e,n){e._state=2,e._value=n,i(e)}function i(e){2===e._state&&0===e._deferreds.length&&n._immediateFn(function(){e._handled||n._unhandledRejectionFn(e._value)});for(var o=0,r=e._deferreds.length;r>o;o++)t(e,e._deferreds[o]);e._deferreds=null}function f(e,n){var t=!1;try{e(function(e){t||(t=!0,o(n,e))},function(e){t||(t=!0,r(n,e))})}catch(i){if(t)return;t=!0,r(n,i)}}var u=function(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},c=setTimeout;n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(n,o){var r=new this.constructor(e);return t(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(n,o,r)),r},n.prototype["finally"]=u,n.all=function(e){return new n(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(n){n(e)})},n.reject=function(e){return new n(function(n,t){t(e)})},n.race=function(e){return new n(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},n._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},n._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();l.Promise?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=u):l.Promise=n});

// whatwg-fetch
!function(t){"use strict";if(!t.fetch){var e="URLSearchParams"in t,r="Symbol"in t&&"iterator"in Symbol,s="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),o="FormData"in t,n="ArrayBuffer"in t;if(n)var i=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],a=function(t){return t&&DataView.prototype.isPrototypeOf(t)},h=ArrayBuffer.isView||function(t){return t&&-1<i.indexOf(Object.prototype.toString.call(t))};l.prototype.append=function(t,e){t=d(t),e=y(e);var r=this.map[t];this.map[t]=r?r+","+e:e},l.prototype.delete=function(t){delete this.map[d(t)]},l.prototype.get=function(t){return t=d(t),this.has(t)?this.map[t]:null},l.prototype.has=function(t){return this.map.hasOwnProperty(d(t))},l.prototype.set=function(t,e){this.map[d(t)]=y(e)},l.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},l.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),p(r)},l.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),p(e)},l.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),p(r)},r&&(l.prototype[Symbol.iterator]=l.prototype.entries);var u=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},v.call(_.prototype),v.call(B.prototype),B.prototype.clone=function(){return new B(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new l(this.headers),url:this.url})},B.error=function(){var t=new B(null,{status:0,statusText:""});return t.type="error",t};var f=[301,302,303,307,308];B.redirect=function(t,e){if(-1===f.indexOf(e))throw new RangeError("Invalid status code");return new B(null,{status:e,headers:{location:t}})},t.Headers=l,t.Request=_,t.Response=B,t.fetch=function(r,n){return new Promise(function(o,t){var e=new _(r,n),i=new XMLHttpRequest;i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new l,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new B(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials?i.withCredentials=!0:"omit"===e.credentials&&(i.withCredentials=!1),"responseType"in i&&s&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function d(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function y(t){return"string"!=typeof t&&(t=String(t)),t}function p(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r&&(t[Symbol.iterator]=function(){return t}),t}function l(e){this.map={},e instanceof l?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function c(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function b(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function m(t){var e=new FileReader,r=b(e);return e.readAsArrayBuffer(t),r}function w(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(o&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(e&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(n&&s&&a(t))this._bodyArrayBuffer=w(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!n||!ArrayBuffer.prototype.isPrototypeOf(t)&&!h(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=w(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):e&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s&&(this.blob=function(){var t=c(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?c(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(m)}),this.text=function(){var t,e,r,o=c(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=b(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},o&&(this.formData=function(){return this.text().then(A)}),this.json=function(){return this.text().then(JSON.parse)},this}function _(t,e){var r,o,n=(e=e||{}).body;if(t instanceof _){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new l(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new l(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<u.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function A(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function B(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new l(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:this);
var cookieConsent;

(function () {

    var n = cookieConsent = function(props) {
        var css = ".cookie-consent {position: fixed; bottom: 0; left: 0; width: 100%; background: #eee; z-index: 10000; padding: .8em 1em; display: none; } .cookie-consent > .inner { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; } @media (max-width: 640px) { .cookie-consent > .inner { flex-direction: column; } } .cookie-consent p {margin: 0 0 1em 0; font-size: 0.875em; line-height: 1.25; } @media (min-width: 641px) { .cookie-consent p { padding-right: 1.5625em; margin-bottom: 0; } } .cookie-consent a {text-decoration: underline; } .cookie-consent button {margin: 0; cursor: pointer; padding: .4em 1.5em; border: none; white-space: nowrap; background: #000; color: #fff; font-size: .875em; }";
        var text = props.text ? props.text : "";
        var linkText = props.linkText ? props.linkText : "";
        var linkUrl = props.linkUrl ? props.linkUrl : "";
        var buttonText = props.buttonText ? props.buttonText : "";
        n.cookieName = props.cookieName ? props.cookieName : "cookie-consent";

        var el = document.createElement("div");
        el.classList.add("cookie-consent");
        el.innerHTML = '<div class="inner"><p>' + text + ' <a href="' + linkUrl + '">' + linkText + '</a></p><button class="button">' + buttonText + '</button></div>';

        var style = document.createElement("style");
        style.innerHTML = css;

        el.appendChild(style);
        document.querySelector("body").appendChild(el);

        if(!n.hasConsent()) {
            el.style.display = "block";
        }

        el.querySelector("button").addEventListener("click", function(e) {
            n.createCookie(n.cookieName, 1, 365);
            el.style.display = "none";
        });
    }

    n.hasConsent = function() {
        return n.readCookie(n.cookieName) == "1";
    }

    n.createCookie = function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    n.readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');

        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
    }
    
})();

"use strict";

function Core(selector, container) {
  return typeof selector === "string" ? (container || document).querySelector(selector) : selector || null;
}

Core.setup = function () {
  var _this = this;

  this.ready(function () {
    _this.breakpoints = {
      smallMax: _this.getVariable("breakpoints-small-max"),
      medium: _this.getVariable("breakpoints-medium"),
      mediumMax: _this.getVariable("breakpoints-medium-max"),
      large: _this.getVariable("breakpoints-large"),
      largeMax: _this.getVariable("breakpoints-large-max"),
      xlarge: _this.getVariable("breakpoints-xlarge")
    };
  });
};

Core.$$ = function (selector, container) {
  return typeof selector === "string" ? (container || document).querySelectorAll(selector) : selector || null;
};
/*Core.array = function(selector, container) {
	return [].slice.call(Core.$$(selector, container));
}*/

/*Core.$$ = function(selector, container) {
	return [].slice.call((container || document).querySelectorAll(selector));
	// return [].slice.call((container === undefined ? document : container).querySelectorAll(selector));
}*/


Core.ready = function (fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

Core.initVariable = function (name) {
  var el = document.querySelector("head").appendChild(document.createElement("meta"));
  el.classList.add(name);
};

Core.getVariable = function (name) {
  if (document.querySelector("meta." + name) == null) {
    this.initVariable(name);
  }

  var getCompStyle = getComputedStyle(document.querySelector("meta." + name));

  if (getCompStyle && getCompStyle["font-family"]) {
    return getCompStyle["font-family"].replace(/["']/g, "");
  }
};

Core.scrollTo = function (el, options) {
  var offset = !options || options.offset === undefined ? 0 : options.offset;
  var onScreen = !options || options.onScreen === undefined ? false : options.onScreen;
  var top = el.getBoundingClientRect().top;

  if (!onScreen || top < offset || top > window.innerHeight) {
    var pos = top + Core.scrollTop() - offset;
    window.scroll({
      top: pos,
      left: 0,
      behavior: "smooth"
    });
  }
};

Core.scrollTop = function () {
  return document.documentElement.scrollTop || document.body.scrollTop;
};

Core.index = function (el) {
  var index = 0;

  while (el = el.previousElementSibling) {
    index++;
  }

  return index;
};

Core.trigger = function (el, name) {
  var event = document.createEvent("HTMLEvents");
  event.initEvent(name, true, false);
  el.dispatchEvent(event);
};

Core.animate = function (el, duration, props) {
  var old = el.style.transition;
  var oldWebkit = el.style.webkitTransition;
  var transition = "";
  var webkitTransition = "";
  var count = 0;
  var counter = 0;
  var easing = props.ease || "linear";
  var delay = props.delay || 0;
  var complete = props.complete || null;

  for (var key in props) {
    if (key == "ease" || key == "delay" || key == "complete") {
      delete props[key];
      continue;
    }

    var str = key.replace(/([a-z])([A-Z])/g, "$1-$2");
    var tmp = str.toLowerCase() + " " + duration + "s " + easing + " " + delay + "s, ";
    transition += tmp;
    count++;

    if (str.slice(0, 9) == "transform") {
      str = "-webkit-" + str;
      webkitTransition += str.toLowerCase() + " " + duration + "s " + easing + " " + delay + "s, ";
    } else {
      webkitTransition += tmp;
    }
  }

  el.style.webkitTransition = webkitTransition.substring(0, webkitTransition.length - 2);
  el.style.transition = transition.substring(0, transition.length - 2);

  for (var key in props) {
    var str = key.replace(/([a-z])([A-Z])/g, "$1-$2");
    el.style[key] = props[key];

    if (str.slice(0, 9) == "transform") {
      el.style["-webkit-" + key] = props[key];
    }
  }

  el.addEventListener("transitionend", end);
  el.addEventListener("webkitTransitionEnd", end);
  var t = setTimeout(end2, duration * 1000 + delay * 1000 + 50);

  function end(e) {
    if (++counter < count || e.target != e.currentTarget) {
      return false;
    }

    clearTimeout(t);
    counter = 0;
    end2();
  }

  function end2() {
    el.removeEventListener("transitionend", end);
    el.removeEventListener("webkitTransitionEnd", end);
    el.style.transition = old;
    el.style.webkitTransition = oldWebkit;

    if (complete) {
      complete.call();
    }
  }
};

Core.fetch = function (url, props) {
  if (!url) {
    return false;
  }

  var data = props.data || "";

  var cb = props.callback || function () {};

  var ecb = props.errorCallback || function () {};

  var method = props.method || "GET";
  var headers = props.headers || {};
  var dataType = props.dataType || "text";
  var xhr = new XMLHttpRequest();

  if (!xhr) {
    return false;
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) if (xhr.status === 200) {
      var response = xhr.responseText;

      if (dataType == "json") {
        try {
          cb(JSON.parse(response));
        } catch (err) {
          console.error(err);
        }
      } else {
        cb(response);
      }
    } else {
      ecb(xhr.status, xhr.responseText);
    }
  };

  xhr.open(method, url);

  if (!headers["Content-Type"]) {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }

  for (var property in headers) {
    if (headers.hasOwnProperty(property)) {
      xhr.setRequestHeader(property, headers[property]);
    }
  }

  xhr.send(data);
};

Core.slideToggle = function (el) {
  var height = el.offsetHeight; // var padding = parseInt(getComputedStyle(el)["padding-top"], 10) + parseInt(getComputedStyle(el)["padding-bottom"], 10);

  if (height > 0) {
    el.style.height = height + "px";
    void el.offsetWidth;
    el.style.height = "0";
  } else {
    el.style.height = "auto";
    height = el.offsetHeight;
    el.style.height = "0";
    void el.offsetWidth;
    el.style.height = height + "px";
    el.addEventListener("transitionend", onEnd);
    el.addEventListener("webkitTransitionEnd", onEnd);
  }

  function onEnd() {
    if (el.offsetHeight > 0) {
      el.style.height = "auto";
    }

    el.removeEventListener("transitionend", onEnd);
    el.removeEventListener("webkitTransitionEnd", onEnd);
  }
};

Core.createVideo = function (el) {
  var source = el.querySelector("source");
  source.setAttribute("src", source.getAttribute("data-src"));
  source.setAttribute("data-src", "");
  el.load();
}; // Initialize Core


Core.setup(); // Add global shortcuts

var $$ = Core.$$;

if (!(typeof $ != "undefined")) {
  var $ = Core;
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Header = /*#__PURE__*/function () {
  function Header(el) {
    var _this = this;

    _classCallCheck(this, Header);

    this.el = el;
    this.oldScroll = 0;
    this.firstLoad = true;
    this.threshold = 0;
    window.addEventListener("scroll", function (e) {
      _this.update();
    });
    this.update();
  }

  _createClass(Header, [{
    key: "update",
    value: function update() {
      var top = Core.scrollTop(); // Small (header is visible but smaller when scrolling)

      if (top > this.threshold) {
        this.el.classList.add("m-small");
      } else {
        this.el.classList.remove("m-small");
      } // Hidden (header is hidden when scrolling down)


      if (Math.abs(top - this.oldScroll) > 20) {
        if (this.oldScroll > top) {
          this.el.classList.remove("m-hidden");
        } else {
          if (top > this.threshold && !this.firstLoad) {
            this.el.classList.add("m-hidden");
          }
        }

        this.oldScroll = top;
      }

      this.firstLoad = false;
    }
  }]);

  return Header;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Navigation = /*#__PURE__*/function () {
  function Navigation(el) {
    _classCallCheck(this, Navigation);

    this.el = el;
    this.parentIsLink = true;
    this.showActiveMenu = false;
    this.toggleButton = document.querySelector("#nav-button");
    this.closeButton = document.querySelector("#nav-close");
    this.build();
  }

  _createClass(Navigation, [{
    key: "build",
    value: function build() {
      var _this = this;

      this.toggleButton.addEventListener("click", function (e) {
        if (!document.documentElement.classList.contains("m-nav-open")) {
          _this.open();
        } else {
          _this.close();
        }
      });
      this.closeButton.addEventListener("click", function (e) {
        _this.close();
      }); // Esc key

      this.el.addEventListener("keydown", function (e) {
        var key = e.which || e.keyCode;

        if (key == 27) {
          _this.close();
        }
      }); // Remove transition when animation complete

      this.el.addEventListener("transitionend", function (e) {
        document.documentElement.classList.remove("m-nav-open-transition");
      });
      this.el.addEventListener("webkitTransitionEnd", function (e) {
        document.documentElement.classList.remove("m-nav-open-transition");
      }); // Adds toggle buttons (+/-)

      this.setupToggleNavigation();
    }
  }, {
    key: "open",
    value: function open() {
      document.documentElement.classList.add("m-nav-open");
      document.documentElement.classList.add("m-nav-open-transition");
      this.el.scrollTo(0, 0); // this.el.querySelector("nav").focus();

      this.toggleButton.setAttribute("aria-expanded", true);
    }
  }, {
    key: "close",
    value: function close() {
      document.documentElement.classList.remove("m-nav-open");
      document.documentElement.classList.add("m-nav-open-transition");
      this.toggleButton.setAttribute("aria-expanded", false);
    }
  }, {
    key: "setupToggleNavigation",
    value: function setupToggleNavigation() {
      var _this2 = this;

      this.el.querySelectorAll(".menu-item-has-children").forEach(function (i) {
        i.querySelector("a").insertAdjacentHTML("afterend", '<button class="toggle"><span>+</span><span>-</span></button>'); // Open active menu

        if (i.classList.contains("current_page_item") && _this2.showActiveMenu) {
          i.querySelector("ul").classList.add("m-visible");
          i.querySelector(".toggle").classList.add("m-active");
        } // Parent is link?


        if (_this2.parentIsLink) {
          i.querySelector(".toggle").addEventListener("click", function (e) {
            e.preventDefault();

            _this2.toggle(i, e.currentTarget);
          });
        } else {
          i.addEventListener("click", function (e) {
            e.preventDefault();

            _this2.toggle(i, e.currentTarget);
          });
        }
      });
    }
  }, {
    key: "toggle",
    value: function toggle(item, button) {
      item.querySelector("ul").classList.toggle("m-visible");
      button.classList.toggle("m-active"); // Close children

      item.querySelectorAll(".menu-item-has-children").forEach(function (j) {
        j.querySelector("ul").classList.remove("m-visible");
        j.querySelector(".toggle").classList.remove("m-active");
      });
    }
  }]);

  return Navigation;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App(queue) {
    _classCallCheck(this, App);

    this.isReady = false;
    this.readyQueue = queue;
    this.mobile = false;
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var _this = this;

      Core.ready(function () {
        _this.isReady = true;

        _this.start();

        _this.processQueue();
      });
    }
  }, {
    key: "ready",
    value: function ready(fn) {
      if (this.isReady) {
        fn();
      } else {
        this.readyQueue.push(fn);
      }
    }
  }, {
    key: "processQueue",
    value: function processQueue() {
      while (this.readyQueue.length) {
        this.readyQueue.shift()();
      }
    }
  }, {
    key: "start",
    value: function start() {
      // Focus visible
      document.body.addEventListener("keyup", function (e) {
        var key = e.which || e.keyCode;

        if (key === 9) {
          document.documentElement.classList.add('m-focus-visible');
        }
      });
      document.body.addEventListener("click", function (e) {
        document.documentElement.classList.remove('m-focus-visible');
      }); // Header

      new Header(document.querySelector("#header")); // Navigation

      new Navigation(document.querySelector("#navigation"));
    }
  }]);

  return App;
}();

app = new App(app.queue);
app.init();
//# sourceMappingURL=script.js.map
