import { Request, Response } from 'express';
import * as yup from 'yup';
import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middleware';
import { ValidateQuery } from '../funcs/ValidateQuery';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}
export const getAllValidation = validation(get => ({
  query: get<IQueryProps>(yup.object().shape({
    page: yup.number().integer().optional().moreThan(0).default(1),
    limit: yup.number().integer().optional().moreThan(0).default(7),
    filter: yup.string().optional().default(''),
  })),
}));

export const getAll = async(req:Request<{},{},{},IQueryProps>,res:Response) => {
  //validates that the query is correct,is necessary because in yup the values is optional,like this,no validing the query;
  ValidateQuery(req,res,['page','limit','filter']);

  const result = await PessoasProvider.getAll(req.query.page || 1,req.query.limit || 7,req.query.filter || '');
  const count = await PessoasProvider.count(req.query.filter);

  if(result instanceof Error) {
    return res.status(500).json({
      errors: { default: result.message }
    });
  } else if(count instanceof Error) {
    return res.status(500).json({
      errors: { default: count.message }
    });
  }
  
  res.setHeader('acess-control-expose-headers','x-total-count');
  res.setHeader('x-total-count',count);

  return res.status(200).json(result);
};