import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { Strategy } from 'passport-local';
import { signIn } from 'src/users/dto/signin.dto';
import { userResultDto } from 'src/users/dto/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<userResultDto> {
        const user = await this.authService.validateUser(email, password);
        return user;
    }
}
