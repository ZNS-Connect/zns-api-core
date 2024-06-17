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

const ONCHAIN_CONFIG: ConfigType = {
  CHAIN_TO_RPC: {
    56: "https://go.getblock.io/67b1ef3e22b242f7a339387c8257063f",
    137: "https://polygon-mainnet.infura.io/v3/254f726a173649a896fe0d63ab2085b9",
    534352: "https://scroll.blockpi.network/v1/rpc/public",
  },
  CHAIN_TO_ADDRESS: {
    56: {
      ZNS_REGISTRY: "0x7e2CF06F092c9F5cF5972eF021635b6c8E1C5bb2",
    },
    137: {
      ZNS_REGISTRY: "0xBD32A89A76aFAFDDD8Fd514a292326377B6e4Cc9",
    },
    534352: {
      ZNS_REGISTRY: "0xB00910Bac7DA44c0D440798809dbF8d51FDBb635",
    },
  },
  CHAIN_TO_COLOR: {
    56: "#ffffff",
    137: "#8247E5",
    534352: "#ffffff",
  },
};

export default ONCHAIN_CONFIG;
