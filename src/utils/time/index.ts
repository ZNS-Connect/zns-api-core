class TimeUtil {
    /**
     * 
     * @param {Number} pastTimestamp 
     * @returns {Number}
     */
    static getPastSpentTime = (pastTimestamp: number) => {
        return Date.now() - pastTimestamp
    }

    /**
     * 
     * @param {Number} ms 
     * @returns {Promise<unknown>}
     */
    static sleep = async (ms: number): Promise<unknown> => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default TimeUtil