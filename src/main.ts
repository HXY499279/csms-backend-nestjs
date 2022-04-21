import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from '@/config';
import { ValidationPipe } from '@nestjs/common'
import { HttpJsonInterceptor, HttpLogInterceptor } from './interceptor'
import { ErrorExceptionFilter } from '@/filter'

async function bootstrap() {
  const { http: httpConfig } = configuration()
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new HttpLogInterceptor(), new HttpJsonInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );

  app.useGlobalFilters(new ErrorExceptionFilter())
  app.setGlobalPrefix('api');

  await app.listen(httpConfig.port);
}
bootstrap();
