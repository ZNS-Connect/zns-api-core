import { ethers } from "ethers";
declare class ZnsRegistry {
    provider: ethers.JsonRpcProvider;
    contract: ethers.Contract;
    constructor(rpcUrl: string, address: string);
    /**
     *
     * @param {Number} tokenID
     * @returns {Promise<string>}
     */
    tokenURI: (tokenID: number) => Promise<string>;
    /**
     *
     * @param {Number} tokenID
     * @returns {Promise<string>}
     */
    itToDomain: (tokenID: number) => Promise<string>;
    /**
     *
     * @returns {Promise<string>}
     */
    tld: () => Promise<string>;
}
export default ZnsRegistry;
