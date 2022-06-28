import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class updateBoard {
    @ApiProperty({
        description: 'board id',
    })
    board_id: string;

    @ApiProperty({
        description: '게시글 제목',
        required: false,
    })
    @IsString()
    title?: string;

    @ApiProperty({
        description: '게시글 내용',
        required: false,
    })
    @IsString()
    content?: string;

    @ApiProperty({
        description: '랜드마크 주소',
        required: false,
    })
    @IsString()
    location?: string;

    @ApiProperty({
        description: '랜드마크 설명',
        required: false,
    })
    @IsString()
    description?: string;
}
