import { testServer } from '../jest.setup';

describe('Usuários - SignIn',() => {
  beforeAll(async () => {
    await testServer.post('/cadastrar').send({
      nome: 'Jorge',
      senha: '123456',
      email: 'jorge@gmail.com'
    });
  });

  it('Make login', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '123456',
        email: 'jorge@gmail.com',
      });
    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toHaveProperty('accessToken');
  });
  it('Wrong Password', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '1234567',
        email: 'jorge@gmail.com',
      });
    expect(res1.statusCode).toEqual(403);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Wrong Email', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '123456',
        email: 'jorgeeeeeee@gmail.com',
      });
    expect(res1.statusCode).toEqual(403);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Invalid Email format', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '123456',
        email: 'jorge gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Short Password', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '12',
        email: 'jorge@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Password dont informed', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        email: 'jorge@gmail.com',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Email dont informed', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '123456',
      });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
});