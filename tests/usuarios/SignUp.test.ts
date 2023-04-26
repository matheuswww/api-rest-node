import { testServer } from '../jest.setup';


describe('Usuário - SignUp', () => {
  it('Register user 2', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });
  it('Register user 2', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Pedro da Rosa',
        email: 'pedro@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });
  it('Error in register with a duplicated email', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Pedro da Rosa',
        email: 'pedroduplicado@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Juca da Silva',
        email: 'pedroduplicado@gmail.com',
      });
    expect(res2.statusCode).toEqual(500);
    expect(res2.body).toHaveProperty('errors.default');
  });
  it('Error in register without a email', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Juca da Silva',
        // email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Error in register without a valid name', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        // nome: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
  it('Error in register without a password', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        // senha: '123456',
        nome: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Error in register without a valid email', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Juca da Silva',
        email: 'jucasilva gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Error in register with a short password', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123',
        nome: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Error in register with a short name', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Ju',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});