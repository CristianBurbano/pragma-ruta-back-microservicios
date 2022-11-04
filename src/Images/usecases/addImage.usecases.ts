import { Image } from '../domain/model/Image';
import { IFileRepository } from '../domain/repositories/file.repository';
import { IImageRepository } from '../domain/repositories/image.respository';

export class addImageUseCases {
  constructor(
    private readonly imageRepository: IImageRepository,
    private readonly fileRepository: IFileRepository, // private readonly fileRepository: IFileRepository,
  ) {}
  async execute(file: Express.Multer.File): Promise<Image> {
    const files3 = await this.fileRepository.insert(file);
    const result = await this.imageRepository.create({
      url: files3.url,
      id: null,
      name: files3.filename,
    });
    return result;
  }
}
