import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/users.provider';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
    imports: [DatabaseModule],
    providers: [JwtService, AuthService, ...userProviders],
    exports: [JwtService, AuthService],
})
export class AuthModule {}
