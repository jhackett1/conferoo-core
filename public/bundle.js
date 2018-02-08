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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// document.querySelector('section#hero a').addEventListener('click', function(e){
//   e.preventDefault();
//   document.querySelector('#about').scrollIntoView({
//     block: "start",
//     inline: "nearest",
//     behavior: 'smooth'
//   });
// });
// Function to grab random elements from array, without duplicates
function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len) n = len;

  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len;
  }

  return result;
}

fetch('https://www.fsconference.co.uk/api/speakers', {
  method: 'get'
}).then(function (response) {
  response.json().then(function (data) {
    // Save speakers as array ready to render
    var speakerData = getRandom(data, 4); //Grab <ul> from the page

    var list = document.getElementById('speaker-list'); // Clear the spinner

    list.innerHTML = ''; //Render a list item for each speaker

    for (var i = 0; i < speakerData.length; i++) {
      var speaker = document.createElement('li');
      var shortBio = speakerData[i].biography;

      if (speakerData[i].biography.length > 200) {
        shortBio = speakerData[i].biography.substring(0, 200) + "...";
      }

      speaker.innerHTML = "\n          <div class=\"portrait\" style=\"background-image: url('".concat(speakerData[i].image, "')\"></div>\n          <div class=\"text\">\n            <h4>").concat(speakerData[i].name, "</h4>\n            <h5>").concat(speakerData[i].position, "</h5>\n            <p>").concat(shortBio, "</p>\n          </div>\n        ");
      list.appendChild(speaker);
    }
  });
}).catch(function (err) {
  console.log(err);
});

/***/ })
/******/ ]);