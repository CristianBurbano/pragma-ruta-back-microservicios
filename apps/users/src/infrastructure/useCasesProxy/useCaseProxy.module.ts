import { Module, Provider } from '@nestjs/common';

import { addUserUseCases } from '../../usecases/addUser.usecases';
import { deleteUserUseCases } from '../../usecases/deleteUser.usecases';
import { getUserUseCases } from '../../usecases/getUser.usecases';
import { getUsersUseCases } from '../../usecases/getUsers.usecases';
import { updateUserUseCases } from '../../usecases/updateUser.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepository } from '../repositories/userRepository.service';

import { ImagesModule } from '../../../../images/src/images.module';
import { addImageUseCases } from '../../../../images/src/usecases/addImage.usecases';
import { deleteImageUseCases } from '../../../../images/src/usecases/deleteImage.usecases';

const injectables = [
  {
    provide: addUserUseCases,
    inject: [UserRepository, addImageUseCases],
    use: (...args: [UserRepository, addImageUseCases]) =>
      new addUserUseCases(...args),
  },
  {
    provide: updateUserUseCases,
    inject: [UserRepository],
    use: (...args: [UserRepository]) => new updateUserUseCases(...args),
  },
  {
    provide: deleteUserUseCases,
    inject: [UserRepository, deleteImageUseCases],
    use: (...args: [UserRepository, deleteImageUseCases]) =>
      new deleteUserUseCases(...args),
  },
  {
    provide: getUserUseCases,
    inject: [UserRepository],
    use: (...args: [UserRepository]) => new getUserUseCases(...args),
  },
  {
    provide: getUsersUseCases,
    inject: [UserRepository],
    use: (...args: [UserRepository]) => new getUsersUseCases(...args),
  },
];

@Module({
  imports: [RepositoriesModule, ImagesModule],
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
