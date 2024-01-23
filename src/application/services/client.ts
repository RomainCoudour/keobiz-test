import IClientRepository from '../interfaces/client-repository';

export default class ClientService {
  #clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.#clientRepository = clientRepository;
  }
}
