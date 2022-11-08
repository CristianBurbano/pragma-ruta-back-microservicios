import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommonModule } from './common.module';
import { appConfig } from './infrastructure/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(CommonModule);
  appConfig(app);

  const config = new DocumentBuilder()
    .setTitle('API PRAGMA RUTA BACK END')
    .setDescription(
      'Documentación del API rest como ejercicio de ruta de aprendizaje Pragma Back End',
    )
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
