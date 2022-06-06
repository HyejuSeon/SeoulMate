import { ApiProperty } from '@nestjs/swagger';

export class createLandmarkDto {
    @ApiProperty()
    landmark_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    add: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    location_sub: string;
}
