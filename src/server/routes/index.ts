import { Router } from 'express';
import { CidadesController } from './../controllers';

const router = Router();

router.get('/',(_,res) => {
  return res.send('Olá,DEV!');
});

router.get('/cidades',CidadesController.getAllValidation,CidadesController.getValidation);
router.get('/cidades/:id',CidadesController.getByidValidation,CidadesController.getById);
router.post('/cidades',CidadesController.createValidation,CidadesController.create);
router.put('/cidades/:id',CidadesController.updateByIdvalidation,CidadesController.updateById);
router.delete('/cidades/:id',CidadesController.deleteByIdValidation,CidadesController.deleteById);

export { router };