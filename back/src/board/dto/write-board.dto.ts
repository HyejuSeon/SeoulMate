import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class writeBoard {
    @ApiProperty({
        description: '게시글 제목',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: '게시글 내용',
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: '랜드마크 이미지 id',
    })
    @IsString()
    landmark_img_id: string;

    @ApiProperty({
        description: '랜드마크 이름',
    })
    @IsString()
    landmark_name: string;
}
