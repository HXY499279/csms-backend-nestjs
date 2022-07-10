import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetCategoryDto {
  @ApiProperty({ description: '当前页码', example: '1' })
  @IsNotEmpty({ message: '请填写当前页码' })
  @IsNumberString()
  count: string;

  @ApiProperty({ description: '每页数据条数', example: '6' })
  @IsNotEmpty({ message: '请填写每页数据条数' })
  @IsNumberString()
  pageSize: string;
}
