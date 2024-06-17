import { ResponsePayload, RequestPayload } from "../../types";
import { Metadata } from "../../types";
declare class DataController {
    /**
     *
     * @param {RequestPayload} payload
     * @returns {ResponsePayload}
     */
    static checkResponse: (payload: RequestPayload) => ResponsePayload;
    /**
     *
     * @param {RequestPayload} payload
     * @returns {Promise<unknown>}
     */
    static createMetadata: (payload: RequestPayload) => Promise<unknown>;
    /**
     *
     * @param {RequestPayload} payload
     * @returns {Promise<Metadata>}
     */
    static getMetadata: (payload: RequestPayload) => Promise<Metadata>;
    /**
     *
     * @param {String} domain
     * @param {String} tld
     * @param {Number} chain
     * @returns {String}
     */
    static getImage: (domain: string, tld: string, chain: number) => Promise<string>;
}
export default DataController;
