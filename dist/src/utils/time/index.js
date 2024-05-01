"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class TimeUtil {
}
_a = TimeUtil;
/**
 *
 * @param {Number} pastTimestamp
 * @returns {Number}
 */
TimeUtil.getPastSpentTime = (pastTimestamp) => {
    return Date.now() - pastTimestamp;
};
/**
 *
 * @param {Number} ms
 * @returns {Promise<unknown>}
 */
TimeUtil.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.default = TimeUtil;
