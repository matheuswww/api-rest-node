import { testServer } from '../jest.setup';


describe('Pessoas - GetById',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getbyid-cidade@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Test' });
    cidadeId = resCidade.body;
  });

  it('Search record by id without acessToken', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Juca silva',
        email: 'jucagetbyid@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .send();
    expect(resBuscada.statusCode).toEqual(401);
    expect(resBuscada.body).toHaveProperty('errors.default');
  });

  it('Search record by id', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Juca silva',
        email: 'jucagetbyid2@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(resBuscada.statusCode).toEqual(200);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');
  });
  it('Try search record not existing', async () => {
    const res1 = await testServer
      .get('/pessoas/99999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});