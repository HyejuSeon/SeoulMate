import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const refreshAccessToken = createParamDecorator(
    (data, ctx: ExecutionContext): string => {
        const req = ctx.switchToHttp().getRequest();

        return req.user;
    },
);
