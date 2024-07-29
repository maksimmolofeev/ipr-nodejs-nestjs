import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Get('/image')
  getImage(@Res() res: Response, @Query('name') name: string) {
    return this.fileService.getImage(res, name);
  }
}
