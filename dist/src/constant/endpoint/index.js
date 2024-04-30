"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const post_1 = __importDefault(require("./post"));
const ENDPOINT = { GET: get_1.default, POST: post_1.default };
exports.default = ENDPOINT;
