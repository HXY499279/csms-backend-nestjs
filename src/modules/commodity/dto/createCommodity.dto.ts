import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommodityDto {
  @ApiProperty({ description: '商品图片', example: '' })
  file?: any;

  @ApiProperty({ description: '商品成本', example: '12' })
  @IsNotEmpty({ message: '请输入商品成本' })
  @IsNumber()
  cost: number;

  @ApiProperty({ description: '商品现价', example: '20' })
  @IsNotEmpty({ message: '请输入商品现价' })
  @IsNumber()
  currentPrice: number;

  @ApiProperty({ description: '商品库存', example: '200' })
  @IsNotEmpty({ message: '请输入商品库存' })
  @IsNumber()
  inventory: number;

  @ApiProperty({ description: '商品警戒库存', example: '20' })
  @IsNotEmpty({ message: '请输入商品警戒库存' })
  @IsNumber()
  danger_inventory: number;

  @ApiProperty({ description: '商品名称', example: '葡萄酒' })
  @IsNotEmpty({ message: '请输入商品名称' })
  @IsString()
  commodityName: string;

  @ApiProperty({ description: '售卖单位', example: '葡萄酒' })
  @IsNotEmpty({ message: '请输入售卖单位' })
  @IsString()
  sellingUnit: string;

  @ApiProperty({ description: '商品分类id', example: '' })
  @IsNotEmpty({ message: '请输入商品分类id' })
  @IsString()
  category_id: string;
}

export class SaveCreateCommodityDto {
  file: any;
  picMimetype: string;
  cost: number;
  currentPrice: number;
  inventory: number;
  danger_inventory: number;
  commodityName: string;
  sellingUnit: string;
  category_id: Types.ObjectId;
}
