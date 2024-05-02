// ** import external libraries
import Hapi from '@hapi/hapi'
import Joi from '@hapi/joi'

// ** import controller
import { DataController } from '../../../controller'

// ** import helper
import { GatewayHelper } from '../../../helper'

// ** import custom utilities
import { ResponseUtil } from '../../../utils'

// ** import app constants
import { METHOD, VERSION, ENDPOINT, GLOBAL_API } from '../../../constant'

const PUBLIC_ROUTER: Hapi.ServerRoute[] = [
    /**
     * GET endpoints
     */
    {
        method: METHOD.GET,
        path: VERSION.V1 + ENDPOINT.GET.DEFAULT,
        options: {
            handler: (request, reply) => {
                return reply.view('index')
            },
            description: 'API base default public endpoints (GET)',
            notes: 'Hit the endpoint to check if server is alive',
            tags: ['baseurl', 'default', 'check api status']
        }
    },
    {
        method: METHOD.GET,
        path: VERSION.V1 + ENDPOINT.GET.IP,
        options: {
            handler: async (request, reply) => {
                try {
                    const response = await GatewayHelper.getIpDetail(request.info.remoteAddress)

                    return ResponseUtil.sendResponse(response, reply)
                }
                catch(error) {
                    throw error
                }
            },
            description: 'API for checking IP address information',
            notes: 'Hit the endpoint to get remote IP detail',
            tags: ['baseurl', 'default', 'check ip detail']
        }
    },
    {
        method: METHOD.GET,
        path: VERSION.V1 + ENDPOINT.GET.METADATA,
        options: {
            handler: async (request, reply) => {
                try {
                    const response = await DataController.getMetadata(request.params)

                    return ResponseUtil.sendRawResponse(response, reply)
                }
                catch(error) {
                    throw error
                }
            },
            description: 'API for fetching metadata from tokenID',
            notes: 'Hit the endpoint to get token metadata',
            tags: ['baseurl', 'default', 'get token metadata']
        }
    },
    {
        method: METHOD.GET,
        path: VERSION.V1 + ENDPOINT.GET.IMAGE,
        options: {
            handler: async (request, reply) => {
                try {
                    const response = await DataController.getMetadata(request.params)

                    return ResponseUtil.sendRawResponse(response, reply)
                }
                catch(error) {
                    throw error
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
        method: METHOD.POST,
        path: VERSION.V1 + ENDPOINT.POST.DEFAULT,
        options: {
            handler: (request, reply) => {
                try {
                    const response = DataController.checkResponse(request.info.remoteAddress)

                    return ResponseUtil.sendResponse(response, reply)
                }
                catch(error) {
                    return Object(error)
                }
            },
            validate: {
                failAction: ResponseUtil.failAction,
                payload: Joi.object({
                    number: Joi.number().required(),
                    string: Joi.string().required(),
                    optional: Joi.any().optional()
                })
            },
            description: 'API base default public endpoints (POST)',
            notes: 'Hit the endpoint to check if server is alive',
            tags: ['baseurl', 'default', 'check api status']
        }
    }
]

export default PUBLIC_ROUTER