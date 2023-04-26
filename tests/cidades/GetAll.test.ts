import { testServer } from '../jest.setup';

describe('Cidades - GetAll',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getall-cidade@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  it('Get All without accessToken',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São paulo'});

    expect(res1.statusCode).toEqual(201);

    const searchedRes = await testServer
      .get('/cidades')
      .send();

    expect(searchedRes.statusCode).toEqual(401);
    expect(searchedRes.body).toHaveProperty('errors.default');
  });

  it('Get All Records',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São paulo'});

    expect(res1.statusCode).toEqual(201);

    const searchedRes = await testServer
      .get('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(Number(searchedRes.header['x-total-count'])).toBeGreaterThan(0);
    expect(searchedRes.statusCode).toEqual(200);
    expect(searchedRes.body.length).toBeGreaterThan(0);
  });
});