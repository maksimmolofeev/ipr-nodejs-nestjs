import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { HttpModule } from '@nestjs/axios';
import { WinstonLoggerService } from '../logger/logger.service';

@Module({
  controllers: [ConverterController],
  providers: [WinstonLoggerService, ConverterService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class ConverterModule {}
