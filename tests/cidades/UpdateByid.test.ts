import { testServer } from '../jest.setup';

describe('Cidades - UpdateById',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'updatebyid-cidade@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  it('Update Record without accessToken',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});

    expect(res1.statusCode).toEqual(201);

    const atualizedRes = await testServer
      .put(`/cidades/${res1.body}`)
      .send({nome: 'São Paulo'});

    expect(atualizedRes.statusCode).toEqual(401);
    expect(atualizedRes.body).toHaveProperty('errors.default');
  });

  it('Update Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});

    expect(res1.statusCode).toEqual(201);

    const atualizedRes = await testServer
      .put(`/cidades/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});

    expect(atualizedRes.statusCode).toEqual(204);
  });

  it('Update Record not existing',async () => {
    const res1 = await testServer
      .put('/cidades/999999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
});