import { Field } from '@nestjs/graphql';
import { Role } from 'src/shared/enum';

export class UserDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Role)
  role: Role;
}
