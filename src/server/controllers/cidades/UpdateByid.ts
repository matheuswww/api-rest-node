import { Request, Response } from 'express';
import * as yup from 'yup';
import { EdefaultMessages } from '../../database/Enums-cidades';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';
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
  if(!req.params.id) return res.status(400).json({
    errors:{
      default: 'O parâmetro "id" precisa ser informado.',
    }
  });

  const result = await CidadesProvider.updateByid(req.params.id,req.body);
  
  if(result instanceof Error) {
    if(result.message === EdefaultMessages.notFound) {
      return res.status(400).json({
        errors: {
          default: result.message,
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

  return res.status(204).json(result);
};