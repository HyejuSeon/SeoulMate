import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LandmarksModule } from './landmarks/landmarks.module';
import { VisitedModule } from './visited/visited.module';
import { EmailService } from './email/email.service';

@Module({
    imports: [UsersModule, DatabaseModule, LandmarksModule, VisitedModule],
    controllers: [],
    providers: [EmailService],
})
export class AppModule {}
