import { IFileRepository } from '../domain/repositories/file.repository';
import { IImageRepository } from '../domain/repositories/image.respository';

export class updateImageUseCases {
  constructor(
    private readonly imageRepository: IImageRepository,
    private readonly fileRepository: IFileRepository,
  ) {}
  async exec(id: string, file: Express.Multer.File) {
    const files3 = await this.fileRepository.insert(file);
    return await this.imageRepository.update(id, {
      name: files3.filename,
      url: files3.url,
      id: null,
    });
  }
}
