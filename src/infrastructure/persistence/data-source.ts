import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_PORT,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: process.env.DEBUG === 'true' ? 'all' : ['error'],
  entities: ['src/infrastructure/persistence/entities/**/*'],
  subscribers: [],
  migrations: [],
});

export default dataSource;
