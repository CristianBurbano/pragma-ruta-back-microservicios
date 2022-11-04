import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from 'environments/config';
import { environtments, schema } from 'environments/environments';

import { UsersModule } from './Users/users.module';
import { ImagesModule } from './Images/images.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    ImagesModule,
    ConfigModule.forRoot({
      envFilePath:
        'environments/' + (environtments[process.env.NODE_ENV] || '.env'),
      load: [config],
      isGlobal: true,
      validationSchema: schema,
    }),
  ],
})
export class AppModule {}
