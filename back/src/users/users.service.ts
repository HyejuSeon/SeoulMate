import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { saveUserDto } from './dto/save.user.dto';
import { Users } from './users.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
    ) {}

    async create(userDto: insertUserDto): Promise<Users> {
        // 사용자 등록 register
        const user_id = uuid();
        const newUser: saveUserDto = {
            user_id: user_id,
            name: userDto.name,
            email: userDto.email,
            password: userDto.password,
        };
        const user = this.userRepository.save({ ...newUser });
        return user;
    }
}
