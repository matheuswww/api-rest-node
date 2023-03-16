import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';


interface IParamProps {
  id?:number;
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamProps>,res: Response) => {
  console.log(req.params);
  
  return res.status(500).send('Não implementado');
};