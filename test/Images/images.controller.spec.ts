import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from '../../src/Images/infrastructure/controllers/images.controller';
import { addImageUseCases } from '../../src/Images/usecases/addImage.usecases';
import { updateImageUseCases } from '../../src/Images/usecases/updateImage.usecases';
import { deleteImageUseCases } from '../../src/Images/usecases/deleteImage.usecases';
import { getImagesUseCases } from '../../src/Images/usecases/getImage.usecases';
import { FILE, IMAGEMOCK } from '../../mocks/images';

describe('ImagesController', () => {
  let controller: ImagesController;
  let getImageUC: getImagesUseCases;
  let addImageUC: addImageUseCases;
  let updateImageUC: updateImageUseCases;
  let deleteImageUC: deleteImageUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: addImageUseCases,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: updateImageUseCases,
          useValue: {
            exec: jest.fn(),
          },
        },
        {
          provide: deleteImageUseCases,
          useValue: {
            exec: jest.fn(),
          },
        },
        {
          provide: getImagesUseCases,
          useValue: {
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    getImageUC = module.get<getImagesUseCases>(getImagesUseCases);
    addImageUC = module.get<addImageUseCases>(addImageUseCases);
    updateImageUC = module.get<updateImageUseCases>(updateImageUseCases);
    deleteImageUC = module.get<deleteImageUseCases>(deleteImageUseCases);
  });

  it('El controlador debería ser definido', () => {
    expect(controller).toBeDefined();
  });
  describe('Obtener Imagenes', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(getImageUC, 'exec').mockResolvedValueOnce([IMAGEMOCK]);
      await controller.getImages();
      expect(getImageUC.exec).toBeCalled();
    });
  });
  describe('Crear Imagen', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(addImageUC, 'execute').mockResolvedValueOnce(IMAGEMOCK);
      await controller.createImage(FILE);
      expect(addImageUC.execute).toBeCalled();
    });
  });
  describe('Actualizar Imagen', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(updateImageUC, 'exec').mockResolvedValueOnce();
      await controller.updateImage('dfdefd', FILE);
      expect(updateImageUC.exec).toBeCalled();
    });
  });
  describe('Eliminar Imagen', () => {
    it('llamado del caso de uso correcto', async () => {
      jest.spyOn(deleteImageUC, 'exec').mockResolvedValueOnce();
      await controller.deleteImage('dfdefd');
      expect(deleteImageUC.exec).toBeCalled();
    });
  });
});
