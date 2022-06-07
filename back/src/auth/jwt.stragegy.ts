import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
    ) {
        super({
            secretOrKey: config.get('auth.jwt_access_secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: { email: any; userId: any }) {
        const { email, userId } = payload;
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
