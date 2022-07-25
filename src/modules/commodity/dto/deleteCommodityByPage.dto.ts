import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class DeleteCommodityByPageDto {
  @ApiProperty({ description: '商品id' })
  @IsNotEmpty({ message: '请输入商品id' })
  @IsString()
  _id: string;

  @ApiProperty({ description: '商品分类id' })
  @IsNotEmpty({ message: '请输入商品分类id' })
  @IsString()
  category_id: string;

  @ApiProperty({ description: '已获取数据总量', example: '12' })
  @IsNotEmpty({ message: '请输入已获取数据总量' })
  @IsNumberString()
  curTotal: string;
}
