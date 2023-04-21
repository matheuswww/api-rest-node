import { testServer } from '../jest.setup';

describe('Cidades - UpdateById',() => {
  it('Update Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'São Paulo'});

    expect(res1.statusCode).toEqual(201);

    const atualizedRes = await testServer
      .put(`/cidades/${res1.body}`)
      .send({nome: 'São Paulo'});

    expect(atualizedRes.statusCode).toEqual(204);
  });

  it('Update Record not existing',async () => {
    const res1 = await testServer
      .put('/cidades/999999')
      .send({nome: 'São Paulo'});

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
});