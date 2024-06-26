"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const base_64_1 = __importDefault(require("base-64"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// ** import custom utils
const utils_1 = require("../../utils");
// ** import custom constanats
const constant_1 = require("../../constant");
// ** import custom libraries
const core_1 = require("../../core");
const axios_1 = __importDefault(require("axios"));
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
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            correctClockSkew: true,
        });
        const znsRegistry = new core_1.ZnsRegistry(constant_1.ONCHAIN_CONFIG.CHAIN_TO_RPC[chain], constant_1.ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[chain].ZNS_REGISTRY);
        const domain = await znsRegistry.itToDomain(id);
        const tld = await znsRegistry.tld();
        const image = await _a.getImage(domain, tld, chain);
        const getStringType = (name) => {
            const letterRegex = /^[A-Za-z]+$/;
            const alphanumericRegex = /^[A-Za-z0-9]+$/;
            const digitRegex = /^\d+$/;
            const emojiRegex = /[\u{1F600}-\u{1F64F}]/u; // This is a basic example for emojis, you may need a more comprehensive range
            if (digitRegex.test(name)) {
                return "Digit";
            }
            else if (letterRegex.test(name)) {
                return "Letters";
            }
            else if (alphanumericRegex.test(name)) {
                return "Alphanumeric";
            }
            else if (emojiRegex.test(name)) {
                return "Emoji";
            }
            else {
                return "Letters";
            }
        };
        const attributes = [
            {
                trait_type: "Name",
                value: domain.length === 1
                    ? "1D"
                    : domain.length === 2
                        ? "2D"
                        : domain.length === 3
                            ? "3D"
                            : domain.length === 4
                                ? "4D"
                                : "5D+",
            },
            {
                trait_type: "Length",
                value: domain.length > 24 ? 24 : domain.length,
            },
            {
                trait_type: "Character set",
                value: getStringType(domain),
            },
            {
                trait_type: "Category",
                value: Number(id) < 1000
                    ? "1k Club"
                    : Number(id) >= 1000 && Number(id) < 10000
                        ? "10k Club"
                        : "100k Club",
            },
            {
                trait_type: "Registration Date",
                value: new Date().toISOString(),
            },
            {
                trait_type: "Type",
                value: domain.length <= 2 ? "Premium" : "Standard",
            }
        ];
        const metadata = {
            name: domain,
            description: constant_1.APP.DOMAIN_NFT_DESCRIPTION,
            image,
            length: domain.length,
            attributes: attributes,
        };
        const s3 = new aws_sdk_1.default.S3({
            apiVersion: constant_1.APP.S3_BUCKET_VERSION,
            params: { Bucket: constant_1.APP.S3_BUCKET_NAME },
        });
        const options = {
            partSize: constant_1.APP.S3_FILE_LIMIT,
            queueSize: constant_1.APP.S3_QUEUE_SIZE,
        };
        const params = {
            Bucket: constant_1.APP.S3_BUCKET_NAME,
            Key: `${chain}/${id}`,
            Body: JSON.stringify(metadata),
            ContentType: "application/json", // Set the correct MIME type
        };
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
        const response = await axios_1.default.get(`${constant_1.GLOBAL_API.S3_BASE_URL}/${chain}/${id}`);
        return response.data;
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
DataController.getImage = async (domain, tld, chain) => {
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
        const imageWidth = 1000, imageHeight = 1000;
        const background = await (0, canvas_1.loadImage)(`src/assets/image/${chain}_${domain.length > 5 ? 6 : domain.length}.png`);
        (0, canvas_1.registerFont)("src/assets/font/airstrip.ttf", { family: "Airstrip" });
        const canvas = (0, canvas_1.createCanvas)(imageWidth, imageHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(background, 0, 0, imageWidth, imageHeight);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `${fontSize}px "Airstrip"`;
        ctx.fillStyle = constant_1.ONCHAIN_CONFIG.CHAIN_TO_COLOR[utils_1.Util.toNumber(chain)];
        if (domain.length > 15) {
            const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
                let line = "";
                let yPosition = y;
                for (let i = 0; i < text.length; i++) {
                    const testLine = line + text[i];
                    const metrics = context.measureText(testLine);
                    const testWidth = metrics.width;
                    if (testWidth > maxWidth && line.length > 0) {
                        context.fillText(line, x, yPosition);
                        line = text[i];
                        yPosition += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, yPosition);
            };
            const maxTextWidth = 500;
            const lineHeight = fontSize + 10;
            const textX = 500;
            const textY = imageHeight -
                280 -
                fontSize * (domain.length > 15 || domain.length <= 30 ? 2 : 3) +
                (domain.length > 15 || domain.length <= 30 ? 10 : 40);
            wrapText(ctx, domain, textX, textY, maxTextWidth, lineHeight);
        }
        else {
            ctx.fillText(domain, 500, imageHeight - 280 - fontSize / 2, 700);
        }
        ctx.font = `normal 80px "Airstrip"`;
        ctx.fillText(`.${tld}`, 500, imageHeight - 180 - 40);
        // const dataUrl = canvas.toDataURL();
        const dataUrl = canvas.toDataURL();
        // return `<img width="400px" height="400px" src="${dataUrl}"/>`;
        return dataUrl;
        const svgCode = `<svg width="160" height="160" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)"><path fill="#000" d="M0 0h1000v1000H0z"/>
            <path d="M1000 885c-178.771 139.55-551.222 50.439-1000 0v115h1000zM0 115c178.771-139.552 551.222-50.44 1000 0V0H0z" fill="${networkColor}"/>
            <circle cx="50%" cy="180" r="70" fill="${networkColor}"/>
            <text x="50%" y="200" text-anchor="middle" font-size="60" fill="#000" font-weight="bold" font-family="Futura">ZNS</text>
            <text x="50%" y="755" font-size="100" text-anchor="middle" fill="${networkColor}" font-weight="bold" font-family="Futura">.${tld}</text></g>
            <text x="50%" y="55%" text-anchor="middle" font-size="${fontSize}" fill="${networkColor}" font-weight="bold" font-family="Futura">${domain}
            </text></svg>`;
        const options = {
            partSize: constant_1.APP.S3_FILE_LIMIT,
            queueSize: constant_1.APP.S3_QUEUE_SIZE,
        };
        const params = {
            Bucket: constant_1.APP.S3_BUCKET_NAME,
            Key: `${Date.now()}.svg`,
            Body: "data:image/svg+xml;base64," + base_64_1.default.encode(svgCode),
        };
        // return new Promise((resolve, reject) => {
        //     s3.upload(params, options).send((error, data) => {
        //         if(error) {
        //             console.error(error)
        //             reject(error)
        //         }
        //         resolve(data.Location)
        //     })
        // })
    }
    catch (error) {
        throw error;
    }
};
exports.default = DataController;
