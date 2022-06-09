import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { Users } from './users.entity';
import { signIn } from './dto/signin.dto';
import { JwtService } from 'src/auth/jwt.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly authService: AuthService,
    ) {}

    async create(userDto: insertUserDto): Promise<Users> {
        // 사용자 등록
        const newUser = await this.authService.register(userDto);
        const user = this.userRepository.save(newUser);
        return user;
    }

    async logout(userId: string) {
        // logout 시 refresh tonen null로 저장
    }

    async getAllUsers(): Promise<Users[]> {
        const users = await this.userRepository.find({});
        return users;
    }
}
