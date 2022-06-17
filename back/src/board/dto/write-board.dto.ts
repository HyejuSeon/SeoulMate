import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class writeBoard {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    restaurant: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    landmark_img: string;
}
