import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { resetPassword } from 'src/users/dto/find.password.input.dto';
import { AuthService } from 'src/auth/auth.service';

interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
                user: 'leo503801@naver.com',
                pass: 'dltkddnjs!!',
            },
        });
    }

    async sendMemberJoinVerification(newPassword: string, email: string) {
        const mailOptions: EmailOptions = {
            from: 'leo503801@naver.com',
            to: email,
            subject: '비밀번호가 초기화가 되었습니다',
            html: `초기화된 비밀번호 입니다<br>로그인 후 비밀번호를 변경해 주세요.<br><p>${newPassword}</p>`,
        };

        return await this.transporter.sendMail(mailOptions);
    }
}
