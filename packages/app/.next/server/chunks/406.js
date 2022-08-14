"use strict";
exports.id = 406;
exports.ids = [406];
exports.modules = {

/***/ 582:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ web3ProviderAtom),
/* harmony export */   "x": () => (/* binding */ walletAtom)
/* harmony export */ });
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(451);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jotai__WEBPACK_IMPORTED_MODULE_0__]);
jotai__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const walletAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)({
    address: "",
    chainId: 0
});
const web3ProviderAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)(null);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EB": () => (/* binding */ getEtherscanLink),
/* harmony export */   "JB": () => (/* binding */ getSupportedNetworks),
/* harmony export */   "Tg": () => (/* binding */ formatAddress),
/* harmony export */   "c": () => (/* binding */ getSupportedChainIds)
/* harmony export */ });
/* harmony import */ var contracts_config_addresses_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(784);

const networksByChainId = {
    1: {
        name: "Ethereum Mainnet",
        image: "eth-diamond-purple.png"
    },
    137: {
        name: "Polygon Mainnet",
        image: "/polygon-token.png"
    },
    80001: {
        name: "Mumbai Testnet",
        image: "/polygon-token.png"
    }
};
function getSupportedChainIds() {
    const supportedChainIds = [];
    for (const [chainId, ] of Object.entries(contracts_config_addresses_json__WEBPACK_IMPORTED_MODULE_0__)){
        supportedChainIds.push(Number(chainId));
    }
    return supportedChainIds;
}
function getSupportedNetworks() {
    const supportedChainIds = getSupportedChainIds();
    // const supportedChainIds = [1, 137]
    const supportedNetworks = [];
    for (const chainId of supportedChainIds){
        const network = networksByChainId[Number(chainId)];
        if (network) {
            supportedNetworks.push(network);
        }
    }
    return supportedNetworks;
}
function getEtherscanLink(chainId, txHash) {
    switch(chainId){
        case 147:
            return `https://polygonscan.com/tx/${txHash}`;
        case 80001:
            return `https://mumbai.polygonscan.com/tx/${txHash}`;
    }
}
function formatAddress(address, length) {
    if (!address) return "";
    let _length = length ? length : 8;
    return address.substring(0, _length / 2) + "..." + address.substring(address.length - _length / 2);
}


/***/ }),

/***/ 784:
/***/ ((module) => {

module.exports = JSON.parse('{"137":{"BatchSender":"0x49b65F2625B56570b048366bcDa9801da9C63A51"},"80001":{"BatchSender":"0x31b45E11F370FA514F0BBE7406d53500e228c570"}}');

/***/ })

};
;