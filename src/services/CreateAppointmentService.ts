import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

class CreateAppointmentService {
  public async execute ({ provider_id, date  }: Omit<Appointment, 'id'|'created_at'|'updated_at'|'provider' > ): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if( findAppointmentInSameDate ){
      throw new Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;