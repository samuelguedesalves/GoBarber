"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const usersRoutes = express_1.Router();
usersRoutes.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUserService = new CreateUserService_1.default();
        const user = await createUserService.execute({ name, email, password });
        return response.status(200).json(user);
    }
    catch (error) {
        return response.status(400).json({
            error: {
                message: error.message,
                status: 400
            }
        });
    }
});
exports.default = usersRoutes;
