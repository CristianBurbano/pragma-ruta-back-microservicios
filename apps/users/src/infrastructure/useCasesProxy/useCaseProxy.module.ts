import { Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { addUserUseCases } from '../../usecases/addUser.usecases';
import { deleteUserUseCases } from '../../usecases/deleteUser.usecases';
import { consultUserUseCases } from '../../usecases/consultUser.usecases';
import { getUsersUseCases } from '../../usecases/getUsers.usecases';
import { updateUserUseCases } from '../../usecases/updateUser.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepository } from '../repositories/userRepository.service';

import { ImageService } from '../services/image.service';

const injectables = [
  {
    provide: addUserUseCases,
    inject: [UserRepository, ImageService],
    use: (...args: [UserRepository, ImageService]) =>
      new addUserUseCases(...args),
  },
  {
    provide: updateUserUseCases,
    inject: [UserRepository],
    use: (...args: [UserRepository]) => new updateUserUseCases(...args),
  },
  {
    provide: deleteUserUseCases,
    inject: [UserRepository, ImageService],
    use: (...args: [UserRepository, ImageService]) =>
      new deleteUserUseCases(...args),
  },
  {
    provide: consultUserUseCases,
    inject: [UserRepository, ImageService],
    use: (...args: [UserRepository, ImageService]) =>
      new consultUserUseCases(...args),
  },
  {
    provide: getUsersUseCases,
    inject: [UserRepository],
    use: (...args: [UserRepository]) => new getUsersUseCases(...args),
  },
];

@Module({
  imports: [
    RepositoriesModule,
    HttpModule,
    ClientsModule.register([
      { name: 'IMAGE_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [
    ...injectables.map(
      (p) =>
        ({
          provide: p.provide,
          inject: p.inject,
          useFactory: p.use,
        } as Provider),
    ),
    ImageService,
  ],
  exports: injectables.map((p: any) => p.provide),
})
export class UseCaseProxyModule {}
