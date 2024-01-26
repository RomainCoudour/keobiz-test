import { DataSource, Repository } from 'typeorm';
import {
  Client,
  ClientCreateDTO,
  IClientRepository,
} from '../../../application';
import ClientEntity from '../entities/client';

export default class ClientRepository implements IClientRepository {
  #repository: Repository<ClientEntity>;

  constructor(dataSource: DataSource) {
    this.#repository = dataSource.getRepository(ClientEntity);
  }

  async findById(id: number): Promise<Client | null> {
    const client = await this.#repository.findOneBy({ id });
    return client ? ClientEntity.mapToModel(client) : null;
  }

  async findByFirstAndLastNames(
    firstName: string,
    lastName: string
  ): Promise<Client | null> {
    const client = await this.#repository.findOneBy({ firstName, lastName });
    return client ? ClientEntity.mapToModel(client) : null;
  }

  async save(payload: ClientCreateDTO): Promise<Client> {
    const client = await this.#repository.save(payload);
    return ClientEntity.mapToModel(client);
  }

  async update(client: Client, updatePayload: Partial<Client>): Promise<void> {
    await this.#repository.update({ id: client.id }, updatePayload);
  }

  async delete(client: Client): Promise<void> {
    await this.#repository.delete({ id: client.id });
  }
}
