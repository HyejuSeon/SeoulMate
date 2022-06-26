import { ApiProperty } from '@nestjs/swagger';

export class resetPassword {
    @ApiProperty()
    email: string;
}
