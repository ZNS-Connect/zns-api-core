// ** import external libraries
import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
// ** import custom libraries
import { DataController } from "../../../controller";
import { ResponseUtil } from "../../../utils";
// ** import custom constants
import { METHOD, VERSION, ENDPOINT } from "../../../constant";

const PRIVATE_ROUTER: Hapi.ServerRoute[] = [
  /**
   * POST endpoints
   */
  {
    method: METHOD.POST,
    path: VERSION.V1 + ENDPOINT.POST.CREATE_METADATA,
    options: {
      handler: async (request, reply) => {
        try {
          const response = await DataController.createMetadata(request.payload);
          return ResponseUtil.sendRawResponse(response, reply);
        } catch (error) {
          return error;
        }
      },
      validate: {
        failAction: ResponseUtil.failAction,
        payload: Joi.object({
          chain: Joi.number().required(),
          id: Joi.number().required(),
        }),
      },
      description: "API base default public endpoints (POST)",
      notes: "Hit the endpoint to check if server is alive",
      tags: ["baseurl", "default", "check api status"],
    },
  },
];

export default PRIVATE_ROUTER;
