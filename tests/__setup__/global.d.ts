import { DataSource } from 'typeorm';

declare global {
  var testDataSource: DataSource;
}
