import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LandmarksModule } from 'src/landmarks/landmarks.module';
import { StorageModule } from 'src/storage/storage.module';
import { UsersModule } from 'src/users/users.module';
import { VisitedController } from './visited.controller';
import { visitedProviders } from './visited.provider';
import { VisitedService } from './visited.service';

@Module({
    imports: [DatabaseModule, StorageModule, LandmarksModule, UsersModule],
    controllers: [VisitedController],
    providers: [VisitedService, ...visitedProviders],
    exports: [VisitedService]
})
export class VisitedModule {}
