import { EdefaultMessages, ETableNames } from '../../Enums';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const getById = async(id: number):Promise<IPessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).
      select('*').
      where('id','=',id).
      first();

    if(result) return result;
    
    return new Error(EdefaultMessages.notFound);
  } catch (error) {
    return new Error('Erro ao consultar o registro');
  }
};