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
import { createReadStream } from 'fs';

@Injectable()
export class FileService {
  constructor(private readonly logger: WinstonLoggerService) {}
  async getImage(@Res() res: Response, name: string) {
    try {
      const imagePath = path.resolve(__dirname, '..', 'static', `${name}`);

      if (!fs.existsSync(imagePath)) {
        this.logger.error(`Файл не найден: ${imagePath}`);
        throw new NotFoundException('Файл не найден');
      }

      const stream = createReadStream(imagePath);
      stream.on('error', (err) => {
        this.logger.error(`Ошибка при отправке файла: ${err.message}`);
        throw new InternalServerErrorException('Ошибка при отправке файла');
      });

      stream.pipe(res);
    } catch (e) {
      this.logger.error(e.message);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
