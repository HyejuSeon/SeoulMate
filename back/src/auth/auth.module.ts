import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtService } from './jwt.service';

@Module({
    imports: [DatabaseModule],
    providers: [JwtService, AuthService, JwtRefreshGuard],
})
export class AuthModule {}
