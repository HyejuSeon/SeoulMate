import {
    ConflictException,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { compare, hash, genSalt } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { saveUserDto } from 'src/users/dto/save.user.dto';
import { insertUserDto } from 'src/users/dto/insert.user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
    ) {}

    async register(user: insertUserDto): Promise<saveUserDto> {
        // 사용자 등록 시 사용자 정보 생성
        const isExist = await this.userRepository.findOne({
            where: { email: user.email },
        });
        if (isExist) {
            throw new ConflictException('user already exist');
        }

        const user_id = uuid();

        const salt = await genSalt();
        const hashedPassword = await hash(user.password, salt);

        const newUser: saveUserDto = {
            user_id: user_id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
        };
        return newUser;
    }

    async validateUser(email: string, plainPassword: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            await this.verifyPassword(plainPassword, user.password);
            const { password, ...result } = user;
            return result;
        } catch (error) {
            throw new HttpException(
                '비밀번호가 다릅니다.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async verifyPassword(plainPassword: string, hashedPassword: string) {
        // 비밀번호 확인
        const isMached = await compare(plainPassword, hashedPassword);
        if (!isMached) {
            throw new HttpException(
                '비밀번호가 다릅니다.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        // refresh token db에 update
        const currentHashedRefreshToken = await hash(refreshToken, 10);
        const userInfo = await this.userRepository.findOneBy({
            user_id: userId,
        });
        userInfo.hashedRefreshToken = currentHashedRefreshToken;
        await this.userRepository.save(userInfo);
    }

    async getUserRefreshTokenMatches(refresh: string, userId: string) {
        const user = await this.userRepository.findOne({
            where: { user_id: userId },
        });
        const isMatches = await compare(refresh, user.hashedRefreshToken);

        if (isMatches) {
            return user;
        }
    }

    async removeRefreshToken(userId: string) {
        // user logout
        const userInfo = await this.userRepository.findOneBy({
            user_id: userId,
        });

        userInfo.hashedRefreshToken = null;
        await this.userRepository.save(userInfo);
    }
}
