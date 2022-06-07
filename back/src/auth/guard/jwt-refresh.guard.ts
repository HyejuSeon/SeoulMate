import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '../jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { status, userId } = this.validateRequest(request);
        request.userId = userId;

        return status;
    }

    private validateRequest(request: Request) {
        const token = request.headers.authorization.split(' ')[1];
        const { status, id } = this.jwtService.verity(token);
        return { status: status, userId: id };
    }
}
