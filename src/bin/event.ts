import axios from "axios";
import { ethers, type JsonRpcApiProvider, type Contract } from "ethers";

import ABI from '../constant/abi'
import { ONCHAIN_CONFIG } from "../constant";

class MintEventListener {
    chainId: number
    provider: JsonRpcApiProvider
    contract: Contract

    constructor(chainId: number) {
        this.chainId = chainId
        this.provider = new ethers.JsonRpcProvider(ONCHAIN_CONFIG.CHAIN_TO_RPC[this.chainId])
        this.contract = new ethers.Contract(ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[this.chainId].ZNS_REGISTRY, ABI.ZNS_REGISTRY, this.provider)
    }

    start = async () => {
        if(!this.chainId || !this.provider || !this.contract) {
            throw new Error("Instance not mounted")
        }

        this.contract.on("MintedDomain", async (domainName, tokenId, owner, expiry) => {
            const data = { chain: this.chainId, id: tokenId }
            try {
                const res = await axios.post('http://127.0.0.1:8000/v1/create-metadata', data)
                console.log(res.data)
            }
            catch(error) {
                console.error(error)
            }
        })
    }

    terminate = async () => {
        try {
            await this.contract.off("MintedDomain")
        }
        catch(error) {
            console.error(error)
        }
    }
}

export default class ZNSEventListener {
    constructor() {

    }

    mountBscMainnet = async () => {
        try {
            const mintListener = new MintEventListener(56)

            await mintListener.start()

            console.log("Event listener started")
        }
        catch(error) {
            console.error(error)
        }
    }

    mountAll = async () => {
        try {
            await this.mountBscMainnet()
        }
        catch(error) {
            console.error(error)
        }
    }
}