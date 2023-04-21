import { testServer } from '../jest.setup';

describe('Cidades - Create',() => {
  it('Create Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'São Paulo',});

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });

  it('Create Record with a short name',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Sã',});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

  it('Create Record no a necessary field or wrong write',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nomes: 'São Paulo'});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});
