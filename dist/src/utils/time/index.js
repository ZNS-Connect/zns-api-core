"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class TimeUtil {
}
_a = TimeUtil;
TimeUtil.getPastSpentTime = (pastTimestamp) => {
    return Date.now() - pastTimestamp;
};
TimeUtil.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.default = TimeUtil;
