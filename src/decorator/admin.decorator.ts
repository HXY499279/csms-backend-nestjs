import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 自定义装饰器
export const Admin = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // 从请求中解析数据 当请求数据复杂时，可以使程序更简单
    return request.user;
  },
);
