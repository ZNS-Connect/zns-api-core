declare class TimeUtil {
    static getPastSpentTime: (pastTimestamp: number) => number;
    static sleep: (ms: number) => Promise<unknown>;
}
export default TimeUtil;
