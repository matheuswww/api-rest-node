import { testServer } from '../jest.setup';

describe('Cidades - GetAll',() => {
  it('Get All Records',async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'São paulo'});

    expect(res1.statusCode).toEqual(201);

    const searchedRes = await testServer
      .get('/cidades')
      .send();

    expect(Number(searchedRes.header['x-total-count'])).toBeGreaterThan(0);
    expect(searchedRes.statusCode).toEqual(200);
    expect(searchedRes.body.length).toBeGreaterThan(0);
  });
});