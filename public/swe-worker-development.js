/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@ducanh2912+next-pwa@9.4.0_next@13.4.20-canary.0_webpack@5.88.2/node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@ducanh2912+next-pwa@9.4.0_next@13.4.20-canary.0_webpack@5.88.2/node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nself.onmessage = async (e)=>{\n    if (\"__FRONTEND_NAV_CACHE__\" === e.data.type) {\n        let t = e.data.url, a = await caches.open(\"pages\"), s = await a.match(t, {\n            ignoreSearch: !0\n        });\n        if (!s) {\n            let s = await fetch(t);\n            if (s.ok) {\n                let c = s.clone();\n                if (a.put(t, c), e.data.shouldCacheAggressively && s.headers.get(\"Content-Type\")?.includes(\"text/html\")) try {\n                    let e = await s.text(), t = [], a = await caches.open(\"static-style-assets\"), c = await caches.open(\"next-static-js-assets\"), l = await caches.open(\"static-js-assets\");\n                    for (let [s, c] of e.matchAll(/<link.*?href=['\"](.*?)['\"].*?>/g))/rel=['\"]stylesheet['\"]/.test(s) && t.push(a.match(c).then((e)=>e ? Promise.resolve() : a.add(c)));\n                    for (let [, a] of e.matchAll(/<script.*?src=['\"](.*?)['\"].*?>/g)){\n                        let e = /\\/_next\\/static.+\\.js$/i.test(a) ? c : l;\n                        t.push(e.match(a).then((t)=>t ? Promise.resolve() : e.add(a)));\n                    }\n                    return await Promise.all(t);\n                } catch  {}\n            }\n        }\n    }\n    return Promise.resolve();\n};\n\n\n//# sourceURL=webpack://tickly/./node_modules/.pnpm/@ducanh2912+next-pwa@9.4.0_next@13.4.20-canary.0_webpack@5.88.2/node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./node_modules/.pnpm/@ducanh2912+next-pwa@9.4.0_next@13.4.20-canary.0_webpack@5.88.2/node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;