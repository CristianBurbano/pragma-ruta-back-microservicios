import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import config from 'environments/config';
import { Imagen } from '../../entities/imagen.entity';

export const typeOrmOptions = (
  configService: ConfigType<typeof config>,
): TypeOrmModuleOptions => {
  const mongo = configService.mongo;
  return {
    type: 'mongodb',
    database: 'pragma_ruta_back_mongo',
    host: mongo.host,
    url: `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/`,
    port: parseInt(mongo.port),
    password: mongo.password,
    username: mongo.user,
    authSource: 'admin',
    entities: [Imagen],
    synchronize: true,
    useUnifiedTopology: true,
  };
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      name: 'mongoConnection',
      useFactory: typeOrmOptions,
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeormModule {}
