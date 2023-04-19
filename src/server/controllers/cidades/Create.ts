import { Request, Response } from 'express';
import { ICidade } from '../../database/models';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { CidadesProvider } from '../../database/providers/cidades';

interface IBodyProps extends Omit<ICidade,'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
}));

export const create = async (req:Request<{},{},ICidade>,res:Response) => {
  const result = await CidadesProvider.create(req.body);

  if(result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(201).json(result);
};