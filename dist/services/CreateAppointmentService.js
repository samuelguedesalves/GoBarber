"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
class CreateAppointmentService {
    async execute({ date, provider_id, }) {
        const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentRepository_1.default);
        const appointmentDate = date_fns_1.startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
        if (findAppointmentInSameDate) {
            throw new Error('This appointment is already booked');
        }
        const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
exports.default = CreateAppointmentService;
