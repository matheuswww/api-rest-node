import { testServer } from '../jest.setup';


describe('Pessoas - GetById',() => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Test' });
    cidadeId = resCidade.body;
  });

  it('Search record by id', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        nomeCompleto: 'Juca silva',
        email: 'jucagetbyid@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .send();
    expect(resBuscada.statusCode).toEqual(200);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');
  });
  it('Try search record not existing', async () => {
    const res1 = await testServer
      .get('/pessoas/99999')
      .send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});