import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Res,
    ServiceUnavailableException,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { saveVisitedDto } from './dto/save.visited.dto';
import { returnVisitedDto } from './dto/return.visited.dto';
import { VisitedService } from './visited.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';
import { StorageFile } from 'src/storage/storage-file';
import { Response } from 'express';
import { LandmarksService } from 'src/landmarks/landmarks.service';
import { UsersService } from 'src/users/users.service';

@ApiTags('visited')
@Controller('visited')
export class VisitedController {
    constructor(
        private visitedService: VisitedService,
        private landmarksService: LandmarksService,
        private storageService: StorageService,
        private usersService: UsersService,
    ) {}

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

    @Get('/images/:imageId')
    @ApiOperation({ summary: '방문지 사진 받아오기' })
    @ApiResponse({
        status: 200,
        description: 'Return visited image by image name',
    })
    async downloadMedia(
        @Param('imageId') imageId: string,
        @Res() res: Response,
    ) {
        let storageFile: StorageFile;
        try {
            storageFile = await this.storageService.getWithMetaData(
                'visited/' + imageId,
            );
        } catch (e) {
            if (e.message.toString().includes('No such object')) {
                throw new NotFoundException('image not found');
            } else {
                throw new ServiceUnavailableException('internal error');
            }
        }
        res.setHeader('Content-Type', storageFile.contentType);
        res.setHeader('Cache-Control', 'max-age=60d');
        res.status(HttpStatus.OK).end(storageFile.buffer);
    }

    @Post('/images')
    @ApiOperation({ summary: '방문지 등록' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
                landmark_id: { type: 'number' },
                user_id: { type: 'string' },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Post Visited',
    })
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
        @Res() res: any,
        @Body() visitedDto: saveVisitedDto,
    ): Promise<void> {
        try {
            if (
                file !== undefined &&
                visitedDto.landmark_id !== undefined &&
                visitedDto.user_id !== undefined
            ) {
                const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
                const encodedName = encodeURI(
                    encodeURIComponent(file.originalname),
                ).replace(reg, ''); // 한글 인코딩후 모든 특수기호 제거
                const imageId = `${Date.now()}_${
                    visitedDto.user_id
                }_${encodedName}`;
                await this.storageService.save(
                    'visited/' + imageId,
                    file.mimetype,
                    file.buffer,
                    [{ imageId: imageId }],
                );
                const visited = await this.visitedService.create(
                    visitedDto,
                    imageId,
                );
                const visitedCount = await this.visitedService.getCount(
                    visitedDto.landmark_id,
                );
                const user = await this.usersService.getCurrentUserInfo(
                    visitedDto.user_id,
                );
                const landmark =
                    await this.landmarksService.getLandmarkByLandmarkId(
                        visitedDto.landmark_id,
                    );
                const filename = file.originalname;
                const payload = {
                    index: visited.index,
                    visitedCount: +visitedCount.visitedCount,
                    landmark,
                    user,
                    filename,
                    landmark_img: visited.landmark_img,
                };
                res.status(HttpStatus.OK).json(payload);
            } else {
                res.status(HttpStatus.BAD_REQUEST).send(
                    'Check the request body',
                );
            }
        } catch (err) {
            console.log(err);
        }
    }

    @Get('/top')
    @ApiOperation({ summary: '상위 몇개만 반환' })
    @ApiResponse({
        status: 200,
        description: 'Return top Nth most visited landmarks',
    })
    async getTop(@Res() res: any): Promise<void> {
        const visitedService = this.visitedService;
        const result = await visitedService.getTop();
        const landmarkService = this.landmarksService;
        async function getTopLandmarks(
            result,
            landmarkService,
            visitedService,
        ) {
            const Result = await Promise.all(
                result.map((element) =>
                    getMergedData(element, landmarkService, visitedService),
                ),
            );
            return Result;
        }
        async function getMergedData(element, landmarkService, visitedService) {
            const landmark_info = await landmarkService.getLandmarkByLandmarkId(
                element.landmark_id,
            );
            const visitedCount = +element.visitedCount;
            const image = await visitedService.getImage(element.landmark_id);
            const result = {
                visitedCount,
                ...landmark_info,
                landmark_img: image.landmark_img,
            };
            return result;
        }
        const body = await getTopLandmarks(
            result,
            landmarkService,
            visitedService,
        );
        res.status(HttpStatus.OK).json(body);
    }

    // @Put('/image')
    // @ApiOperation({
    //     summary: '이미 등록된 방문지 데이터에 사진만 추가하고 싶은 경우 사용',
    // })
    // @ApiBody({ type: updateVisitedDto })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Image successfully updated',
    // })
    // async imageUpdate(
    //     @Res() res: any,
    //     @Body() visitedDto: updateVisitedDto,
    // ): Promise<void> {
    //     const visited = await this.visitedService.update(visitedDto);
    //     res.status(HttpStatus.OK).json(visited);
    // }
}
