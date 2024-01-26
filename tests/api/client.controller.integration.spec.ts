import request from 'supertest';
import app from '../../src/app';
import { BalanceSheet } from '../../src/application';
import setup, { setupData } from '../__setup__/setup';
import teardown from '../__setup__/teardown';

describe('Integration > ClientController', () => {
  beforeAll(async () => {
    await setup();
    await setupData(globalThis.testDataSource);
  });

  afterAll(async () => {
    await teardown();
  });

  it('should save a new balance sheet for a given client', async () => {
    const response = await request(app)
      .post('/clients/1/balances')
      .send({ year: 2024, result: 1000 })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(201);
  });

  it('should return all balance sheets for a given client', async () => {
    const year = 2777;
    const result = 1774;
    await request(app).post('/clients/1/balances').send({ year, result });

    const response = await request(app)
      .get('/clients/1/balances')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.length > 0).toBe(true);
    expect(
      response.body.every((balance: BalanceSheet) => balance.client.id === 1)
    ).toBe(true);
    expect(
      response.body.some(
        (balance: BalanceSheet) =>
          balance.year === year && balance.result === result
      )
    ).toBe(true);
  });

  it('should update the balance sheet for a given client', async () => {
    const response = await request(app)
      .patch('/clients/1/balances?year=2024')
      .send({ result: 1250 })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(204);

    const balanceSheets = await request(app)
      .get('/clients/1/balances')
      .set('Accept', 'application/json');
    expect(
      balanceSheets.body.some(
        (balance: BalanceSheet) =>
          balance.year === 2024 && balance.result === 1250
      )
    ).toBe(true);
  });

  it('should delete the balance sheet for a given client', async () => {
    const response = await request(app)
      .delete('/clients/1/balances?year=2024')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(204);

    const balanceSheets = await request(app)
      .get('/clients/1/balances')
      .set('Accept', 'application/json');
    expect(
      balanceSheets.body.some(
        (balance: BalanceSheet) =>
          balance.year === 2024 && balance.result === 1250
      )
    ).toBe(false);
  });
});
