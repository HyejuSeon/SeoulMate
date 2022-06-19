import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class boardId {
    @ApiProperty()
    @IsString()
    id: string;
}
