import { Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('registration')
  @ApiBody({ type: createUserDto })
  @ApiResponse({ status: 200, description: 'user created' })
  async createUser(): Promise<void> {
    //   사용자 회원가입
  }

  @Patch('correction/:id')
  async setUser(): Promise<void> {
    //   사용자 정보 수정
  }
}
