import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const { data, status } = await firstValueFrom(
        this.HttpService.get<{
          status: string;
          message: 'rates';
          data: { USDRUB: string };
        }>(
          `https://currate.ru/api/?get=rates&pairs=USDRUB&key=${this.key}`,
        ).pipe(map((response) => response.data)),
      );

      if (status !== 'success' || !data.USDRUB) {
        this.logger.error('Ошибка API, при получении курса доллара');
        throw new InternalServerErrorException(
          'Не удалось получить курс доллара',
        );
      }

      return Number(data.USDRUB) * Number(value);
    } catch (e) {
      this.logger.error(e.message);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
