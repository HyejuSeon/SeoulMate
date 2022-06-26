import { ApiProperty } from '@nestjs/swagger';

export class postCommentDto {
    @ApiProperty({
        description: 'board_id',
        required: true,
    })
    board_id: string;

    @ApiProperty({
        description: 'body',
        required: true,
    })
    content: string;
}
