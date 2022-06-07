import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Patch,
    Post,
    Res,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { insertUserDto } from './dto/insert.user.dto';
import { signIn } from './dto/signin.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { getUserId } from 'src/auth/getUserId.decorator';
import { Users } from './users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseFilters(HttpExceptionFilter) //error handle
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
    @UseFilters(HttpExceptionFilter)
    @ApiBody({ type: signIn })
    @ApiResponse({ status: 200, description: 'login succc' })
    async login(@Res() res: any, @Body() userDto: signIn): Promise<void> {
        const user = await this.userService.login(userDto);
        res.status(HttpStatus.OK).json(user);
    }

    @Get('getalluser')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async getUsers(@Res() res: Response, @getUserId() user: Users) {
        const currentUserId = user; // 현재 사용자의 userId를 받아온다

        const users = await this.userService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }
}
