import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { initLandmarkDto } from './dto/init.landmark.dto';
import { queryLandmarkDto } from './dto/query.landmark.dto';
import { Landmark } from './landmarks.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

@Injectable()
export class LandmarksService {
    constructor(
        @Inject('LANDMARKS_REPOSITORY')
        private landmarksRepository: Repository<Landmark>,
    ) {}

    async init(): Promise<Landmark> {
        try {
            const data = fs.readFileSync('src/data/data.json', 'utf8');
            const description = fs.readFileSync(
                'src/data/description.json',
                'utf8',
            );
            const array = JSON.parse(data);
            const drray = JSON.parse(description);
            array.forEach((landmark) => {
                drray.forEach((des) => {
                    if (des.name === landmark.name) {
                        landmark.description = des.description;
                    }
                });
            });
            array.forEach((landmark: initLandmarkDto) =>
                this.landmarksRepository.save({ ...landmark }),
            );
            return array;
        } catch (error) {
            console.log(error);
        }
    }

    async getLandmarks(): Promise<[Landmark[], number]> {
        try {
            const landmarks = await this.landmarksRepository.findAndCount({});
            return landmarks;
        } catch (error) {
            console.log(error);
        }
    }

    async getLandmarksPaginated(query: queryLandmarkDto): Promise<any> {
        try {
            const { page, perPage, ...conditions } = query;
            const landmarks = await this.landmarksRepository.findAndCount({
                ...conditions,
                skip: perPage * (page - 1),
                take: perPage,
            });
            const totalPages = Math.ceil(landmarks[1] / perPage);
            const payloads = landmarks[0];
            return { payloads, totalPages };
        } catch (error) {
            console.log(error);
        }
    }

    async getLandmarkByLandmarkId(landmark_id: number): Promise<Landmark> {
        try {
            const landmark = await this.landmarksRepository.findOne({
                where: { landmark_id: landmark_id },
            });
            return landmark;
        } catch (error) {
            console.log(error);
        }
    }

    async getLandmarkByLandmarkName(param): Promise<any> {
        try {
            const landmark = await this.landmarksRepository
                .createQueryBuilder('landmark')
                .where('landmark.name = :name', { name: param.landmark_name })
                .getOne();

            return landmark;
        } catch (error) {
            console.log(error);
        }
    }
}
