import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from 'src/email/email.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [UsersService, ...userProviders, EmailService],
    controllers: [UsersController],
})
export class UsersModule {}
// https://codingtricks.io/send-emails-with-nestjs/
