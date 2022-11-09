import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from 'apps/common/src/infrastructure/config/app.config';
import { ImagesModule } from './images.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ImagesModule,
    {
      transport: Transport.TCP,
    },
  );

  // appConfig(app);

  // const config = new DocumentBuilder()
  //   .setTitle('API PRAGMA MICROSERVICIO IMAGENES')
  //   .setDescription(
  //     'Documentación del API rest como ejercicio de ruta de aprendizaje Pragma Back End',
  //   )
  //   .setVersion('1.0')

  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('', app, document);
  await app.listen();
}
bootstrap();
