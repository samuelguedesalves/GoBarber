import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async ( request, response ) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({ 
      email, 
      password 
    });

    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(400).json({ 
      error: { 
        message: error.message, 
        status: 400 
      } 
    });
  }
});

export default sessionsRoutes;