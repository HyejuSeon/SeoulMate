import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LandmarksController } from './landmarks.controller';
import { landmarkProviders } from './landmarks.provider';
import { LandmarksService } from './landmarks.service';

@Module({
    imports: [DatabaseModule],
    providers: [LandmarksService, ...landmarkProviders],
    controllers: [LandmarksController],
})
export class LandmarksModule {}
