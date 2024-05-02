"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// ** import external libraries
const base_64_1 = __importDefault(require("base-64"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// ** import custom utils
const utils_1 = require("../../utils");
// ** import custom constanats
const constant_1 = require("../../constant");
// ** import custom libraries
const core_1 = require("../../core");
class DataController {
}
_a = DataController;
/**
 *
 * @param {RequestPayload} payload
 * @returns {ResponsePayload}
 */
DataController.checkResponse = (payload) => {
    return { data: payload };
};
/**
 *
 * @param {RequestPayload} payload
 * @returns {Promise<unknown>}
 */
DataController.createMetadata = async (payload) => {
    try {
        const { chain, id } = payload;
        aws_sdk_1.default.config.update({
            region: constant_1.APP.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            },
            correctClockSkew: true
        });
        const znsRegistry = new core_1.ZnsRegistry(constant_1.ONCHAIN_CONFIG.CHAIN_TO_RPC[chain], constant_1.ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[chain].ZNS_REGISTRY);
        const domain = await znsRegistry.itToDomain(id);
        const tld = await znsRegistry.tld();
        const metadata = {
            name: domain,
            description: constant_1.APP.DOMAIN_NFT_DESCRIPTION,
            image: _a.getImage(domain, tld, chain),
            length: domain.length
        };
        const s3 = new aws_sdk_1.default.S3({
            apiVersion: constant_1.APP.S3_BUCKET_VERSION,
            params: { Bucket: constant_1.APP.S3_BUCKET_NAME }
        });
        const options = { partSize: constant_1.APP.S3_FILE_LIMIT, queueSize: constant_1.APP.S3_QUEUE_SIZE };
        const params = { Bucket: constant_1.APP.S3_BUCKET_NAME, Key: `${chain}/${id}`, Body: JSON.stringify(metadata) };
        return new Promise((resolve, reject) => {
            s3.upload(params, options).send((error, data) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(data);
            });
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
/**
 *
 * @param {RequestPayload} payload
 * @returns {Promise<Metadata>}
 */
DataController.getMetadata = async (payload) => {
    try {
        const { chain, id } = payload;
        const znsRegistry = new core_1.ZnsRegistry(constant_1.ONCHAIN_CONFIG.CHAIN_TO_RPC[utils_1.Util.toNumber(chain)], constant_1.ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[utils_1.Util.toNumber(chain)].ZNS_REGISTRY);
        const domain = await znsRegistry.itToDomain(utils_1.Util.toNumber(id));
        const tld = await znsRegistry.tld();
        const metadata = {
            name: domain,
            description: constant_1.APP.DOMAIN_NFT_DESCRIPTION,
            image: _a.getImage(domain, tld, utils_1.Util.toNumber(chain)),
            length: domain.length
        };
        return metadata;
    }
    catch (error) {
        throw error;
    }
};
/**
 *
 * @param {String} domain
 * @param {String} tld
 * @param {Number} chain
 * @returns {String}
 */
DataController.getImage = (domain, tld, chain) => {
    try {
        let fontSize = 0;
        if (domain.length <= 6)
            fontSize = 250;
        else if (domain.length > 6 && domain.length <= 8)
            fontSize = 200;
        else if (domain.length > 8 && domain.length <= 10)
            fontSize = 160;
        else if (domain.length > 10 && domain.length <= 12)
            fontSize = 130;
        else if (domain.length > 12 && domain.length <= 15)
            fontSize = 100;
        else if (domain.length > 15 && domain.length <= 18)
            fontSize = 80;
        else
            fontSize = 60;
        const networkColor = constant_1.ONCHAIN_CONFIG.CHAIN_TO_COLOR[utils_1.Util.toNumber(chain)];
        const svgCode = `<svg width="160" height="160" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)"><path fill="#000" d="M0 0h1000v1000H0z"/>
            <path d="M1000 885c-178.771 139.55-551.222 50.439-1000 0v115h1000zM0 115c178.771-139.552 551.222-50.44 1000 0V0H0z" fill="${networkColor}"/>
            <circle cx="50%" cy="180" r="70" fill="${networkColor}"/>
            <text x="50%" y="200" text-anchor="middle" font-size="60" fill="#000" font-weight="bold" font-family="Futura">ZNS</text>
            <text x="50%" y="755" font-size="100" text-anchor="middle" fill="${networkColor}" font-weight="bold" font-family="Futura">.${tld}</text></g>
            <text x="50%" y="55%" text-anchor="middle" font-size="${fontSize}" fill="${networkColor}" font-weight="bold" font-family="Futura">${domain}
            </text></svg>`;
        return "data:image/svg+xml;base64," + base_64_1.default.encode(svgCode);
    }
    catch (error) {
        throw error;
    }
};
exports.default = DataController;
