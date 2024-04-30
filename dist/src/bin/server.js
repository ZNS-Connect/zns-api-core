"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// ** import external libraries
const hapi_1 = __importDefault(require("@hapi/hapi"));
const handlebars_1 = __importDefault(require("handlebars"));
const vision_1 = __importDefault(require("@hapi/vision"));
const path_1 = __importDefault(require("path"));
// ** import routes
const routes_1 = require("../routes");
// ** import app constants
const constant_1 = require("../constant");
class Server {
    constructor() {
        // initialize Hapi server
        this.init = async () => {
            try {
                // server option
                const serverOption = {
                    port: process.env.PORT,
                    host: process.env.HOST,
                    routes: {
                        cors: true
                    }
                };
                // create new server
                const server = new hapi_1.default.Server(serverOption);
                // add rendering plug-in
                await server.register(vision_1.default);
                // add view engine
                await server.views({
                    engines: { html: handlebars_1.default },
                    relativeTo: __dirname,
                    path: path_1.default.join(__dirname, '../views')
                });
                // set routes
                await server.route(routes_1.ROUTER_V1);
                // set built-in router
                server.route({
                    method: constant_1.METHOD.GET,
                    path: constant_1.ENDPOINT.GET.DEFAULT,
                    handler: async (request, reply) => {
                        return reply.view('index');
                    }
                });
                // set event listener
                server.events.on('request', (request) => {
                    console.log(`API HIT (request): ${request.url}`);
                });
                server.events.on('response', (request) => {
                    console.log(`API HIT (response): ${request.url}`);
                });
                // start server
                await server.start();
                // print server endpoint
                console.log('Server is running on %s', server.info.uri);
            }
            catch (error) {
                // print error and force exit process
                console.error(error);
                process.exit(1);
            }
        };
    }
}
exports.default = Server;
