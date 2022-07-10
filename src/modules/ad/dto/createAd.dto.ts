import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdDto {
  @ApiProperty({ description: '文件', example: '' })
  file?: any;

  @ApiProperty({ description: '广告公司名', example: '长城' })
  @IsNotEmpty({ message: '请输入公司名' })
  @IsString()
  adCompany: string;

  @ApiProperty({ description: '广告名称', example: '干红葡萄酒' })
  @IsNotEmpty({ message: '请输入广告名称' })
  @IsString()
  adName: string;

  @ApiProperty({ description: '广告分类', example: '酒' })
  @IsNotEmpty({ message: '请输入广告分类' })
  @IsString()
  adCategory: string;
}

export class SaveCreateAdDto {
  file: any;

  adCompany: string;

  adName: string;

  adCategory: string;

  picMimetype: string;
}
