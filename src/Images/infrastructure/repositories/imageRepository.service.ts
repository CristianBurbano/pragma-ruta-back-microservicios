import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { plainToInstance } from 'class-transformer';

import { Image } from '../../domain/model/Image';
import { IImageRepository } from '../../domain/repositories/image.respository';
import { Imagen } from '../entities/imagen.entity';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(
    @InjectRepository(Imagen, 'mongoConnection')
    private imageRepo: Repository<Imagen>,
  ) {}

  private async findEntity(id: string): Promise<Imagen> {
    const image = await this.imageRepo.findOne({
      where: {
        _id: new ObjectID(id),
      },
    });
    if (image) return image;
    else throw new NotFoundException(null, 'Imagen no encontrada');
  }
  private parseEntityToModel(entity: Imagen): Image {
    return plainToInstance(Image, { ...entity, id: entity._id.toString() });
  }

  async findAll(): Promise<Image[]> {
    const entities = await this.imageRepo.find();
    return entities.map((entity) => this.parseEntityToModel(entity));
  }
  async findOneById(id: string): Promise<Image> {
    const entity = await this.findEntity(id);
    return this.parseEntityToModel(entity);
  }

  async create(payload: Image): Promise<Image> {
    const newImage = this.imageRepo.create(payload);
    const entity = await this.imageRepo.save(newImage);
    return this.parseEntityToModel(entity);
  }
  async update(id: string, payload: Image): Promise<void> {
    const image = await this.findEntity(id);
    this.imageRepo.merge(image, payload);
    await this.imageRepo.save(image);
  }
  async delete(id: string): Promise<Image> {
    const image = await this.findEntity(id);
    this.imageRepo.delete(image);
    return this.parseEntityToModel(image);
  }
}
