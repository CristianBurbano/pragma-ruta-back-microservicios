import { Image } from '../../src/domain/model/Image';

export const IMAGEMOCK: Image = {
  id: 'dfdfeidfjdkdfd',
  name: 'estoesunaimagen.png',
  url: 'bucket.aws.amazon.com/estoesunaimagen.png',
};

export const FILE: Express.Multer.File = {
  buffer: Buffer.from('dfdfdf', 'binary'),
  filename: 'fieldname',
  originalname: 'imageName.jpg',
  encoding: 'binary',
  mimetype: 'image/jpg',
  destination: __dirname,
  size: 3434,
  fieldname: 'fieldname',
  path: '/./',
  stream: null,
};
