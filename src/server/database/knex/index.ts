import { knex } from 'knex';
import { dev,test } from './Enviroment';
import dotenv from 'dotenv';
dotenv.config({path: __dirname+'/../../../../.env'});

export const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case 'dev': return dev;
    case 'test': return test;
    default: return test;
  }
};

export const Knex = knex(getEnviroment());