import { testServer } from '../jest.setup';


describe('Pessoas delete - DeleteById',() => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'delete-pessoa@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste',email:email,senha: '123456'});
    const signInRes = await (testServer.post('/entrar')).send({email:email,senha: '123456'});

    accessToken = signInRes.body.accessToken;
  });

  let cidadeId : number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Teste' });
    cidadeId = resCidade.body;
  });

  it('Delete record without accessToken', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'jucadelete@gmail.com',
        nomeCompleto: 'Juca silva',
      });
    expect(res1.statusCode).toEqual(201);

    const resApagada = await testServer
      .delete(`/pessoas/${res1.body}`)
      .send();
    expect(resApagada.statusCode).toEqual(401);
    expect(resApagada.body).toHaveProperty('errors.default');
  });

  it('Delete record', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        email: 'jucadelete2@gmail.com',
        nomeCompleto: 'Juca silva',
      });
    expect(res1.statusCode).toEqual(201);

    const resApagada = await testServer
      .delete(`/pessoas/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(resApagada.statusCode).toEqual(200);
  });
  it('Try delete record not existing', async () => {
    const res1 = await testServer
      .delete('/pessoas/99999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});