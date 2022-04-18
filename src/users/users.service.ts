import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ name, email, password }: CreateUserDto) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, passwordHash });
    return user.save();
  }
}
