import { HttpException, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { WinstonLoggerService } from '../logger/logger.service';

@Injectable()
export class FileService {
  constructor(private readonly logger: WinstonLoggerService) {}
  async getImage(@Res() res: Response, name: string) {
    this.logger.log('start getImage');
    try {
      const imagePath = path.resolve(__dirname, '..', 'static', `${name}`);
      res.sendFile(imagePath);
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, 500);
    }
  }
}
