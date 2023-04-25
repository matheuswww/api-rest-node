import { IPessoa } from '../../database/models';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { PessoasProvider } from '../../database/providers/pessoas';
import { EdefaultMessages } from '../../database/Enums';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa,'id'> {}

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
  })),
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().min(3),
  })),
}));

export const updateById = async(req: Request<IParamProps,{},IBodyProps>,res:Response) => {
  if(!req.params.id) {
    return res.status(400).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      },
    });
  }

  const result = await PessoasProvider.updateById(req.params.id,req.body);

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
  return res.status(204).json(result);
};