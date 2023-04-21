import { testServer } from '../jest.setup';

describe('Cidades - Delete',() => {
  it('Apaga registro',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'São Paulo'});
  
    expect(res1.statusCode).toEqual(201);
    
    const deletedRes = await testServer
      .delete(`/cidades/${res1.body}`)
      .send();

    expect(deletedRes.statusCode).toEqual(204);
  });
});