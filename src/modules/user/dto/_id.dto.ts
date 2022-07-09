import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class _IdDto {
  @ApiProperty({ description: '用户id', example: '62c515a48b7466d933af8e3b' })
  @IsNotEmpty({ message: '请填写用户id' })
  @IsString()
  _id: string;
}
