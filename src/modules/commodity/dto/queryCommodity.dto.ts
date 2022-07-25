import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class QueryCommodityStrictDto {
  @ApiProperty({
    description: '商品分类id',
    required: false,
    type: 'string',
  })
  @IsOptional()
  category_id?: Types.ObjectId;

  @ApiProperty({
    description: '商品名',
    required: false,
    type: 'string',
  })
  @IsOptional()
  commodityName?: RegExp;

  @ApiProperty({ description: '商品状态', required: false })
  @IsOptional()
  inventoryStatus?: number;

  @ApiProperty({ description: '商品欢迎程度', required: false })
  @IsOptional()
  popularity?: number;
}

export class QueryCommodityDto {
  @ApiProperty({
    description: '商品分类id',
    required: false,
  })
  @IsOptional()
  category_id?: string;

  @ApiProperty({
    description: '商品名',
    required: false,
  })
  @IsOptional()
  commodityName?: string;

  @ApiProperty({ description: '商品状态', required: false })
  @IsOptional()
  inventoryStatus?: number;

  @ApiProperty({ description: '商品欢迎程度', required: false })
  @IsOptional()
  popularity?: number;
}
