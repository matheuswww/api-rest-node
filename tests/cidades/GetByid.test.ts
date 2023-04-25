import { EdefaultMessages } from '../../src/server/database/Enums';
import { testServer } from '../jest.setup';

describe('Cidades - getById',() => {
  it('getById Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'São Paulo'});
      
    expect(res1.statusCode).toEqual(201);

    const resSearched = await testServer
      .get(`/cidades/${res1.body}`)
      .send();

    expect(resSearched.statusCode).toEqual(200);
    expect(resSearched.body).toHaveProperty('nome');
  });

  it('get Record not existing',async () => {
    const res1 = await testServer 
      .get('/cidades/999999')
      .send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body.errors.default).toEqual(EdefaultMessages.notFound);
  });
});