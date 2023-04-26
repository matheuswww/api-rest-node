import { Router } from 'express';
import { PessoasController } from '../controllers/pessoas';
import { UsuariosController } from '../controllers/usuarios';
import { ensureAuthenticated } from '../shared/middleware';
import { CidadesController } from './../controllers';

const router = Router();

router.get('/',(_,res) => {
  return res.send('Olá,DEV!');
});

router.get('/cidades',ensureAuthenticated,CidadesController.getAllValidation,CidadesController.getAll);
router.get('/cidades/:id',ensureAuthenticated,CidadesController.getByidValidation,CidadesController.getById);
router.post('/cidades',ensureAuthenticated,CidadesController.createValidation,CidadesController.create);
router.put('/cidades/:id',ensureAuthenticated,CidadesController.updateByIdvalidation,CidadesController.updateById);
router.delete('/cidades/:id',ensureAuthenticated,CidadesController.deleteByIdValidation,CidadesController.deleteById);

router.get('/pessoas',ensureAuthenticated,PessoasController.getAllValidation,PessoasController.getAll);
router.get('/pessoas/:id',ensureAuthenticated,PessoasController.getByIdValidation,PessoasController.getById);
router.post('/pessoas',ensureAuthenticated,PessoasController.createValidation,PessoasController.create);
router.put('/pessoas/:id',ensureAuthenticated,PessoasController.updateByIdValidation,PessoasController.updateById);
router.delete('/pessoas/:id',ensureAuthenticated,PessoasController.deleteByIdValidation,PessoasController.deleteById);

router.post('/cadastrar',UsuariosController.signUpValidation,UsuariosController.signUp);
router.post('/entrar',UsuariosController.signInValidaton,UsuariosController.signIn);

export { router };