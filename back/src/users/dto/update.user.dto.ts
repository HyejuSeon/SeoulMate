import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class updateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    profile_image?: string;

    @ApiProperty()
    @IsString()
    img_name: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    prePassword: string;

    @ApiProperty()
    @IsString()
    newPassword?: string;
}
