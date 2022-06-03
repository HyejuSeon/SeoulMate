import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { saveUserDto } from './dto/save.user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async create(userDto: insertUserDto): Promise<User> {
        try {
            const newUser: saveUserDto = {
                user_id: userDto.user_id,
                name: userDto.name,
                email: userDto.email,
                password: userDto.password,
                profile_image: '',
                rank: 0,
                exp: 0,
            };
            const user = this.userRepository.save({ ...newUser });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}
