import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

function ensureAuthenticated ( 
  request: Request, 
  response: Response, 
  next: NextFunction
): void {

  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ')

  const { secret } = authConfig.jwt;

  try{
    const decoded = verify(token, secret);

  } catch {
    throw new Error('Invalid JWT token')
  }
}

export default ensureAuthenticated;