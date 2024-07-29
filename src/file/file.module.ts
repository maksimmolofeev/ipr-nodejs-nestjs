import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { WinstonLoggerService } from '../logger/logger.service';

@Module({
  controllers: [FileController],
  providers: [WinstonLoggerService, FileService],
})
export class FileModule {}
