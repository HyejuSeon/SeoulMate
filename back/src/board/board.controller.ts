import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { boardId } from './dto/detail-board.dto';
import { writeBoard } from './dto/write-board.dto';
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { Users } from 'src/users/users.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getBoard } from './dto/get-board.dto';

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
        const { payload } = await this.boardService.getBoard(boardId);
        res.setHeader('Content-Type', payload.headerContentType);
        res.setHeader('Cache-Control', payload.headerCacheControl);
        res.status(HttpStatus.OK).end(payload.image); // swagger에서 확인 가능

        // 아래는 응답부분으로 image와 board의 정보가 반환된다
        // res.status(HttpStatus.OK).end({
        //     image: payload.image,
        //     content: payload.content,
        //     title: payload.title,
        //     restaurant: payload.restaurant,
        //     createdAt: payload.created_at,
        //     name: payload.landmark_name,
        // });
    }
}
