import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Get('/image/:name')
  getImage(@Res() res: Response, @Param('name') name: string) {
    if (!name) {
      throw new BadRequestException('Параметр name отсутствует');
    }

    return this.fileService.getImage(res, name);
  }
}
