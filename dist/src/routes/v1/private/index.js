"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
// ** import custom libraries
const controller_1 = require("../../../controller");
const utils_1 = require("../../../utils");
// ** import custom constants
const constant_1 = require("../../../constant");
const PRIVATE_ROUTER = [
    /**
     * POST endpoints
     */
    {
        method: constant_1.METHOD.POST,
        path: constant_1.VERSION.V1 + constant_1.ENDPOINT.POST.CREATE_METADATA,
        options: {
            handler: async (request, reply) => {
                try {
                    const response = await controller_1.DataController.createMetadata(request.payload);
                    return utils_1.ResponseUtil.sendRawResponse(response, reply);
                }
                catch (error) {
                    return error;
                }
            },
            validate: {
                failAction: utils_1.ResponseUtil.failAction,
                payload: joi_1.default.object({
                    chain: joi_1.default.number().required(),
                    id: joi_1.default.number().required(),
                }),
            },
            description: "API base default public endpoints (POST)",
            notes: "Hit the endpoint to check if server is alive",
            tags: ["baseurl", "default", "check api status"],
        },
    },
];
exports.default = PRIVATE_ROUTER;
