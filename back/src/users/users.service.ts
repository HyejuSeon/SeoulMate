import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { Users } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
import { currentUserInfo } from './dto/current-user.dto';

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

    async getCurrentUserInfo(id: string): Promise<currentUserInfo> {
        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });
        const { password, hashedRefreshToken, ...userInfo } = user;
        return userInfo;
    }
}
