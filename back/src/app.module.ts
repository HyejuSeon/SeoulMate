import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LandmarksModule } from './landmarks/landmarks.module';
import { VisitedModule } from './visited/visited.module';
import { EmailService } from './email/email.service';
import { StorageModule } from './storage/storage.module';
import { BoardModule } from './board/board.module';
import { AiModule } from './ai/ai.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        LandmarksModule,
        VisitedModule,
        StorageModule,
        BoardModule,
        AiModule,
    ],
    controllers: [],
    providers: [EmailService],
})
export class AppModule {}
