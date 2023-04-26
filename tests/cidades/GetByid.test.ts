import { EdefaultMessages } from '../../src/server/database/Enums';
import { testServer } from '../jest.setup';

describe('Cidades - getById',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getbyid-cidade@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  it('getById Record without accessToken',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});
      
    expect(res1.statusCode).toEqual(201);

    const resSearched = await testServer
      .get(`/cidades/${res1.body}`)
      .send();

    expect(resSearched.statusCode).toEqual(401);
    expect(resSearched.body).toHaveProperty('errors.default');
  });

  it('getById Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});
      
    expect(res1.statusCode).toEqual(201);

    const resSearched = await testServer
      .get(`/cidades/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(resSearched.statusCode).toEqual(200);
    expect(resSearched.body).toHaveProperty('nome');
  });

  it('get Record not existing',async () => {
    const res1 = await testServer 
      .get('/cidades/999999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body.errors.default).toEqual(EdefaultMessages.notFound);
  });
});