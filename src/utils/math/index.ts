class MathUtil {
    /**
     * 
     * @param {Number} vaule 
     * @param {Number} percentage 
     * @returns {Number}
     */
    static getPercentRate = (vaule: number, percentage: number) => {
        return vaule / 100 * percentage
    }
}

export default MathUtil