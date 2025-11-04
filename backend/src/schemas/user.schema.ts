import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({ required: true })
  sub: string;

  @Prop({ required: true})
  name: string

  @Prop({ required: true})
  role: string

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop({ required: true})
  telegram_user: string

  @Prop({default: false, required: false})
  has_location_opened: boolean

  createdAt?: Date;
  updatedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);