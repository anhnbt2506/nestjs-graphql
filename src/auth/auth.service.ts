import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateUserInput } from 'src/user/dto/user.req';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './dto/auth.req';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserInput) {
    let user = null;
    try {
      user = await this.userService.create(userDto);
    } catch (err) {
      throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
    }
    return !!user;
  }

  async login(loginUserDto: LoginUserInput) {
    const user = await this.userService.findByLogin(loginUserDto);

    const token = this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  private _createToken({ email, role }: UserDto): any {
    const user = { email, role };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  async validateUser(payload: any) {
    const user = await this.userService.findByPayload(payload);
    console.log('hehe');
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
