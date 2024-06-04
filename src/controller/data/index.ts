// ** import external libraries
import fs from "fs";
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
    console.log("Create metadata");

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
      console.log(tld, "--- tid ---");

      const image = await this.getImage(domain, tld, chain);

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
    chain: number
  ): Promise<string> => {
    console.log(__dirname);
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
      const background = await loadImage(`src/assets/image/${chain}.png`);
      registerFont("src/assets/font/airstrip.ttf", { family: "Airstrip" });
      const canvas = createCanvas(imageWidth, imageHeight);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(background, 0, 0, imageWidth, imageHeight);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = `${fontSize}px "Airstrip"`;

      ctx.fillStyle = ONCHAIN_CONFIG.CHAIN_TO_COLOR[Util.toNumber(chain)];
      ctx.fillText(domain, 500, imageHeight / 2 - fontSize / 2);

      ctx.font = `250px "Airstrip"`;
      ctx.fillText(`.${tld}`, 500, imageHeight - 300);

      const dataUrl = canvas.toDataURL();

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
        partSize: APP.S3_FILE_LIMIT,
        queueSize: APP.S3_QUEUE_SIZE,
      };

      const params = {
        Bucket: APP.S3_BUCKET_NAME,
        Key: `${Date.now()}.svg`,
        Body: "data:image/svg+xml;base64," + base64.encode(svgCode),
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
    } catch (error) {
      throw error;
    }
  };
}

export default DataController;
