import { Request } from "@hapi/hapi";
declare class GatewayHelper {
    /**
     *
     * @param {String} ipAddress
     * @returns {Promise<IpDetail>} ipDetail
     */
    static getIpDetail: (ipAddress: string) => Promise<any>;
    /**
     *
     * @param {Request} request
     * @param {String} targetIp
     * @returns {Boolean}
     */
    static filterIpAddress: (request: Request, targetIp: string) => boolean;
}
export default GatewayHelper;
