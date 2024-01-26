import { ClientService } from '../../src/application';

describe('Unit > ClientService', () => {
  const context = {
    clientRepository: {
      findById: jest.fn(),
      findByFirstAndLastNames: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let service: ClientService;

  beforeAll(() => {
    service = new ClientService(context.clientRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findById', () => {
    it('should fetch client by its id', async () => {
      await service.findById(1);

      expect(context.clientRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('findByFirstAndLastNames', () => {
    it('should fetch client by its names', async () => {
      await service.findByFirstAndLastNames('Jack', 'Chan');

      expect(
        context.clientRepository.findByFirstAndLastNames
      ).toHaveBeenCalledWith('Jack', 'Chan');
    });
  });

  describe('create', () => {
    it('should create a client', async () => {
      const payload = { firstName: 'Jack', lastName: 'Chan' };

      await service.create(payload);

      expect(context.clientRepository.save).toHaveBeenCalledWith(payload);
    });
  });

  describe('update', () => {
    it('should fetch client by its id', async () => {
      const payload = { firstName: 'Jack', lastName: 'Chan' };
      const client = Symbol('client');
      context.clientRepository.findById.mockResolvedValueOnce(client);

      await service.update(1, payload);

      expect(context.clientRepository.update).toHaveBeenCalledWith(
        client,
        payload
      );
    });
  });
});
