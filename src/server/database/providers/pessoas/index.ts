import * as count from './Count';
import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as  getById from './GetByid';
import * as updateById from './UpdateByid';

export const PessoasProvider = {
  ...create,
  ...deleteById,
  ...getAll,
  ...getById,
  ...updateById,
  ...count,
};