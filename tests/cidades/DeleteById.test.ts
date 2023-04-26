import { testServer } from '../jest.setup';

describe('Cidades - Delete',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'delete-cidade@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  it('Delete Record without accessToken',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});
  
    expect(res1.statusCode).toEqual(201);
    
    const deletedRes = await testServer
      .delete(`/cidades/${res1.body}`)
      .send();

    expect(deletedRes.statusCode).toEqual(401);
    expect(deletedRes.body).toHaveProperty('errors.default');
  });

  it('Delete Record',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});
  
    expect(res1.statusCode).toEqual(201);
    
    const deletedRes = await testServer
      .delete(`/cidades/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(deletedRes.statusCode).toEqual(204);
  });

  it('Delete Record no existing',async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: 'São Paulo'});

    expect(res1.statusCode).toEqual(201);

    const deletedRes = await testServer
      .del('/cidades/9999999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(deletedRes.statusCode).toEqual(404);
  });
});