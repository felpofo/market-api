"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = require("@/app");
const utils_1 = require("./utils");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const server = http_1.default.createServer(app_1.app);
server.listen(PORT, () => (0, utils_1.success)(`Api started on port ${PORT}`));
