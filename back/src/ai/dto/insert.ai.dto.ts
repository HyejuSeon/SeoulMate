import { ApiProperty } from '@nestjs/swagger';

export class insertAI {
    @ApiProperty({
        description: 'gcs image url',
        required: true,
    })
    url: string;

}
