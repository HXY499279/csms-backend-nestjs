/* 
  该类错误属于用户操作上的错误，比如新建了已经存在的数据以及删除不该删除的数据
*/
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserOperationException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
