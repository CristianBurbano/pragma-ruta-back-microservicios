import { Module } from '@nestjs/common';

import { UsersController } from './infrastructure/controllers/users.controller';
import { ConfigModule as PersonalConfigModule } from './infrastructure/config/config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UseCaseProxyModule } from './infrastructure/useCasesProxy/useCaseProxy.module';
import { CommonModule } from 'apps/common/src/common.module';
import { ConfigModule } from '@nestjs/config';
import { environtments, schema } from 'environments/environments';
import config from 'environments/config';

@Module({
  imports: [
    PersonalConfigModule,
    RepositoriesModule,
    UseCaseProxyModule,
    CommonModule,
    ConfigModule.forRoot({
      envFilePath:
        'environments/' + (environtments[process.env.NODE_ENV] || '.env'),
      load: [config],
      isGlobal: true,
      validationSchema: schema,
    }),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
