import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { saveVisitedDto } from './dto/save.visited.dto';
import { returnVisitedDto } from './dto/return.visited.dto';
import { Visited } from './visited.entity';

@Injectable()
export class VisitedService {
    constructor(
        @Inject('VISITED_REPOSITORY')
        private visitedRepository: Repository<Visited>,
    ) {}

    async getVisited(
        query: returnVisitedDto,
    ): Promise<
        { payloads: Visited[]; totalPages: number } | { ErrorMessage: string }
    > {
        try {
            const { page, perPage, landmark_id, user_id } = query;
            if (landmark_id === undefined && user_id === undefined) {
                throw new ConflictException(
                    'landmark_id or user_id is required',
                );
            }
            if (page === undefined || perPage === undefined) {
                const visited = await this.visitedRepository.find({
                    where: { landmark_id, user_id },
                });
                return { payloads: [...visited], totalPages: 1 };
            }
            const [visited, count] = await this.visitedRepository.findAndCount({
                skip: perPage * (page - 1),
                take: perPage,
            });
            const totalPages = Math.ceil(count / perPage);
            const payloads = visited;
            return { payloads, totalPages };
        } catch (error) {
            console.log(error);
        }
    }
    async create(visitedDto: saveVisitedDto): Promise<any> {
        try {
            const result = await this.visitedRepository.save({ ...visitedDto });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
