import { EdefaultMessages, ETableNames } from '../../Enums-cidades';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getByid = async(id:number):Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).select('*').where('id','=',id).first();

    if(result) return result;

    return new Error(EdefaultMessages.notFound);
  } catch (error) {
    return new Error('Erro ao consultar o registro');
  }
};