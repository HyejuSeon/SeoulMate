import { ApiProperty } from '@nestjs/swagger';

export class queryLandmarkDto {
    @ApiProperty({
        description: '페이지 번호(없을 경우 전체 리스트 반환(권장하지 않음))',
        required: false,
    })
    page: number;

    @ApiProperty({
        description:
            '한 페이지 당 보여지는 자료의 개수(없을 경우 전체 리스트 반환(권장하지 않음))',
        required: false,
    })
    perPage: number;

    @ApiProperty({ description: '대분류', required: false })
    category: string;

    @ApiProperty({ description: '상위주소', required: false })
    location: string;

    @ApiProperty({ description: '하위주소', required: false })
    location_sub: string;
}
