import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('/converting')
export class ConverterController {
  constructor(private readonly currencyConverterService: ConverterService) {}
  @Get()
  converting(@Query('value') value: string) {
    if (!value || isNaN(Number(value))) {
      throw new BadRequestException('Параметр value некорректный');
    }

    return this.currencyConverterService.converting(value);
  }
}
