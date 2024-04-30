class Util {
    /**
     * 
     * @param {Array<string>} args 
     * @returns {String}
     */
    static joinEndPoint = (...args: Array<string>): string => {
        return args.join()
    }

    /**
     * 
     * @param {any} value 
     * @returns {Number}
     */
    static toNumber = (value: any): number => {
        return Number(value)
    }
}

export default Util