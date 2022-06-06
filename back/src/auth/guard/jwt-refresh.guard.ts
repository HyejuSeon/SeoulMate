import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const next = context.switchToHttp().getNext();

        const tokenVerify = await this.validateRequest(request);
        if (!tokenVerify.status) {
            throw new TokenExpiredError('token expired', new Date());
        }
        request.currentUserId = tokenVerify.id;
        next();
    }

    private async validateRequest(request: Request) {
        const token = request.headers.authorization.split(' ')[1];
        const isVerfiry = await this.jwtService.verity(token);

        return isVerfiry;
    }
}
