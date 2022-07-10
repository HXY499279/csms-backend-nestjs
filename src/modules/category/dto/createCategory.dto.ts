import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: '商品分类名',
    example: '饮料',
  })
  @IsNotEmpty({ message: '请填写商品分类名' })
  categoryName: string;

  @ApiProperty({ description: '当前已经获取的商品分类总数', example: '123456' })
  @IsNotEmpty({ message: '请填写当前已经获取的商品分类总数' })
  curTotal: number | string;
}
