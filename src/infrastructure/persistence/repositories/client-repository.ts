import { DataSource, Repository } from 'typeorm';
import ClientEntity from '../entities/client';
import { Client, ClientCreateDTO, IClientRepository } from 'src/application';

export default class ClientRepository implements IClientRepository {
  #repository: Repository<ClientEntity>;

  constructor(dataSource: DataSource) {
    this.#repository = dataSource.getRepository(ClientEntity);
  }

  async findById(id: number): Promise<Client | null> {
    return this.#repository.findOneBy({ id });
  }

  async findByFirstAndLastNames(
    firstName: string,
    lastName: string
  ): Promise<Client | null> {
    return this.#repository.findOneBy({ firstName, lastName });
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
