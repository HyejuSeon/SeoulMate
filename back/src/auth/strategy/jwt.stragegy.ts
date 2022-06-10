import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { AccessTokenPayload } from '../dto/jwt.class';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
    ) {
        super({
            secretOrKey: config.get('auth.jwt_access_secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: AccessTokenPayload) {
        const user = await this.userRepository.findOne({
            where: { user_id: payload.id },
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
