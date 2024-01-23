import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import dataSource from './infrastructure/persistence/data-source';

dotenv.config();

const app = express();
app.set('port', process.env.PORT ?? 3000);

app.use(express.json());

export default app;

dataSource
  .initialize()
  .then(() => {
    console.log('Connection to datasource established.');
  })
  .catch((error) => console.log(error));
