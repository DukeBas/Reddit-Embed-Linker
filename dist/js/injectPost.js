!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function o(e,t="span"){return Array.prototype.slice.call(document.getElementsByTagName(t)).filter(t=>t.innerHTML.includes(e))}function r(e){let t=void 0;if(e.target){const n=e=>e.target;if(t=i(n(e),"img",d),t){const e=i(t,"a").href;null!=e&&l(e)}else if(t=i(n(e),"source"),t){const e=t.src;console.log(e),e.includes(".gif")&&l(function(e){let t=e.split("?")[0];return t=t.replace("preview","i"),t}(e))}}else console.warn("No event target found for mouse click")}function l(e){const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function i(e,t,n,o=6){let r,l;if(r=e.getElementsByTagName(t),null!=n?l=c(r,n):r.length>0&&(l=r[0]),l)return l;let i=e,d=o;do{const o=i.parentElement;if((null==o?void 0:o.tagName.toUpperCase())===t.toUpperCase()){l=o;break}u(i).some(e=>{if(r=e.getElementsByTagName(t),null!=n?l=c(r,n):r.length>0&&(l=r[0]),null!=l)return!0}),i=i.parentElement?i.parentElement:e,d--}while("body"!=i.tagName&&d>0&&void 0===l);return l}function u(e){return e.parentElement?[...e.parentElement.children].filter(t=>t!=e):[]}function c(e,t){let n=void 0;return[...e].some(e=>{if(t(e))return n=e,!0}),n}function d(e){const t=e.alt;return!(!t||"r/"!==t.slice(0,2))}Object.defineProperty(t,"__esModule",{value:!0}),t.getElementsByTextInclusion=o,t.addLinkButton=function e(){const t=o("% Upvoted")[0].parentElement,n=t.nextElementSibling?t.nextElementSibling:t.previousElementSibling,l=document.createElement("div");l.className="getEmbeddedLinkDiv",l.id="getEmbeddedLinkDiv";const i=document.createElement("button");i.innerHTML="Get link",i.onclick=r,l.appendChild(i),n.appendChild(l),setTimeout(()=>{document.getElementById("getEmbeddedLinkDiv")||e()},200)}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);console.log("Running post!"),o.addLinkButton()}]);