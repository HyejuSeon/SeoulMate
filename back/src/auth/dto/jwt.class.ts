import { IsJWT } from 'class-validator';

export class AccessTokenPayload {
    id: string;
}

export class RefreshTokenPayload {
    account: string; // 보류
}

export class JWTInfo {
    constructor(accessToken: string, refreshToken: string) {
        this.access_token = accessToken;
        this.refresh_token = refreshToken;
    }

    @IsJWT()
    access_token: string;

    @IsJWT()
    refresh_token: string;
}
