import { Controller, Get, Query } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('/rubToUsd')
export class ConverterController {
  constructor(private readonly currencyConverterService: ConverterService) {}
  @Get()
  rubToUsd(@Query('value') value: string) {
    return this.currencyConverterService.rubToUsd(value);
  }
}
