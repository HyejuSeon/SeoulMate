import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comments } from './comment.entity';
import { getCommentDto } from './dto/get.comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @Inject('COMMENT_REPOSITORY')
        private commentRepository: Repository<Comment>,
    ) {}

    async create(postComment, user_id): Promise<any> {
        try {
            const comment = {
                ...postComment,
                user_id: user_id,
            };
            const result = await this.commentRepository.save(comment);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async getCommentsByQuery(query: getCommentDto): Promise<any> {
        try {
            const { page, perPage, board_id, user_id } = query;
            if (board_id === undefined && user_id === undefined) {
                throw new ConflictException('board_id or user_id is required');
            }
            if (page === undefined || perPage === undefined) {
                const comments = await this.commentRepository
                    .createQueryBuilder('comments')
                    .where('comments.board_id= :board_id', { board_id })
                    .orWhere('comments.user_id= :user_id', { user_id })
                    .getMany();
                return { payloads: [...comments], totalPages: 1 };
            }

            const skip = perPage * (page - 1);
            const [comments, count] = await this.commentRepository
                .createQueryBuilder('comments')
                .where('comments.board_id= :board_id', { board_id })
                .orWhere('comments.user_id= :user_id', { user_id })
                .take(perPage)
                .skip(skip)
                .getManyAndCount();

            const totalPages = Math.ceil(count / perPage);
            const payloads = comments;
            return { payloads, totalPages };
        } catch (err) {
            console.log(err);
        }
    }

    async getCommentByCommentId(comment_id: string): Promise<any> {
        try {
            const comment = await this.commentRepository
                .createQueryBuilder('comments')
                .where('comments.comment_id =: comment_id', { comment_id })
                .getRawOne();
            return comment;
        } catch (err) {
            console.log(err);
        }
    }

    async updateComment(update): Promise<any> {
        try {
            const updateResult = await this.commentRepository
                .createQueryBuilder('comments')
                .update(Comments)
                .set({ content: update.content })
                .where('comment_id = :comment_id', {
                    comment_id: update.comment_id,
                })
                .execute();
            return updateResult;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteComment(comment_id): Promise<any> {
        try {
            await this.commentRepository
                .createQueryBuilder('comments')
                .delete()
                .from(Comments)
                .where('comment_id = :comment_id', { comment_id })
                .execute();
        } catch (err) {
            console.log(err);
        }
    }
}
