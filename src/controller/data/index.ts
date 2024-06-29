// ** import external libraries
import fs from "fs";
import path from "path";
import { createCanvas, loadImage, registerFont } from "canvas";
import base64 from "base-64";
import aws from "aws-sdk";
// ** import custom type
import { ResponsePayload, RequestPayload } from "../../types";
// ** import custom utils
import { Util } from "../../utils";
// ** import custom constanats
import { ONCHAIN_CONFIG, APP, GLOBAL_API } from "../../constant";
// ** import custom libraries
import { ZnsRegistry } from "../../core";
// ** import custom types
import { Metadata } from "../../types";
import axios from "axios";

class DataController {
    /**
     *
     * @param {RequestPayload} payload
     * @returns {ResponsePayload}
     */
    static checkResponse = (payload: RequestPayload): ResponsePayload => {
        return { data: payload };
    };

    /**
     *
     * @param {RequestPayload} payload
     * @returns {Promise<unknown>}
     */
    static createMetadata = async (payload: RequestPayload): Promise<unknown> => {
        try {
            const { chain, id } = payload;

            aws.config.update({
                region: APP.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY,
                },
                correctClockSkew: true,
            });

            const znsRegistry = new ZnsRegistry(
                ONCHAIN_CONFIG.CHAIN_TO_RPC[chain],
                ONCHAIN_CONFIG.CHAIN_TO_ADDRESS[chain].ZNS_REGISTRY
            );

            const domain = await znsRegistry.itToDomain(id);
            const tld = await znsRegistry.tld();

            const image = await this.getImage(domain, tld, chain, id);

            const getStringType = (name: string) => {
                const letterRegex = /^[A-Za-z]+$/;
                const alphanumericRegex = /^[A-Za-z0-9]+$/;
                const digitRegex = /^\d+$/;
                const emojiRegex = /[\u{1F600}-\u{1F64F}]/u; // This is a basic example for emojis, you may need a more comprehensive range

                if (digitRegex.test(name)) {
                    return "Digit";
                } else if (letterRegex.test(name)) {
                    return "Letters";
                } else if (alphanumericRegex.test(name)) {
                    return "Alphanumeric";
                } else if (emojiRegex.test(name)) {
                    return "Emoji";
                } else {
                    return "Letters";
                }
            };

            const attributes = [
                {
                    trait_type: "Name",
                    value:
                        domain.length === 1
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
                    value:
                        Number(id) < 1000
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

            const metadata: Metadata = {
                name: domain,
                description: APP.DOMAIN_NFT_DESCRIPTION,
                image,
                length: domain.length,
                attributes: attributes,
            };

            const s3 = new aws.S3({
                apiVersion: APP.S3_BUCKET_VERSION,
                params: { Bucket: APP.S3_BUCKET_NAME },
            });

            const options = {
                partSize: APP.S3_FILE_LIMIT,
                queueSize: APP.S3_QUEUE_SIZE,
            };

            const params = {
                Bucket: APP.S3_BUCKET_NAME,
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
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     *
     * @param {RequestPayload} payload
     * @returns {Promise<Metadata>}
     */
    static getMetadata = async (payload: RequestPayload): Promise<Metadata> => {
        try {
            const { chain, id } = payload;

            const response = await axios.get(
                `${GLOBAL_API.S3_BASE_URL}/${chain}/${id}`
            );

            return response.data;
        } catch (error) {
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
    static getImage = async (
        domain: string,
        tld: string,
        chain: number,
        id: number
    ): Promise<string> => {
        try {
            let fontSize = 0;

            if (domain.length <= 6) fontSize = 250;
            else if (domain.length > 6 && domain.length <= 8) fontSize = 200;
            else if (domain.length > 8 && domain.length <= 10) fontSize = 160;
            else if (domain.length > 10 && domain.length <= 12) fontSize = 130;
            else if (domain.length > 12 && domain.length <= 15) fontSize = 100;
            else if (domain.length > 15 && domain.length <= 18) fontSize = 80;
            else fontSize = 60;

            const networkColor = ONCHAIN_CONFIG.CHAIN_TO_COLOR[Util.toNumber(chain)];
            const imageWidth = 1000,
                imageHeight = 1000;
            const background = await loadImage(
                `src/assets/image/${chain}_${domain.length > 5 ? 6 : domain.length}.png`
            );
            registerFont("src/assets/font/airstrip.ttf", { family: "Airstrip" });
            const canvas = createCanvas(imageWidth, imageHeight);
            const ctx = canvas.getContext("2d");

            ctx.drawImage(background, 0, 0, imageWidth, imageHeight);
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = `${fontSize}px "Airstrip"`;

            ctx.fillStyle = ONCHAIN_CONFIG.CHAIN_TO_COLOR[Util.toNumber(chain)];

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
                        } else {
                            line = testLine;
                        }
                    }
                    context.fillText(line, x, yPosition);
                };

                const maxTextWidth = 500;
                const lineHeight = fontSize + 10;
                const textX = 500;
                const textY =
                    imageHeight -
                    280 -
                    fontSize * (domain.length > 15 || domain.length <= 30 ? 2 : 3) +
                    (domain.length > 15 || domain.length <= 30 ? 10 : 40);

                wrapText(ctx, domain, textX, textY, maxTextWidth, lineHeight);
            } else {
                ctx.fillText(domain, 500, imageHeight - 280 - fontSize / 2, 700);
            }

            ctx.font = `normal 80px "Airstrip"`;
            ctx.fillText(`.${tld}`, 500, imageHeight - 180 - 40);

            // const dataUrl = canvas.toDataURL();
            const dataUrl = canvas.toDataURL("image/png")

            // return dataUrl
            const s3 = new aws.S3({
                apiVersion: APP.S3_BUCKET_VERSION,
                params: { Bucket: APP.S3_BUCKET_NAME },
            });

            const options = {
                partSize: APP.S3_FILE_LIMIT,
                queueSize: APP.S3_QUEUE_SIZE,
            };

            const params = {
                Bucket: APP.S3_BUCKET_NAME,
                Key: `images/${chain}/${id}.png`,
                Body: dataUrl,
                ContentType: "application/json", // Set the correct MIME type
            };

            const response = await s3.upload(params, options).promise()

            return response.Location
        } catch (error) {
            throw error;
        }
    };
}

export default DataController;
