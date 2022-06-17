import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Boards } from './board.entity';
import { writeBoard } from './dto/write-board.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardService {
    constructor(
        @Inject('BOARDS_REPOSITORY')
        private boardRepository: Repository<Boards>,
    ) {}

    async create(insertBoard: writeBoard, user_id: string) {
        // create board id
        const boardId = uuid();
        const newBoard = {
            ...insertBoard,
            user_id: user_id,
            board_id: boardId,
        };

        await this.boardRepository.save(newBoard);
    }
}
