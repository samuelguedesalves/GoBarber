"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
require("./database");
const server = express_1.default();
server.use(express_1.default.json());
server.use(routes_1.default);
const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`🚀 server runing in port: ${port}`));
