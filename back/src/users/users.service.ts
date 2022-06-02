import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User,
  ) {}
}
