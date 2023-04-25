import { EdefaultMessages, ETableNames } from '../../Enums';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where('nomeCompleto','like',`%${filter}`)
      .count<[{ count: number }]>('* as count');

    if(Number.isInteger(Number(count))) return Number(count);

    return new Error(EdefaultMessages.notFound);
  } catch (error) {
    return new Error('Erro ao consultar o registro');
  }
};