import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: __dirname+'/../../../../.env'});

export const dev:Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ,
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.resolve(__dirname,'seeds')
  },
  pool: {
    min: 2,
    max: 10
  },
};

export const test:Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: ':memory:'
  },
  migrations: {
    directory: path.resolve(__dirname,'migrations'),
  },
  pool: {
    afterCreate: (connection:any,done:Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    } 
  }
};
