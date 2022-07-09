import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    default: '内容',
  })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
