"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
class CreateUserService {
    async execute({ name, email, password }) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const checkUserExists = await usersRepository.findOne({ email });
        if (checkUserExists) {
            throw new Error('Email address already used!');
        }
        const user = usersRepository.create({ name, email, password });
        await usersRepository.save(user);
        return user;
    }
}
exports.default = CreateUserService;
