import { testServer } from '../jest.setup';

describe('Pessoas - GetAll',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getall-pessoa@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'test' });

    cidadeId = resCidade.body;
  });

  it('Search records without accessToken', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'jucagetall@gmail.com',
        nomeCompleto: 'Juca silva',
      });
    expect(res1.statusCode).toEqual(201);

    const resBuscada = await testServer
      .get('/pessoas')
      .send();

    expect(resBuscada.statusCode).toEqual(401);
    expect(resBuscada.body).toHaveProperty('errors.default');
  });

  it('Search records', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'jucagetall2@gmail.com',
        nomeCompleto: 'Juca silva',
      });
    expect(res1.statusCode).toEqual(201);

    const resBuscada = await testServer
      .get('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(200);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});