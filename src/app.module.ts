import { Module } from '@nestjs/common';
import { ConverterModule } from './currencyConverter/converter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConverterModule,
    FileModule,
  ],
})
export class AppModule {}
