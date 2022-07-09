import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { LoginAdminDto, RegisterAdminDto } from './dto';
import { AuthService } from '@/modules/auth/auth.service';
import { AdminToken } from '@/const';

@Controller('admin')
// 配置该类资源接口的标签
@ApiTags('管理员')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Post('login')
  // 配置接口功能说明
  @ApiOperation({
    summary: '管理员登陆',
  })
  async login(@Body() admindto: LoginAdminDto) {
    const existAdmin = await this.adminService.check(admindto.adminaccount);
    if (existAdmin) {
      const adminToken: AdminToken = {
        _id: existAdmin._id,
        adminaccount: existAdmin.adminaccount,
        name: existAdmin.name,
      };
      return {
        token: this.authService.createToken(adminToken),
      };
    } else {
      throw new HttpException('用户名不存在或密码错误', 401);
    }
  }

  @Post('register')
  @ApiOperation({
    summary: '管理员注册',
  })
  async register(@Body() admindto: RegisterAdminDto) {
    const isRegistered = await this.adminService.check(admindto.adminaccount);
    if (isRegistered) {
      throw new HttpException('该账号已被注册', 500);
    }
    this.adminService.create(admindto);
    return {
      msg: '注册管理员成功',
    };
  }
}
