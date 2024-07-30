import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLoggerService } from '../logger/logger.service';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  constructor(private readonly logger: WinstonLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (e) {
      this.logger.error(`Ошибка: ${e.message}`);
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
