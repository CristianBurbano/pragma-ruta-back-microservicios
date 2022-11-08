import { Module, Provider } from '@nestjs/common';
import { addImageUseCases } from '../../usecases/addImage.usecases';
import { deleteImageUseCases } from '../../usecases/deleteImage.usecases';
import { getImagesUseCases } from '../../usecases/getImage.usecases';
import { updateImageUseCases } from '../../usecases/updateImage.usecases';
import { FileRepository } from '../repositories/FileRepository.service';
import { ImageRepository } from '../repositories/imageRepository.service';
import { RepositoriesModule } from '../repositories/repositories.module';

const injectables = [
  {
    provide: addImageUseCases,
    inject: [ImageRepository, FileRepository],
    use: (...args: [ImageRepository, FileRepository]) =>
      new addImageUseCases(...args),
  },
  {
    provide: updateImageUseCases,
    inject: [ImageRepository, FileRepository],
    use: (...args: [ImageRepository, FileRepository]) =>
      new updateImageUseCases(...args),
  },
  {
    provide: deleteImageUseCases,
    inject: [ImageRepository, FileRepository],
    use: (...args: [ImageRepository, FileRepository]) =>
      new deleteImageUseCases(...args),
  },
  {
    provide: getImagesUseCases,
    inject: [ImageRepository, FileRepository],
    use: (...args: [ImageRepository]) => new getImagesUseCases(...args),
  },
];

@Module({
  imports: [RepositoriesModule],
  providers: injectables.map(
    (p) =>
      ({
        provide: p.provide,
        inject: p.inject,
        useFactory: p.use,
      } as Provider),
  ),
  exports: injectables.map((p: any) => p.provide),
})
export class UseCaseProxyModule {}
