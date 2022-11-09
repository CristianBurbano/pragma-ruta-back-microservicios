import { Injectable, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ImageServiceInterface } from '../../domain/services/images.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ImageService implements ImageServiceInterface {
  constructor(@Inject('IMAGE_SERVICE') private imageService: ClientProxy) {}

  async getImage(id: string): Promise<any> {
    const result = await firstValueFrom(
      this.imageService.send({ cmd: 'getImage' }, id),
    );
    console.log('resultado de get image', result);

    return result;
  }

  async deleteImage(id: string): Promise<void> {
    await firstValueFrom(this.imageService.send({ cmd: 'deleteImage' }, id));
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    const result = await firstValueFrom(
      this.imageService.send({ cmd: 'uploadImage' }, file),
    );
    return result;
  }
}
