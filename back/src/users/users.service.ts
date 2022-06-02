import { Inject, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(userDto: createUserDto): Promise<void> {
    this.userRepository.create({ ...userDto });
  }
}
