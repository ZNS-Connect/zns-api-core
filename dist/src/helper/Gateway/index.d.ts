import { Request } from "@hapi/hapi";
declare class GatewayHelper {
    /**
     *
     * @param ipAddress
     * @returns {Promise<IpDetail>} ipDetail
     */
    static getIpDetail: (ipAddress: string) => Promise<any>;
    /**
     *
     * @param request
     * @param targetIp
     * @returns {Boolean}
     */
    static filterIpAddress: (request: Request, targetIp: string) => boolean;
}
export default GatewayHelper;
