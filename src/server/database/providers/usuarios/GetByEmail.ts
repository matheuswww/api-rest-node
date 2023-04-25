import { EdefaultMessages, ETableNames } from '../../Enums';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';
export const getByEmail = async(email:string):Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario).select('*').where('email','=',email).first();

    if(result) return result;

    return new Error(EdefaultMessages.notFound);
  } catch (error) {
    return new Error('Erro ao consultar o registro');
  }
};