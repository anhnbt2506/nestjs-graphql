import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/shared/enum';
import { CreateUserInput } from '../dto/user.req';
import { User } from '../model/user.model';

import { UserService } from '../user.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'getUser', nullable: true })
  async getUser(): Promise<User[]> {
    console.log(process.env.SECRET_KEY);
    return await this.userService.getUsers();
  }

  @Mutation(() => Boolean, { name: 'createUser', nullable: true })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<boolean> {
    console.log('here');
    return !!(await this.userService.create(createUserInput));
  }
}
