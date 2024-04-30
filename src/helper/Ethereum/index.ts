// ** import external libraries
import { ethers } from "ethers"

class EthereumHelper {
    /**
     * 
     * @param {String} message 
     * @param {String} signature 
     * @returns {String}
     */
    static verifySignedMessage = (message: string, signature: string): string => {
        const verifiedAddress = ethers.verifyMessage(message, signature)

        return verifiedAddress
    }

    /**
     * 
     * @param {Array<String>} types 
     * @param {Array<String>} values 
     * @returns {String}
     */
    static encodeABIParams = (types: string[], values: any[]) => {
        const abiCoder = new ethers.AbiCoder()
        const encodedParams = abiCoder.encode(types, values)

        return encodedParams
    }

    /**
     * 
     * @param {String}value 
     * @returns {String}
     */
    static encodeBytes32String = (value: string) => {
        const byte32 = ethers.encodeBytes32String(value)

        return byte32
    }
}

export default EthereumHelper