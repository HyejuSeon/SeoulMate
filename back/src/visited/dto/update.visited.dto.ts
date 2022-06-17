import { ApiProperty } from '@nestjs/swagger';

export class updateVisitedDto {
    @ApiProperty({
        description: 'image url',
        required: false,
    })
    landmark_img: string;
}
