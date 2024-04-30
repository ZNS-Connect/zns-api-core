import { ethers } from "ethers";
declare class ZnsRegistry {
    provider: ethers.JsonRpcProvider;
    contract: ethers.Contract;
    constructor(rpcUrl: string, address: string);
    tokenURI: (tokenID: number) => Promise<any>;
    itToDomain: (tokenID: number) => Promise<string>;
    tld: () => Promise<string>;
}
export default ZnsRegistry;
