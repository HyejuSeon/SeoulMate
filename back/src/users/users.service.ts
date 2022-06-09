import {
    ConflictException,
    Inject,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { saveUserDto } from './dto/save.user.dto';
import { Users } from './users.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { signIn } from './dto/signin.dto';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
    ) {}

    async create(userDto: insertUserDto): Promise<Users> {
        const findUser = await this.userRepository.findOne({
            where: { email: userDto.email },
        });

        // email은 고유해야 함
        if (findUser) {
            throw new ConflictException('User already exist');
        }
        // 사용자 등록 register
        const user_id = uuid();

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDto.password, salt);

        const newUser: saveUserDto = {
            user_id: user_id,
            name: userDto.name,
            email: userDto.email,
            password: hashedPassword,
        };
        const user = this.userRepository.save({ ...newUser });
        return user;
    }

    async logout(userId: string) {
        // logout 시 refresh tonen null로 저장
    }
}
