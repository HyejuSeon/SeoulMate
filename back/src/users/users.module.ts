import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { userProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'dev.nowgnas@gmail.com',
                    pass: 'dltkddnjs!!',
                },
            },
            preview: false,
        }),
    ],
    providers: [UsersService, ...userProviders],
    controllers: [UsersController],
})
export class UsersModule {}
// https://codingtricks.io/send-emails-with-nestjs/
