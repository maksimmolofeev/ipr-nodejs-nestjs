import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConverterModule } from './currencyConverter/converter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileModule } from './file/file.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { ErrorMiddleware } from './middlewares/error.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConverterModule,
    FileModule,
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, ErrorMiddleware).forRoutes('*');
  }
}
