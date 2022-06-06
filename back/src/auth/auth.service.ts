import { Inject, Injectable } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
    ) {}

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
