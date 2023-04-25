import { Icidade, IPessoa, IUsuario } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cidade: Icidade
    pessoa: IPessoa
    usuario: IUsuario
  }
}