import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
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

@ApiTags('visited')
@Controller('visited')
export class VisitedController {
    constructor(
        private visitedService: VisitedService,
        private storageService: StorageService,
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
                res.status(HttpStatus.OK).json(visited);
            } else {
                res.status(HttpStatus.BAD_REQUEST).send(
                    'Check the request body',
                );
            }
        } catch (err) {
            console.log(err);
        }
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
