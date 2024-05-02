interface ConfigType {
    CHAIN_TO_RPC: {
        [key: number]: string
    },
    CHAIN_TO_ADDRESS: {
        [key: number]: {
            ZNS_REGISTRY: string
        }
    },
    CHAIN_TO_COLOR: {
        [key: number]: string
    }
}

const ONCHAIN_CONFIG: ConfigType = {
    CHAIN_TO_RPC: {
        56: 'https://go.getblock.io/67b1ef3e22b242f7a339387c8257063f'
    },
    CHAIN_TO_ADDRESS: {
        56: {
            ZNS_REGISTRY: '0xeC253c53921031E7718b8a0a307aA4204B0DcF33'
        }
    },
    CHAIN_TO_COLOR: {
        56: "#efcc4f"
    }
}

export default ONCHAIN_CONFIG