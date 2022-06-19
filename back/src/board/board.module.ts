import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StorageModule } from 'src/storage/storage.module';
import { BoardController } from './board.controller';
import { boardProviders } from './board.provider';
import { BoardService } from './board.service';

@Module({
    imports: [DatabaseModule, StorageModule],
    providers: [...boardProviders, BoardService],
    controllers: [BoardController],
})
export class BoardModule {}
