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
    return el.parentElement
        ? [...el.parentElement.children].filter(i => i != el) // filter starting point
        : [];
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLG1IQUFtSDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmdW5jdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9mdW5jdGlvbnMudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiBnZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbihzdHIsIHRhZyA9ICdzcGFuJykge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykpLmZpbHRlcihlbCA9PiBlbC5pbm5lckhUTUwuaW5jbHVkZXMoc3RyKSk7XHJcbn1cclxuZXhwb3J0cy5nZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbiA9IGdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uO1xyXG5mdW5jdGlvbiBhZGRMaW5rQnV0dG9uKCkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc29sZS5sb2coXCJBZGRpbmcgYnV0dG9uIVwiKTtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBnZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbignJSBVcHZvdGVkJyk7IC8vIHdlIGdldCB0byB0aGUgcmlnaHQgc3BvdCB1c2luZyB0aGUgZmFjdCB0aGF0IHRoZXJlIGlzIGFsd2F5cyBhbiB1cHZvdGVkICVcclxuICAgIGNvbnN0IHVwdm90ZWRTcGFuID0gY2FuZGlkYXRlc1swXTtcclxuICAgIGNvbnN0IHBhcmVudERpdiA9IHVwdm90ZWRTcGFuLnBhcmVudEVsZW1lbnQ7IC8vIGhvbGRzIG9ubHkgdXB2b3RlZCAlXHJcbiAgICBjb25zdCBib3R0b21CYXIgPSBwYXJlbnREaXYucGFyZW50RWxlbWVudDsgLy8gaG9sZHMgdGhlIHNoYXJpbmcgYnV0dG9ucyBhbmQgdXB2b3RlZCAlXHJcbiAgICBjb25zdCBidXR0b25zID0gcGFyZW50RGl2Lm5leHRFbGVtZW50U2libGluZyA/IHBhcmVudERpdi5uZXh0RWxlbWVudFNpYmxpbmcgOiBwYXJlbnREaXYucHJldmlvdXNFbGVtZW50U2libGluZzsgLy8gaG9sZHMgb25seSB0aGUgYnV0dG9uc1xyXG4gICAgY29uc29sZS5sb2codXB2b3RlZFNwYW4sIHBhcmVudERpdiwgYm90dG9tQmFyLCBidXR0b25zKTtcclxuICAgIC8vIGNyZWF0ZSBhIGRpdiBmb3IgdGhlIG5ldyBidXR0b25cclxuICAgIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbmV3RGl2LmNsYXNzTmFtZSA9ICduZXdEaXYnO1xyXG4gICAgLy8gY3JlYXRlIGEgYnV0dG9uIGZvciB0aGUgbmV3IGRpdiB0aGF0IGNvcGllcyBsaW5rIHRvIGNsaXBib2FyZCB3aGVuIGNsaWNrZWRcclxuICAgIGNvbnN0IGxpbmtCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGxpbmtCdXR0b24uaW5uZXJIVE1MID0gXCJHZXQgbGlua1wiO1xyXG4gICAgbGlua0J1dHRvbi5vbmNsaWNrID0gYnV0dG9uQ2xpY2s7XHJcbiAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobGlua0J1dHRvbik7XHJcbiAgICAvLyBhZGQgY3JlYXRlZCBlbGVtZW50cyB0byBET01cclxuICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICAgIGNvbnNvbGUubG9nKFwiUEFSRU5UVFJFRVwiLCBsaW5rQnV0dG9uLCBsaW5rQnV0dG9uLnBhcmVudEVsZW1lbnQsIChfYSA9IGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgY29uc29sZS5sb2coXCJTaWJsaW5nczpcIiwgZ2V0U2libGluZ3MobGlua0J1dHRvbiksIGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCA/IGdldFNpYmxpbmdzKGxpbmtCdXR0b24ucGFyZW50RWxlbWVudCkgOiBcIk5vIHBhcmVudFwiKTtcclxuICAgIC8vIFRPRE8gY2hlY2sgaWYgbGluayBpcyBzdGlsbCB0aGVyZSwgaWYgbm90IHBsYWNlIGl0IGFnYWluIGFuZCBjaGVjayBhZ2FpbiBzb29uIGxhdGVyXHJcbn1cclxuZXhwb3J0cy5hZGRMaW5rQnV0dG9uID0gYWRkTGlua0J1dHRvbjtcclxuLy8gY2FsbGVkIHdoZW4gdGhlIGFkZGVkIGJ1dHRvbiBpcyBjbGlja2VkXHJcbmZ1bmN0aW9uIGJ1dHRvbkNsaWNrKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2xpY2tlZCFcIiwgZSk7XHJcbiAgICAvLyBmaW5kIGxpbmtcclxuICAgIGlmIChlLnRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IGFzRWxlbWVudCA9ICh0KSA9PiB0LnRhcmdldDtcclxuICAgICAgICBjb25zdCB0YWcgPSBnb1VwRmluZFRhZyhhc0VsZW1lbnQoZSksICdpbWcnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gc2hvdWxkIG5ldmVyIGhhcHBlblxyXG4gICAgICAgIGNvbnNvbGUud2FybihcIk5vIGV2ZW50IHRhcmdldCBmb3VuZCBmb3IgbW91c2UgY2xpY2tcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbWJlZExpbmsgPSBcInd3dy5leGFtcGxlLmNvbVwiO1xyXG4gICAgLy8gY29weSBmb3VuZCBsaW5rIHRvIGNsaXBib2FyZFxyXG4gICAgLy8gY29weVRvQ2xpcGJvYXJkKGVtYmVkTGluayk7XHJcbn1cclxuZnVuY3Rpb24gY29weVRvQ2xpcGJvYXJkKHN0cikge1xyXG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgdGV4dGFyZWEudmFsdWUgPSBzdHI7XHJcbiAgICAvLyBlbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xyXG4gICAgdGV4dGFyZWEuc2VsZWN0KCk7XHJcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0YXJlYSk7XHJcbn1cclxuLy8gZmlyc3Qgc2VhcmNoZXMgZm9yIGEgdGFnIGF0IHRoZSBzdWJ0cmVlIG9mIHRoZSBzdGFydGluZyBlbGVtZW50XHJcbi8vIGlmIGl0IGlzIG5vdCBmb3VuZCB0aGVyZSBpdCB3aWxsIGxvb2sgaW4gc3VidHJlZSBvZiBzaWJsaW5nc1xyXG4vLyBpZiBpdCBpcyBub3QgZm91bmQgdGhlcmUsIGdvIHVwIGEgbGV2ZWwgYW5kIGxvb2sgaW4gdHJlZXMgb2Ygc2libGluZ3NcclxuLy8gICBhZ2FpbiByZXBlYXRlZGx5IHVudGlsIGl0IGlzIGZvdW5kXHJcbmZ1bmN0aW9uIGdvVXBGaW5kVGFnKHN0YXJ0LCB0YWcpIHtcclxuICAgIGxldCB0YWdzO1xyXG4gICAgLy8gc2VhcmNoIHN1YnRyZWUgYXQgc3RhcnRcclxuICAgIHRhZ3MgPSBzdGFydC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xyXG4gICAgaWYgKHRhZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIHJldHVybiBmaXJzdCBoaXRcclxuICAgICAgICByZXR1cm4gdGFnc1swXTtcclxuICAgIH1cclxuICAgIC8vIGdvIHVwIHRvIHNpYmxpbmdzXHJcbn1cclxuZnVuY3Rpb24gZ2V0U2libGluZ3MoZWwpIHtcclxuICAgIHJldHVybiBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgPyBbLi4uZWwucGFyZW50RWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKGkgPT4gaSAhPSBlbCkgLy8gZmlsdGVyIHN0YXJ0aW5nIHBvaW50XHJcbiAgICAgICAgOiBbXTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9