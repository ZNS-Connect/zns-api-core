declare class TimeUtil {
    /**
     *
     * @param {Number} pastTimestamp
     * @returns {Number}
     */
    static getPastSpentTime: (pastTimestamp: number) => number;
    /**
     *
     * @param {Number} ms
     * @returns {Promise<unknown>}
     */
    static sleep: (ms: number) => Promise<unknown>;
}
export default TimeUtil;
