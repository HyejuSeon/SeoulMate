import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { Users } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
import { currentUserInfo } from './dto/current-user.dto';
import { resetPassword } from './dto/find.password.input.dto';
import { EmailService } from 'src/email/email.service';
import { updateUserDto } from './dto/update.user.dto';
import { deleteUser } from './dto/delete-user.dto';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly authService: AuthService,
        private readonly mailService: EmailService,
        private readonly storageService: StorageService,
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

    async sendMailForResetPassword(resetInfo: resetPassword) {
        const randNumber: number = Math.ceil(
            Math.random() * (999999999 - 111111111) + 111111111,
        );
        await this.authService.resetPassword(
            randNumber.toString(),
            resetInfo.email,
            resetInfo.name,
        );
        await this.mailService.sendMemberJoinVerification(
            randNumber.toString(),
            resetInfo.email,
        );
    }

    async updateUserInfo(
        updateUser: {
            name: any;
            profile_image: any;
            prePassword: any;
            newPassword: any;
        },
        user_id: string,
        file: Express.Multer.File,
    ) {
        const user = await this.userRepository.findOneBy({
            user_id: user_id,
        });
        await this.authService.verifyPassword(
            // 비밀번호 확인
            updateUser.prePassword,
            user.password,
        );
        if (file) {
            await this.storageService.save(
                'profile/' + updateUser.profile_image,
                file.mimetype,
                file.buffer,
                [{ img_name: updateUser.profile_image }],
            );
        }

        if (updateUser.newPassword.length !== 0) {
            // new password가 존재하는 경우
            user.password = await this.authService.hashedPassword(
                updateUser.newPassword,
            );
        }

        user.name = updateUser.name || user.name;
        user.profile_image = updateUser.profile_image || user.profile_image;

        await this.userRepository.save(user);
    }

    async deleteUser(userPassword: deleteUser, userId: string) {
        const user = await this.userRepository.findOne({
            where: { user_id: userId },
        });
        await this.authService.verifyPassword(
            userPassword.password,
            user.password,
        );
        await this.userRepository.delete({ user_id: userId });
        return 'user deleted';
    }
}
