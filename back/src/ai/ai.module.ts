import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LandmarksModule } from 'src/landmarks/landmarks.module';
import { StorageModule } from 'src/storage/storage.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
    imports: [DatabaseModule, LandmarksModule, StorageModule],
    controllers: [AiController],
    providers: [AiService],
})
export class AiModule {}
