/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/injectPost.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/functions.ts":
/*!**************************!*\
  !*** ./src/functions.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getElementsByTextInclusion(str, tag = 'span') {
    return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.innerHTML.includes(str));
}
exports.getElementsByTextInclusion = getElementsByTextInclusion;
function addLinkButton() {
    var _a;
    console.log("Adding button!");
    const candidates = getElementsByTextInclusion('% Upvoted'); // we get to the right spot using the fact that there is always an upvoted %
    const upvotedSpan = candidates[0];
    const parentDiv = upvotedSpan.parentElement; // holds only upvoted %
    const bottomBar = parentDiv.parentElement; // holds the sharing buttons and upvoted %
    const buttons = parentDiv.nextElementSibling ? parentDiv.nextElementSibling : parentDiv.previousElementSibling; // holds only the buttons
    console.log(upvotedSpan, parentDiv, bottomBar, buttons);
    // create a div for the new button
    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    // create a button for the new div that copies link to clipboard when clicked
    const linkButton = document.createElement('button');
    linkButton.innerHTML = "Get link";
    linkButton.onclick = buttonClick;
    newDiv.appendChild(linkButton);
    // add created elements to DOM
    buttons.appendChild(newDiv);
    console.log("PARENTTREE", linkButton, linkButton.parentElement, (_a = linkButton.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement);
    console.log("Siblings:", getSiblings(linkButton), linkButton.parentElement ? getSiblings(linkButton.parentElement) : "No parent");
    // TODO check if link is still there, if not place it again and check again soon later
}
exports.addLinkButton = addLinkButton;
// called when the added button is clicked
function buttonClick(e) {
    console.log("Clicked!", e);
    // find link
    if (e.target) {
        const asElement = (t) => t.target;
        const tag = goUpFindTag(asElement(e), 'img');
        console.log(tag);
    }
    else {
        // should never happen
        console.warn("No event target found for mouse click");
    }
    const embedLink = "www.example.com";
    // copy found link to clipboard
    // copyToClipboard(embedLink);
}
function copyToClipboard(str) {
    const textarea = document.createElement('textarea');
    textarea.value = str;
    // el.style.visibility = "hidden";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
// first searches for a tag at the subtree of the starting element
// if it is not found there it will look in subtree of siblings
// if it is not found there, go up a level and look in trees of siblings
//   again repeatedly until it is found
function goUpFindTag(start, tag) {
    let tags;
    // search subtree at start
    tags = start.getElementsByTagName(tag);
    if (tags.length > 0) {
        // return first hit
        return tags[0];
    }
    // go up to siblings
}
function getSiblings(el) {
    return el.parentElement
        ? [...el.parentElement.children].filter(i => i != el) // filter starting point
        : [];
}


/***/ }),

/***/ "./src/injectPost.ts":
/*!***************************!*\
  !*** ./src/injectPost.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __webpack_require__(/*! ./functions */ "./src/functions.ts");
console.log("Running post!");
functions_1.addLinkButton();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0UG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLG1IQUFtSDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFFYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG9CQUFvQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3pDO0FBQ0EiLCJmaWxlIjoiaW5qZWN0UG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luamVjdFBvc3QudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiBnZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbihzdHIsIHRhZyA9ICdzcGFuJykge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykpLmZpbHRlcihlbCA9PiBlbC5pbm5lckhUTUwuaW5jbHVkZXMoc3RyKSk7XHJcbn1cclxuZXhwb3J0cy5nZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbiA9IGdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uO1xyXG5mdW5jdGlvbiBhZGRMaW5rQnV0dG9uKCkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc29sZS5sb2coXCJBZGRpbmcgYnV0dG9uIVwiKTtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBnZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbignJSBVcHZvdGVkJyk7IC8vIHdlIGdldCB0byB0aGUgcmlnaHQgc3BvdCB1c2luZyB0aGUgZmFjdCB0aGF0IHRoZXJlIGlzIGFsd2F5cyBhbiB1cHZvdGVkICVcclxuICAgIGNvbnN0IHVwdm90ZWRTcGFuID0gY2FuZGlkYXRlc1swXTtcclxuICAgIGNvbnN0IHBhcmVudERpdiA9IHVwdm90ZWRTcGFuLnBhcmVudEVsZW1lbnQ7IC8vIGhvbGRzIG9ubHkgdXB2b3RlZCAlXHJcbiAgICBjb25zdCBib3R0b21CYXIgPSBwYXJlbnREaXYucGFyZW50RWxlbWVudDsgLy8gaG9sZHMgdGhlIHNoYXJpbmcgYnV0dG9ucyBhbmQgdXB2b3RlZCAlXHJcbiAgICBjb25zdCBidXR0b25zID0gcGFyZW50RGl2Lm5leHRFbGVtZW50U2libGluZyA/IHBhcmVudERpdi5uZXh0RWxlbWVudFNpYmxpbmcgOiBwYXJlbnREaXYucHJldmlvdXNFbGVtZW50U2libGluZzsgLy8gaG9sZHMgb25seSB0aGUgYnV0dG9uc1xyXG4gICAgY29uc29sZS5sb2codXB2b3RlZFNwYW4sIHBhcmVudERpdiwgYm90dG9tQmFyLCBidXR0b25zKTtcclxuICAgIC8vIGNyZWF0ZSBhIGRpdiBmb3IgdGhlIG5ldyBidXR0b25cclxuICAgIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbmV3RGl2LmNsYXNzTmFtZSA9ICduZXdEaXYnO1xyXG4gICAgLy8gY3JlYXRlIGEgYnV0dG9uIGZvciB0aGUgbmV3IGRpdiB0aGF0IGNvcGllcyBsaW5rIHRvIGNsaXBib2FyZCB3aGVuIGNsaWNrZWRcclxuICAgIGNvbnN0IGxpbmtCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGxpbmtCdXR0b24uaW5uZXJIVE1MID0gXCJHZXQgbGlua1wiO1xyXG4gICAgbGlua0J1dHRvbi5vbmNsaWNrID0gYnV0dG9uQ2xpY2s7XHJcbiAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobGlua0J1dHRvbik7XHJcbiAgICAvLyBhZGQgY3JlYXRlZCBlbGVtZW50cyB0byBET01cclxuICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICAgIGNvbnNvbGUubG9nKFwiUEFSRU5UVFJFRVwiLCBsaW5rQnV0dG9uLCBsaW5rQnV0dG9uLnBhcmVudEVsZW1lbnQsIChfYSA9IGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgY29uc29sZS5sb2coXCJTaWJsaW5nczpcIiwgZ2V0U2libGluZ3MobGlua0J1dHRvbiksIGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCA/IGdldFNpYmxpbmdzKGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCkgOiBcIk5vIHBhcmVudFwiKTtcclxuICAgIC8vIFRPRE8gY2hlY2sgaWYgbGluayBpcyBzdGlsbCB0aGVyZSwgaWYgbm90IHBsYWNlIGl0IGFnYWluIGFuZCBjaGVjayBhZ2FpbiBzb29uIGxhdGVyXHJcbn1cclxuZXhwb3J0cy5hZGRMaW5rQnV0dG9uID0gYWRkTGlua0J1dHRvbjtcclxuLy8gY2FsbGVkIHdoZW4gdGhlIGFkZGVkIGJ1dHRvbiBpcyBjbGlja2VkXHJcbmZ1bmN0aW9uIGJ1dHRvbkNsaWNrKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2xpY2tlZCFcIiwgZSk7XHJcbiAgICAvLyBmaW5kIGxpbmtcclxuICAgIGlmIChlLnRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IGFzRWxlbWVudCA9ICh0KSA9PiB0LnRhcmdldDtcclxuICAgICAgICBjb25zdCB0YWcgPSBnb1VwRmluZFRhZyhhc0VsZW1lbnQoZSksICdpbWcnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gc2hvdWxkIG5ldmVyIGhhcHBlblxyXG4gICAgICAgIGNvbnNvbGUud2FybihcIk5vIGV2ZW50IHRhcmdldCBmb3VuZCBmb3IgbW91c2UgY2xpY2tcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbWJlZExpbmsgPSBcInd3dy5leGFtcGxlLmNvbVwiO1xyXG4gICAgLy8gY29weSBmb3VuZCBsaW5rIHRvIGNsaXBib2FyZFxyXG4gICAgLy8gY29weVRvQ2xpcGJvYXJkKGVtYmVkTGluayk7XHJcbn1cclxuZnVuY3Rpb24gY29weVRvQ2xpcGJvYXJkKHN0cikge1xyXG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgdGV4dGFyZWEudmFsdWUgPSBzdHI7XHJcbiAgICAvLyBlbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xyXG4gICAgdGV4dGFyZWEuc2VsZWN0KCk7XHJcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0YXJlYSk7XHJcbn1cclxuLy8gZmlyc3Qgc2VhcmNoZXMgZm9yIGEgdGFnIGF0IHRoZSBzdWJ0cmVlIG9mIHRoZSBzdGFydGluZyBlbGVtZW50XHJcbi8vIGlmIGl0IGlzIG5vdCBmb3VuZCB0aGVyZSBpdCB3aWxsIGxvb2sgaW4gc3VidHJlZSBvZiBzaWJsaW5nc1xyXG4vLyBpZiBpdCBpcyBub3QgZm91bmQgdGhlcmUsIGdvIHVwIGEgbGV2ZWwgYW5kIGxvb2sgaW4gdHJlZXMgb2Ygc2libGluZ3NcclxuLy8gICBhZ2FpbiByZXBlYXRlZGx5IHVudGlsIGl0IGlzIGZvdW5kXHJcbmZ1bmN0aW9uIGdvVXBGaW5kVGFnKHN0YXJ0LCB0YWcpIHtcclxuICAgIGxldCB0YWdzO1xyXG4gICAgLy8gc2VhcmNoIHN1YnRyZWUgYXQgc3RhcnRcclxuICAgIHRhZ3MgPSBzdGFydC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xyXG4gICAgaWYgKHRhZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIHJldHVybiBmaXJzdCBoaXRcclxuICAgICAgICByZXR1cm4gdGFnc1swXTtcclxuICAgIH1cclxuICAgIC8vIGdvIHVwIHRvIHNpYmxpbmdzXHJcbn1cclxuZnVuY3Rpb24gZ2V0U2libGluZ3MoZWwpIHtcclxuICAgIHJldHVybiBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgPyBbLi4uZWwucGFyZW50RWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKGkgPT4gaSAhPSBlbCkgLy8gZmlsdGVyIHN0YXJ0aW5nIHBvaW50XHJcbiAgICAgICAgOiBbXTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBmdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uc1wiKTtcclxuY29uc29sZS5sb2coXCJSdW5uaW5nIHBvc3QhXCIpO1xyXG5mdW5jdGlvbnNfMS5hZGRMaW5rQnV0dG9uKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=