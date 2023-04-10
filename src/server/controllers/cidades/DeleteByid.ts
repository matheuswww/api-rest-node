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
  if(Number(req.params.id) === 999999) return res.status(404).json({
    errors: {
      default: 'Registro não encotradosss',
    }
  });
  return res.status(204).send(':Id deleted');
};