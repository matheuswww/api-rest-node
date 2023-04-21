import { EdefaultMessages, ETableNames } from '../../Enums-cidades';
import { Knex } from '../../knex';

export const deleteById = async (id: number):Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).where('id','=',id).del();

    if(result > 0) return;

    return new Error(EdefaultMessages.notFound);
  } catch (error) {
    return Error('Erro ao apagar o registro');
  }
};