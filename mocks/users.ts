import { CreateUserDto } from 'src/Users/infrastructure/controllers/users.dto';
import { typeDocument, User } from '../src/Users/domain/model/user';

const date = new Date();

export const USERS: CreateUserDto[] = [
  {
    firstName: 'Cristian',
    middleName: 'Yamith',
    lastName: 'Burbano',
    birthplace: 'La Plata, Huila',
    age: 28,
    documentType: typeDocument.CC,
    document: '1234343',
    photo: 'dfdfdfd',
  },
  {
    firstName: 'Pepito',
    middleName: 'dfdf',
    lastName: 'Perez',
    birthplace: 'Bogotá, Cundinamarca',
    age: 20,
    documentType: typeDocument.TI,
    document: '5433443',
    photo: 'dfdfccrgbfgfgfgff',
  },
  {
    firstName: 'Pepito',
    middleName: 'Perez',
    lastName: 'Camargo',
    birthplace: 'Bogotá, Cundinamarca',
    age: 40,
    documentType: typeDocument.CE,
    document: '5433443',
    photo: 'dfdfccrgbfgfgfgff',
  },
];

export const USERS_RESPONSE: User[] = USERS.map((user, i) => ({
  ...user,
  id: i,
  createAt: date,
  updateAt: date,
  getFullName: () => {
    return 'hola';
  },
}));

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
