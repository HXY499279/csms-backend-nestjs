import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteCategoryDto {
  @ApiProperty({
    description: '商品分类id',
    example: '62c515a48b7466d933af8e3b',
  })
  @IsNotEmpty({ message: '请填写商品分类id' })
  _id: string;

  @ApiProperty({ description: '当前已经获取的商品分类总数', example: '123456' })
  @IsNotEmpty({ message: '请填写当前已经获取的商品分类总数' })
  @IsNumberString()
  curTotal: string;
}
