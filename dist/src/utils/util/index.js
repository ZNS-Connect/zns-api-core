"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
}
/**
 *
 * @param {Array<string>} args
 * @returns {String}
 */
Util.joinEndPoint = (...args) => {
    return args.join();
};
/**
 *
 * @param {any} value
 * @returns {Number}
 */
Util.toNumber = (value) => {
    return Number(value);
};
exports.default = Util;
