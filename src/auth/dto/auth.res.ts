import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginRes {
  @Field(() => String)
  email: string;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  expiresIn: string;
}
