import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.provider';
import { CommentService } from './comment.service';

@Module({
    imports: [DatabaseModule, UsersModule],
    controllers: [CommentController],
    providers: [...commentProviders, CommentService],
})
export class CommentModule {}
