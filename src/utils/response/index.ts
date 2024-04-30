// ** import external types
import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

// ** import custom types
import { ResponsePayload } from '../../types'

class ResponseUtil {
    /**
     * 
     * @param {Request} request 
     * @param {ResponseToolkit} reply 
     * @param {Error} error 
     * @returns {Error}
     */
    static failAction = async (request?: Request, reply?: ResponseToolkit, error?: Error) => {
        return error
    }

    /**
     * 
     * @param {ResponsePayload} responsePayload 
     * @param {ResponseToolkit} reply 
     * @returns {ResponseObject}
     */
    static sendResponse = (responsePayload: ResponsePayload, reply: ResponseToolkit): ResponseObject => {
        if(responsePayload.code) {
            return reply.response(responsePayload).code(responsePayload.code)
        }
        else {
            return reply.response(responsePayload)
        }
    }

    /**
     * 
     * @param {any} responsePayload 
     * @param {ResponseToolkit} reply 
     * @returns {ResponseObject}
     */
    static sendRawResponse = (responsePayload: any, reply: ResponseToolkit): ResponseObject => {
        return reply.response(responsePayload)
    }

    /**
     * 
     * @param {any} responsePayload 
     * @param {ResponseToolkit} reply 
     * @returns {ResponseObject}
     */
    static sendImageResponse = (responsePayload: any, reply: ResponseToolkit): ResponseObject => {
        return reply.response(responsePayload).header('Content-Disposition','inline').header('Content-type','image/png');
    }

    /**
     * 
     * @param {ResponsePayload} responsePayload 
     * @param {ResponseToolkit} reply 
     * @returns {ResponseObject}
     */
    static sendResponseWithCookie = (responsePayload: ResponsePayload, reply: ResponseToolkit): ResponseObject => {

        if(responsePayload.code) {
            return reply.response(responsePayload).code(responsePayload.code)
        }
        else {
            return reply.response(responsePayload)
        }
    }
}

export default ResponseUtil