import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserInput } from 'src/auth/dto/auth.req';
import { comparePasswords } from 'src/shared/utils';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  getUsers() {
    return this.userModel.find();
  }

  async create(createInput: any) {
    const user = await this.userModel.findOne({ email: createInput.email });

    if (user) {
      throw new HttpException('User already existed', HttpStatus.CONFLICT);
    }

    return this.userModel.create(createInput);
  }

  async findByLogin({ email, password }: LoginUserInput): Promise<UserDto> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  findByPayload({ email }: any) {
    return this.userModel.find({ email: email });
  }
}
