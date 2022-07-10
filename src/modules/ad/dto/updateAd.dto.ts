import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdDto {
  @ApiProperty({ description: '广告id', example: '' })
  @IsNotEmpty({ message: '请输入广告id' })
  @IsString()
  _id: string;

  @ApiProperty({ description: '文件', example: '' })
  file?: any;
}

export class SaveUpdateAdDto {
  file: any;
  _id: string;
  picMimetype: string;
}
