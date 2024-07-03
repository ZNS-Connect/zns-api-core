import 'dotenv/config.js'
import axios from 'axios'
import { ethers } from 'ethers'
import ABI from "../src/constant/abi/index"
import ONCHAIN_CONFIG from '../src/constant/onchain'

async function main() {
    const chainId = 81457
    const endpoint = 'http://127.0.0.1:8000/v1/create-metadata'

    const provider = new ethers.JsonRpcProvider(ONCHAIN_CONFIG.CHAIN_TO_RPC[chainId])
    const contract = new ethers.Contract(ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[chainId].ZNS_REGISTRY, ABI.ZNS_REGISTRY, provider)
    const totalMinted = await contract.getTotalRegisteredDomains()
    
    const missed: Array<number> = []

    const LAST_SUCCESSED_ID = 1899

    for await(const id of totalMinted) {
        if(Number(id) <= LAST_SUCCESSED_ID) {
            console.log("Token id-", Number(id), "skipped")
            continue
        }
        else {
            try {
                const data = { chain: chainId, id: Number(id) }
                const res = await axios.post(endpoint, data)
    
                console.log(res.data)
            }
            catch(error) {
                console.log(error)
                missed.push(Number(id))
                continue;
            }
        }

        // try {
        //     await axios.get(`https://api.znsconnect.io/v1/metadata/${chainId}/${Number(id)}`)
        //     console.log("Token ID:", Number(id), "is okay")
        // }
        // catch(_) {
        //     try {
        //         const data = { chain: chainId, id: Number(id) }
        //         const res = await axios.post(endpoint, data)
    
        //         console.log(res.data)
        //     }
        //     catch(error) {
        //         console.log(error)
        //         missed.push(Number(id))
        //         continue;
        //     }
        // }
    }
    console.log(missed)
}

main().catch(error => {
    console.error(error)

    process.exit(1)
})