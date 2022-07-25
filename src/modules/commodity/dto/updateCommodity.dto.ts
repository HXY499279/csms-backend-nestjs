import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class SaveUpdateCommodityDto {
  @IsNotEmpty({ message: '请输入商品成本' })
  @IsNumber()
  cost: number;

  @IsNotEmpty({ message: '请输入商品现价' })
  @IsNumber()
  currentPrice: number;

  @IsNotEmpty({ message: '请输入商品库存' })
  @IsNumber()
  inventory: number;

  @IsNotEmpty({ message: '请输入商品警戒库存' })
  @IsNumber()
  danger_inventory: number;

  @IsNotEmpty({ message: '请输入售卖单位' })
  @IsString()
  sellingUnit: string;

  @IsNotEmpty({ message: '请输入商品库存状态' })
  @IsNumber()
  inventoryStatus: number;
}

export class UpdateCommodityDto {
  @ApiProperty({ description: '广告id', example: '' })
  @IsNotEmpty({ message: '请输入广告id' })
  @IsString()
  _id: string;

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

  @ApiProperty({ description: '售卖单位', example: '葡萄酒' })
  @IsNotEmpty({ message: '请输入售卖单位' })
  @IsString()
  sellingUnit: string;
}
