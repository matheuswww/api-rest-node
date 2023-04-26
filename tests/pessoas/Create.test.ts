import { testServer } from '../jest.setup';

describe('Pessoas - create',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-pessoa@gmail.com';
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

  it('Create Record without accessToken',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nomeCompleto: 'Juca Silva',
      });

    expect(res1.statusCode).toEqual(401);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Create Record',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'juca2@gmail.com',
        nomeCompleto: 'Juca Silva',
      });

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });
  it('Create Record 2',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Juca Silva',
        email: 'jucasilva2@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });
  it('Try create record with duplicated email',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Juca Silva',
        email: 'jucaduplicado@gmail.com',
      });

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'jucaduplicado@gmail.com',
        nomeCompleto: 'duplicado',
      });

    expect(res2.statusCode).toEqual(500);
    expect(res2.body).toHaveProperty('errors.default');
  });
  it('Try create record with a very short nomeCompleto',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nomeCompleto: 'ju',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
  it('Try create record whithout nomeCompleto',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'juca2@gmail.com',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
  it('Try create record without email',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Try create record without valid email', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'juca gmail.com',
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('TTry create record without cidadeId', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        email: 'juca3@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Try create record without valid cidadeId ', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId: 'teste',
        email: 'juca4@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Try create record without a existing cidadeId',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId: 999999,
        email: 'juca5@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });
    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Try create record without send any propriety', async () => {

    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
});