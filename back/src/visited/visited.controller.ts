import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saveVisitedDto } from './dto/save.visited.dto';
import { returnVisitedDto } from './dto/return.visited.dto';
import { VisitedService } from './visited.service';

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
}
