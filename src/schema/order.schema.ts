import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

const commodityItem = {
  commodity: {
    type: Types.ObjectId,
    ref: 'commodity',
  },
  count: {
    type: Number,
    required: [true, '未输入订单单个商品的数量'],
  },
};

@Schema()
export class Order extends Document {
  @Prop({
    required: true,
    ref: 'user',
  })
  user: Types.ObjectId;

  @Prop({
    required: true,
    minlength: 1,
  })
  commodityDetails: typeof commodityItem[];

  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  totalPrice: number;

  @Prop({
    required: true,
  })
  time: Date;

  @Prop({
    required: true,
    default: '',
  })
  remarks: string;

  @Prop({
    required: true,
    default: '',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
