import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from 'apps/common/src/infrastructure/config/app.config';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  appConfig(app);

  const config = new DocumentBuilder()
    .setTitle('API PRAGMA MICROSERVICIO USUARIOS')
    .setDescription(
      'Documentación del API rest como ejercicio de ruta de aprendizaje Pragma Back End',
    )
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
