import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: process.env.DEBUG === 'true' ? 'all' : ['error'],
  entities: ['src/infrastructure/persistence/entities/**/*'],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
