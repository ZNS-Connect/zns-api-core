"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const public_1 = __importDefault(require("./public"));
const private_1 = __importDefault(require("./private"));
const ROUTER_V1 = [...public_1.default, ...private_1.default];
exports.default = ROUTER_V1;
