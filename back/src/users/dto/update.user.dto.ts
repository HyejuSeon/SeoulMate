import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class updateUserDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    name: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    profile_image?: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    @MinLength(4)
    prePassword: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File;
}
