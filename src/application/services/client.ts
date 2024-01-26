import IClientRepository from '../interfaces/client-repository';
import Client from '../models/client';
import ClientCreateDTO from '../types/client-create-dto';

export default class ClientService {
  clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async findById(clientId: number): Promise<Client | null> {
    return this.clientRepository.findById(clientId);
  }

  async findByFirstAndLastNames(
    firstName: string,
    lastName: string
  ): Promise<Client | null> {
    return this.clientRepository.findByFirstAndLastNames(firstName, lastName);
  }

  async create(payload: ClientCreateDTO): Promise<void> {
    await this.clientRepository.save(payload);
  }

  async update(
    clientId: number,
    payload: Partial<ClientCreateDTO>
  ): Promise<void> {
    const client = await this.findById(clientId);

    if (!client) throw new Error();
    await this.clientRepository.update(client, payload);
  }

  async delete(clientId: number): Promise<void> {
    const client = await this.findById(clientId);

    if (!client) throw new Error();
    await this.clientRepository.delete(client);
  }
}
