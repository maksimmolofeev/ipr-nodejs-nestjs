import { HttpException, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class FileService {
  async getImage(@Res() res: Response, name: string) {
    try {
      const imagePath = path.resolve(__dirname, '..', 'static', `${name}`);
      res.sendFile(imagePath);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
