import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Patch,
    Post,
    Put,
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
import { resetPassword } from './dto/find.password.input.dto';
import { EmailService } from 'src/email/email.service';
import { updateUserDto } from './dto/update.user.dto';
import { deleteUser } from './dto/delete-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly emailService: EmailService,
    ) {}

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
    @ApiBody({ type: resetPassword })
    async sendMailForResetPassword(@Body() resetInfo: resetPassword) {
        await this.userService.sendMailForResetPassword(resetInfo);
    }

    @Patch('update')
    @ApiBody({ type: updateUserDto })
    @UseGuards(JwtGuard)
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    async updateUserInfo(
        @Body() updateUser: updateUserDto,
        @getUserRequest() user: Users,
    ) {
        await this.userService.updateUserInfo(updateUser, user.user_id);
    }

    @Delete('delete')
    @ApiBody({ type: deleteUser })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async delete(
        @Body() userPassword: deleteUser,
        @getUserRequest() user: Users,
        @Res() res: Response,
    ) {
        const deleteUser = await this.userService.deleteUser(
            userPassword,
            user.user_id,
        );
        res.status(HttpStatus.OK).json(deleteUser);
    }
}
