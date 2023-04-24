import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { PessoasProvider } from '../../database/providers/pessoas';
import { IPessoa } from '../../database/models';


interface IBodyProps extends Omit<IPessoa,'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3).max(60),
    email: yup.string().email().required().min(5).max(120),
    cidadeId: yup.number().required(),
  })),
}));

export const create = async(req:Request<{},IBodyProps>,res:Response) => {
  const result = await PessoasProvider.create(req.body);

  if(result instanceof Error) {
    if(result.message === 'A cidade usada no cadastro não foi encontrada') {
      return res.status(404).json({
        errors: {
          default: result.message,
        }
      });
    }
    return res.status(500).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(201).json(result);
};