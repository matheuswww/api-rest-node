import * as create from './Create';
import * as deleteById from './DeleteByid';
import * as getAll from './GetAll';
import * as getbyId from './GetbyId';
import * as updateById from './UpdateByid';

export const CidadesController = {
  ...deleteById,
  ...updateById,
  ...create,
  ...getAll,
  ...getbyId,
};
