import { typeDocument, User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';
import { ImageServiceInterface } from '../domain/services/images.interface';

export class consultUserUseCases {
  constructor(
    private readonly userRepository: IuserRepository,
    private readonly imageService: ImageServiceInterface,
  ) {}
  private async getUserWithImage(user) {
    if (user?.photo) {
      const image = await this.imageService.getImage(user.photo);
      user.photo = image;
    }
    return user;
  }
  async byId(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    return this.getUserWithImage(user);
  }

  async byDocument(type: typeDocument, document: string): Promise<User> {
    const user = this.userRepository.getUserByDocument(type, document);
    return this.getUserWithImage(user);
  }
}
