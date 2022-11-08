import { User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';
import { ImageServiceInterface } from '../domain/services/images.interface';

export class addUserUseCases {
  constructor(
    private readonly userRepository: IuserRepository,
    private readonly imageService: ImageServiceInterface,
  ) {}
  async execute(payload: any): Promise<User> {
    const image = await this.imageService.uploadImage(payload.photo);
    const result = await this.userRepository.createUser({
      ...payload,
      photo: image.id,
    });
    return result;
  }
}
