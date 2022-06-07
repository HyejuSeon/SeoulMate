import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guard/jwt-refresh.guard';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { userProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [UsersService, ...userProviders],
    controllers: [UsersController],
})
export class UsersModule {}
