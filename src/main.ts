import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from '@/config';
import { ValidationPipe } from '@nestjs/common';
// 引入swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpJsonInterceptor, HttpLogInterceptor } from './interceptor';
import { ErrorExceptionFilter } from '@/filter';

async function bootstrap() {
  const { http: httpConfig } = configuration();
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new HttpLogInterceptor(),
    new HttpJsonInterceptor(),
  );

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 一些生产环境倾向于禁用详细的错误
      disableErrorMessages: false,
      // 开启属性白名单，dto里面没有的属性会被剥离
      whitelist: true,
      // 出现白名单没有的属性时会停止处理请求并响应错误
      forbidNonWhitelisted: true,
    }),
  );

  // 全局异常过滤器
  app.useGlobalFilters(new ErrorExceptionFilter());

  // url前缀
  app.setGlobalPrefix('api');

  // 配置swagger基本信息
  const options = new DocumentBuilder()
    .setTitle('重邮云超市管理系统')
    .setDescription('designed by MISLab-HXY')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 配置访问swagger的url：http://localhost:3000/api-docs/
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(httpConfig.port);
}
bootstrap();
