import { IPersona } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class updateUserUseCases {
  constructor(private readonly userRepository: IuserRepository) {}
  async exec(id: number, payload: any) {
    await this.userRepository.updateUser(id, payload);
    return 'success';
  }
}
