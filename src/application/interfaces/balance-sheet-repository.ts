import BalanceSheet from '../models/balance-sheet';
import Client from '../models/client';
import BalanceSheetCreateDTO from '../types/balance-sheet-create-dto';

export default interface IBalanceSheetRepository {
  save(client: Client, payload: BalanceSheetCreateDTO): Promise<BalanceSheet>;

  update(
    balanceSheet: BalanceSheet,
    updatePayload: Partial<BalanceSheet>
  ): Promise<void>;

  delete(balanceSheet: BalanceSheet): Promise<void>;

  findAllBalanceSheetsByClient(client: Client): Promise<BalanceSheet[]>;

  findByYearAndClient(
    year: number,
    client: Client
  ): Promise<BalanceSheet | null>;

  findDuplicates(): Promise<{ id: number }[]>;
}
