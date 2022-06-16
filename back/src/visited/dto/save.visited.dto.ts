import { ApiProperty } from '@nestjs/swagger';

export class saveVisitedDto {
    @ApiProperty({
        description: 'image url',
        required: false,
    })
    landmark_img: string;

    @ApiProperty({
        description: 'landmark_id',
        required: true,
    })
    landmark_id: number;

    @ApiProperty({
        description: 'user_id',
        required: true,
    })
    user_id: string;
}
