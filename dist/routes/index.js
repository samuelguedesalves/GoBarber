"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_routes_1 = __importDefault(require("./appointments.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const router = express_1.Router();
router.use('/appointments', appointments_routes_1.default);
router.use('/users', users_routes_1.default);
exports.default = router;
