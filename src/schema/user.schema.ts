import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  useraccount: string;

  @Prop({
    required: true,
  })
  userpwd: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
