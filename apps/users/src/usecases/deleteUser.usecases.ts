import { deleteImageUseCases } from '../../../images/src/usecases/deleteImage.usecases';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class deleteUserUseCases {
  constructor(
    private readonly userRepository: IuserRepository,
    private readonly imageUseCase: deleteImageUseCases,
  ) {}
  async exec(id: number) {
    const persona = await this.userRepository.deleteUser(id);
    if (persona.photo) {
      this.imageUseCase.exec(persona.photo);
    }
  }
}
