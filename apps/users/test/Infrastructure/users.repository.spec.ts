import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from '../../src/infrastructure/repositories/userRepository.service';
import { Persona } from '../../src/infrastructure/entities/persona.entity';

describe('Servicio de Repositorio de Usuarios', () => {
  let service: UserRepository;
  let userRepository: Repository<Persona>;
  const PERSONA_REPOSITORY_TOKEN = getRepositoryToken(Persona);
  // const imageMock: CreateImageDto = {
  //   file:
  // };
  const personaEntityMock: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PERSONA_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserRepository>(UserRepository);
    userRepository = module.get<Repository<Persona>>(PERSONA_REPOSITORY_TOKEN);
  });

  it('Repositorio debería estar definido', () => {
    expect(service).toBeDefined();
  });
  describe('Crear Usuario', () => {
    it('debería llamar al metodo create del repositorio', async () => {
      // jest.spyOn(imageRepository, 'create').mockReturnValueOnce(mockPersona[0]);
      service.createUser(personaEntityMock);
      expect(userRepository.create).toBeCalledWith(personaEntityMock);
    });
  });
  describe('Eliminar Usuario', () => {
    it('debería llamar al metodo eliminar del repositorio', async () => {
      const persona = plainToInstance(Persona, personaEntityMock);
      jest
        .spyOn(service, 'getUserById')
        .mockResolvedValueOnce(personaEntityMock);
      await service.deleteUser(12);
      expect(userRepository.delete).toBeCalledWith(12);
    });
  });
  describe('Modificar Usuario', () => {
    it('debería llamar al metodo merge y al metodo save del repositorio', async () => {
      jest
        .spyOn(service, 'getUserById')
        .mockResolvedValueOnce(personaEntityMock);
      await service.updateUser(12, personaEntityMock);
      // expect(imageRepository.merge).toBeCalledWith(persona, mockPersona[0]);
      expect(userRepository.merge).toBeCalledWith(
        personaEntityMock,
        personaEntityMock,
      );
      expect(userRepository.save).toHaveBeenCalledWith(personaEntityMock);
    });
  });
  describe('Obtener Usuario', () => {
    it('getUsers debería llamar a find', async () => {
      jest
        .spyOn(userRepository, 'find')
        .mockResolvedValueOnce([personaEntityMock]);
      const result = await service.getUsers();

      expect(userRepository.find).toBeCalled();
      expect(result).toHaveLength(1);
    });
  });
});
