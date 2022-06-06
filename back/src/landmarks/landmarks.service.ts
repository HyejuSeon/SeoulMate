import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Landmark } from './landmarks.entity';
const fs = require('fs');
const path = require('path');

const filePath = '/Users/hongjiun/Downloads/007/라벨링데이터/서울특별시';

@Injectable()
export class LandmarksService {
    constructor(
        @Inject('LANDMARKS_REPOSITORY')
        private landmarksRepository: Repository<Landmark>,
    ) {}

    async init(): Promise<Landmark> {
        try {
            const data = fs.readFileSync(
                path.join(filePath, 'data.json'),
                'utf8',
            );
            const array = JSON.parse(data);
            array.forEach((landmark) =>
                this.landmarksRepository.save({ ...landmark }),
            );
            return array;
        } catch (error) {
            console.log(error);
        }
    }
}
