"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ethers_1 = require("ethers");
const abi_1 = __importDefault(require("../constant/abi"));
const constant_1 = require("../constant");
class MintEventListener {
    constructor(chainId) {
        this.start = async () => {
            if (!this.chainId || !this.provider || !this.contract) {
                throw new Error("Instance not mounted");
            }
            this.contract.on("MintedDomain", async (domainName, tokenId, owner, expiry) => {
                const data = { chain: this.chainId, id: Number(tokenId) };
                try {
                    const res = await axios_1.default.post('http://127.0.0.1:8000/v1/create-metadata', data);
                    console.log(res.data);
                }
                catch (error) {
                    console.error(error);
                }
            });
        };
        this.terminate = async () => {
            try {
                await this.contract.off("MintedDomain");
            }
            catch (error) {
                console.error(error);
            }
        };
        this.chainId = chainId;
        this.provider = new ethers_1.ethers.JsonRpcProvider(constant_1.ONCHAIN_CONFIG.CHAIN_TO_RPC[this.chainId]);
        this.contract = new ethers_1.ethers.Contract(constant_1.ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[this.chainId].ZNS_REGISTRY, abi_1.default.ZNS_REGISTRY, this.provider);
    }
}
class ZNSEventListener {
    constructor() {
        this.mountBscMainnet = async () => {
            try {
                const mintListener = new MintEventListener(56);
                await mintListener.start();
                console.log("Event listener started");
            }
            catch (error) {
                console.error(error);
            }
        };
        this.mountScrollMainnet = async () => {
            try {
                const mintListener = new MintEventListener(534352);
                await mintListener.start();
                console.log("Event listener started");
            }
            catch (error) {
                console.error(error);
            }
        };
        this.mountBlastMainnet = async () => {
            try {
                const mintListener = new MintEventListener(81457);
                await mintListener.start();
                console.log("Event listener started");
            }
            catch (error) {
                console.error(error);
            }
        };
        this.mountPolygonMainnet = async () => {
            try {
                const mintListener = new MintEventListener(137);
                await mintListener.start();
                console.log("Event listener started");
            }
            catch (error) {
                console.error(error);
            }
        };
        this.mountAll = async () => {
            try {
                await this.mountBscMainnet();
                await this.mountScrollMainnet();
                await this.mountPolygonMainnet();
            }
            catch (error) {
                console.error(error);
            }
        };
    }
}
exports.default = ZNSEventListener;
