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
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { Users } from 'src/users/users.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('board')
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ApiBody({ type: writeBoard })
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async createBoard(
        @Body() insert: writeBoard,
        @getUserRequest() user: Users,
    ) {
        // 게시판 생성
        return this.boardService.create(insert, user.user_id);
    }

    @Get(':id')
    @ApiParam({ type: String, name: 'boardId' })
    async getLandmarkDetail(@Req() req: Request) {
        const { boardId } = req.params;
        console.log(boardId);

        return 0;
    }
}
