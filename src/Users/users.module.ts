import { Module } from '@nestjs/common';

import { UsersController } from 'src/Users/infrastructure/controllers/users.controller';
import { ConfigModule } from './infrastructure/config/config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UseCaseProxyModule } from './infrastructure/useCasesProxy/useCaseProxy.module';

@Module({
  imports: [ConfigModule, RepositoriesModule, UseCaseProxyModule],
  controllers: [UsersController],
  // providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}
