class Util {
    static joinEndPoint = (...args: Array<string>) => {
        return args.join()
    }

    static toNumber = (value: any) => {
        return Number(value)
    }
}

export default Util