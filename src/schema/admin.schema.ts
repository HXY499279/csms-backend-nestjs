import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MinLength, MaxLength } from 'class-validator';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin extends Document {
  @Prop({
    required: true,
  })
  adminaccount: string;

  @Prop({
    required: true,
  })
  @MinLength(3, {
    message: '密码长度为3-20',
  })
  @MaxLength(20, {
    message: '密码长度为3-20',
  })
  adminpwd: string;

  @Prop({
    required: true,
  })
  name: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
