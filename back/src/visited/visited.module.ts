import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { VisitedController } from './visited.controller';
import { visitedProviders } from './visited.provider';
import { VisitedService } from './visited.service';

@Module({
    imports: [DatabaseModule],
    controllers: [VisitedController],
    providers: [VisitedService, ...visitedProviders],
})
export class VisitedModule {}
