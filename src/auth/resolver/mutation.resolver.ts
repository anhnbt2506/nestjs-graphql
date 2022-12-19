import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginUserInput } from '../dto/auth.req';
import { LoginRes } from '../dto/auth.res';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginRes, { name: 'login' })
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginRes> {
    return await this.authService.login(loginUserInput);
  }
}
