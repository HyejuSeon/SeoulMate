import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/users/users.entity';

export const getUserId = createParamDecorator(
    (data, ctx: ExecutionContext): Users => {
        const req = ctx.switchToHttp().getRequest();
        return req.user.user_id;
    },
);
