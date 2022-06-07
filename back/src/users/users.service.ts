import {
    ConflictException,
    Inject,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { insertUserDto } from './dto/insert.user.dto';
import { saveUserDto } from './dto/save.user.dto';
import { Users } from './users.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { signIn } from './dto/signin.dto';
import { JwtService } from 'src/auth/jwt.service';
import { compare, hash } from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
    ) {}

    async create(userDto: insertUserDto): Promise<Users> {
        // 사용자 등록
        const newUser = await this.authService.register(userDto);
        const user = this.userRepository.save(newUser);
        return user;
    }

    async login(userDto: signIn): Promise<object> {
        // login
        const { email, password } = userDto;
        const user = await this.authService.validateUser(email, password);

        // 비밀번호 맞으면 access token 생성
        const token = await this.jwtService.sign(user.user_id);
        const refresh = await this.jwtService.refresh();

        // refresh token 해쉬화해서 db에 저장
        await this.authService.setCurrentRefreshToken(refresh, user.user_id);

        const loggedIn = {
            userId: user.user_id,
            email: user.email,
            name: user.name,
            accessToken: token,
            profileImage: user.profile_image,
            rank: user.rating,
            exp: user.exp,
        };

        return loggedIn;
    }

    async logout(userId: string) {
        // logout 시 refresh tonen null로 저장
    }

    async getAllUsers(): Promise<Users[]> {
        const users = await this.userRepository.find({});
        return users;
    }
}
