import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from 'src/landmarks/landmarks.service';
import { AiService } from './ai.service';
import { insertAI } from './dto/insert.ai.dto';

@ApiTags('ai')
@Controller('ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly landmarksService: LandmarksService,
    ) {}

    @Post('/random')
    @ApiOperation({ summary: '목데이터 랜덤 결과 반환' })
    @ApiResponse({
        status: 200,
        description: 'image 분석 결과',
    })
    async aiRandom(@Res() res: any): Promise<void> {
        try {
            const visited = await this.landmarksService.getLandmarks();
            const randomIndex = Math.floor(Math.random() * visited[0].length);

            res.status(HttpStatus.OK).json(visited[0][randomIndex]);
        } catch (err) {
            console.log(err);
        }
    }

    @Post("/")
    @ApiOperation({ summary: 'ai 분석 결과 반환' })
    @ApiBody({ type: insertAI })
    @ApiResponse({
        status: 200,
        description: 'image 분석 결과',
    })
    async aiAnalyze(@Res() res: any, @Body() url: insertAI): Promise<void> {
        try {
            
            const {result} = await this.aiService.getData(url);
            if(result) {
                const param = {landmark_name: result}
                const data = await this.landmarksService.getLandmarkByLandmarkName(param)
                res.status(HttpStatus.OK).json(data);
            }
            res.status(HttpStatus.NOT_FOUND).json({errorMessage:"NOT_FOUND"});
            

        } catch (err) {
            console.log(err);
        }
    }
}
