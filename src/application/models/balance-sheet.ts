import Client from './client';

export default class BalanceSheet {
  year: number;
  client: Client;
  result: number;

  constructor({
    year,
    client,
    result,
  }: {
    year: number;
    client: Client;
    result: number;
  }) {
    this.year = year;
    this.client = client;
    this.result = result;
  }
}
