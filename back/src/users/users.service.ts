import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async create(userDto: createUserDto): Promise<User> {
        try {
            const user = this.userRepository.create({ ...userDto });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}
