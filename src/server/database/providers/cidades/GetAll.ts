
import { ETableNames } from '../../Enums';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getAll = async(page:number,limit:number,filter:string,id = 0):Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).select('*').where('id',Number(id)).orWhere('nome','like',`%${filter}%`).offset((page - 1) * limit).limit(limit);

    if(id > 0 && result.every(item => item.id !== id)) {
      const resultByid = await Knex(ETableNames.cidade).select('*').where('id','=',id).first();
      if(resultByid) return [...result,resultByid];
    }
    return result;
  } catch (error) {
    return new Error('Erro ao consultar os registros');
  }
};