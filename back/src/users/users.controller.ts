import {
    Body,
    Controller,
    HttpStatus,
    Patch,
    Post,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { insertUserDto } from './dto/insert.user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('registration')
    @UsePipes(ValidationPipe)
    @ApiBody({ type: insertUserDto })
    @ApiResponse({ status: 200, description: 'user created' })
    async createUser(
        @Res() res: any,
        @Body() userDto: insertUserDto,
    ): Promise<void> {
        //   사용자 회원가입
        const user = await this.userService.create(userDto);
        res.status(HttpStatus.OK).json(user);
    }

    @Patch('correction/:id')
    async setUser(): Promise<void> {
        //   사용자 정보 수정
    }
}
