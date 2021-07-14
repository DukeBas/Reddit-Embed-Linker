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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/functions.ts");
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLG1IQUFtSDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZ1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2Z1bmN0aW9ucy50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIGdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uKHN0ciwgdGFnID0gJ3NwYW4nKSB7XHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSkuZmlsdGVyKGVsID0+IGVsLmlubmVySFRNTC5pbmNsdWRlcyhzdHIpKTtcclxufVxyXG5leHBvcnRzLmdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uID0gZ2V0RWxlbWVudHNCeVRleHRJbmNsdXNpb247XHJcbmZ1bmN0aW9uIGFkZExpbmtCdXR0b24oKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBidXR0b24hXCIpO1xyXG4gICAgY29uc3QgY2FuZGlkYXRlcyA9IGdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uKCclIFVwdm90ZWQnKTsgLy8gd2UgZ2V0IHRvIHRoZSByaWdodCBzcG90IHVzaW5nIHRoZSBmYWN0IHRoYXQgdGhlcmUgaXMgYWx3YXlzIGFuIHVwdm90ZWQgJVxyXG4gICAgY29uc3QgdXB2b3RlZFNwYW4gPSBjYW5kaWRhdGVzWzBdO1xyXG4gICAgY29uc3QgcGFyZW50RGl2ID0gdXB2b3RlZFNwYW4ucGFyZW50RWxlbWVudDsgLy8gaG9sZHMgb25seSB1cHZvdGVkICVcclxuICAgIGNvbnN0IGJvdHRvbUJhciA9IHBhcmVudERpdi5wYXJlbnRFbGVtZW50OyAvLyBob2xkcyB0aGUgc2hhcmluZyBidXR0b25zIGFuZCB1cHZvdGVkICVcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBwYXJlbnREaXYubmV4dEVsZW1lbnRTaWJsaW5nID8gcGFyZW50RGl2Lm5leHRFbGVtZW50U2libGluZyA6IHBhcmVudERpdi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyAvLyBob2xkcyBvbmx5IHRoZSBidXR0b25zXHJcbiAgICBjb25zb2xlLmxvZyh1cHZvdGVkU3BhbiwgcGFyZW50RGl2LCBib3R0b21CYXIsIGJ1dHRvbnMpO1xyXG4gICAgLy8gY3JlYXRlIGEgZGl2IGZvciB0aGUgbmV3IGJ1dHRvblxyXG4gICAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBuZXdEaXYuY2xhc3NOYW1lID0gJ25ld0Rpdic7XHJcbiAgICAvLyBjcmVhdGUgYSBidXR0b24gZm9yIHRoZSBuZXcgZGl2IHRoYXQgY29waWVzIGxpbmsgdG8gY2xpcGJvYXJkIHdoZW4gY2xpY2tlZFxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgbGlua0J1dHRvbi5pbm5lckhUTUwgPSBcIkdldCBsaW5rXCI7XHJcbiAgICBsaW5rQnV0dG9uLm9uY2xpY2sgPSBidXR0b25DbGljaztcclxuICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChsaW5rQnV0dG9uKTtcclxuICAgIC8vIGFkZCBjcmVhdGVkIGVsZW1lbnRzIHRvIERPTVxyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChuZXdEaXYpO1xyXG4gICAgY29uc29sZS5sb2coXCJQQVJFTlRUUkVFXCIsIGxpbmtCdXR0b24sIGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCwgKF9hID0gbGlua0J1dHRvbi5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50RWxlbWVudCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlNpYmxpbmdzOlwiLCBnZXRTaWJsaW5ncyhsaW5rQnV0dG9uKSwgbGlua0J1dHRvbi5wYXJlbnRFbGVtZW50ID8gZ2V0U2libGluZ3MobGlua0J1dHRvbi5wYXJlbnRFbGVtZW50KSA6IFwiTm8gcGFyZW50XCIpO1xyXG4gICAgLy8gVE9ETyBjaGVjayBpZiBsaW5rIGlzIHN0aWxsIHRoZXJlLCBpZiBub3QgcGxhY2UgaXQgYWdhaW4gYW5kIGNoZWNrIGFnYWluIHNvb24gbGF0ZXJcclxufVxyXG5leHBvcnRzLmFkZExpbmtCdXR0b24gPSBhZGRMaW5rQnV0dG9uO1xyXG4vLyBjYWxsZWQgd2hlbiB0aGUgYWRkZWQgYnV0dG9uIGlzIGNsaWNrZWRcclxuZnVuY3Rpb24gYnV0dG9uQ2xpY2soZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJDbGlja2VkIVwiLCBlKTtcclxuICAgIC8vIGZpbmQgbGlua1xyXG4gICAgaWYgKGUudGFyZ2V0KSB7XHJcbiAgICAgICAgY29uc3QgYXNFbGVtZW50ID0gKHQpID0+IHQudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IHRhZyA9IGdvVXBGaW5kVGFnKGFzRWxlbWVudChlKSwgJ2ltZycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuXHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiTm8gZXZlbnQgdGFyZ2V0IGZvdW5kIGZvciBtb3VzZSBjbGlja1wiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGVtYmVkTGluayA9IFwid3d3LmV4YW1wbGUuY29tXCI7XHJcbiAgICAvLyBjb3B5IGZvdW5kIGxpbmsgdG8gY2xpcGJvYXJkXHJcbiAgICAvLyBjb3B5VG9DbGlwYm9hcmQoZW1iZWRMaW5rKTtcclxufVxyXG5mdW5jdGlvbiBjb3B5VG9DbGlwYm9hcmQoc3RyKSB7XHJcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0cjtcclxuICAgIC8vIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XHJcbiAgICB0ZXh0YXJlYS5zZWxlY3QoKTtcclxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRhcmVhKTtcclxufVxyXG4vLyBmaXJzdCBzZWFyY2hlcyBmb3IgYSB0YWcgYXQgdGhlIHN1YnRyZWUgb2YgdGhlIHN0YXJ0aW5nIGVsZW1lbnRcclxuLy8gaWYgaXQgaXMgbm90IGZvdW5kIHRoZXJlIGl0IHdpbGwgbG9vayBpbiBzdWJ0cmVlIG9mIHNpYmxpbmdzXHJcbi8vIGlmIGl0IGlzIG5vdCBmb3VuZCB0aGVyZSwgZ28gdXAgYSBsZXZlbCBhbmQgbG9vayBpbiB0cmVlcyBvZiBzaWJsaW5nc1xyXG4vLyAgIGFnYWluIHJlcGVhdGVkbHkgdW50aWwgaXQgaXMgZm91bmRcclxuZnVuY3Rpb24gZ29VcEZpbmRUYWcoc3RhcnQsIHRhZykge1xyXG4gICAgbGV0IHRhZ3M7XHJcbiAgICAvLyBzZWFyY2ggc3VidHJlZSBhdCBzdGFydFxyXG4gICAgdGFncyA9IHN0YXJ0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XHJcbiAgICBpZiAodGFncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gcmV0dXJuIGZpcnN0IGhpdFxyXG4gICAgICAgIHJldHVybiB0YWdzWzBdO1xyXG4gICAgfVxyXG4gICAgLy8gZ28gdXAgdG8gc2libGluZ3NcclxufVxyXG5mdW5jdGlvbiBnZXRTaWJsaW5ncyhlbCkge1xyXG4gICAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gWy4uLmVsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5dLmZpbHRlcihpID0+IGkgIT0gZWwpOyAvLyBmaWx0ZXIgc3RhcnRpbmcgcG9pbnRcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9