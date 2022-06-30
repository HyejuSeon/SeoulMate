import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { writeBoard } from './dto/write-board.dto';
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { Users } from 'src/users/users.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getBoard } from './dto/get-board.dto';
import { getBoards } from './dto/board-list.dto';
import { searchBoardDto } from './dto/search-board.dto';
import { updateBoard } from './dto/update-board.dto';

@ApiTags('board')
@Controller('api/board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ApiBody({ type: writeBoard })
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async createBoard(
        @Body() insert: writeBoard,
        @getUserRequest() user: Users,
        @Res() res: Response,
    ) {
        // 게시판 생성
        const created = await this.boardService.create(insert, user.user_id);
        res.status(HttpStatus.OK).json(created);
    }

    @Get(':boardId')
    @ApiResponse({
        type: getBoard,
    })
    async getLandmarkDetail(
        @Param('boardId') boardId: string,
        @Res() res: Response,
    ) {
        const board = await this.boardService.getBoard(boardId);
        const { user_id, ...result } = board;
        const response = { userId: user_id['user_id'], ...result };

        res.status(HttpStatus.OK).json(response);
    }

    @Post('list')
    @ApiResponse({ type: 'string' })
    async getBoardsList(@Query() pagination: getBoards, @Res() res?: Response) {
        const boards = await this.boardService.getBoards(pagination);
        res.status(HttpStatus.OK).json(boards);
    }

    @Post('search')
    @ApiResponse({ type: 'string' })
    async searchBoards(
        @Query() searchBoard: searchBoardDto,
        @Res() res: Response,
    ) {
        const boards = await this.boardService.searchBoards(searchBoard);
        res.status(HttpStatus.OK).json(boards);
    }

    @Put('update')
    async updateBoard(@Query() update: updateBoard, @Res() res: Response) {
        const board = await this.boardService.updateBoard(update);
        res.status(HttpStatus.OK).json(board);
    }

    @Delete('delete')
    async deleteBoard(@Query('boardId') boardId: string, @Res() res: Response) {
        const msg = await this.boardService.deleteBoard(boardId);
        res.status(HttpStatus.OK).json(msg);
    }
}
