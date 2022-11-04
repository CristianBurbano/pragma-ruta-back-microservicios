import { Module, Provider } from '@nestjs/common';
import { ImagesModule } from 'src/Images/images.module';
import { addImageUseCases } from 'src/Images/usecases/addImage.usecases';
import { deleteImageUseCases } from 'src/Images/usecases/deleteImage.usecases';
import { addUserUseCases } from 'src/Users/usecases/addUser.usecases';
import { deleteUserUseCases } from 'src/Users/usecases/deleteUser.usecases';
import { getUserUseCases } from 'src/Users/usecases/getUser.usecases';
import { getUsersUseCases } from 'src/Users/usecases/getUsers.usecases';
import { updateUserUseCases } from 'src/Users/usecases/updateUser.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepository } from '../repositories/userRepository.service';

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
