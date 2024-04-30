import { AxiosResponse } from "axios";
declare class GraphQLHelper {
    uri: string;
    /**
     * initialize graph client
     * @param uri
     */
    constructor(baseUrl: string, subgraph: string);
    /**
     *
     * @param {String} query
     * @param {Object} variables
     * @returns {Promise<AxiosResponse>}
     */
    query: (query: string, variables: object) => Promise<AxiosResponse>;
}
export default GraphQLHelper;
