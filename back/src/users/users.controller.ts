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
import { signIn } from './dto/signin.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // @UseFilters(HttpExceptionFilter) //error handle
    @Post('registration') // http method
    @UsePipes(ValidationPipe) // validation pipe
    @ApiBody({ type: insertUserDto }) // swagger body
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

    @Post()
    // @UseFilters(HttpExceptionFilter)
    @ApiBody({ type: signIn })
    @ApiResponse({ status: 200, description: 'login succc' })
    async login(@Res() res: any, @Body() userDto: signIn): Promise<void> {
        const user = await this.userService.login(userDto);
        res.status(HttpStatus.OK).json(user);
    }
}
