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
            ignoreExpiration: true, // 만료되어도 에러를 띄우지 않을것으로 예상
        });
    }

    async validate(payload: any) {
        const info = { ...payload };
        const { id, iat } = info;

        const expTime = config.get('auth.jwt_access_expiresIn');
        console.log(expTime + iat);

        console.log(payload);

        // token에서 나온 id로 refresh token을 가져온다
        // 가져온 hashed refresh token을 복호화, 만료되었는지 확인
    }
}
