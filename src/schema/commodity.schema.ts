import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommodityDocument = Commodity & Document;

@Schema()
export class Commodity extends Document {
  @Prop({
    required: [true, '未选择商品分类'],
    ref: 'category',
  })
  category_id: Types.ObjectId;

  @Prop({
    required: true,
    minlength: 1,
  })
  commodityName: string;

  @Prop({
    required: true,
  })
  sellingUnit: string;

  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  cost: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  currentPrice: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  inventory: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  danger_inventory: number;

  @Prop({
    required: true,
    default: 1,
    max: 1,
    min: 0,
  })
  inventoryStatus: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  salesVolume: number;

  @Prop({
    required: true,
  })
  file: Buffer;

  @Prop({
    required: true,
  })
  picMimetype: string;

  @Prop({
    required: true,
    default: 1,
    min: 1,
    max: 4,
  })
  popularity: number;
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity);
