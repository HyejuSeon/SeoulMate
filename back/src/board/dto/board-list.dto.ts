import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class getBoards {
    @ApiProperty({
        description: '현재 페이지',
    })
    @IsNumber()
    page: number;

    @ApiProperty({
        description: '페이지 당 보여줄 개수',
    })
    perPage: number;
}
