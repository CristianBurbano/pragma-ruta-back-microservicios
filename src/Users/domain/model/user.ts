export enum typeDocument {
  CC,
  TI,
  CE,
}

export interface IPersona {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  birthplace: string;
  photo: string;
  documentType: typeDocument;
  document: string;
  createAt: Date;
  updateAt: Date;
}
export class User implements IPersona {
  id: number;
  lastName: string;
  firstName: string;
  middleName = '';
  age: number;
  birthplace: string;
  photo: string;
  documentType: typeDocument;
  document: string;
  createAt: Date;
  updateAt: Date;

  getFullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
}
