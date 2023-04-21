import * as create from './Create';
import * as deleteById from './DeleteByid';
import * as getAll from './GetAll';
import * as getbyId from './GetByid';
import * as updateById from './UpdateByid';
import * as count from './count';

export const CidadesProvider = {
  ...deleteById,
  ...updateById,
  ...create,
  ...getAll,
  ...getbyId,
  ...count,
};
