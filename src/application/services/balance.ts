import IBalanceSheetRepository from '../interfaces/balance-sheet-repository';

export default class BalanceService {
  #balanceSheetRepository: IBalanceSheetRepository;

  constructor(balanceSheetRepository: IBalanceSheetRepository) {
    this.#balanceSheetRepository = balanceSheetRepository;
  }
}
