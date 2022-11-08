import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ImageServiceInterface } from '../../domain/services/images.interface';
import FormData = require('form-data');

@Injectable()
export class ImageService implements ImageServiceInterface {
  url = 'http://localhost:3005';
  constructor(private http: HttpService) {}

  async getImage(id: string): Promise<any> {
    const query = await firstValueFrom(
      this.http.get(this.url + `/images/${id}`),
    );

    return query.data?.data;
  }

  async deleteImage(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(this.url + `/images/${id}`));
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), file.originalname);
    const query = await firstValueFrom(
      this.http.post(this.url + `/images/`, formData, {
        headers: formData.getHeaders(),
      }),
    );

    return query.data?.data;
  }
}
