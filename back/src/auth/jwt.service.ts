import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const auth = config.get('auth');

@Injectable()
export class JwtService {
    sign(id: string) {
        // jwt 토큰 생성
        const payload = { id };
        return jwt.sign(payload, auth['jwt_access_secret'], {
            algorithm: 'HS256',
            expiresIn: auth['jwt_access_expiresIn'],
        });
    }

    verity(token: string) {
        // jwt 검증
        let decoded: any = null;
        try {
            decoded = jwt.verify(token, auth['jwt_access_secret']);
            return {
                // jwt 인증 성공
                status: true,
                id: decoded.id,
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    refresh() {
        return jwt.sign({}, auth['jwt_refresh_secret'], {
            algorithm: 'HS256',
            expiresIn: auth['jwt_refresh_expiresIn'],
        });
    }

    refreshVerify(token: string) {
        // refresh 검증
        try {
            return jwt.verify(token, auth['jwt_refresh_secret']);
        } catch (error) {
            throw new UnauthorizedException(
                'refresh token expired, login required',
            );
        }
    }
}
