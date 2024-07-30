import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('/rubToUsd')
export class ConverterController {
  constructor(private readonly currencyConverterService: ConverterService) {}
  @Get()
  rubToUsd(@Query('value') value: string) {
    if (!value || isNaN(Number(value))) {
      throw new BadRequestException('Invalid value parameter');
    }

    return this.currencyConverterService.rubToUsd(value);
  }
}
