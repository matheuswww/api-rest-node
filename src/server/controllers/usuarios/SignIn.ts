import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { EdefaultMessages } from '../../database/Enums';
import { IUsuario } from '../../database/models';

interface IBodyProps extends Omit<IUsuario,'id' | 'nome'> {}


export const signInValidaton = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5).max(120),
    senha: yup.string().required().min(6).max(200),
  })),
}));

export const signIn = async (req:Request<{},{},IBodyProps>,res:Response) => {
  const { email,senha } = req.body;
  const result = await UsuariosProvider.getByEmail(email);

  if(result instanceof Error) {
    if(result.message === EdefaultMessages.notFound) {
      return res.status(403).json({
        errors: {
          default: 'Email ou senha são inválidos',
        }
      });
    } else {
      return res.status(500).json({
        errors: {
          default: result.message,
        }
      });
    }
  }

  if(result.senha !== senha) {
    return res.status(403).json({
      errors: {
        default: 'Email ou senha são inválidos',
      }
    });
  } else {
    return res.status(201).json({
      accessToken: 'teste.teste.teste',
    });
  }
};