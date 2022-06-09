import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/globalexception.filter';

import { LandmarksModule } from './landmarks/landmarks.module';
import { VisitedModule } from './visited/visited.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [UsersModule, DatabaseModule, LandmarksModule, VisitedModule],
    controllers: [],
})
export class AppModule {}
