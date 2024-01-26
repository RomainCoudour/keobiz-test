import { DataSource, Repository } from 'typeorm';
import BalanceSheetEntity from '../entities/balance-sheet';
import {
  BalanceSheet,
  BalanceSheetCreateDTO,
  Client,
  IBalanceSheetRepository,
} from '../../../application';

export default class BalanceSheetRepository implements IBalanceSheetRepository {
  #repository: Repository<BalanceSheetEntity>;

  constructor(dataSource: DataSource) {
    this.#repository = dataSource.getRepository(BalanceSheetEntity);
  }

  async save(
    client: Client,
    payload: BalanceSheetCreateDTO
  ): Promise<BalanceSheet> {
    const balanceSheet = await this.#repository.save({
      client,
      year: payload.year,
      result: payload.result,
    });
    return BalanceSheetEntity.mapToModel(balanceSheet, client);
  }

  async update(
    balanceSheet: BalanceSheet,
    updatePayload: Partial<BalanceSheet>
  ): Promise<void> {
    await this.#repository.update(
      { year: balanceSheet.year, client: balanceSheet.client },
      updatePayload
    );
  }

  async delete(balanceSheet: BalanceSheet): Promise<void> {
    await this.#repository.delete({
      year: balanceSheet.year,
      client: balanceSheet.client,
    });
  }

  async findAllBalanceSheetsByClient(client: Client): Promise<BalanceSheet[]> {
    const balanceSheets = await this.#repository
      .createQueryBuilder('balance_sheets')
      .select('balance')
      .from(BalanceSheetEntity, 'balance')
      .where('balance.client_id = :id', { id: client.id })
      .getMany();
    return balanceSheets.map((balanceSheet) =>
      BalanceSheetEntity.mapToModel(balanceSheet, client)
    );
  }

  async findByYearAndClient(
    year: number,
    client: Client
  ): Promise<BalanceSheet | null> {
    const balanceSheet = await this.#repository
      .createQueryBuilder('balance_sheets')
      .select('balance')
      .from(BalanceSheetEntity, 'balance')
      .where('balance.client_id = :clientId', { clientId: client.id })
      .andWhere('balance.year = :year', { year })
      .getOne();

    if (!balanceSheet) return null;
    return BalanceSheetEntity.mapToModel(balanceSheet, client);
  }
}
