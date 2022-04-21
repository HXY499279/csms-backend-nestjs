import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus?.() || 500;

        const rst = {
            code: status,
            msg: exception.message,
        }

        console.error('response has an error!')
        console.log(`${status} ${JSON.stringify(rst)}`);

        response
            .status(status)
            .json({
                code: status,
                msg: exception?.response?.message?.toString() || exception.message,
            });
    }
}