import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ description: '账号', example: 'hxy' })
  @IsNotEmpty({ message: '请输入账号' })
  @IsString()
  adminaccount: string;

  @ApiProperty({ description: '密码', example: 'hxy' })
  @IsNotEmpty({ message: '请输入密码' })
  @IsString()
  adminpwd: string;
}
