"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ONCHAIN_CONFIG = {
    CHAIN_TO_RPC: {
        56: "https://go.getblock.io/67b1ef3e22b242f7a339387c8257063f",
        97: "https://bsc-testnet-rpc.publicnode.com",
        137: "https://polygon-mainnet.infura.io/v3/254f726a173649a896fe0d63ab2085b9",
        81457: "https://rpc.envelop.is/blast",
        167000: "https://rpc.ankr.com/taiko",
        534352: "https://scroll.blockpi.network/v1/rpc/public",
        31337: "http://127.0.0.1:8545"
    },
    CHAIN_TO_ADDRESS: {
        56: {
            ZNS_REGISTRY: "0x7e2CF06F092c9F5cF5972eF021635b6c8E1C5bb2",
        },
        97: {
            ZNS_REGISTRY: "0x91FdD937dd84493c168217bBE5d13B08B0bC2e6D",
        },
        137: {
            ZNS_REGISTRY: "0x8ccd9c0a9c084412416a85fd748c7f1e9b86442d",
        },
        81457: {
            ZNS_REGISTRY: "0x59b9ac688e39a14b938ac8c3269db66d8adb9af6",
        },
        534352: {
            ZNS_REGISTRY: "0xB00910Bac7DA44c0D440798809dbF8d51FDBb635",
        },
        31337: {
            ZNS_REGISTRY: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        }
    },
    CHAIN_TO_COLOR: {
        56: "#ffffff",
        97: "#ffffff",
        137: "#ffffff",
        81457: "#ffffff",
        534352: "#ffffff",
        167000: "#ffffff"
    },
};
exports.default = ONCHAIN_CONFIG;
