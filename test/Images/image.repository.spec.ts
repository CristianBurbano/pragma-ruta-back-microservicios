import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

import { ImageRepository } from '../../src/Images/infrastructure/repositories/imageRepository.service';
import { Imagen } from '../../src/Images/infrastructure/entities/imagen.entity';

describe('Servicio de Repositorio de Imagen', () => {
  let service: ImageRepository;
  let imageRepository: Repository<Imagen>;
  const IMAGE_REPOSITORY_TOKEN = getRepositoryToken(Imagen, 'mongoConnection');
  // const imageMock: CreateImageDto = {
  //   file:
  // };
  const imageEntityMock: any = {
    _id: new ObjectID('6356f1ee95fdf04a2420c90e'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageRepository,
        {
          provide: IMAGE_REPOSITORY_TOKEN,
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

    service = module.get<ImageRepository>(ImageRepository);
    imageRepository = module.get<Repository<Imagen>>(IMAGE_REPOSITORY_TOKEN);
  });

  it('Repositorio debería estar definido', () => {
    expect(service).toBeDefined();
  });
  describe('Crear Imagen', () => {
    it('debería llamar al metodo create del repositorio', async () => {
      // jest.spyOn(imageRepository, 'create').mockReturnValueOnce(mockPersona[0]);
      service.create(imageEntityMock);
      expect(imageRepository.create).toBeCalledWith(imageEntityMock);
    });
  });
  describe('Eliminar Imagen', () => {
    it('debería llamar al metodo eliminar del repositorio', async () => {
      const imagen = plainToInstance(Imagen, imageEntityMock);
      jest.spyOn<any, any>(service, 'findEntity').mockResolvedValueOnce(imagen);
      await service.delete('6356f1ee95fdf04a2420c90e');
      expect(imageRepository.delete).toBeCalledWith(imagen);
    });
  });
  describe('Modificar Imagen', () => {
    it('debería llamar al metodo merge y al metodo save del repositorio', async () => {
      const imagen = plainToInstance(Imagen, imageEntityMock);
      jest.spyOn<any, any>(service, 'findEntity').mockResolvedValueOnce(imagen);
      await service.update('6356f1ee95fdf04a2420c90e', imageEntityMock);
      // expect(imageRepository.merge).toBeCalledWith(persona, mockPersona[0]);
      expect(imageRepository.merge).toBeCalledWith(
        imageEntityMock,
        imageEntityMock,
      );
      expect(imageRepository.save).toHaveBeenCalledWith(imageEntityMock);
    });
  });
  describe('Obtener Imagenes', () => {
    it('Findentity debería retornar una entidad', async () => {
      jest
        .spyOn(imageRepository, 'findOne')
        .mockResolvedValueOnce(imageEntityMock);
      const result = await (service as any).findEntity(
        '6356f1ee95fdf04a2420c90e',
      );
      expect(imageRepository.findOne).toBeCalled();
      expect(result).toBe(imageEntityMock);
    });
    it('Findentity debería lanzar un error NotFound', async () => {
      jest.spyOn(imageRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        const result = await (service as any).findEntity(
          '6356f1ee95fdf04a2420c90e',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
