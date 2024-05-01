"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ** import external libraries
const ethers_1 = require("ethers");
class EthereumHelper {
}
/**
 *
 * @param {String} message
 * @param {String} signature
 * @returns {String}
 */
EthereumHelper.verifySignedMessage = (message, signature) => {
    const verifiedAddress = ethers_1.ethers.verifyMessage(message, signature);
    return verifiedAddress;
};
/**
 *
 * @param {Array<String>} types
 * @param {Array<String>} values
 * @returns {String}
 */
EthereumHelper.encodeABIParams = (types, values) => {
    const abiCoder = new ethers_1.ethers.AbiCoder();
    const encodedParams = abiCoder.encode(types, values);
    return encodedParams;
};
/**
 *
 * @param {String} value
 * @returns {String}
 */
EthereumHelper.encodeBytes32String = (value) => {
    const byte32 = ethers_1.ethers.encodeBytes32String(value);
    return byte32;
};
exports.default = EthereumHelper;
