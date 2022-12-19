import { Field } from '@nestjs/graphql';

export class JwtPayload {
  @Field()
  email: string;

  @Field()
  name: string;
}
