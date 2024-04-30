// ** import external libraries
import axios from "axios"
// ** import external types
import { AxiosResponse } from "axios"

class GraphQLHelper {
    uri: string // GraphQL server base URI

    /**
     * initialize graph client
     * @param uri 
     */
    constructor(baseUrl: string, subgraph: string) {
        this.uri = `${baseUrl}/${subgraph}`
    }

    /**
     * 
     * @param {String} query 
     * @param {Object} variables 
     * @returns {Promise<AxiosResponse>}
     */
    query = async (query: string, variables: object): Promise<AxiosResponse> => {
        try {
            const response = await axios.post(this.uri, { query, variables })

            return response.data
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default GraphQLHelper