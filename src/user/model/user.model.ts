import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document, Schema as MongoSchema } from 'mongoose';
import { Role } from 'src/shared/enum';
import { hashString } from 'src/shared/utils';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id: MongoSchema.Types.ObjectId;

  @Field(() => String)
  @Prop(String)
  email: string;

  @Field(() => String)
  @Prop(String)
  name: string;

  @Field(() => String)
  @Prop(String)
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  @Prop(String)
  address: string;

  @Field(() => String)
  @Prop(String)
  password: string;

  @Field(() => String, { nullable: true })
  @Prop(String)
  avatar: string;

  @Field(() => Role)
  @Prop(String)
  role: Role;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (this: any, next) {
  this.password = hashString(this.password);
  return next();
});
