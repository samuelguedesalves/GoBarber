import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface UpdateAppointmentDTO {
  id: string;
  provider: string;
  date: Date;
}

class UpdateAppointmentService {
  public async execute ({ id, provider, date }: UpdateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointment = await appointmentsRepository.findOne({ where: { id } });

    if(!appointment) {
      throw new Error(`Don't is posible find this appointment`);
    }

    const appointmentDate = startOfHour(date);

    appointment.provider = provider;
    appointment.date = appointmentDate;

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default UpdateAppointmentService;