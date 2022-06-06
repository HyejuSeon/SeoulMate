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

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
    ) {}

    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const currentHashedRefreshToken = await hash(refreshToken, 10);
        const userInfo = await this.userRepository.findOneBy({
            user_id: userId,
        });
        userInfo.hashedRefreshToken = currentHashedRefreshToken;
        await this.userRepository.save(userInfo);
    }
    // ---------요청에 대한 동작--------------

    async create(userDto: insertUserDto): Promise<Users> {
        const findUser = await this.userRepository.findOne({
            where: { email: userDto.email },
        });

        // email은 고유해야 함
        if (findUser) {
            throw new ConflictException('User already exist');
        }
        // 사용자 등록 register
        const user_id = uuid();

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDto.password, salt);

        const newUser: saveUserDto = {
            user_id: user_id,
            name: userDto.name,
            email: userDto.email,
            password: hashedPassword,
        };
        const user = this.userRepository.save({ ...newUser });
        return user;
    }

    async login(userDto: signIn): Promise<object> {
        const { email, password } = userDto;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException();
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw new NotAcceptableException();
        }

        // 비밀번호 맞으면 access token 생성
        const token = await this.jwtService.sign(user.user_id);
        const refresh = await this.jwtService.refresh();

        await this.setCurrentRefreshToken(refresh, user.user_id);

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
}
