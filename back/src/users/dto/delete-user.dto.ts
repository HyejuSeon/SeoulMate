import { ApiProperty } from '@nestjs/swagger';

export class deleteUser {
    @ApiProperty()
    password: string;
}
