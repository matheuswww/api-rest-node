import { IUsuario } from '../../database/models';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { UsuariosProvider } from '../../database/providers/usuarios';


interface IBodyprops extends Omit<IUsuario,'id'> {}


export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyprops>(yup.object().shape({
    email: yup.string().required().email().min(5).max(120),
    nome: yup.string().required().min(3).max(80),
    senha: yup.string().required().min(6).max(200),
  })),
}));

export const signUp = async (req:Request<{},{},IBodyprops>,res:Response) => {
  const result = await UsuariosProvider.create(req.body);

  if(result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(201).json(result);
};