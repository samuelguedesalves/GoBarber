"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const UpdateAppointmentService_1 = __importDefault(require("../services/UpdateAppointmentService"));
const appointmentsRoutes = express_1.Router();
// LISTAGE OF APPOINTMENTS
appointmentsRoutes.get('/', async (request, response) => {
    const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentRepository_1.default);
    const appointments = await appointmentsRepository.find();
    return response.status(200).json(appointments);
});
// CREATION OF APPOINTMENT
appointmentsRoutes.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parsedDate = date_fns_1.parseISO(date);
        const createAppointmentService = new CreateAppointmentService_1.default();
        const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });
        return response.status(200).json(appointment);
    }
    catch (error) {
        return response.status(400).json({
            error: {
                message: error.message,
                status: 400,
            }
        });
    }
});
// UPDATE APPOINTMENT
appointmentsRoutes.put('/', async (request, response) => {
    try {
        const { id, provider_id, date } = request.body;
        const parsedDate = date_fns_1.parseISO(date);
        const updateAppointmentService = new UpdateAppointmentService_1.default();
        const appointment = await updateAppointmentService.execute({ id, provider_id, date: parsedDate });
        return response.status(200).json(appointment);
    }
    catch (error) {
        return response.status(400).json({
            error: {
                message: error.message,
                status: 400,
            }
        });
    }
});
exports.default = appointmentsRoutes;
