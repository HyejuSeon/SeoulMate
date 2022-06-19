import { ApiProperty } from '@nestjs/swagger';

export class topVisitedDto {
    @ApiProperty({
        description: 'take from top',
        required: true,
    })
    take: number;
}
