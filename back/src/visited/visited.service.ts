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
        any
    > {
        try {
            const { page, perPage, landmark_id, user_id } = query;
            if (landmark_id === undefined && user_id === undefined) {
                throw new ConflictException(
                    'landmark_id or user_id is required',
                );
            }
            if (page === undefined || perPage === undefined) {
                const visited = await this.visitedRepository
                    .createQueryBuilder('visited')
                    .where('visited.landmark_id= :landmark_id', {
                        landmark_id,
                    })
                    .orWhere('visited.user_id= :user_id', { user_id })
                    .getMany();
                return { payloads: [...visited], totalPages: 1 };
            }

            const skip = perPage * (page - 1);
            const [visited, count] = await this.visitedRepository
                .createQueryBuilder('visited')
                .where('visited.landmark_id= :landmark_id', { landmark_id })
                .orWhere('visited.user_id= :user_id', { user_id })
                .take(perPage)
                .skip(skip)
                .getManyAndCount();

            const totalPages = Math.ceil(count / perPage);
            const payloads = visited;
            return { payloads, totalPages };
        } catch (err) {
            console.log(err);
        }
    }

    async getVisitedByIndex(index: number): Promise<any> {
        try {
            const result = await this.visitedRepository
                .createQueryBuilder('visited')
                .where('visited.index = :index', { index })
                .getRawOne();
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async delete(index: number): Promise<any> {
        try {
            const result = await this.visitedRepository
                .createQueryBuilder('visited')
                .delete()
                .where('visited.index = :index', { index })
                .execute();
            return result;
        } catch (err) {
            console.log(err);
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

    async getTop() {
        try {
            const result = await this.visitedRepository
                .createQueryBuilder('visited')
                .select('visited.landmark_id AS landmark_id')
                .addSelect('COUNT(*) AS visitedCount')
                .groupBy('visited.landmark_id')
                .orderBy('visitedCount', 'DESC')
                .take(4)
                .getRawMany();

            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
