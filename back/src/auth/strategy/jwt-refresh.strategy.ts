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
            passReqToCallback: true,
        });
    }

    async validate(req: any, payload: any) {
        const tokenInfo = { ...payload };
        const { id } = tokenInfo;
        // header의 x-refresh-token에서 refresh token을 받아옴
        const refresh = config.get('auth.refresh');
        const refreshToken = req.headers[refresh.toString()]; // refresh token 받아옴

        // 여기로 넘어오면 refresh token이 유효하다는 것을 확인
        // 유효하면 ?? db랑 비교를 해야되는데?

        // token에서 나온 id로 refresh token을 가져온다
        // 가져온 hashed refresh token을 복호화, 만료되었는지 확인
        await this.authService.getUserRefreshTokenMatchesAndValid(
            refreshToken,
            id,
        );

        const token = await this.authService.refreshAccessToken(id);

        return { token };
    }
}
