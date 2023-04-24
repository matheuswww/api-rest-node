import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { PessoasProvider } from '../../database/providers/pessoas';
import { EdefaultMessages } from '../../database/Enums-cidades';

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation(get => ({
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req:Request<IParamProps>,res:Response) => {
  if(!req.params.id) {
    return res.status(400).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      }
    });
  }

  const result = await PessoasProvider.getById(req.params.id);

  if(result instanceof Error) {
    if(result.message === EdefaultMessages.notFound) {
      return res.status(404).json({
        errors: {
          default: EdefaultMessages.notFound,
        },
      });
    } else {
      return res.status(500).json({
        errors: {
          default: result.message,
        }
      });
    }
  }
  
  return res.status(200).json(result);
};