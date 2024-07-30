import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { WinstonLoggerService } from '../logger/logger.service';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(private readonly logger: WinstonLoggerService) {}
  async getImage(@Res() res: Response, name: string) {
    this.logger.log('start getImage');
    try {
      const imagePath = path.resolve(__dirname, '..', 'static', `${name}`);

      if (!fs.existsSync(imagePath)) {
        this.logger.error(`File not found: ${imagePath}`);
        throw new NotFoundException('File not found');
      }

      res.sendFile(imagePath, (err) => {
        if (err) {
          this.logger.error(`Error sending file: ${err.message}`);
          throw new InternalServerErrorException('Error sending file');
        }
      });
    } catch (e) {
      this.logger.error(e.message);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
