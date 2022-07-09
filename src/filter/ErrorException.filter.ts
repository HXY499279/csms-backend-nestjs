import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';
import { TIME_FORMAT_STRING } from '@/const';

// 异常过滤器 对异常层拥有完全控制权
@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const method = request.method;
    const url = request.originalUrl;
    const now = dayjs().format(TIME_FORMAT_STRING);

    // 对错误采取操作
    const rst = {
      code: status,
      msg: exception.message,
    };

    console.error('response has an error!');
    console.log(`[${method}] ${url} ${now}`);
    console.log(`${status} ${JSON.stringify(rst)}`);

    // 自定义错误json返回给客户端
    response.status(status).json({
      code: status,
      msg: exception?.response?.message?.toString() || exception.message,
    });
  }
}
