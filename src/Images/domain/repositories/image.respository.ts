import { Image } from '../model/Image';

export interface IImageRepository {
  findAll(): Promise<Image[]>;
  findOneById(id: string): Promise<Image>;
  create(payload: Image): Promise<Image>;
  update(id: string, payload: Image): Promise<void>;
  delete(id: string): Promise<Image>;
}
