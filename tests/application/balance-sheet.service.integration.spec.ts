import { DataSource } from 'typeorm';
import { BalanceSheetService, ClientService } from '../../src/application';
import BalanceSheetRepository from '../../src/infrastructure/persistence/repositories/balance-sheet-repository';
import ClientRepository from '../../src/infrastructure/persistence/repositories/client-repository';
import setup from '../__setup__/setup';
import teardown from '../__setup__/teardown';

describe('Integration > BalanceSheetService', () => {
  let service: BalanceSheetService;
  let dataSource: DataSource;

  beforeAll(async () => {
    await setup();

    dataSource = globalThis.testDataSource;

    service = new BalanceSheetService(
      new BalanceSheetRepository(dataSource),
      new ClientService(new ClientRepository(dataSource))
    );
  });

  afterAll(async () => {
    await teardown();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findDuplicates', () => {
    beforeAll(async () => {
      await dataSource.query(`
        INSERT INTO clients (id, first_name, last_name)
        VALUES
            (1,'DUPLICATES','Dupond'),
            (2,'DUPLICATES','Dupond'),
            (3,'NOT DUPLICATES','Martin'),
            (4,'NOT DUPLICATES','Martin'),
            (5,'NOT DUPLICATES','WITH ONLY ONE BALANCE IN COMMON'),
            (6,'NOT DUPLICATES','WITH ONLY ONE BALANCE IN COMMON');
      `);
      await dataSource.query(`
        INSERT INTO balance_sheets (year, client_id, result)
        VALUES
            (2020,1,1),
            (2021,1,2),
            (2022,1,3),
            (2023,1,4),
            (2020,2,1),
            (2021,2,2),
            (2021,3,10),
            (2022,3,10),
            (2022,4,11),
            (2023,4,10),
            (2023,5,20),
            (2024,5,21),
            (2023,6,20),
            (2024,6,22);
      `);
    });

    it('should return the duplicate clients according to their balance sheets', async () => {
      const duplicates = await service.findDuplicates();

      expect(duplicates.length).toBe(2);
      expect(duplicates).toMatchObject([{ id: 1 }, { id: 2 }]);
    });
  });
});
