import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getCommentDto } from './dto/get.comment.dto';
import { postCommentDto } from './dto/post.comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @Inject('COMMENT_REPOSITORY')
        private commentRepository: Repository<Comment>,
    ) {}

    async create(postComment: postCommentDto): Promise<any> {
        try {
            const comment = {
                ...postComment,
            };
            const result = await this.commentRepository.save({});
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async getComments(query: getCommentDto): Promise<any> {
        try {
        } catch (err) {
            console.log(err);
        }
    }

    async updateComment(): Promise<any> {
        try {
        } catch (err) {
            console.log(err);
        }
    }

    async deleteComment(): Promise<any> {
        try {
        } catch (err) {
            console.log(err);
        }
    }
}
