import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/users.provider';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stragegy';

const jwtConfig = config.get('auth');

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConfig['jwt_access_secret'],
            signOptions: {
                expiresIn: jwtConfig['jwt_access_expiresIn'],
            },
        }),
    ],
    providers: [JwtService, AuthService, ...userProviders, JwtStrategy],
    exports: [JwtService, AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
