import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { CidadesProvider } from '../../database/providers/cidades';
import { EdefaultMessages } from '../../database/Enums';

interface IParamProps {
  id?:number;
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamProps>,res: Response) => {
  if(!req.params.id) {
    return res.status(400).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado',
      }
    });
  }
  
  const result = await CidadesProvider.deleteById(req.params.id);

  if(result instanceof Error) {
    if(result.message === EdefaultMessages.notFound) {
      return res.status(404).json({
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

  return res.status(204).send();
};