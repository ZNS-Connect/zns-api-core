"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ** import external libraries
const ethers_1 = require("ethers");
// ** import custom constants
const constant_1 = require("../../constant");
class ZnsRegistry {
    constructor(rpcUrl, address) {
        this.tokenURI = async (tokenID) => {
            try {
                const tokenURI = await this.contract.tokenURI(tokenID);
                return tokenURI;
            }
            catch (error) {
                throw error;
            }
        };
        this.itToDomain = async (tokenID) => {
            try {
                const domain = await this.contract.idToDomain(tokenID);
                return domain;
            }
            catch (error) {
                throw error;
            }
        };
        this.tld = async () => {
            try {
                const tld = await this.contract.tld();
                return tld;
            }
            catch (error) {
                throw error;
            }
        };
        this.provider = new ethers_1.ethers.JsonRpcProvider(rpcUrl);
        this.contract = new ethers_1.ethers.Contract(address, constant_1.ABI.ZNS_REGISTRY, this.provider);
    }
}
exports.default = ZnsRegistry;
