import { ResponsePayload, RequestPayload } from "../../types";
import { Metadata } from "../../types";
declare class DataController {
    /**
     *
     * @param {RequestPayload} payload
     * @returns {ResponsePayload}
     */
    static checkResponse: (payload: RequestPayload) => ResponsePayload;
    static getMetadata: (payload: RequestPayload) => Promise<Metadata>;
    static getImage: (domain: string, tld: string, chain: number) => string;
}
export default DataController;
