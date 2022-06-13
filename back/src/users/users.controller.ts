import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Patch,
    Post,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { insertUserDto } from './dto/insert.user.dto';
import { signIn } from './dto/signin.dto';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { userResultDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getUserRequest } from 'src/common/decorator/request.decorator';
import { LocalGuard } from 'src/auth/guard/local.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { currentUserInfo } from './dto/current-user.dto';
import { insertEmail } from './dto/find.password.input.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('registration') // http method
    @UsePipes(ValidationPipe) // validation pipe
    @ApiBody({ type: insertUserDto }) // swagger body
    @ApiResponse({
        status: 201,
        description: 'user created',
    })
    async createUser(
        @Res() res: any,
        @Body() userDto: insertUserDto,
    ): Promise<void> {
        //   사용자 회원가입
        await this.userService.create(userDto);
        const succMessage = 'user created';
        res.status(HttpStatus.CREATED).json(succMessage);
    }

    @Patch('correction/:id')
    async setUser(): Promise<void> {
        //   사용자 정보 수정
    }

    @Post('login')
    @UseGuards(LocalGuard)
    @UsePipes(ValidationPipe)
    @ApiBody({ type: signIn })
    @ApiResponse({
        status: 200,
        description: 'login succc',
        type: userResultDto,
    })
    async login(
        @getUserRequest() user: Users,
        @Res() res: Response,
    ): Promise<void> {
        res.status(HttpStatus.OK).json(user);
    }

    @Get('getalluser')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async getUsers(@Res() res: Response, @getUserRequest() user: Users) {
        const currentUserId = user.user_id;
        console.log(currentUserId);

        const users = await this.userService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    @ApiBearerAuth()
    @ApiHeader({ name: 'x-refresh-token' })
    async refresh(@Res() res: Response, @getUserRequest() user: any) {
        const { token } = user;
        res.status(HttpStatus.OK).json(token);
    }

    @Get('current/info')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiResponse({
        type: currentUserInfo,
    })
    async currentUserInfo(@getUserRequest() user: Users, @Res() res: Response) {
        const currentUserId = user.user_id;
        res.status(HttpStatus.OK).json(
            await this.userService.getCurrentUserInfo(currentUserId),
        );
    }

    @Post('reset/password')
    @ApiBody({ type: insertEmail })
    async sendMailForResetPassword(@Body() email: insertEmail) {
        await this.userService.sendMailForResetPassword(email);
    }
}
