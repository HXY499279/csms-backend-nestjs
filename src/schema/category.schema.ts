import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({
    required: true,
  })
  categoryName: string;

  @Prop({
    required: true,
    default: 0,
  })
  total: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
