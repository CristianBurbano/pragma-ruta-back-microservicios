import { Module } from '@nestjs/common';
import { ImagesController } from './infrastructure/controllers/images.controller';
import { ConfigModule } from './infrastructure/config/config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UseCaseProxyModule } from './infrastructure/useCasesProxy/useCaseProxy.module';

@Module({
  imports: [ConfigModule, RepositoriesModule, UseCaseProxyModule],
  controllers: [ImagesController],
  exports: [UseCaseProxyModule],
})
export class ImagesModule {}
