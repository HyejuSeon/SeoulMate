import { ApiProperty } from '@nestjs/swagger';

export class initLandmarkDto {
    @ApiProperty()
    landmark_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    category: string;

    @ApiProperty({ required: false })
    description: string;

    @ApiProperty()
    add: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    location_sub: string;

    @ApiProperty({ required: false })
    longitude: string;

    @ApiProperty({ required: false })
    latitude: string;
}
