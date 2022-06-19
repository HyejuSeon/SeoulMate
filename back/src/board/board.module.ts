import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { VisitedModule } from 'src/visited/visited.module';
import { BoardController } from './board.controller';
import { boardProviders } from './board.provider';
import { BoardService } from './board.service';

@Module({
    imports: [DatabaseModule],
    providers: [...boardProviders, BoardService],
    controllers: [BoardController],
})
export class BoardModule {}
