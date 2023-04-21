import { Icidade } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cidade: Icidade
    // pessoa: Icidade
    // usuario: Icidade
  }
}