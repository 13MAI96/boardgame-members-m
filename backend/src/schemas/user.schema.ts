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

  createdAt?: Date;
  updatedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);