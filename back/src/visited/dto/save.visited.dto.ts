import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class saveVisitedDto {
    @ApiProperty({
        description: 'landmark_id',
        required: true,
    })
    @IsNumber()
    landmark_id: number;

    @ApiProperty({
        description: 'user_id',
        required: true,
    })
    @IsString()
    user_id: string;
}
