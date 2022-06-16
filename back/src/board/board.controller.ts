import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { boardId } from './dto/detail-board.dto';
import { writeBoard } from './dto/write-board.dto';

@ApiTags('board')
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ApiBody({ type: writeBoard })
    // @UseGuards(JwtGuard)
    // @ApiBearerAuth()
    async createBoard(
        @Body() insert: writeBoard,
        // @getUserRequest() user: Users,
    ) {
        // 게시판 생성
        const user_id = '098ad4b2-ebfa-4788-9f39-ec9c15d46e13';
        return this.boardService.create(insert, user_id);
    }

    @Get(':id')
    @ApiParam({ type: String, name: 'boardId' })
    async getLandmarkDetail(@Req() req: Request) {
        const { boardId } = req.params;
        console.log(boardId);

        return 0;
    }
}
