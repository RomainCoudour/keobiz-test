import Client from '../models/client';

export default interface IClientRepository {
  findByFirstAndLastNames(
    firstName: string,
    lastName: string
  ): Promise<Client | null>;

  save(client: Client): Promise<void>;

  update(client: Client, updatePayload: Partial<Client>): Promise<void>;

  delete(client: Client): Promise<void>;
}
