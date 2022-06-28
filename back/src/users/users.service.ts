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
import { updatePassword } from './dto/update-password.dto';

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
        );
        await this.mailService.sendMemberJoinVerification(
            randNumber.toString(),
            resetInfo.email,
        );
    }

    async updateUserInfo(
        updateUser: updateUserDto,
        user_id: string,
        file: Express.Multer.File,
    ) {
        let profile_image: string;
        // update user info
        const user = await this.userRepository.findOneBy({
            user_id: user_id,
        });
        await this.authService.verifyPassword(
            // 비밀번호 확인
            updateUser.prePassword,
            user.password,
        );

        if (file) {
            // image 이름 지정해 주기
            profile_image = `${Date.now()}_${user_id}`;
            await this.storageService.save(
                'profile/' + profile_image,
                file.mimetype,
                file.buffer,
                [{ img_name: profile_image }],
            );
        }

        user.name = updateUser.name || user.name;
        user.profile_image =
            `https://storage.googleapis.com/landmark_service_images/profile/${profile_image}` ||
            user.profile_image;

        await this.userRepository.save(user);
        return 'user info updated';
    }

    async updatePassword(updatePassword: updatePassword, userId: string) {
        // update user
        const user = await this.userRepository.findOneBy({
            user_id: userId,
        });
        await this.authService.verifyPassword(
            // 비밀번호 확인
            updatePassword.prePassword,
            user.password,
        );

        if (updatePassword.newPassword.length !== 0) {
            // new password가 존재하는 경우
            user.password = await this.authService.hashedPassword(
                updatePassword.newPassword,
            );
        }
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

    async getExperience(userId: string, exp: number) {
        const user = await this.userRepository.findOneBy({ user_id: userId });
        user.exp = user.exp + exp;
        // 등급도 조건에 따라 변경해줘야 함
        user.rating = Number(user.exp / 200);
        await this.userRepository.save(user);
    }
}
