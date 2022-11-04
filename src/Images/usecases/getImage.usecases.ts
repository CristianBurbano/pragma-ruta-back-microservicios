import { Image } from '../domain/model/Image';
import { IImageRepository } from '../domain/repositories/image.respository';

export class getImagesUseCases {
  constructor(private readonly imageRepository: IImageRepository) {}
  async exec(): Promise<Image[]> {
    return this.imageRepository.findAll();
  }
  async byId(id: string): Promise<Image> {
    return this.imageRepository.findOneById(id);
  }
}
