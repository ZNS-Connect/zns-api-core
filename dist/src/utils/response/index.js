"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseUtil {
}
_a = ResponseUtil;
/**
 *
 * @param request
 * @param reply
 * @param error
 * @returns {Error}
 */
ResponseUtil.failAction = async (request, reply, error) => {
    return error;
};
/**
 *
 * @param responsePayload
 * @param reply
 * @returns {ResponseObject}
 */
ResponseUtil.sendResponse = (responsePayload, reply) => {
    if (responsePayload.code) {
        return reply.response(responsePayload).code(responsePayload.code);
    }
    else {
        return reply.response(responsePayload);
    }
};
/**
 *
 * @param responsePayload
 * @param reply
 * @returns {ResponseObject}
 */
ResponseUtil.sendRawResponse = (responsePayload, reply) => {
    return reply.response(responsePayload);
};
/**
 *
 * @param responsePayload
 * @param reply
 * @returns {ResponseObject}
 */
ResponseUtil.sendImageResponse = (responsePayload, reply) => {
    return reply.response(responsePayload).header('Content-Disposition', 'inline').header('Content-type', 'image/png');
};
/**
 *
 * @param responsePayload
 * @param reply
 * @returns {ResponseObject}
 */
ResponseUtil.sendResponseWithCookie = (responsePayload, reply) => {
    if (responsePayload.code) {
        return reply.response(responsePayload).code(responsePayload.code);
    }
    else {
        return reply.response(responsePayload);
    }
};
exports.default = ResponseUtil;
