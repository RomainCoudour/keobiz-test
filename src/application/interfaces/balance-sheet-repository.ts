import BalanceSheet from '../models/balance-sheet';
import Client from '../models/client';

export default interface IBalanceSheetRepository {
  save(balanceSheet: BalanceSheet): Promise<void>;

  update(
    balanceSheet: BalanceSheet,
    updatePayload: Partial<BalanceSheet>,
  ): Promise<void>;

  delete(balanceSheet: BalanceSheet): Promise<void>;

  findAllBalanceSheetsByClient(client: Client): Promise<BalanceSheet[]>;
}
