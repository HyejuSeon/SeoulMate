import { ApiProperty } from '@nestjs/swagger';

export class currentUserInfo {
    @ApiProperty({ description: '사용자 고유 아이디', type: String })
    user_id: string;

    @ApiProperty({ description: '사용자 이름', type: String })
    name: string;

    @ApiProperty({ description: '사용자 이메일', type: String })
    email: string;

    @ApiProperty({ description: '사용자 프로필 이미지', type: String })
    profile_image: string;

    @ApiProperty({ description: '사용자 등급', type: Number })
    rating: number;

    @ApiProperty({ description: '사용자 경험치', type: Number })
    exp: number;
}
