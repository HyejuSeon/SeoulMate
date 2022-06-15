import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saveVisitedDto } from './dto/save.visited.dto';
import { returnVisitedDto } from './dto/return.visited.dto';
import { VisitedService } from './visited.service';
import { updateVisitedDto } from './dto/update.visited.dto';

@ApiTags('visited')
@Controller('visited')
export class VisitedController {
    constructor(private visitedService: VisitedService) {}

    @Get('/')
    @ApiOperation({ summary: '방문지 조회' })
    @ApiResponse({
        status: 200,
        description: 'Return visited by user_id or landmark_id',
    })
    async getVisited(
        @Res() res: any,
        @Query()
        query: returnVisitedDto,
    ): Promise<void> {
        const result = await this.visitedService.getVisited(query);
        res.status(HttpStatus.OK).json(result);
    }

    @Post('/')
    @ApiOperation({ summary: '방문지 등록' })
    @UsePipes(ValidationPipe)
    @ApiBody({ type: saveVisitedDto })
    @ApiResponse({
        status: 200,
        description: 'Post visited by user_id and landmark_id',
    })
    async recordVisited(
        @Res() res: any,
        @Body() visitedDto: saveVisitedDto,
    ): Promise<void> {
        const visited = await this.visitedService.create(visitedDto);
        res.status(HttpStatus.OK).json(visited);
    }

    @Put('/image')
    @ApiOperation({
        summary:
            '방문지 사진 등록, 이미 등록된 방문지 데이터에 사진만 추가하고 싶은 경우 사용',
    })
    @ApiBody({ type: updateVisitedDto })
    @ApiResponse({
        status: 200,
        description: 'Image successfully updated',
    })
    async imageUpload(
        @Res() res: any,
        @Body() visitedDto: updateVisitedDto,
    ): Promise<void> {
        const visited = await this.visitedService.update(visitedDto);
        res.status(HttpStatus.OK).json(visited);
    }
}
