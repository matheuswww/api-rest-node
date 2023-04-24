import { testServer } from '../jest.setup';

describe('Pessoas - create',() => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Test' });
    cidadeId = resCidade.body;
  });

  it('Create Record',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nomeCompleto: 'Juca Silva',
      });

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });
  it('Create Record 2',async () => {
    const res1 = await testServer
      .post('/pessoas')
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
      .send({
        cidadeId,
        nomeCompleto: 'Juca Silva',
        email: 'jucaduplicado@gmail.com',
      });

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/pessoas')
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
      .send({
        cidadeId,
        email: 'juca@gmail.com',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
  it('Try create record without email',async () => {
    const res1 = await testServer
      .post('/pessoas')
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
      .send({
        email: 'juca@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Try create record without valid cidadeId ', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId: 'teste',
        email: 'juca@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Try create record without a existing cidadeId',async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId: 999999,
        email: 'juca@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });
    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Try create record without send any propriety', async () => {

    const res1 = await testServer
      .post('/pessoas')
      .send({});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
});