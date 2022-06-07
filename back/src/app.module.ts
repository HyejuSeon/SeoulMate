import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/globalexception..filter';
import { AuthModule } from './auth/auth.module';
import { loginRequiredMiddleware } from './middleware/login-required.middleware';
import { JwtRefreshGuard } from './auth/guard/jwt-refresh.guard';

@Module({
    imports: [UsersModule, DatabaseModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: JwtRefreshGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(loginRequiredMiddleware);
    }
}
