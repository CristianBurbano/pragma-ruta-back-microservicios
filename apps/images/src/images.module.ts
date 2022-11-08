import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ImagesController } from './infrastructure/controllers/images.controller';
import { ConfigModule as PersonalConfig } from './infrastructure/config/config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UseCaseProxyModule } from './infrastructure/useCasesProxy/useCaseProxy.module';
import { environtments, schema } from 'environments/environments';
import config from 'environments/config';
import { CommonModule } from 'apps/common/src/common.module';

@Module({
  imports: [
    PersonalConfig,
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
  controllers: [ImagesController],
  exports: [UseCaseProxyModule],
})
export class ImagesModule {}
