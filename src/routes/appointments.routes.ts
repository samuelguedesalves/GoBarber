import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import UpdateAppointmentService from '../services/UpdateAppointmentService';

const appointmentsRoutes = Router();


// LISTAGE OF APPOINTMENTS
appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
} );


// CREATION OF APPOINTMENT
appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
  
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
  
    const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });
  
    return response.status(200).json(appointment);
    
  } catch (error) {
    return response.status(400).json(
      {
        error: {
          message: error.message,
          status: 400,
        }
      }
    );
  }
});

// UPDATE APPOINTMENT
appointmentsRoutes.put('/', async ( request, response ) => {
  try {
    const { id, provider_id, date } = request.body;
  
    const parsedDate = parseISO(date);
  
    const updateAppointmentService = new UpdateAppointmentService();
  
    const appointment = await updateAppointmentService.execute({ id, provider_id, date: parsedDate });
  
    return response.status(200).json(appointment);
  } catch (error) {
    return response.status(400).json(
      {
        error: {
          message: error.message,
          status: 400,
        }
      }
    );
  }
})


export default appointmentsRoutes;