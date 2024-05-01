"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathUtil {
}
/**
 *
 * @param {Number} vaule
 * @param {Number} percentage
 * @returns {Number}
 */
MathUtil.getPercentRate = (vaule, percentage) => {
    return vaule / 100 * percentage;
};
exports.default = MathUtil;
