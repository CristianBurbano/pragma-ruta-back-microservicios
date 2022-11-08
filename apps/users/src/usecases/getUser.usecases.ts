import { typeDocument, User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class getUserUseCases {
  constructor(private readonly userRepository: IuserRepository) {}
  async byId(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }
  async byDocument(type: typeDocument, document: string): Promise<User> {
    return this.userRepository.getUserByDocument(type, document);
  }
}
