import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async ( request, response ) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const { password: ps, ...user} = await createUserService.execute({ 
      name, 
      email, 
      password 
    });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ 
      error: { 
        message: error.message, 
        status: 400 
      } 
    });
  }
});

export default usersRoutes;