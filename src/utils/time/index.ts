class TimeUtil {
    static getPastSpentTime = (pastTimestamp: number) => {
        return Date.now() - pastTimestamp
    }

    static sleep = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default TimeUtil