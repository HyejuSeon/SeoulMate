import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LandmarksModule } from 'src/landmarks/landmarks.module';
import { StorageModule } from 'src/storage/storage.module';
import { UsersModule } from 'src/users/users.module';
import { VisitedModule } from 'src/visited/visited.module';
import { BoardController } from './board.controller';
import { boardProviders } from './board.provider';
import { BoardService } from './board.service';

@Module({
    imports: [DatabaseModule, StorageModule, UsersModule, LandmarksModule, VisitedModule],
    providers: [...boardProviders, BoardService],
    controllers: [BoardController],
})
export class BoardModule {}
