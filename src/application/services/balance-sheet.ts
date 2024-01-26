import IBalanceSheetRepository from '../interfaces/balance-sheet-repository';
import BalanceSheet from '../models/balance-sheet';
import BalanceSheetCreateDTO from '../types/balance-sheet-create-dto';
import ClientService from './client';

export default class BalanceSheetService {
  balanceSheetRepository: IBalanceSheetRepository;
  clientService: ClientService;

  constructor(
    balanceSheetRepository: IBalanceSheetRepository,
    clientService: ClientService
  ) {
    this.balanceSheetRepository = balanceSheetRepository;
    this.clientService = clientService;
  }

  async findByYearAndClientId(
    year: number,
    clientId: number
  ): Promise<BalanceSheet | null> {
    const client = await this.clientService.findById(clientId);

    if (!client) throw new Error();
    return this.balanceSheetRepository.findByYearAndClient(year, client);
  }

  async create(
    clientId: number,
    payload: BalanceSheetCreateDTO
  ): Promise<void> {
    const client = await this.clientService.findById(clientId);

    if (!client) throw new Error();
    await this.balanceSheetRepository.save(client, payload);
  }

  async update(
    clientId: number,
    year: number,
    updatePayload: Partial<BalanceSheet>
  ): Promise<void> {
    const balanceSheet = await this.findByYearAndClientId(year, clientId);

    if (!balanceSheet) throw new Error();
    await this.balanceSheetRepository.update(balanceSheet, updatePayload);
  }

  async delete(clientId: number, year: number): Promise<void> {
    const balanceSheet = await this.findByYearAndClientId(year, clientId);

    if (!balanceSheet) throw new Error();
    await this.balanceSheetRepository.delete(balanceSheet);
  }

  async findAllBalanceSheetsByClientId(
    clientId: number
  ): Promise<BalanceSheet[]> {
    const client = await this.clientService.findById(clientId);

    if (!client) throw new Error();
    return this.balanceSheetRepository.findAllBalanceSheetsByClient(client);
  }
}
