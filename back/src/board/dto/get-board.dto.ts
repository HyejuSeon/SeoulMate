import { ApiProperty } from '@nestjs/swagger';

export class getBoard {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    profile_image: string;

    @ApiProperty()
    board_id: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: '게시글 이미지',
    })
    landmark_img_id: string;

    @ApiProperty({
        description: '게시글 제목',
    })
    title: string;

    @ApiProperty({ description: '맛집 정보' })
    restaurant: string;

    @ApiProperty({ description: '게시글 내용' })
    content: string;

    @ApiProperty({ description: '랜드마크 이름' })
    landmark_name: string;

    @ApiProperty({
        description: '게시글 생성 날짜',
    })
    created_at: string;
}
