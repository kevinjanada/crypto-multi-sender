(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 118:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jotai_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(752);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(582);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(451);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(590);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(332);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(583);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jotai_utils__WEBPACK_IMPORTED_MODULE_2__, _store__WEBPACK_IMPORTED_MODULE_3__, jotai__WEBPACK_IMPORTED_MODULE_6__, react_toastify__WEBPACK_IMPORTED_MODULE_7__]);
([jotai_utils__WEBPACK_IMPORTED_MODULE_2__, _store__WEBPACK_IMPORTED_MODULE_3__, jotai__WEBPACK_IMPORTED_MODULE_6__, react_toastify__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.extendTheme)({
    colors: {
        brand: {
            blue: "#1D3D72",
            lightBlue: "#D6DCFB"
        }
    }
});
function MyApp({ Component , pageProps  }) {
    const { initialState  } = pageProps;
    (0,jotai_utils__WEBPACK_IMPORTED_MODULE_2__.useHydrateAtoms)(initialState ? [
        _store__WEBPACK_IMPORTED_MODULE_3__/* .walletAtom */ .x,
        initialState
    ] : []);
    const supportedChainIds = (0,_utils__WEBPACK_IMPORTED_MODULE_9__/* .getSupportedChainIds */ .c)();
    const [, setWallet] = (0,jotai__WEBPACK_IMPORTED_MODULE_6__.useAtom)(_store__WEBPACK_IMPORTED_MODULE_3__/* .walletAtom */ .x);
    const [, setWeb3Provider] = (0,jotai__WEBPACK_IMPORTED_MODULE_6__.useAtom)(_store__WEBPACK_IMPORTED_MODULE_3__/* .web3ProviderAtom */ .E);
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        const checkWeb3Provider = async ()=>{
            const provider = new ethers__WEBPACK_IMPORTED_MODULE_5__.ethers.providers.Web3Provider(window.ethereum, "any");
            // Prompt user for account connections
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const { chainId  } = await provider.getNetwork();
            setWallet({
                address,
                chainId
            });
            if (!supportedChainIds.includes(Number(chainId))) {
                (0,react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast)("Unsupported Network");
            }
            provider.provider.on("chainChanged", async function(chain) {
                if (!supportedChainIds.includes(Number(chain))) {
                    (0,react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast)("Unsupported Network");
                }
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setWallet({
                    address,
                    chainId: Number(chain)
                });
            });
            provider.provider.on("accountsChanged", async function(accounts) {
                const { chainId  } = await provider.getNetwork();
                setWallet({
                    chainId,
                    address: accounts[0]
                });
            });
            setWeb3Provider(provider);
        };
        checkWeb3Provider();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {
        theme: theme,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_7__.ToastContainer, {})
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 332:
/***/ (() => {



/***/ }),

/***/ 930:
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 982:
/***/ ((module) => {

"use strict";
module.exports = require("ethers");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 451:
/***/ ((module) => {

"use strict";
module.exports = import("jotai");;

/***/ }),

/***/ 752:
/***/ ((module) => {

"use strict";
module.exports = import("jotai/utils");;

/***/ }),

/***/ 590:
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [406], () => (__webpack_exec__(118)));
module.exports = __webpack_exports__;

})();