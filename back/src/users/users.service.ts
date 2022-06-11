import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { Users } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
import { currentUserInfo } from './dto/current-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { insertEmail } from './dto/find.password.input.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly authService: AuthService,
        private readonly mailService: MailerService,
    ) {}

    async create(userDto: insertUserDto): Promise<Users> {
        // 사용자 등록
        const newUser = await this.authService.register(userDto);
        const user = this.userRepository.save(newUser);
        return user;
    }

    async logout(userId: string) {
        // logout 시 refresh tonen null로 저장
    }

    async getAllUsers(): Promise<Users[]> {
        const users = await this.userRepository.find({});
        return users;
    }

    async getCurrentUserInfo(id: string): Promise<currentUserInfo> {
        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });
        const { password, hashedRefreshToken, ...userInfo } = user;
        return userInfo;
    }

    async sendMailForResetPassword(email: insertEmail) {
        console.log(email.email);

        const randNumber: number = Math.ceil(
            Math.random() * (9999999 - 1111111) + 1111111,
        );
        try {
            await this.mailService.sendMail({
                to: email.email,
                from: 'dev.nowgnas@gmail.com',
                subject: '이메일 인증 요청 메일입니다.',
                html: '인증 코드: ' + `<b>${randNumber}</b>`,
            });
            return randNumber;
        } catch (error) {
            throw new Error(error);
        }
    }
}
