import { ApiProperty } from '@nestjs/swagger';

export class getCommentDto {
    @ApiProperty({
        description: '페이지 번호(없을 경우 전체 리스트 반환)',
        required: false,
    })
    page: number;

    @ApiProperty({
        description:
            '한 페이지 당 보여지는 자료의 개수(없을 경우 전체 리스트 반환)',
        required: false,
    })
    perPage: number;

    @ApiProperty({
        description: 'board_id',
        required: false,
    })
    board_id: string;

    @ApiProperty({
        description: 'user_id',
        required: false,
    })
    user_id: string;
}
