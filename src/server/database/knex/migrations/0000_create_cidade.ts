import { Knex } from 'knex';
import { ETableNames } from '../../Enums-cidades';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cidade,table => {
      table.bigIncrements('id').primary().index();
      table.string('nome',150).checkLength('<=',150).notNullable();
      table.comment('Tabela usada para armazenar cidades do sistema.');
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.cidade}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cidade)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cidade}`);
    });
}

