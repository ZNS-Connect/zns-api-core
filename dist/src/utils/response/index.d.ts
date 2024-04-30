import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { ResponsePayload } from '../../types';
declare class ResponseUtil {
    /**
     *
     * @param request
     * @param reply
     * @param error
     * @returns {Error}
     */
    static failAction: (request?: Request, reply?: ResponseToolkit, error?: Error) => Promise<Error>;
    /**
     *
     * @param responsePayload
     * @param reply
     * @returns {ResponseObject}
     */
    static sendResponse: (responsePayload: ResponsePayload, reply: ResponseToolkit) => ResponseObject;
    /**
     *
     * @param responsePayload
     * @param reply
     * @returns {ResponseObject}
     */
    static sendRawResponse: (responsePayload: any, reply: ResponseToolkit) => ResponseObject;
    /**
     *
     * @param responsePayload
     * @param reply
     * @returns {ResponseObject}
     */
    static sendImageResponse: (responsePayload: any, reply: ResponseToolkit) => ResponseObject;
    /**
     *
     * @param responsePayload
     * @param reply
     * @returns {ResponseObject}
     */
    static sendResponseWithCookie: (responsePayload: ResponsePayload, reply: ResponseToolkit) => ResponseObject;
}
export default ResponseUtil;
