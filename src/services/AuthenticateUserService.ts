import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Omit<User, 'password'>;
  token: string;
}

class AuthenticateUserSession {
  public async execute ({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, { subject: user.id, expiresIn })

    const { password: ps, ...dataUser } = user;

    return{
      user: dataUser,
      token,
    }
    

  }

}

export default AuthenticateUserSession;