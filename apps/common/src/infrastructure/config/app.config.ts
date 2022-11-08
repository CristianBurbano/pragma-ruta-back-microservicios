import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from '../filter/exception.filter';
import { LoggingInterceptor } from '../interceptors/logger.interceptors';
import { ResponseInterceptor } from '../interceptors/response.interceptors';
import { LoggerService } from '../logger/looger.service';
export function appConfig(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();
}
