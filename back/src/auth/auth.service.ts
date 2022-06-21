import {
    BadRequestException,
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

    async hashedPassword(password: string) {
        const salt = await genSalt();
        return await hash(password, salt);
    }

    async getUserHashedRefreshToken(userId: string) {
        // get user
        const user = this.userRepository.findOne({
            where: { user_id: userId },
        });
        return (await user).hashedRefreshToken;
    }

    async register(user: insertUserDto): Promise<saveUserDto> {
        // 사용자 등록 시 사용자 정보 생성
        const isExist = await this.userRepository.findOne({
            where: { email: user.email },
        });
        if (isExist) {
            throw new ConflictException('user already exist');
        }

        const user_id = uuid();

        const hashedPassword = await this.hashedPassword(user.password);

        const newUser = {
            user_id: user_id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            profile_image:
                'https://storage.googleapis.com/landmark_service_images/profile/gcs',
        };
        return newUser;
    }

    async validateUser(email: string, plainPassword: string) {
        // 로그인
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            await this.verifyPassword(plainPassword, user.password);
            const refreshToken = this.jwtService.refresh();

            await this.setCurrentRefreshToken(refreshToken, user.user_id);

            const { password, hashedRefreshToken, ...result } = user;
            const userInfo = {
                ...result,
                accessToken: this.jwtService.sign(result.user_id),
                refreshToken: refreshToken,
            };

            return userInfo;
        } catch (error) {
            throw new HttpException(
                '비밀번호가 다르거나 사용자가 존재하지 않습니다.',
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

    async getUserRefreshTokenMatchesAndValid(refresh: string, userId: string) {
        const user = await this.userRepository.findOne({
            where: { user_id: userId },
        });
        const isMatches = await compare(refresh, user.hashedRefreshToken);

        if (!isMatches) {
            throw new BadRequestException('token not matched');
        }
        return this.jwtService.refreshVerify(refresh);
    }

    async refreshAccessToken(id: string) {
        const token = this.jwtService.sign(id);
        return token;
    }

    async removeRefreshToken(userId: string) {
        // user logout
        const userInfo = await this.userRepository.findOneBy({
            user_id: userId,
        });

        userInfo.hashedRefreshToken = null;
        await this.userRepository.save(userInfo);
    }

    async resetPassword(newPassword: string, email: string) {
        const user = await this.userRepository.findOneBy({
            email: email,
        });
        const hashedPassword = await this.hashedPassword(newPassword);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }
}
