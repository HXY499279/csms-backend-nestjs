import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { QueryCommodityDto, QueryCommodityStrictDto } from './index';

export class QueryCommodityByPageDto extends QueryCommodityDto {
  @ApiProperty({ description: '当前页', example: '1' })
  @IsNotEmpty({ message: '请输入当前页' })
  @IsNumberString()
  count: string;

  @ApiProperty({ description: '每页数据量', example: '6' })
  @IsNotEmpty({ message: '请输入每页数据量' })
  @IsNumberString()
  pageSize: string;
}

export class QueryCommodityByPageStrictDto extends QueryCommodityStrictDto {
  @ApiProperty({ description: '当前页', example: '1' })
  @IsNotEmpty({ message: '请输入当前页' })
  @IsNumberString()
  count: string;

  @ApiProperty({ description: '每页数据量', example: '6' })
  @IsNotEmpty({ message: '请输入每页数据量' })
  @IsNumberString()
  pageSize: string;
}
