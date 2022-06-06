import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/globalexception..filter';
import { AuthModule } from './auth/auth.module';
import { LandmarksModule } from './landmarks/landmarks.module';

@Module({
    imports: [UsersModule, DatabaseModule, AuthModule, LandmarksModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
