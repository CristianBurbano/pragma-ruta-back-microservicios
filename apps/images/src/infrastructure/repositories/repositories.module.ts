import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'environments/config';
import { Imagen } from '../entities/imagen.entity';
import { FileRepository } from './FileRepository.service';
import { ImageRepository } from './imageRepository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen], 'mongoConnection')],
  providers: [
    ImageRepository,
    FileRepository,
    {
      provide: 'awsConfig',
      inject: [config.KEY],
      useFactory: (conf: ConfigType<typeof config>) => conf.aws,
    },
  ],
  exports: [ImageRepository, FileRepository],
})
export class RepositoriesModule {}
