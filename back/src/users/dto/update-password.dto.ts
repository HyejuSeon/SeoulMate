import { ApiProperty } from '@nestjs/swagger';

export class updatePassword {
    @ApiProperty({ description: 'prePassword' })
    prePassword: string;

    @ApiProperty({ description: 'newPassword' })
    newPassword: string;
}
