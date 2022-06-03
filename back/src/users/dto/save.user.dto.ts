import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class saveUserDto {
    @ApiProperty()
    @IsString()
    user_id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    password: string;

    @ApiProperty()
    @IsString()
    profile_image: string;

    @ApiProperty()
    @IsNumber()
    rank: number;

    @ApiProperty()
    @IsNumber()
    exp: number;
}
