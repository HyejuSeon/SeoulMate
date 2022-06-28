import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from 'src/landmarks/landmarks.service';
import { AiService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly landmarksService: LandmarksService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'ai 분석 결과 반환' })
    @ApiResponse({
        status: 200,
        description: 'image 분석 결과',
    })
    async aiAnalyze(@Res() res: any): Promise<void> {
        try {
            const visited = await this.landmarksService.getLandmarks();
            const randomIndex = Math.floor(Math.random() * visited[0].length);

            res.status(HttpStatus.OK).json(visited[0][randomIndex]);
        } catch (err) {
            console.log(err);
        }
    }
}
