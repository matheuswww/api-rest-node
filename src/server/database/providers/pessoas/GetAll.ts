import { ETableNames } from '../../Enums';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const getAll = async(page: number,limit: number,filter: string): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).
      select('*')
      .where('nomeCompleto','like',`%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    return new Error('Erroa ao consultar os registros');
  }
};