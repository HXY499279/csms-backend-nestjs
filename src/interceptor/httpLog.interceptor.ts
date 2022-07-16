import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { TIME_FORMAT_STRING } from '@/const';
import { Response } from 'express';

@Injectable()
export class HttpLogInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = dayjs().format(TIME_FORMAT_STRING);
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;

    console.log(`request: [${method}] ${url} ${now} ${request?.body}`);

    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse<Response>();
        const now = dayjs().format(TIME_FORMAT_STRING);
        console.log(
          `response:${response.statusCode} [${method}] ${url} ${now}`,
        );
      }),
    );
  }
}
