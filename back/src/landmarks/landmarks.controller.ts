import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmarks.service';

@ApiTags('landmarks')
@Controller('landmarks')
export class LandmarksController {
    constructor(private landmarksService: LandmarksService) {}
    @Get('localLandmarks')
    async getLandmarks(@Res() res: any): Promise<void> {
        const result = await this.landmarksService.getLandmarks();
        res.status(HttpStatus.OK).json(result);
    }
}
