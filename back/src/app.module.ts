import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LandmarksModule } from './landmarks/landmarks.module';
import { VisitedModule } from './visited/visited.module';

@Module({
    imports: [UsersModule, DatabaseModule, LandmarksModule, VisitedModule],
    controllers: [],
})
export class AppModule {}
