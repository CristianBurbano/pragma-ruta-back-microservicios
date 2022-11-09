import { Test, TestingModule } from '@nestjs/testing';
import { addUserUseCases } from '../../src/usecases/addUser.usecases';
import { deleteUserUseCases } from '../../src/usecases/deleteUser.usecases';
import { updateUserUseCases } from '../../src/usecases/updateUser.usecases';
import { UsersController } from '../../src/infrastructure/controllers/users.controller';
import { getUsersUseCases } from '../../src/usecases/getUsers.usecases';
import { FILE, USERS, USERS_RESPONSE } from '../mocks/users';
import { consultUserUseCases } from '../../src/usecases/consultUser.usecases';

describe('Rutas de Usuario', () => {
  let controller: UsersController;
  let getUserUC: consultUserUseCases;
  let getUsersUC: getUsersUseCases;
  let updateUserUC: updateUserUseCases;
  let addUserUC: addUserUseCases;
  let deleteUserUC: deleteUserUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: consultUserUseCases,
          useValue: { exec: jest.fn(), byDocument: jest.fn() },
        },
        {
          provide: getUsersUseCases,
          useValue: {
            execute: jest.fn(),
            getByAge: jest.fn(),
            getByDocument: jest.fn(),
          },
        },
        { provide: updateUserUseCases, useValue: { exec: jest.fn() } },
        { provide: deleteUserUseCases, useValue: { exec: jest.fn() } },
        { provide: addUserUseCases, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    getUserUC = module.get<consultUserUseCases>(consultUserUseCases);
    getUsersUC = module.get<getUsersUseCases>(getUsersUseCases);
    updateUserUC = module.get<updateUserUseCases>(updateUserUseCases);
    addUserUC = module.get<addUserUseCases>(addUserUseCases);
    deleteUserUC = module.get<deleteUserUseCases>(deleteUserUseCases);
  });

  it('Debería estar definido', () => {
    expect(controller).toBeDefined();
  });
  describe('Obtener Usuarios', () => {
    it('Obtener todos los usuarios', async () => {
      jest.spyOn(getUsersUC, 'execute').mockResolvedValueOnce(USERS_RESPONSE);
      await controller.getUsers();
      expect(getUsersUC.execute).toBeCalled();
    });
    it('Obtener usuarios por documento', async () => {
      jest
        .spyOn(getUsersUC, 'getByDocument')
        .mockResolvedValueOnce(USERS_RESPONSE);
      await controller.getUsers(null, 'defded');
      expect(getUsersUC.getByDocument).toBeCalled();
    });
    it('Obtener usuarios por edad', async () => {
      jest.spyOn(getUsersUC, 'getByAge').mockResolvedValueOnce(USERS_RESPONSE);
      await controller.getUsers(null, null, 12, 13);
      expect(getUsersUC.getByAge).toBeCalled();
    });
    it('Obtener usuario por documento', async () => {
      jest
        .spyOn(getUserUC, 'byDocument')
        .mockResolvedValueOnce(USERS_RESPONSE[0]);
      await controller.getUsers(0, 'DFDFD');
      expect(getUserUC.byDocument).toBeCalled();
    });
  });
  describe('Crear Usuario', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(addUserUC, 'execute').mockResolvedValueOnce(USERS_RESPONSE[0]);
      await controller.createUser(USERS[0], FILE);
      expect(addUserUC.execute).toBeCalled();
    });
  });
  describe('Actualizar Usuario', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(updateUserUC, 'exec').mockResolvedValueOnce('sucess');
      await controller.updateUser(12, USERS[0]);
      expect(updateUserUC.exec).toBeCalled();
    });
  });
  describe('Eliminar Usuario', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(deleteUserUC, 'exec').mockResolvedValueOnce();
      await controller.deleteUser('dfdefd');
      expect(deleteUserUC.exec).toBeCalled();
    });
  });
});
