import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from 'src/auth/jwt.service';

@Injectable()
export class loginRequiredMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization.split(' ')[1];
        const result = await this.jwtService.verity(token);
        if (!result.status) {
            throw new TokenExpiredError('token is expires', new Date());
        }

        next();
    }
}
