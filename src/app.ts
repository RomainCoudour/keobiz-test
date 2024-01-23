import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import dataSource from './infrastructure/persistence/data-source';
import ClientRepository from './infrastructure/persistence/repositories/client-repository';
import BalanceSheetRepository from './infrastructure/persistence/repositories/balance-sheet-repository';
import { BalanceSheetService, ClientService } from './application';
import ClientController from './api/client.controller';

dotenv.config();

// Initialize datasource
dataSource
  .initialize()
  .then(() => {
    console.log('Connection to datasource established.');
  })
  .catch((error) => console.log(error));

// Initialize app components
const clientRepository = new ClientRepository(dataSource);
const balanceSheetRepository = new BalanceSheetRepository(dataSource);

const clientService = new ClientService(clientRepository);
const balanceSheetService = new BalanceSheetService(
  balanceSheetRepository,
  clientService
);

const clientController = new ClientController(
  clientService,
  balanceSheetService
);

const app = express();
app.set('port', process.env.PORT ?? 3000);
app.use(express.json());

app.post('/clients', clientController.save);
app.get('/clients/:id', clientController.get);
app.patch('/clients/:id', clientController.update);
app.delete('/clients/:id', clientController.delete);

app.post('/clients/:id/balances', clientController.saveBalanceSheet);
app.get('/clients/:id/balances', clientController.getAllBalanceSheets);
app.patch('/clients/:id/balances', clientController.updateBalanceSheet);
app.delete('/clients/:id/balances', clientController.deleteBalanceSheet);

export default app;
