import { typeDocument, User } from '../model/user';

export interface IuserRepository {
  getUsers(): Promise<User[]>;

  getUserById(id: number): Promise<User>;
  getUserByDocument(type: typeDocument, document: string): Promise<User>;

  getUsersByAge(min: number, max: number): Promise<User[]>;
  getUsersByDocument(document: string): Promise<User[]>;

  createUser(user: User): Promise<User>;

  updateUser(id: number, payload: any): Promise<void>;
  deleteUser(id: number): Promise<User>;
}
