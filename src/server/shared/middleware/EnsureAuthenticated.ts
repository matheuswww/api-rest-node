import { RequestHandler } from 'express';
import { JWTService } from '../services';

export const ensureAuthenticated:RequestHandler = async (req,res,next) => {
  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(401).json({
      errors: { default: 'Não autenticado' },
    });
  }

  const [type,token] = authorization.split(' ');

  if(type !== 'Bearer') {
    return res.status(401).json({
      errors: { default: '"Bearer" não encontrado no header' }
    });
  }

  const jwtData = JWTService.verify(token);
  if(jwtData === 'JWT_SECRET_NOT_FOUND') {
    return res.status(500).json({
      errors: { default: 'Erro ao verificar o token' },
    });
  } else if(jwtData === 'INVALID_TOKEN') {
    return res.status(401).json({
      errors: { default: 'Token inexistente ou já expirado' },
    });
  }

  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};