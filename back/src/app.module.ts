import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ExceptionModule } from './exception/exception.module';

@Module({
    imports: [UsersModule, DatabaseModule, ExceptionModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
