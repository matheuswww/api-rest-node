import { Request, Response } from 'express';
import * as yup from 'yup';
import { ICidade } from '../../database/models';
import { validation } from '../../shared/middleware';


interface IParamsProps {
  id?:number
}

interface IBodyProps extends Omit<ICidade,'id'> {}

export const updateByIdvalidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome:yup.string().required().min(3),
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps,{},IBodyProps>,res:Response) => {
  if(Number(req.params.id) === 999999) return res.status(400).json({
    errors:{
      default: 'Registro não encontrado',
    }
  });

  return res.status(204).send('id: Updated');
};