import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: __dirname+'/../../../../.env'});

interface IJwtData {
  uid: number;
}

const sign = (data:IJwtData) => {
  if(!process.env.SECRET_KEY) return 'JWT_SECRET_NOT_FOUND';

  return jwt.sign(data,process.env.SECRET_KEY,{ expiresIn: '24h' });
};

const verify = (token: string):IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' |  'INVALID_TOKEN' => {
  if(!process.env.SECRET_KEY) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY); 
    if(typeof decoded == 'string') {
      return 'INVALID_TOKEN';
    }

    return decoded as IJwtData;
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  sign,
  verify,
};