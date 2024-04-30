// ** import external libraries
import { ethers } from "ethers"
// ** import custom constants
import { ABI } from "../../constant"

class ZnsRegistry {
    provider: ethers.JsonRpcProvider
    contract: ethers.Contract

    constructor(rpcUrl: string, address: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl)
        this.contract = new ethers.Contract(address, ABI.ZNS_REGISTRY, this.provider)
    }

    tokenURI = async (tokenID: number) => {
        try {
            const tokenURI = await this.contract.tokenURI(tokenID)
    
            return tokenURI
        }
        catch(error) {
            throw error
        }
    }

    itToDomain = async (tokenID: number): Promise<string> => {
        try {
            const domain = await this.contract.idToDomain(tokenID)
            return domain
        }
        catch(error) {
            throw error
        }
    }

    tld = async (): Promise<string> => {
        try {
            const tld = await this.contract.tld()

            return tld
        }
        catch(error) {
            throw error
        }
    }
}

export default ZnsRegistry