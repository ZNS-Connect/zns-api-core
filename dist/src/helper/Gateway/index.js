"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
// ** import custom constants
const constant_1 = require("../../constant");
class GatewayHelper {
}
_a = GatewayHelper;
/**
 *
 * @param {String} ipAddress
 * @returns {Promise<IpDetail>} ipDetail
 */
GatewayHelper.getIpDetail = async (ipAddress) => {
    try {
        const response = await axios_1.default.get(path_1.default.join(constant_1.GLOBAL_API.GET_IP_DETAIL, ipAddress, 'json'));
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
/**
 *
 * @param {Request} request
 * @param {String} targetIp
 * @returns {Boolean}
 */
GatewayHelper.filterIpAddress = (request, targetIp) => {
    if (request.info.remoteAddress === targetIp) {
        return true;
    }
    else {
        return false;
    }
};
exports.default = GatewayHelper;
