!function(e){var t={};function n(l){if(t[l])return t[l].exports;var r=t[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(l,r,function(t){return e[t]}.bind(null,r));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function l(e,t="span"){return Array.prototype.slice.call(document.getElementsByTagName(t)).filter(t=>t.innerHTML.includes(e))}function r(e){let t=void 0;if(e.target){const n=e=>e.target;if(t=i(n(e),"img",a),t){const e=i(t,"a").href;null!=e&&o(e)}else if(t=i(n(e),"source"),t){const l=t.src;l.includes(".gif")?o(function(e){let t=e.split("?")[0];return t=t.replace("preview","i"),t}(l)):o(function(e,t){let n=e.split("?")[0];n=e.split("/HLSPlaylist")[0];const l=i(t,"svg",e=>{var t;return null===(t=e.children[0].getAttribute("d"))||void 0===t?void 0:t.includes("M18.5,8.94,16.32,8.5h0a6.46,6.46,0,0,0-.79-1.9h0l1.23-1.85a1.08,1.08,0,0,0-1.5-1.5L13.41,4.47h0a6.45,6.45,0,0,0-1.9-.79h0L11.06,1.5a1.08,1.08,0,0,0-2.12,0L8.5,3.68h0a6.45,6.45,0,0,0-1.9.79h0L4.74,3.24a1.08,1.08,0,0,0-1.5,1.5L4.47,6.59h0a6.45,6.45,0,0,0-.79,1.9h0L1.5,8.94a1.08,1.08,0,0,0,0,2.12l2.18.44h0a6.45,6.45,0,0,0,.79,1.9h0L3.24,15.26a1.08,1.08,0,0,0,1.5,1.5l1.85-1.23h0a6.45,6.45,0,0,0,1.9.79h0l.44,2.18a1.08,1.08,0,0,0,2.12,0l.44-2.18h0a6.45,6.45,0,0,0,1.9-.79h0l1.85,1.23a1.08,1.08,0,0,0,1.5-1.5l-1.23-1.85h0a6.45,6.45,0,0,0,.79-1.9h0l2.18-.44a1.08,1.08,0,0,0,0-2.12ZM10,13.5A3.5,3.5,0,1,1,13.5,10,3.5,3.5,0,0,1,10,13.5Z")});let r="240";if(!l)return"undefined";{const e=null==l?void 0:l.parentElement;null==e||e.click();["1080","720","480","360","240"].some(e=>(r=e,!!i(t,"span",t=>t.innerHTML.includes(e)))),null==e||e.click()}return n+="/DASH_"+r+".mp4",n}(l,n(e)))}}else console.warn("No event target found for mouse click")}function o(e){const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function i(e,t,n,l=6){let r,o;if(r=e.getElementsByTagName(t),null!=n?o=c(r,n):r.length>0&&(o=r[0]),o)return o;let i=e,a=l;do{const l=i.parentElement;if((null==l?void 0:l.tagName.toUpperCase())===t.toUpperCase()){o=l;break}u(i).some(e=>{if(r=e.getElementsByTagName(t),null!=n?o=c(r,n):r.length>0&&(o=r[0]),null!=o)return!0}),i=i.parentElement?i.parentElement:e,a--}while("body"!=i.tagName&&a>0&&void 0===o);return o}function u(e){return e.parentElement?[...e.parentElement.children].filter(t=>t!=e):[]}function c(e,t){let n=void 0;return[...e].some(e=>{if(t(e))return n=e,!0}),n}function a(e){const t=e.alt;return!(!t||"r/"!==t.slice(0,2))}Object.defineProperty(t,"__esModule",{value:!0}),t.getElementsByTextInclusion=l,t.addLinkButton=function e(){const t=l("% Upvoted")[0].parentElement,n=t.nextElementSibling?t.nextElementSibling:t.previousElementSibling,o=document.createElement("div");o.className="getEmbeddedLinkDiv",o.id="getEmbeddedLinkDiv";const i=document.createElement("button");i.innerHTML="Get link",o.onclick=r;try{const e=n.children[1];o.className=e.className,i.className=e.children[0].className}finally{o.style.cursor="pointer"}o.appendChild(i),n.appendChild(o),setTimeout(()=>{document.getElementById("getEmbeddedLinkDiv")||e()},200)}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const l=n(0);console.log("Running post!"),l.addLinkButton()}]);