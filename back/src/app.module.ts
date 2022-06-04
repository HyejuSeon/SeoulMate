import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LandmarksModule } from './landmarks/landmarks.module';

@Module({
    imports: [UsersModule, DatabaseModule, LandmarksModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
