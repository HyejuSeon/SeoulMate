import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
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
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { insertUserDto } from './dto/insert.user.dto';
import { signIn } from './dto/signin.dto';
import { UsersService } from './users.service';
import { getUserId } from 'src/common/decorator/getUserId.decorator';
import { Users } from './users.entity';
import { userResultDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { getUser } from 'src/common/decorator/login.decorator';
import { LocalGuard } from 'src/auth/guard/local.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { refreshAccessToken } from 'src/common/decorator/refresh.decorator';
import { currentUserInfo } from './dto/current-user.dto';

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
    async login(@getUser() user: Users, @Res() res: Response): Promise<void> {
        console.log("user")
        res.status(HttpStatus.OK).json(user);
    }

    @Get('getalluser')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async getUsers(@Res() res: Response, @getUserId() user: Users) {
        const currentUserId = user.user_id;
        console.log(currentUserId);

        const users = await this.userService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    @ApiBearerAuth()
    @ApiHeader({ name: 'x-refresh-token' })
    async refresh(@Res() res: Response, @refreshAccessToken() user: any) {
        const { token } = user;
        res.status(HttpStatus.OK).json(token);
    }

    @Get('current/info')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiResponse({
        type: currentUserInfo,
    })
    async currentUserInfo(@getUserId() user: Users, @Res() res: Response) {
        const currentUserId = user.user_id;
        res.status(HttpStatus.OK).json(
            await this.userService.getCurrentUserInfo(currentUserId),
        );
    }
}
