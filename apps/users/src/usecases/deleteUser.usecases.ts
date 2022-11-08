import { deleteImageUseCases } from '../../../images/src/usecases/deleteImage.usecases';
import { IuserRepository } from '../domain/repositories/userRepository.interface';
import { ImageServiceInterface } from '../domain/services/images.interface';

export class deleteUserUseCases {
  constructor(
    private readonly userRepository: IuserRepository,
    private readonly imageService: ImageServiceInterface,
  ) {}
  async exec(id: number) {
    const persona = await this.userRepository.deleteUser(id);
    if (persona.photo) {
      this.imageService.deleteImage(persona.photo);
    }
  }
}
