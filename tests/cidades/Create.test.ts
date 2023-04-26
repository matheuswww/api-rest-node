import { testServer } from '../jest.setup';

describe('Cidades - Create',() => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidade@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  it('Create Record without acessToken',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'São Paulo',});

    expect(res1.statusCode).toEqual(401);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Create Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo',});

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });

  it('Create Record with a short name',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'Sã',});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

  it('Create Record no a necessary field or wrong write',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nomes: 'São Paulo'});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});
