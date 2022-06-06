import { Module } from '@nestjs/common';
import { JwtService } from 'src/auth/jwt.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { userProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...userProviders, JwtService],
    controllers: [UsersController],
})
export class UsersModule {}
