import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { ResponsePayload } from '../../types';
declare class ResponseUtil {
    /**
     *
     * @param {Request} request
     * @param {ResponseToolkit} reply
     * @param {Error} error
     * @returns {Error}
     */
    static failAction: (request?: Request, reply?: ResponseToolkit, error?: Error) => Promise<Error>;
    /**
     *
     * @param {ResponsePayload} responsePayload
     * @param {ResponseToolkit} reply
     * @returns {ResponseObject}
     */
    static sendResponse: (responsePayload: ResponsePayload, reply: ResponseToolkit) => ResponseObject;
    /**
     *
     * @param {any} responsePayload
     * @param {ResponseToolkit} reply
     * @returns {ResponseObject}
     */
    static sendRawResponse: (responsePayload: any, reply: ResponseToolkit) => ResponseObject;
    /**
     *
     * @param {any} responsePayload
     * @param {ResponseToolkit} reply
     * @returns {ResponseObject}
     */
    static sendImageResponse: (responsePayload: any, reply: ResponseToolkit) => ResponseObject;
    /**
     *
     * @param {ResponsePayload} responsePayload
     * @param {ResponseToolkit} reply
     * @returns {ResponseObject}
     */
    static sendResponseWithCookie: (responsePayload: ResponsePayload, reply: ResponseToolkit) => ResponseObject;
}
export default ResponseUtil;
