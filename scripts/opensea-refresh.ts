import "dotenv/config"
import { OpenSeaSDK, Chain } from "opensea-js"
import { ethers } from "ethers"
import ABI from "../src/constant/abi/index"
import ONCHAIN_CONFIG from '../src/constant/onchain'

async function main() {
    try {
        const chainId = 56

        const provider = new ethers.JsonRpcProvider(ONCHAIN_CONFIG.CHAIN_TO_RPC[chainId])
        const v3contract = new ethers.Contract(ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[chainId].ZNS_REGISTRY, ABI.ZNS_REGISTRY, provider)
        const tokenList = await v3contract.getTotalRegisteredDomains()

        const sdk = new OpenSeaSDK(provider, {
            apiKey: '95494f4d414d4e3bbaa5c8be4b1acae7',
            chain: Chain.BNB
        })

        for await (const token of tokenList) {
            try {
                const refresh = await sdk.api.refreshNFTMetadata(ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[chainId].ZNS_REGISTRY, token)
                console.log(refresh)
            }
            catch(error) {
                console.log(error)
            }
        }

    }
    catch(error) {
        throw error
    }
}

main().catch(error => {
    throw error
})