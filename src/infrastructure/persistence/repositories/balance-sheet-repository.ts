import { DataSource, Repository } from 'typeorm';
import BalanceSheetEntity from '../entities/balance-sheet';
import { BalanceSheet, Client, IBalanceSheetRepository } from 'src/application';

export default class BalanceSheetRepository implements IBalanceSheetRepository {
  #repository: Repository<BalanceSheetEntity>;

  constructor(dataSource: DataSource) {
    this.#repository = dataSource.getRepository(BalanceSheetEntity);
  }

  async save(balanceSheet: BalanceSheet): Promise<void> {
    this.#repository.save(balanceSheet);
  }

  async update(
    balanceSheet: BalanceSheet,
    updatePayload: Partial<BalanceSheet>
  ): Promise<void> {
    this.#repository.update(
      { year: balanceSheet.year, client: balanceSheet.client },
      updatePayload
    );
  }

  async delete(balanceSheet: BalanceSheet): Promise<void> {
    this.#repository.delete({
      year: balanceSheet.year,
      client: balanceSheet.client,
    });
  }

  async findAllBalanceSheetsByClient(client: Client): Promise<BalanceSheet[]> {
    const balanceSheets = await this.#repository.findBy({ client });
    return balanceSheets.map((balanceSheet) =>
      BalanceSheetEntity.mapToModel(balanceSheet, client)
    );
  }
}
