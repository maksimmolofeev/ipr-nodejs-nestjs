import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { WinstonLoggerService } from '../logger/logger.service';

@Injectable()
export class ConverterService {
  key: string = '442146bf6fe8b5738faaa8af0f182bd1';
  constructor(
    private readonly logger: WinstonLoggerService,
    private readonly HttpService: HttpService,
  ) {}

  async rubToUsd(value: string) {
    this.logger.log('start rubToUsd');
    try {
      const { data } = await firstValueFrom(
        this.HttpService.get<{
          status: string;
          message: 'rates';
          data: { USDRUB: string };
        }>(
          `https://currate.ru/api/?get=rates&pairs=USDRUB&key=${this.key}`,
        ).pipe(map((response) => response.data)),
      );

      return Number(data.USDRUB) * Number(value);
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, 500);
    }
  }
}
