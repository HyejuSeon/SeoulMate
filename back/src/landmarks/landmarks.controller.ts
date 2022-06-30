import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { queryLandmarkDto } from './dto/query.landmark.dto';
import { LandmarksService } from './landmarks.service';

@ApiTags('landmarks')
@Controller('api/landmarks')
export class LandmarksController {
    constructor(private landmarksService: LandmarksService) {}

    @Get('init')
    @ApiResponse({
        status: 200,
        description: 'Landmark data initialized successfully',
    })
    @ApiOperation({
        summary:
            '랜드마크 데이터베이스 초기화: 데이터베이스에 랜드마크 데이터가 없는 경우, 데이터가 이상한 경우 실행',
    })
    async init(@Res() res: any): Promise<void> {
        //   랜드마크 데이터베이스 초기화
        const result = await this.landmarksService.init();
        res.status(HttpStatus.OK).json(result);
    }

    @Get('/getAll')
    @ApiResponse({
        status: 200,
        description: 'Return all landmarks',
    })
    @ApiOperation({
        summary: '랜드마크 조회',
    })
    async getLandmarks(
        @Res() res: any,
        @Query()
        query: queryLandmarkDto,
    ): Promise<void> {
        if (query.page === undefined || query.perPage === undefined) {
            const result = await this.landmarksService.getLandmarks();
            res.status(HttpStatus.OK).json(result);
        } else {
            const result = await this.landmarksService.getLandmarksPaginated(
                query,
            );
            res.status(HttpStatus.OK).json(result);
        }
    }

    @Get('/:landmark_id')
    @ApiOperation({ summary: 'Return landmarks by landmark_id' })
    @ApiResponse({
        status: 200,
        description: 'Return landmarks by landmark_id',
    })
    async getLandmarkByLandmarkId(
        @Res() res: any,
        @Param('landmark_id') landmark_id: number,
    ): Promise<void> {
        const result = await this.landmarksService.getLandmarkByLandmarkId(
            landmark_id,
        );
        res.status(HttpStatus.OK).json(result);
    }
}
