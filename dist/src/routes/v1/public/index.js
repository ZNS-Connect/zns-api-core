"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
// ** import controller
const controller_1 = require("../../../controller");
// ** import helper
const helper_1 = require("../../../helper");
// ** import custom utilities
const utils_1 = require("../../../utils");
// ** import app constants
const constant_1 = require("../../../constant");
const PUBLIC_ROUTER = [
    /**
     * GET endpoints
     */
    {
        method: constant_1.METHOD.GET,
        path: constant_1.VERSION.V1 + constant_1.ENDPOINT.GET.DEFAULT,
        options: {
            handler: (request, reply) => {
                return reply.view('index');
            },
            description: 'API base default public endpoints (GET)',
            notes: 'Hit the endpoint to check if server is alive',
            tags: ['baseurl', 'default', 'check api status']
        }
    },
    {
        method: constant_1.METHOD.GET,
        path: constant_1.VERSION.V1 + constant_1.ENDPOINT.GET.IP,
        options: {
            handler: async (request, reply) => {
                try {
                    const response = await helper_1.GatewayHelper.getIpDetail(request.info.remoteAddress);
                    return utils_1.ResponseUtil.sendResponse(response, reply);
                }
                catch (error) {
                    throw error;
                }
            },
            description: 'API for checking IP address information',
            notes: 'Hit the endpoint to get remote IP detail',
            tags: ['baseurl', 'default', 'check ip detail']
        }
    },
    {
        method: constant_1.METHOD.GET,
        path: constant_1.VERSION.V1 + constant_1.ENDPOINT.GET.METADATA,
        options: {
            handler: (request, reply) => {
                const { chain, id } = request.params;
                return reply.redirect(`${constant_1.GLOBAL_API.S3_BASE_URL}/${chain}/${id}`);
            },
            description: 'API for fetching metadata from tokenID',
            notes: 'Hit the endpoint to get token metadata',
            tags: ['baseurl', 'default', 'get token metadata']
        }
    },
    {
        method: constant_1.METHOD.GET,
        path: constant_1.VERSION.V1 + constant_1.ENDPOINT.GET.IMAGE,
        options: {
            handler: async (request, reply) => {
                try {
                    const response = await controller_1.DataController.getMetadata(request.params);
                    return utils_1.ResponseUtil.sendRawResponse(response, reply);
                }
                catch (error) {
                    throw error;
                }
            },
            description: 'API for fetching image from tokenID',
            notes: 'Hit the endpoint to get domain image',
            tags: ['baseurl', 'default', 'get domain logo']
        }
    },
    /**
     * POST endpoints
     */
    {
        method: constant_1.METHOD.POST,
        path: constant_1.VERSION.V1 + constant_1.ENDPOINT.POST.DEFAULT,
        options: {
            handler: (request, reply) => {
                try {
                    const response = controller_1.DataController.checkResponse(request.info.remoteAddress);
                    return utils_1.ResponseUtil.sendResponse(response, reply);
                }
                catch (error) {
                    return Object(error);
                }
            },
            validate: {
                failAction: utils_1.ResponseUtil.failAction,
                payload: joi_1.default.object({
                    number: joi_1.default.number().required(),
                    string: joi_1.default.string().required(),
                    optional: joi_1.default.any().optional()
                })
            },
            description: 'API base default public endpoints (POST)',
            notes: 'Hit the endpoint to check if server is alive',
            tags: ['baseurl', 'default', 'check api status']
        }
    }
];
exports.default = PUBLIC_ROUTER;
