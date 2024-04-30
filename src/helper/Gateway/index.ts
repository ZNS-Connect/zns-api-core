// ** import external libraries
import { Request } from "@hapi/hapi"
import path from "path"
import axios from "axios"

// ** import custom constants
import { GLOBAL_API } from "../../constant"

// ** import custom types
import { IpDetail } from "../../types"

class GatewayHelper {
    /**
     * 
     * @param {String} ipAddress 
     * @returns {Promise<IpDetail>} ipDetail
     */
    static getIpDetail = async (ipAddress: string) => {
        try {
            const response = await axios.get(path.join(GLOBAL_API.GET_IP_DETAIL, ipAddress, 'json'))

            return response.data
        }
        catch(error) {
            throw error
        }
    }

    /**
     * 
     * @param {Request} request 
     * @param {String} targetIp 
     * @returns {Boolean}
     */
    static filterIpAddress = (request: Request, targetIp: string) => {
        if(request.info.remoteAddress === targetIp) {
            return true
        }
        else {
            return false
        }
    }
}

export default GatewayHelper