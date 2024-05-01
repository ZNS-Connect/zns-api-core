declare class Util {
    /**
     *
     * @param {Array<string>} args
     * @returns {String}
     */
    static joinEndPoint: (...args: Array<string>) => string;
    /**
     *
     * @param {any} value
     * @returns {Number}
     */
    static toNumber: (value: any) => number;
}
export default Util;
