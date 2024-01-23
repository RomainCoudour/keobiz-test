import { DataSource, Repository } from 'typeorm';
import ClientEntity from '../entities/client';
import { Client, IClientRepository } from 'src/application';

export default class ClientRepository implements IClientRepository {
  #repository: Repository<ClientEntity>;

  constructor(dataSource: DataSource) {
    this.#repository = dataSource.getRepository(ClientEntity);
  }

  async findByFirstAndLastNames(
    firstName: string,
    lastName: string
  ): Promise<Client | null> {
    return this.#repository.findOne({ where: { firstName, lastName } });
  }

  async save(client: Client): Promise<void> {
    this.#repository.save(client);
  }

  async update(client: Client, updatePayload: Partial<Client>): Promise<void> {
    this.#repository.update({ id: client.id }, updatePayload);
  }

  async delete(client: Client): Promise<void> {
    this.#repository.delete({ id: client.id });
  }
}
