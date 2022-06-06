import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async getAccessToken(id: string) {
        const token = this.jwtService.sign(id);
        return {
            accessToken: token,
        };
    }
}
