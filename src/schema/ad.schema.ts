import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdDocument = Ad & Document;

@Schema()
export class Ad extends Document {
  @Prop({
    required: true,
  })
  adName: string;

  @Prop({
    required: true,
  })
  adCompany: string;

  @Prop({
    required: true,
  })
  adCategory: string;

  @Prop({
    required: true,
  })
  file: Buffer;

  @Prop({
    required: true,
  })
  picMimetype: string;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
