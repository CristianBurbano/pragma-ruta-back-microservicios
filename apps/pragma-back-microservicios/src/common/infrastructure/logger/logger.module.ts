import { Module } from '@nestjs/common';
import { LoggerService } from './looger.service';

@Module({ providers: [LoggerService] })
export class LoggerModule {}
