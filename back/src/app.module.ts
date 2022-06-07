import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/globalexception..filter';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guard/jwt-refresh.guard';

@Module({
    imports: [UsersModule, DatabaseModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
