import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LandmarksModule } from './landmarks/landmarks.module';
import { VisitedModule } from './visited/visited.module';
import { EmailService } from './email/email.service';
import { StorageModule } from './storage/storage.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        LandmarksModule,
        VisitedModule,
        StorageModule,
    ],
    providers: [EmailService],
})
export class AppModule {}
