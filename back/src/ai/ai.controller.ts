import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { LandmarksService } from 'src/landmarks/landmarks.service';
import { StorageService } from 'src/storage/storage.service';
import { Users } from 'src/users/users.entity';
import { AiService } from './ai.service';
import { insertAI } from './dto/insert.ai.dto';

@ApiTags('ai')
@Controller('api/ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly landmarksService: LandmarksService,
        private readonly storageService: StorageService,
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

    @Post('/')
    @ApiOperation({ summary: 'ai 분석 결과 반환' })
    @ApiBody({ type: insertAI })
    @ApiResponse({
        status: 200,
        description: 'image 분석 결과',
    })
    async aiAnalyze(@Res() res: any, @Body() url: insertAI): Promise<void> {
        try {
            const { result } = await this.aiService.getData(url);
            if (result) {
                const param = { landmark_name: result };
                const data =
                    await this.landmarksService.getLandmarkByLandmarkName(
                        param,
                    );
                res.status(HttpStatus.OK).json(data);
            }
            else{res.status(HttpStatus.NOT_FOUND).json({
                errorMessage: 'NOT_FOUND',
            })};
        } catch (err) {
            console.log(err);
        }
    }

    @Post('/images')
    @ApiOperation({ summary: '방문지 이미지 등록' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'ai image upload and analyze',
    })
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor('image', {
            limits: {
                files: 1,
                fileSize: 7000 * 7000,
            },
        }),
    )
    async uploadMedia(
        @UploadedFile() file: Express.Multer.File,
        @getUserRequest() user: Users,
        @Res() res: any,
    ): Promise<void> {
        try {
            if (file !== undefined) {
                const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
                const encodedName = encodeURI(
                    encodeURIComponent(file.originalname),
                ).replace(reg, ''); // 한글 인코딩후 모든 특수기호 제거
                const imageId = `${Date.now()}_${user.user_id}_${encodedName}`;
                const landmark_img = `https://storage.googleapis.com/landmark_service_images/visited/${imageId}`;
                this.storageService
                    .save('visited/' + imageId, file.mimetype, file.buffer, [
                        { imageId: imageId },
                    ])
                    .then(() => {
                        res.status(HttpStatus.OK).json({gcs_url: landmark_img})
                    })
            } else {
                res.status(HttpStatus.BAD_REQUEST).send(
                    'Check the request body',
                );
            }
        } catch (err) {
            console.log(err);
        }
    }
}
