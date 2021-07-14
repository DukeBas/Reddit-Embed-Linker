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
    if (el.parentElement) {
        return [...el.parentElement.children].filter(i => i != el); // filter starting point
    }
    else {
        return [];
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0UG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLG1IQUFtSDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0VhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekM7QUFDQSIsImZpbGUiOiJpbmplY3RQb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5qZWN0UG9zdC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIGdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uKHN0ciwgdGFnID0gJ3NwYW4nKSB7XHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSkuZmlsdGVyKGVsID0+IGVsLmlubmVySFRNTC5pbmNsdWRlcyhzdHIpKTtcclxufVxyXG5leHBvcnRzLmdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uID0gZ2V0RWxlbWVudHNCeVRleHRJbmNsdXNpb247XHJcbmZ1bmN0aW9uIGFkZExpbmtCdXR0b24oKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBidXR0b24hXCIpO1xyXG4gICAgY29uc3QgY2FuZGlkYXRlcyA9IGdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uKCclIFVwdm90ZWQnKTsgLy8gd2UgZ2V0IHRvIHRoZSByaWdodCBzcG90IHVzaW5nIHRoZSBmYWN0IHRoYXQgdGhlcmUgaXMgYWx3YXlzIGFuIHVwdm90ZWQgJVxyXG4gICAgY29uc3QgdXB2b3RlZFNwYW4gPSBjYW5kaWRhdGVzWzBdO1xyXG4gICAgY29uc3QgcGFyZW50RGl2ID0gdXB2b3RlZFNwYW4ucGFyZW50RWxlbWVudDsgLy8gaG9sZHMgb25seSB1cHZvdGVkICVcclxuICAgIGNvbnN0IGJvdHRvbUJhciA9IHBhcmVudERpdi5wYXJlbnRFbGVtZW50OyAvLyBob2xkcyB0aGUgc2hhcmluZyBidXR0b25zIGFuZCB1cHZvdGVkICVcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBwYXJlbnREaXYubmV4dEVsZW1lbnRTaWJsaW5nID8gcGFyZW50RGl2Lm5leHRFbGVtZW50U2libGluZyA6IHBhcmVudERpdi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyAvLyBob2xkcyBvbmx5IHRoZSBidXR0b25zXHJcbiAgICBjb25zb2xlLmxvZyh1cHZvdGVkU3BhbiwgcGFyZW50RGl2LCBib3R0b21CYXIsIGJ1dHRvbnMpO1xyXG4gICAgLy8gY3JlYXRlIGEgZGl2IGZvciB0aGUgbmV3IGJ1dHRvblxyXG4gICAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBuZXdEaXYuY2xhc3NOYW1lID0gJ25ld0Rpdic7XHJcbiAgICAvLyBjcmVhdGUgYSBidXR0b24gZm9yIHRoZSBuZXcgZGl2IHRoYXQgY29waWVzIGxpbmsgdG8gY2xpcGJvYXJkIHdoZW4gY2xpY2tlZFxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgbGlua0J1dHRvbi5pbm5lckhUTUwgPSBcIkdldCBsaW5rXCI7XHJcbiAgICBsaW5rQnV0dG9uLm9uY2xpY2sgPSBidXR0b25DbGljaztcclxuICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChsaW5rQnV0dG9uKTtcclxuICAgIC8vIGFkZCBjcmVhdGVkIGVsZW1lbnRzIHRvIERPTVxyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChuZXdEaXYpO1xyXG4gICAgY29uc29sZS5sb2coXCJQQVJFTlRUUkVFXCIsIGxpbmtCdXR0b24sIGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCwgKF9hID0gbGlua0J1dHRvbi5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50RWxlbWVudCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlNpYmxpbmdzOlwiLCBnZXRTaWJsaW5ncyhsaW5rQnV0dG9uKSwgbGlua0J1dHRvbi5wYXJlbnRFbGVtZW50ID8gZ2V0U2libGluZ3MobGlua0J1dHRvbi5wYXJlbnRFbGVtZW50KSA6IFwiTm8gcGFyZW50XCIpO1xyXG4gICAgLy8gVE9ETyBjaGVjayBpZiBsaW5rIGlzIHN0aWxsIHRoZXJlLCBpZiBub3QgcGxhY2UgaXQgYWdhaW4gYW5kIGNoZWNrIGFnYWluIHNvb24gbGF0ZXJcclxufVxyXG5leHBvcnRzLmFkZExpbmtCdXR0b24gPSBhZGRMaW5rQnV0dG9uO1xyXG4vLyBjYWxsZWQgd2hlbiB0aGUgYWRkZWQgYnV0dG9uIGlzIGNsaWNrZWRcclxuZnVuY3Rpb24gYnV0dG9uQ2xpY2soZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJDbGlja2VkIVwiLCBlKTtcclxuICAgIC8vIGZpbmQgbGlua1xyXG4gICAgaWYgKGUudGFyZ2V0KSB7XHJcbiAgICAgICAgY29uc3QgYXNFbGVtZW50ID0gKHQpID0+IHQudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IHRhZyA9IGdvVXBGaW5kVGFnKGFzRWxlbWVudChlKSwgJ2ltZycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuXHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiTm8gZXZlbnQgdGFyZ2V0IGZvdW5kIGZvciBtb3VzZSBjbGlja1wiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGVtYmVkTGluayA9IFwid3d3LmV4YW1wbGUuY29tXCI7XHJcbiAgICAvLyBjb3B5IGZvdW5kIGxpbmsgdG8gY2xpcGJvYXJkXHJcbiAgICAvLyBjb3B5VG9DbGlwYm9hcmQoZW1iZWRMaW5rKTtcclxufVxyXG5mdW5jdGlvbiBjb3B5VG9DbGlwYm9hcmQoc3RyKSB7XHJcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0cjtcclxuICAgIC8vIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XHJcbiAgICB0ZXh0YXJlYS5zZWxlY3QoKTtcclxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRhcmVhKTtcclxufVxyXG4vLyBmaXJzdCBzZWFyY2hlcyBmb3IgYSB0YWcgYXQgdGhlIHN1YnRyZWUgb2YgdGhlIHN0YXJ0aW5nIGVsZW1lbnRcclxuLy8gaWYgaXQgaXMgbm90IGZvdW5kIHRoZXJlIGl0IHdpbGwgbG9vayBpbiBzdWJ0cmVlIG9mIHNpYmxpbmdzXHJcbi8vIGlmIGl0IGlzIG5vdCBmb3VuZCB0aGVyZSwgZ28gdXAgYSBsZXZlbCBhbmQgbG9vayBpbiB0cmVlcyBvZiBzaWJsaW5nc1xyXG4vLyAgIGFnYWluIHJlcGVhdGVkbHkgdW50aWwgaXQgaXMgZm91bmRcclxuZnVuY3Rpb24gZ29VcEZpbmRUYWcoc3RhcnQsIHRhZykge1xyXG4gICAgbGV0IHRhZ3M7XHJcbiAgICAvLyBzZWFyY2ggc3VidHJlZSBhdCBzdGFydFxyXG4gICAgdGFncyA9IHN0YXJ0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XHJcbiAgICBpZiAodGFncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gcmV0dXJuIGZpcnN0IGhpdFxyXG4gICAgICAgIHJldHVybiB0YWdzWzBdO1xyXG4gICAgfVxyXG4gICAgLy8gZ28gdXAgdG8gc2libGluZ3NcclxufVxyXG5mdW5jdGlvbiBnZXRTaWJsaW5ncyhlbCkge1xyXG4gICAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gWy4uLmVsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5dLmZpbHRlcihpID0+IGkgIT0gZWwpOyAvLyBmaWx0ZXIgc3RhcnRpbmcgcG9pbnRcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBmdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uc1wiKTtcclxuY29uc29sZS5sb2coXCJSdW5uaW5nIHBvc3QhXCIpO1xyXG5mdW5jdGlvbnNfMS5hZGRMaW5rQnV0dG9uKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=