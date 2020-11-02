"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
class UpdateAppointmentService {
    async execute({ id, provider_id, date }) {
        const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentRepository_1.default);
        const appointment = await appointmentsRepository.findOne({ where: { id } });
        if (!appointment) {
            throw new Error(`Don't is posible find this appointment`);
        }
        const appointmentDate = date_fns_1.startOfHour(date);
        appointment.date = appointmentDate;
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
exports.default = UpdateAppointmentService;
