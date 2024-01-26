import { Request, Response } from 'express';
import {
  BalanceSheetService,
  BalanceSheetCreateDTO,
  ClientCreateDTO,
  ClientService,
} from '../application';

export default class ClientController {
  #clientService: ClientService;
  #balanceService: BalanceSheetService;

  constructor(
    clientService: ClientService,
    balanceService: BalanceSheetService
  ) {
    this.#clientService = clientService;
    this.#balanceService = balanceService;
  }

  save = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ClientCreateDTO;
    try {
      await this.#clientService.create(payload);
      res.sendStatus(201);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  /**
   * VERB /clients/:id
   */

  get = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    try {
      if (!clientId) throw new Error();
      const client = await this.#clientService.findById(clientId);
      res.status(200).json(client);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    try {
      if (!clientId) throw new Error();
      await this.#clientService.delete(clientId);
      res.sendStatus(204);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    const payload = req.body as Partial<ClientCreateDTO>;
    try {
      if (!clientId) throw new Error();
      await this.#clientService.update(clientId, payload);
      res.sendStatus(204);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  /**
   * VERB /clients/:id/balances
   */

  saveBalanceSheet = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    const payload = req.body as BalanceSheetCreateDTO;
    try {
      if (!clientId) throw new Error();
      await this.#balanceService.create(clientId, payload);
      res.sendStatus(201);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  getAllBalanceSheets = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    try {
      if (!clientId) throw new Error();
      const balanceSheets =
        await this.#balanceService.findAllBalanceSheetsByClientId(clientId);
      res.status(200).json(balanceSheets);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  /**
   * VERB /clients/:id/balances?year=
   */
  updateBalanceSheet = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    const year = Number(req.query['year']);
    const payload = req.body as Partial<BalanceSheetCreateDTO>;
    try {
      if (!clientId) throw new Error();
      await this.#balanceService.update(clientId, year, payload);
      res.sendStatus(204);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };

  deleteBalanceSheet = async (req: Request, res: Response): Promise<void> => {
    const clientId = Number(req.params['id']);
    const year = Number(req.query['year']);
    try {
      if (!clientId) throw new Error();
      await this.#balanceService.delete(clientId, year);
      res.sendStatus(204);
    } catch (err) {
      console.log('err = ', err);
      res.sendStatus(400);
    }
  };
}
