import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
}));

export const getValidation = async (req:Request<{},{},{},IQueryProps>,res:Response) => {
  console.log(req.query);

  return res.status(500).send('Não implementado!');
};