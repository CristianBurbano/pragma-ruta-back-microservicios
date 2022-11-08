import { Module } from '@nestjs/common';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [ExceptionsModule, LoggerModule],
})
export class CommonModule {}
