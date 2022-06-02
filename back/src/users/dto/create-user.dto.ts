import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  profile_image: string;

  @ApiProperty()
  rank: number;

  @ApiProperty()
  exp: number;
}
