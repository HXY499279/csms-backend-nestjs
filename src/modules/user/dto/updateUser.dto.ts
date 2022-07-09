import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户id', example: '62c515a48b7466d933af8e3b' })
  @IsNotEmpty({ message: '请填写用户id' })
  _id: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '请填写用户密码' })
  @IsString()
  modifiedpassword: string;

  // @ApiProperty({ description: '描述', example: '哈哈哈' })
  // @IsString()
  // @IsOptional()
  // name?: string;

  
  // @IsString()
  // @IsOptional()
  // gender?: string;

  // @IsString()
  // @IsOptional()
  // address?: string;

  // @IsString()
  // @IsPhoneNumber()
  // @IsOptional()
  // phone?: string;
}
