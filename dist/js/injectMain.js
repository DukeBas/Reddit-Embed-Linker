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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/injectMain.ts");
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

/***/ "./src/injectMain.ts":
/*!***************************!*\
  !*** ./src/injectMain.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __webpack_require__(/*! ./functions */ "./src/functions.ts");
console.log("Running main!");
// use an observer to detect when the body style changes
// when it does call function to add embed link button if 
// a post is in focus
const target = document.getElementsByTagName('body')[0];
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
        if (target.style.overflow == "hidden") {
            // a post is in focus, add link button
            postInFocus();
        }
    });
});
observer.observe(target, { attributes: true, attributeFilter: ['style'] });
console.log(target);
function postInFocus() {
    // console.log("Post in focus!");
    // check every 200ms for an upvoted % span element
    let candidates = [];
    function spanCheck() {
        candidates = functions_1.getElementsByTextInclusion('% Upvoted');
        if (candidates.length > 0) {
            // span is created, continue to next step
            try {
                clearInterval(check); // clear timer if it exists
            }
            finally {
                functions_1.addLinkButton();
            }
        }
    }
    let check = setInterval(spanCheck, 200);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0TWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLG1IQUFtSDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0VhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0QsMEJBQTBCLCtDQUErQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluamVjdE1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmplY3RNYWluLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gZ2V0RWxlbWVudHNCeVRleHRJbmNsdXNpb24oc3RyLCB0YWcgPSAnc3BhbicpIHtcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpKS5maWx0ZXIoZWwgPT4gZWwuaW5uZXJIVE1MLmluY2x1ZGVzKHN0cikpO1xyXG59XHJcbmV4cG9ydHMuZ2V0RWxlbWVudHNCeVRleHRJbmNsdXNpb24gPSBnZXRFbGVtZW50c0J5VGV4dEluY2x1c2lvbjtcclxuZnVuY3Rpb24gYWRkTGlua0J1dHRvbigpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGJ1dHRvbiFcIik7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gZ2V0RWxlbWVudHNCeVRleHRJbmNsdXNpb24oJyUgVXB2b3RlZCcpOyAvLyB3ZSBnZXQgdG8gdGhlIHJpZ2h0IHNwb3QgdXNpbmcgdGhlIGZhY3QgdGhhdCB0aGVyZSBpcyBhbHdheXMgYW4gdXB2b3RlZCAlXHJcbiAgICBjb25zdCB1cHZvdGVkU3BhbiA9IGNhbmRpZGF0ZXNbMF07XHJcbiAgICBjb25zdCBwYXJlbnREaXYgPSB1cHZvdGVkU3Bhbi5wYXJlbnRFbGVtZW50OyAvLyBob2xkcyBvbmx5IHVwdm90ZWQgJVxyXG4gICAgY29uc3QgYm90dG9tQmFyID0gcGFyZW50RGl2LnBhcmVudEVsZW1lbnQ7IC8vIGhvbGRzIHRoZSBzaGFyaW5nIGJ1dHRvbnMgYW5kIHVwdm90ZWQgJVxyXG4gICAgY29uc3QgYnV0dG9ucyA9IHBhcmVudERpdi5uZXh0RWxlbWVudFNpYmxpbmcgPyBwYXJlbnREaXYubmV4dEVsZW1lbnRTaWJsaW5nIDogcGFyZW50RGl2LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IC8vIGhvbGRzIG9ubHkgdGhlIGJ1dHRvbnNcclxuICAgIGNvbnNvbGUubG9nKHVwdm90ZWRTcGFuLCBwYXJlbnREaXYsIGJvdHRvbUJhciwgYnV0dG9ucyk7XHJcbiAgICAvLyBjcmVhdGUgYSBkaXYgZm9yIHRoZSBuZXcgYnV0dG9uXHJcbiAgICBjb25zdCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG5ld0Rpdi5jbGFzc05hbWUgPSAnbmV3RGl2JztcclxuICAgIC8vIGNyZWF0ZSBhIGJ1dHRvbiBmb3IgdGhlIG5ldyBkaXYgdGhhdCBjb3BpZXMgbGluayB0byBjbGlwYm9hcmQgd2hlbiBjbGlja2VkXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBsaW5rQnV0dG9uLmlubmVySFRNTCA9IFwiR2V0IGxpbmtcIjtcclxuICAgIGxpbmtCdXR0b24ub25jbGljayA9IGJ1dHRvbkNsaWNrO1xyXG4gICAgbmV3RGl2LmFwcGVuZENoaWxkKGxpbmtCdXR0b24pO1xyXG4gICAgLy8gYWRkIGNyZWF0ZWQgZWxlbWVudHMgdG8gRE9NXHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgICBjb25zb2xlLmxvZyhcIlBBUkVOVFRSRUVcIiwgbGlua0J1dHRvbiwgbGlua0J1dHRvbi5wYXJlbnRFbGVtZW50LCAoX2EgPSBsaW5rQnV0dG9uLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXJlbnRFbGVtZW50KTtcclxuICAgIGNvbnNvbGUubG9nKFwiU2libGluZ3M6XCIsIGdldFNpYmxpbmdzKGxpbmtCdXR0b24pLCBsaW5rQnV0dG9uLnBhcmVudEVsZW1lbnQgPyBnZXRTaWJsaW5ncyhsaW5rQnV0dG9uLnBhcmVudEVsZW1lbnQpIDogXCJObyBwYXJlbnRcIik7XHJcbiAgICAvLyBUT0RPIGNoZWNrIGlmIGxpbmsgaXMgc3RpbGwgdGhlcmUsIGlmIG5vdCBwbGFjZSBpdCBhZ2FpbiBhbmQgY2hlY2sgYWdhaW4gc29vbiBsYXRlclxyXG59XHJcbmV4cG9ydHMuYWRkTGlua0J1dHRvbiA9IGFkZExpbmtCdXR0b247XHJcbi8vIGNhbGxlZCB3aGVuIHRoZSBhZGRlZCBidXR0b24gaXMgY2xpY2tlZFxyXG5mdW5jdGlvbiBidXR0b25DbGljayhlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNsaWNrZWQhXCIsIGUpO1xyXG4gICAgLy8gZmluZCBsaW5rXHJcbiAgICBpZiAoZS50YXJnZXQpIHtcclxuICAgICAgICBjb25zdCBhc0VsZW1lbnQgPSAodCkgPT4gdC50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgdGFnID0gZ29VcEZpbmRUYWcoYXNFbGVtZW50KGUpLCAnaW1nJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGFnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIHNob3VsZCBuZXZlciBoYXBwZW5cclxuICAgICAgICBjb25zb2xlLndhcm4oXCJObyBldmVudCB0YXJnZXQgZm91bmQgZm9yIG1vdXNlIGNsaWNrXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZW1iZWRMaW5rID0gXCJ3d3cuZXhhbXBsZS5jb21cIjtcclxuICAgIC8vIGNvcHkgZm91bmQgbGluayB0byBjbGlwYm9hcmRcclxuICAgIC8vIGNvcHlUb0NsaXBib2FyZChlbWJlZExpbmspO1xyXG59XHJcbmZ1bmN0aW9uIGNvcHlUb0NsaXBib2FyZChzdHIpIHtcclxuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICAgIHRleHRhcmVhLnZhbHVlID0gc3RyO1xyXG4gICAgLy8gZWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRhcmVhKTtcclxuICAgIHRleHRhcmVhLnNlbGVjdCgpO1xyXG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dGFyZWEpO1xyXG59XHJcbi8vIGZpcnN0IHNlYXJjaGVzIGZvciBhIHRhZyBhdCB0aGUgc3VidHJlZSBvZiB0aGUgc3RhcnRpbmcgZWxlbWVudFxyXG4vLyBpZiBpdCBpcyBub3QgZm91bmQgdGhlcmUgaXQgd2lsbCBsb29rIGluIHN1YnRyZWUgb2Ygc2libGluZ3NcclxuLy8gaWYgaXQgaXMgbm90IGZvdW5kIHRoZXJlLCBnbyB1cCBhIGxldmVsIGFuZCBsb29rIGluIHRyZWVzIG9mIHNpYmxpbmdzXHJcbi8vICAgYWdhaW4gcmVwZWF0ZWRseSB1bnRpbCBpdCBpcyBmb3VuZFxyXG5mdW5jdGlvbiBnb1VwRmluZFRhZyhzdGFydCwgdGFnKSB7XHJcbiAgICBsZXQgdGFncztcclxuICAgIC8vIHNlYXJjaCBzdWJ0cmVlIGF0IHN0YXJ0XHJcbiAgICB0YWdzID0gc3RhcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcclxuICAgIGlmICh0YWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyByZXR1cm4gZmlyc3QgaGl0XHJcbiAgICAgICAgcmV0dXJuIHRhZ3NbMF07XHJcbiAgICB9XHJcbiAgICAvLyBnbyB1cCB0byBzaWJsaW5nc1xyXG59XHJcbmZ1bmN0aW9uIGdldFNpYmxpbmdzKGVsKSB7XHJcbiAgICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBbLi4uZWwucGFyZW50RWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKGkgPT4gaSAhPSBlbCk7IC8vIGZpbHRlciBzdGFydGluZyBwb2ludFxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4vZnVuY3Rpb25zXCIpO1xyXG5jb25zb2xlLmxvZyhcIlJ1bm5pbmcgbWFpbiFcIik7XHJcbi8vIHVzZSBhbiBvYnNlcnZlciB0byBkZXRlY3Qgd2hlbiB0aGUgYm9keSBzdHlsZSBjaGFuZ2VzXHJcbi8vIHdoZW4gaXQgZG9lcyBjYWxsIGZ1bmN0aW9uIHRvIGFkZCBlbWJlZCBsaW5rIGJ1dHRvbiBpZiBcclxuLy8gYSBwb3N0IGlzIGluIGZvY3VzXHJcbmNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcbmNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uUmVjb3JkKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9PSBcImhpZGRlblwiKSB7XHJcbiAgICAgICAgICAgIC8vIGEgcG9zdCBpcyBpbiBmb2N1cywgYWRkIGxpbmsgYnV0dG9uXHJcbiAgICAgICAgICAgIHBvc3RJbkZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5vYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KTtcclxuY29uc29sZS5sb2codGFyZ2V0KTtcclxuZnVuY3Rpb24gcG9zdEluRm9jdXMoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvc3QgaW4gZm9jdXMhXCIpO1xyXG4gICAgLy8gY2hlY2sgZXZlcnkgMjAwbXMgZm9yIGFuIHVwdm90ZWQgJSBzcGFuIGVsZW1lbnRcclxuICAgIGxldCBjYW5kaWRhdGVzID0gW107XHJcbiAgICBmdW5jdGlvbiBzcGFuQ2hlY2soKSB7XHJcbiAgICAgICAgY2FuZGlkYXRlcyA9IGZ1bmN0aW9uc18xLmdldEVsZW1lbnRzQnlUZXh0SW5jbHVzaW9uKCclIFVwdm90ZWQnKTtcclxuICAgICAgICBpZiAoY2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIHNwYW4gaXMgY3JlYXRlZCwgY29udGludWUgdG8gbmV4dCBzdGVwXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrKTsgLy8gY2xlYXIgdGltZXIgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbnNfMS5hZGRMaW5rQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgY2hlY2sgPSBzZXRJbnRlcnZhbChzcGFuQ2hlY2ssIDIwMCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==