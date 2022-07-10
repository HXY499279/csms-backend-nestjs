/* 
  该类错误属于用户授权上的错误，比如用户名或密码错误以及访问没有权限的接口
  访问没有权限的接口已经交给守卫授权处理
*/
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.UNAUTHORIZED);
  }
}
