import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import * as config from 'config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(private authService: AuthService) {
        super({
            secretOrKey: config.get('auth.jwt_access_secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
        });
    }

    async validate(payload: { id: string }) {
        const { id } = payload;
        console.log(id);
    }
}
