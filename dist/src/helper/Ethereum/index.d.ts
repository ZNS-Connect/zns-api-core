declare class EthereumHelper {
    /**
     *
     * @param {String} message
     * @param {String} signature
     * @returns {String}
     */
    static verifySignedMessage: (message: string, signature: string) => string;
    /**
     *
     * @param {Array<String>} types
     * @param {Array<String>} values
     * @returns {String}
     */
    static encodeABIParams: (types: string[], values: any[]) => string;
    /**
     *
     * @param {String} value
     * @returns {String}
     */
    static encodeBytes32String: (value: string) => string;
}
export default EthereumHelper;
