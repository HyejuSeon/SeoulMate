import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Boards } from './board.entity';
import { writeBoard } from './dto/write-board.dto';
import { v4 as uuid } from 'uuid';
import { Exception } from 'handlebars';
import { getBoards } from './dto/board-list.dto';
import { searchBoardDto } from './dto/search-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @Inject('BOARDS_REPOSITORY')
        private boardRepository: Repository<Boards>,
    ) {}

    async create(insertBoard: writeBoard, userId: string) {
        // create board id
        const boardId = uuid();
        const newBoard = {
            ...insertBoard,
            board_id: boardId,
            user_id: userId,
        };
        try {
            await this.boardRepository.save(newBoard);
            return 'board created';
        } catch (error) {
            throw new Exception('board create error');
        }
    }

    async getBoard(boardId: string) {
        return await this.boardRepository.findOne({
            where: {
                board_id: boardId,
            },
        });
    }

    async getBoards(pagination: getBoards) {
        const perPages = pagination.perPage || 5;
        const pages = pagination.page || 1;
        const [boards, count] = await this.boardRepository.findAndCount({
            skip: perPages * (pages - 1),
            take: perPages,
        });
        const totalPage = Math.ceil(count / perPages);
        const payloads = boards;
        return { payloads, totalPage };
    }

    async searchBoards(searchBoard: searchBoardDto) {
        const perPages = searchBoard.perPage || 5;
        const pages = searchBoard.page || 1;
        const [boards, count] = await this.boardRepository.findAndCount({
            where: [
                { landmark_name: searchBoard.keyword },
                { location: searchBoard.keyword },
            ],
            skip: perPages * (pages - 1),
            take: perPages,
        });
        const totalPage = Math.ceil(count / perPages);
        const payloads = boards;
        return { payloads, totalPage };
    }
}
