import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Persona } from '../../../infrastructure/entities/persona.entity';
import config from 'environments/config';

export const typeOrmOptions = (
  configService: ConfigType<typeof config>,
): TypeOrmModuleOptions => {
  const sql = configService.mysql;
  return {
    type: 'mysql',
    host: sql.host,
    port: parseInt(sql.port),
    username: sql.user,
    password: sql.password,
    database: 'pragma_ruta_back',
    entities: [Persona],
    synchronize: true,
  };
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: typeOrmOptions,
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeormModule {}
