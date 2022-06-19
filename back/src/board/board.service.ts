import {
    Inject,
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Boards } from './board.entity';
import { writeBoard } from './dto/write-board.dto';
import { v4 as uuid } from 'uuid';
import { Exception } from 'handlebars';
import { StorageService } from 'src/storage/storage.service';
import { StorageFile } from 'src/storage/storage-file';
import { getBoards } from './dto/board-list.dto';

@Injectable()
export class BoardService {
    constructor(
        @Inject('BOARDS_REPOSITORY')
        private boardRepository: Repository<Boards>,
        private readonly storageService: StorageService,
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
        const board = await this.boardRepository.findOne({
            where: {
                board_id: boardId,
            },
        });
        let storageFile: StorageFile;

        try {
            storageFile = await this.storageService.getWithMetaData(
                'visited/' + board.landmark_img_id,
            );
        } catch (e) {
            if (e.message.toString().includes('No such object')) {
                throw new NotFoundException('image not found');
            } else {
                throw new ServiceUnavailableException('internal error');
            }
        }
        const headerContentType = storageFile.contentType;
        const headerCacheControl = 'max-age=60d';
        const image = storageFile.buffer;
        const { landmark_img_id, ...result } = board;
        return {
            payload: {
                headerContentType,
                headerCacheControl,
                image,
                ...result,
            },
        };
    }

    async paginate(
        aggregator: { (): Promise<void>; (): any },
        currentPage: number,
        perPage: number,
    ) {
        const total = await aggregator();

        const totalPage = Math.ceil(total / perPage);
        if (currentPage > totalPage) {
            currentPage = totalPage;
        }
        return { currentPage: currentPage, totalPage: totalPage };
    }

    async findBoard(board: any, query: object, page: number, perPage: number) {
        const aggregator = async () => {
            await this.boardRepository.findAndCount({ where: query });
        };
        const { currentPage, totalPage } = await this.paginate(
            aggregator,
            page,
            perPage,
        );
        const boards = await this.boardRepository.find({
            where: query,
            order: { created_at: 'desc' },
            skip: (currentPage - 1) * perPage,
            take: perPage,
        });
        if (boards.length === 0) {
            throw new NotFoundException('board not exist');
        }
        return { totalPage: totalPage, boards: boards };
    }

    async getBoards(pagination: getBoards) {
        //    get boards
    }
}
