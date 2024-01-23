import Client from '../models/client';
import ClientCreateDTO from '../types/client-create-dto';

export default interface IClientRepository {
  findById(id: number): Promise<Client | null>;

  findByFirstAndLastNames(
    firstName: string,
    lastName: string
  ): Promise<Client | null>;

  save(payload: ClientCreateDTO): Promise<Client>;

  update(client: Client, updatePayload: Partial<Client>): Promise<void>;

  delete(client: Client): Promise<void>;
}
