import { ApiProperty } from '@nestjs/swagger';

export class updateCommentDto {
    @ApiProperty({
        description: 'comment_id',
        required: true,
    })
    comment_id: string;

    @ApiProperty({
        description: 'body',
        required: true,
    })
    content: string;
}
