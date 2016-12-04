/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-base - v1.1.0 (2015-03-27T16:06:17+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-base",null,function(n,e,t){"use strict";function r(n){return null!=n&&n.nodeType!==i}function o(n){var e=(n.ownerDocument||n).documentElement;return e?"HTML"!==e.nodeName:!1}function u(n){return null!=n&&n==n.window}function l(n,e,t,r,o){if(null!=e&&"object"==typeof e){for(var u in e)e.hasOwnProperty(u)&&l(n,u,e[u],r,o);return n}var c=n.length;if(t!==i){r=r&&"function"==typeof t;for(var f=-1;++f<c;)o.set.call(n,n[f],e,r?t.call(n[f],o.get.call(n,n[f],e),f):t);return n}return c?o.get.call(n,n[0],e):null}var i,c=/\s+/;return{isNode:r,isXMLNode:o,isWindow:u,isHTMLElement:function(n,e){return!u(n)&&r(n)&&!o(n)&&(1===n.nodeType||e&&9===n.nodeType)},getWindow:function(n){return u(n)?n:9===n.nodeType?n.defaultView||n.parentWindow:null},splitBySpace:function(n){return"string"==typeof n&&(n=n.split(c)),null==n||0===n.length?null:n},access:l}});
/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-data - v1.1.1 (2015-08-28T16:05:16+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-data",null,function(e,n,t){"use strict";function r(e){var n=new l(e||{});return f.add(n),n}function i(e,n){return h.get(e,n)}function a(e,n,t){h.set(e,n,t)}function o(e,n){null==n?h.clear(e):n.forEach(function(n){h.remove(e,n)})}var c=e("base/1.1.x/"),s=e("./dom-base"),u=function(){function e(e){return s.isWindow(e)||!s.isNode(e)?2:null==e||1!==e.nodeType&&9!==e.nodeType?0:s.isXMLNode(e)||t[e.nodeName]?2:1}function n(e){if(e[r])try{delete e[r]}catch(n){e[r]=null}}var t={OBJECT:!0,EMBED:!0,APPLET:!0},r="_jraiser_nodeid_"+ +new Date+"_",i=0,a={};return{get:function(n,t){var o;switch(e(n)){case 1:o=n[r],o||t||(o=n[r]=new Number(++i));break;case 2:for(var c in a)if(a[c]===n){o=c;break}o||t||(o=++i,a[o]=n)}return o?o.valueOf():void 0},remove:function(t){switch(e(t)){case 1:n(t);break;case 2:for(var r in a)if(a[r]===t){delete a[r];break}}}}}(),f=function(){var e=[];return{add:function(n){return e.push(n)-1},clear:function(n){for(var t=e.length-1;t>=0;t--)e[t].clear(n)},clone:function(n,t){for(var r=e.length-1;r>=0;r--)e[r].clone(n,t)}}}(),l=c.createClass(function(e){this._space={},this._cloneable=e.cloneable!==!1,this._onClone=e.onClone},{_findData:function(e){return this._space[u.get(e,!0)]},keys:function(e){var n=this._findData(e),t=[];if(n)for(var r in n)n.hasOwnProperty(r)&&t.push(r);return t},get:function(e,n){var t=this._findData(e);return t&&t.hasOwnProperty(n)?t[n]:void 0},set:function(e,n,t){var r=u.get(e);if(r){var i=this._space;i[r]||(i[r]={}),i[r][n]=t}},remove:function(e,n){var t=this._findData(e);t&&(delete t[n],c.isEmptyObject(t)&&this.clear(e))},clear:function(e){delete this._space[u.get(e,!0)]},clone:function(e,n){if(this._cloneable){var t=this._findData(n);if(t){var r=u.get(e),i=this._space[r]=this._space[r]||{};for(var a in t)t.hasOwnProperty(a)&&(i[a]=t[a]);this._onClone&&this._onClone(e,n)}}}}),h=r();return{createDataSpace:r,clearAll:function(e){f.clear(e),u.remove(e)},cloneAll:function(e,n){return f.clone(e,n)},removeUniqueId:function(e){u.remove(e)},shortcuts:{data:function(e,n){return s.access(this,e,n,!0,{get:i,set:a})},removeData:function(e){return null!=e&&(e=s.splitBySpace(e)),this.forEach(function(n){o(n,e)}),this}}}});
/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-style - v1.1.0 (2015-03-27T14:32:01+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-style",null,function(e,t,n){"use strict";function i(e){if(e in y.style)return e;for(var t,n=e.charAt(0).toUpperCase()+e.slice(1),i=E.length-1;i>=0;i--)if(t=E[i]+n,t in y.style)return t;return e}function r(e){var t=e.replace(w,function(e,t){return t.toUpperCase()});return e=v[t]||(v[t]=i(t))}function s(e,t){return C[e]||""===t||isNaN(t)?t:t+"px"}function o(e,t){return e.ownerDocument.defaultView.getComputedStyle(e,null)[t]||""}function a(e,t){return t&&m.isHTMLElement(e)?(t=r(t),t in e.style?o(e,t):void 0):void 0}function l(e,t,n){t&&m.isHTMLElement(e)&&(g.test(n)&&(n=(parseFloat(a(e,t),10)||0)+parseFloat(RegExp.$1+RegExp.$2,10)),t=r(t),n=s(t,n),t in e.style&&(e.style[t]=n))}function u(e,t){var n=e.indexOf(t);return-1!=n&&32===(e.charCodeAt(n-1)||32)&&32===(e.charCodeAt(n+t.length)||32)}function c(e,t){if(!t)throw new Error("classname is not specified");return m.isHTMLElement(e)?u(e.className,t):!1}function f(e,t){if(m.isHTMLElement(e)&&t){for(var n=e.className,i=-1,r=t.length;++i<r;)u(n,t[i])||(n+=" "+t[i]);n=n.trim(),n!==e.className&&(e.className=n)}}function h(e,t){if(m.isHTMLElement(e)){var n=e.className;if(n)if(t){for(var i=" "+n+" ",r=-1,s=t.length;++r<s;)i=i.replace(" "+t[r]+" "," ");i=i.trim(),i!==n&&(e.className=i)}else e.className=""}}function d(e,t){if(m.isHTMLElement(e)&&t){for(var n,i=" "+e.className+" ",r=-1,s=t.length;++r<s;)n=" "+t[r]+" ",-1===i.indexOf(n)?i+=t[r]+" ":i=i.replace(n," ");e.className=i.trim()}}function p(e,t,n,i,r){if(t=t.toLowerCase().replace(/^[a-z]/,function(e){return e.toUpperCase()}),m.isWindow(e))return e.document.documentElement["client"+t];if(9===e.nodeType)return e.documentElement["scroll"+t];if(!e.ownerDocument||1!==e.nodeType||m.isXMLNode(e))return 0;var s=e["offset"+t];if(!(s+e.offsetWidth+e.offsetHeight)){var o=e;do{if("none"===a(o,"display"))return s;o=o.parentNode}while(o)}var l=a(e,"borderStyle");return"none"===l&&(l=""),("Width"===t?["Left","Right"]:["Top","Bottom"]).forEach(function(t){n||(s-=parseFloat(a(e,"padding"+t))||0),!i&&l&&(s-=parseFloat(a(e,"border"+t+"Width"))||0),r&&(s+=parseFloat(a(e,"margin"+t))||0)}),s}var m=e("./dom-base"),g=/^([+-])=(\d+(?:\.\d+)?)$/,y=document.documentElement,v={"float":"cssFloat"in y.style?"cssFloat":"styleFloat"},E=["O","Moz","ms","Webkit"],w=/-([a-z])/g,C={columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},N=function(){var e={};return{get:function(t){if(!e[t]){var n=document.createElement(t);document.body.appendChild(n);var i=a(n,"display");e[t]="none"===i?"block":i,n.parentNode.removeChild(n),n=null}return e[t]}}}();return{rRelNumber:g,getStyle:a,setStyle:l,getSize:p,shortcuts:{css:function(e,t){return m.access(this,e,t,!0,{get:a,set:l})},hasClass:function(e){return this.some(function(t){return c(t,e)})},addClass:function(e){return e=m.splitBySpace(e),this.forEach(function(t){f(t,e)}),this},removeClass:function(e){return e=m.splitBySpace(e),this.forEach(function(t){h(t,e)}),this},toggleClass:function(e,t){switch(t){case!0:return this.addClass(e);case!1:return this.removeClass(e)}return e=m.splitBySpace(e),this.forEach(function(t){d(t,e)}),this},width:function(e){return null!=e?this.css("width",e):p(this[0],"Width")},height:function(e){return null!=e?this.css("height",e):p(this[0],"Height")},innerWidth:function(){return p(this[0],"Width",!0)},innerHeight:function(){return p(this[0],"Height",!0)},outerWidth:function(e){return p(this[0],"Width",!0,!0,e)},outerHeight:function(e){return p(this[0],"Height",!0,!0,e)},show:function(){return this.forEach(function(e){"none"===e.style.display&&(e.style.display=""),"none"===a(e,"display")&&(e.style.display=N.get(e.nodeName))}),this},hide:function(){return this.css("display","none")},toggle:function(e){return"boolean"!=typeof e&&(e="none"===this.css("display")),this[e?"show":"hide"]()}}}});
/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-animation - v1.1.1 (2015-08-28T16:05:05+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-animation",["base/1.1.x/"],function(t,n,e){"use strict";function i(t){return t.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function o(t,n,e){if(l.isHTMLElement(t)){var o=Object.keys(n);if(o.length){o=o.map(function(t){return i(t)}),e=c.customExtend({duration:400,easing:"linear"},e);var m,y=function(n){if(!(n&&n.target!==n.currentTarget||m)){m=!0,t.removeEventListener(u,y,!1),t.style[r]=t.style[a]=t.style[s]="";var i=e.oncomplete||e.callback;i&&i.call(t)}};t.addEventListener(u,y,!1),t.style[r]=o.join(", "),t.style[a]=e.duration+"ms",t.style[s]=e.easing,o.forEach(function(e){d.setStyle(t,e,n[e])}),setTimeout(y,parseInt(e.duration)+25)}}}var r,a,s,u,c=t("base/1.1.x/"),l=t("./dom-base"),d=(t("./dom-data"),t("./dom-style")),m=document.documentElement;"transitionProperty"in m.style?(r="transitionProperty",a="transitionDuration",s="transitionTimingFunction",u="transitionend"):["Webkit","Moz"].some(function(t){return t+"TransitionProperty"in m.style?(r=t+"TransitionProperty",a=t+"TransitionDuration",s=t+"TransitionTimingFunction",u=t.toLowerCase()+"TransitionEnd",!0):void 0}),m=null,n.shortcuts={animate:function(t,n){return this.forEach(function(e){e.endStyle=t,o(e,t,n)}),this}}});