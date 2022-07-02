import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Boards } from './board.entity';
import { writeBoard } from './dto/write-board.dto';
import { Exception } from 'handlebars';
import { getBoards } from './dto/board-list.dto';
import { searchBoardDto } from './dto/search-board.dto';
import { updateBoard } from './dto/update-board.dto';
import { UsersService } from 'src/users/users.service';
import { LandmarksService } from 'src/landmarks/landmarks.service';

@Injectable()
export class BoardService {
    constructor(
        @Inject('BOARDS_REPOSITORY')
        private boardRepository: Repository<Boards>,
        private userService: UsersService,
        private landmarkService: LandmarksService,
    ) {}

    async create(insertBoard: writeBoard, userId: string) {
        console.log(insertBoard.landmark_name);

        const landmark = await this.landmarkService.getLandmarkByLandmarkName({
            lanmark_name: insertBoard.landmark_name,
        });
        console.log(landmark);

        const newBoard = {
            ...insertBoard,
            user_id: userId,
        };
        await this.userService.getExperience(userId, 20);
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
            relations: ['user_id'],
        });
    }

    async getBoards(pagination: getBoards) {
        const perPages = pagination.perPage || 5;
        const pages = pagination.page || 1;
        const [boards, count] = await this.boardRepository.findAndCount({
            relations: ['user_id'],
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
                { landmark_name: Like(`%${searchBoard.keyword}%`) },
                { location: Like(`%${searchBoard.keyword}%`) },
            ],
            skip: perPages * (pages - 1),
            take: perPages,
        });
        const totalPage = Math.ceil(count / perPages);
        const payloads = boards;
        return { payloads, totalPage };
    }

    async updateBoard(updateBoard: updateBoard) {
        const board = await this.boardRepository.findOneBy({
            board_id: updateBoard.board_id,
        });
        board.title = updateBoard.title || board.title;
        board.content = updateBoard.content || board.content;
        board.location = updateBoard.location || board.location;
        board.description = updateBoard.description || board.description;
        await this.boardRepository.save(board);
        return 'board detail updated';
    }

    async deleteBoard(boardId: string) {
        await this.boardRepository.delete({ board_id: boardId });
        return 'board deleted';
    }
}
