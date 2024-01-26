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

  async findDuplicates(): Promise<{ id: number }[]> {
    return await this.#repository.query(`
      SELECT bs.client_id AS id
      FROM balance_sheets bs
      INNER JOIN balance_sheets bsJoin
      ON bs.year = bsJoin.year AND bs.result = bsJoin.result AND bs.client_id <> bsJoin.client_id
      WHERE bs.client_id IN (
        SELECT DISTINCT c.id
        FROM clients c
        INNER JOIN clients cJoin 
        ON cJoin.first_name = c.first_name 
          AND cJoin.last_name = c.last_name 
          AND c.id <> cJoin.id
      )
      GROUP BY bs.client_id, bsJoin.client_id
      HAVING COUNT(bs.client_id) > 1
      ORDER BY bs.client_id
    `);
  }
}
