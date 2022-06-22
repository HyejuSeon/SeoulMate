import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { saveVisitedDto } from './dto/save.visited.dto';
import { returnVisitedDto } from './dto/return.visited.dto';
import { Visited } from './visited.entity';
import { updateVisitedDto } from './dto/update.visited.dto';
import { topVisitedDto } from './dto/top.visited.dto';

@Injectable()
export class VisitedService {
    constructor(
        @Inject('VISITED_REPOSITORY')
        private visitedRepository: Repository<Visited>,
    ) {}
    async update(visitedDto: updateVisitedDto) {
        throw new Error('Method not implemented.');
    }
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
    async create(visitedDto: saveVisitedDto, imageId: string): Promise<any> {
        try {
            const { landmark_id, user_id } = visitedDto;
            const result = await this.visitedRepository.save({
                landmark_id,
                user_id,
                landmark_img: `https://storage.googleapis.com/landmark_service_images/visited/${imageId}`,
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getCount(landmark_id: number) {
        try {
            const result = await this.visitedRepository
                .createQueryBuilder('visited')
                .select('visited.landmark_id AS landmark_id')
                .addSelect('COUNT(*) AS visitedCount')
                .where('visited.landmark_id = :landmark_id', { landmark_id })
                .getRawOne();

            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async getImage(landmark_id: number) {
        try {
            const result = await this.visitedRepository
                .createQueryBuilder('visited')
                .select('visited.landmark_img as landmark_img')
                .where('visited.landmark_id = :landmark_id', { landmark_id })
                .getRawMany();
            const randomIndex = Math.floor(Math.random() * result.length);
            const Result = result[randomIndex];

            return Result;
        } catch (error) {
            console.log(error);
        }
    }

    async getTop(query: topVisitedDto) {
        try {
            const result = await this.visitedRepository
                .createQueryBuilder('visited')
                .select('visited.landmark_id AS landmark_id')
                .addSelect('COUNT(*) AS visitedCount')
                .groupBy('visited.landmark_id')
                .orderBy('visitedCount', 'DESC')
                .take(query.take)
                .getRawMany();

            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
