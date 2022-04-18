import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login({ email, password }: CreateAuthDto, res: Response) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
      return;
    }

    const token = sign(
      {
        email,
        name: user.name,
      },
      process.env.SECRET_KEY,
      {
        subject: email,
        expiresIn: '1d',
      },
    );

    res.json({ token });
  }
}
