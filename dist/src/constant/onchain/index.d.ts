interface ConfigType {
    CHAIN_TO_RPC: {
        [key: number]: string;
    };
    CHAIN_TO_ADDRESS: {
        [key: number]: {
            ZNS_REGISTRY: string;
        };
    };
    CHAIN_TO_COLOR: {
        [key: number]: string;
    };
}
declare const ONCHAIN_CONFIG: ConfigType;
export default ONCHAIN_CONFIG;
