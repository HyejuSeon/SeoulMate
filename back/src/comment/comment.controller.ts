import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Comments } from './comment.entity';
import { CommentService } from './comment.service';
import { getCommentDto } from './dto/get.comment.dto';
import { postCommentDto } from './dto/post.comment.dto';
import { updateCommentDto } from './dto/update.comment.dto';

@ApiTags('comment')
@Controller('api/comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly usersService: UsersService,
    ) {}

    @Post()
    @ApiBody({ type: postCommentDto })
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async createComment(
        @Body() body: postCommentDto,
        @getUserRequest() user: Users,
        @Res() res: any,
    ) {
        const created = await this.commentService.create(body, user.user_id);
        const userInfo = await this.usersService.getUserByUserId(user.user_id);
        const payload = {
            ...created,
            name: userInfo[0].name,
            profile_image: userInfo[0].profile_image,
        };

        res.status(HttpStatus.OK).json(payload);
    }

    @Get('/:comment_id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async getComment(@Param('comment_id') comment_id: string, @Res() res: any) {
        const comment = await this.commentService.getCommentByCommentId(
            comment_id,
        );
        res.status(HttpStatus.OK).json(comment);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async getCommentList(@Query() query: getCommentDto, @Res() res: any) {
        const {payloads, totalPages} =
            await this.commentService.getCommentsByQuery(query);
        const comments = await Promise.all(payloads.map(async (comment) => {
            const userInfo = await this.usersService.getUserByUserId(
                comment.user_id,
            );
            comment.name = userInfo[0].name;
            comment.profile_image = userInfo[0].profile_image;
            return comment;
        }));
        const result = {payloads: comments, totalPages}
        res.status(HttpStatus.OK).json(result);
    }

    @Patch()
    @ApiBody({ type: updateCommentDto })
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async updateComment(@Body() update: updateCommentDto, @Res() res: any) {
        const result = await this.commentService.updateComment(update);
        res.status(HttpStatus.OK).json(result);
    }

    @Delete('/:comment_id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async deleteComment(
        @Param('comment_id') comment_id: string,
        @Res() res: any,
    ) {
        const result = await this.commentService.deleteComment(comment_id);
        res.status(HttpStatus.OK).json(result);
    }
}
