import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GetUserDto, _IdDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
// 配置该类资源接口的标签
@ApiTags('用户')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all-users/:current/:pageSize')
  // 配置接口功能说明
  @ApiOperation({
    summary: '分页获取用户列表',
  })
  async getUser(@Param() params: GetUserDto) {
    const { current, pageSize } = params;
    const total = await this.userService.getUsersCount();
    const users = await this.userService.findAll({ current, pageSize });
    return { users, total };
  }

  @Get('/user/:_id')
  @ApiOperation({
    summary: '根据用户id获取单个用户',
  })
  async getOneUser(@Param() params: _IdDto) {
    const user = await this.userService.findOne(params);
    return (
      { user, msg: '获取用户成功' } || {
        msg: '用户不存在',
      }
    );
  }

  @Put('/user')
  @ApiOperation({
    summary: '修改某个用户的密码',
  })
  async updateUserPwd(@Body() data: UpdateUserDto) {
    this.userService.updateUserPwd(data);
    return {
      msg: '修改密码成功',
    };
  }

  @Delete('/user/:_id')
  @ApiOperation({
    summary: '删除某个用户',
  })
  async deleteUser(@Param() params: _IdDto) {
    this.userService.deleteUser(params);
    return {
      msg: '删除用户成功',
    };
  }
}
