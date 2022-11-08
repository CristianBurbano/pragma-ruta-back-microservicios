import { IFileRepository } from '../domain/repositories/file.repository';
import { IImageRepository } from '../domain/repositories/image.respository';

export class deleteImageUseCases {
  constructor(
    private readonly imageRepository: IImageRepository,
    private readonly fileRepository: IFileRepository,
  ) {}
  async exec(id: string) {
    const image = await this.imageRepository.delete(id);
    if (image.url && image.name) {
      await this.fileRepository.delete(image.name);
    }
  }
}
