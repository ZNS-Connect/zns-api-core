// ** import external libraries
import base64 from "base-64"
// ** import custom type
import { ResponsePayload, RequestPayload } from "../../types"
// ** import custom utils
import { Util } from "../../utils"
// ** import custom constanats
import { ONCHAIN_CONFIG } from "../../constant"
// ** import custom libraries
import { ZnsRegistry } from "../../core"
// ** import custom types
import { Metadata } from "../../types"

class DataController {
    /**
     * 
     * @param {RequestPayload} payload 
     * @returns {ResponsePayload}
     */
    static checkResponse = (payload: RequestPayload): ResponsePayload => {
        return { data: payload }
    }

    static getMetadata = async (payload: RequestPayload): Promise<Metadata> => {
        try {
            const { chain, id } = payload

            const znsRegistry = new ZnsRegistry(
                ONCHAIN_CONFIG.CHAIN_TO_RPC[Util.toNumber(chain)],
                ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[Util.toNumber(chain)].ZNS_REGISTRY
            )

            const domain = await znsRegistry.itToDomain(Util.toNumber(id))
            const tld = await znsRegistry.tld()

            const metadata: Metadata = {
                name: domain,
                description: "A domain on ZNS Connect Name Service",
                image: this.getImage(domain, tld, Util.toNumber(chain)),
                length: domain.length
            }

            return metadata
        }
        catch (error) {
            throw error
        }
    }

    static getImage = (domain: string, tld: string, chain: number): string => {
        try {
            let fontSize = 0

            if (domain.length <= 6) fontSize = 250;
            else if (domain.length > 6 && domain.length <= 8) fontSize = 200;
            else if (domain.length > 8 && domain.length <= 10) fontSize = 160;
            else if (domain.length > 10 && domain.length <= 12) fontSize = 130;
            else if (domain.length > 12 && domain.length <= 15) fontSize = 100;
            else if (domain.length > 15 && domain.length <= 18) fontSize = 80;
            else fontSize = 60;

            const networkColor = ONCHAIN_CONFIG.CHAIN_TO_COLOR[Util.toNumber(chain)]

            const svgCode =
                `<svg width="160" height="160" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)"><path fill="#000" d="M0 0h1000v1000H0z"/>
            <path d="M1000 885c-178.771 139.55-551.222 50.439-1000 0v115h1000zM0 115c178.771-139.552 551.222-50.44 1000 0V0H0z" fill="${networkColor}"/>
            <circle cx="50%" cy="180" r="70" fill="${networkColor}"/>
            <text x="50%" y="200" text-anchor="middle" font-size="60" fill="#000" font-weight="bold" font-family="Futura">ZNS</text>
            <text x="50%" y="755" font-size="100" text-anchor="middle" fill="${networkColor}" font-weight="bold" font-family="Futura">.${tld}</text></g>
            <text x="50%" y="55%" text-anchor="middle" font-size="${fontSize}" fill="${networkColor}" font-weight="bold" font-family="Futura">${domain}
            </text></svg>`

            return "data:image/svg+xml;base64," + base64.encode(svgCode)
        }
        catch (error) {
            throw error
        }
    }
}

export default DataController