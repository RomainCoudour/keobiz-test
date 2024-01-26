import { BalanceSheetService } from '../../src/application';

describe('Unit > BalanceSheetService', () => {
  const context = {
    balanceSheetRepository: {
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllBalanceSheetsByClient: jest.fn(),
      findByYearAndClient: jest.fn(),
    },
    clientService: {
      clientRepository: {
        findById: jest.fn(),
        findByFirstAndLastNames: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      findById: jest.fn(),
      findByFirstAndLastNames: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let service: BalanceSheetService;

  beforeAll(() => {
    service = new BalanceSheetService(
      context.balanceSheetRepository,
      context.clientService
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findByYearAndClientId', () => {
    it('should fetch the corresponding client and return the balance sheet for the given year', async () => {
      const client = Symbol('client');
      const balanceSheet = Symbol('balanceSheet');
      context.clientService.findById.mockResolvedValueOnce(client);
      context.balanceSheetRepository.findByYearAndClient.mockResolvedValue(
        balanceSheet
      );

      await service.findByYearAndClientId(2024, 1);

      expect(context.clientService.findById).toHaveBeenLastCalledWith(1);
      expect(
        context.balanceSheetRepository.findByYearAndClient
      ).toHaveBeenLastCalledWith(2024, client);
    });
  });

  describe('create', () => {
    it('should the balance sheet', async () => {
      const client = Symbol('client');
      const payload = { result: 1000, year: 2023 };
      context.clientService.findById.mockResolvedValueOnce(client);

      await service.create(1, payload);

      expect(context.clientService.findById).toHaveBeenLastCalledWith(1);
      expect(context.balanceSheetRepository.save).toHaveBeenLastCalledWith(
        client,
        payload
      );
    });
  });

  describe('update', () => {
    it('should update the balance sheet for the given year', async () => {
      const client = Symbol('client');
      const balanceSheet = Symbol('balanceSheet');
      const payload = { result: 1500 };
      context.clientService.findById.mockResolvedValueOnce(client);
      context.balanceSheetRepository.findByYearAndClient.mockResolvedValue(
        balanceSheet
      );

      await service.update(1, 2023, payload);

      expect(context.clientService.findById).toHaveBeenLastCalledWith(1);
      expect(
        context.balanceSheetRepository.findByYearAndClient
      ).toHaveBeenLastCalledWith(2023, client);
      expect(context.balanceSheetRepository.update).toHaveBeenLastCalledWith(
        balanceSheet,
        payload
      );
    });
  });

  describe('delete', () => {
    it('should delete the balance sheet for the given year', async () => {
      const client = Symbol('client');
      const balanceSheet = Symbol('balanceSheet');
      context.clientService.findById.mockResolvedValueOnce(client);
      context.balanceSheetRepository.findByYearAndClient.mockResolvedValue(
        balanceSheet
      );

      await service.delete(1, 2024);

      expect(context.clientService.findById).toHaveBeenLastCalledWith(1);
      expect(
        context.balanceSheetRepository.findByYearAndClient
      ).toHaveBeenLastCalledWith(2024, client);
      expect(context.balanceSheetRepository.delete).toHaveBeenCalledWith(
        balanceSheet
      );
    });
  });

  describe('findAllBalanceSheetsByClientId', () => {
    it('should fetch the the balance sheets for the given client', async () => {
      const client = Symbol('client');
      const balanceSheet = Symbol('balanceSheet');
      context.clientService.findById.mockResolvedValueOnce(client);
      context.balanceSheetRepository.findByYearAndClient.mockResolvedValue(
        balanceSheet
      );

      await service.findAllBalanceSheetsByClientId(1);

      expect(context.clientService.findById).toHaveBeenLastCalledWith(1);
      expect(
        context.balanceSheetRepository.findAllBalanceSheetsByClient
      ).toHaveBeenLastCalledWith(client);
    });
  });
});
