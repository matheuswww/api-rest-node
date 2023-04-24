import { testServer } from '../jest.setup';


describe('Pessoas create - DeleteById',() => {
  let cidadeId : number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });
    cidadeId = resCidade.body;
  });

  it('Delete record', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'jucadelete@gmail.com',
        nomeCompleto: 'Juca silva',
      });
    expect(res1.statusCode).toEqual(201);

    const resApagada = await testServer
      .delete(`/pessoas/${res1.body}`)
      .send();
    expect(resApagada.statusCode).toEqual(200);
  });
  it('Try delete record not existing', async () => {
    const res1 = await testServer
      .delete('/pessoas/99999')
      .send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});