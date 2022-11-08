import { User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class getUsersUseCases {
  constructor(private readonly userRepository: IuserRepository) {}
  async execute(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getByAge(min: number, max: number): Promise<User[]> {
    return this.userRepository.getUsersByAge(min, max);
  }

  async getByDocument(document: string): Promise<User[]> {
    return this.userRepository.getUsersByDocument(document);
  }
}
