import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAdminDto {
  @ApiProperty({ description: '昵称', example: '爱学习的我' })
  @IsNotEmpty({ message: '请输入昵称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '账号', example: 'admin' })
  @IsNotEmpty({ message: '请输入账号' })
  @IsString()
  adminaccount: string;

  @ApiProperty({ description: '密码', example: 'admin' })
  @IsNotEmpty({ message: '请输入密码' })
  @IsString()
  adminpwd: string;
}
