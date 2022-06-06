import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmarks.service';

@ApiTags('landmarks')
@Controller('landmarks')
export class LandmarksController {
    constructor(private landmarksService: LandmarksService) {}

    @Get('init')
    @ApiResponse({
        status: 200,
        description: 'Landmark data initialized successfully',
    })
    async init(@Res() res: any): Promise<void> {
        //   사용자 회원가입
        const result = await this.landmarksService.init();
        res.status(HttpStatus.OK).json(result);
    }
}
