import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { Users } from 'src/users/users.entity';
import { BoardService } from './board.service';
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
        const user_id = '098ad4b2-ebfa-4788-9f39-ec9c15d46e13';
        return this.boardService.create(insert, user_id);
    }
}
