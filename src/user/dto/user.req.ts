import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Role } from 'src/shared/enum';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Role)
  role: Role;
}
