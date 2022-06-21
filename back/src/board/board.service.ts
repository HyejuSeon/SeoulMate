import {
    Inject,
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Boards } from './board.entity';
import { writeBoard } from './dto/write-board.dto';
import { v4 as uuid } from 'uuid';
import { Exception } from 'handlebars';
import { StorageService } from 'src/storage/storage.service';
import { StorageFile } from 'src/storage/storage-file';

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
}
