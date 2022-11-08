import { addImageUseCases } from '../../../images/src/usecases/addImage.usecases';
import { User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class addUserUseCases {
  constructor(
    private readonly userRepository: IuserRepository,
    private readonly addImage: addImageUseCases,
  ) {}
  async execute(payload: any): Promise<User> {
    const image = await this.addImage.execute(payload.photo);
    const result = await this.userRepository.createUser({
      ...payload,
      photo: image.id,
    });
    return result;
  }
}
