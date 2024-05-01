"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ** import external libraries & types
const axios_1 = __importDefault(require("axios"));
class GraphQLHelper {
    /**
     * initialize graph client
     * @param uri
     */
    constructor(baseUrl, subgraph) {
        /**
         *
         * @param {String} query
         * @param {Object} variables
         * @returns {Promise<AxiosResponse>}
         */
        this.query = async (query, variables) => {
            try {
                const response = await axios_1.default.post(this.uri, { query, variables });
                return response.data;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        };
        this.uri = `${baseUrl}/${subgraph}`;
    }
}
exports.default = GraphQLHelper;
