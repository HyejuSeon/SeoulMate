import { ApiProperty } from '@nestjs/swagger';

export class returnVisitedDto {
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
        description: 'landmark_id',
        required: false,
    })
    landmark_id: number;

    @ApiProperty({
        description: 'user_id',
        required: false,
    })
    user_id: string;
}
