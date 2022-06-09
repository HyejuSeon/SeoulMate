import { ApiProperty } from '@nestjs/swagger';

export class userResultDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    profile_image: string;

    @ApiProperty()
    rating: number;

    @ApiProperty()
    exp: number;

    @ApiProperty()
    accessToken: string;
}
