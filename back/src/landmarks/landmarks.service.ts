import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { initLandmarkDto } from './dto/init-landmark.dto';
import { Landmark } from './landmarks.entity';
const fs = require('fs');
const path = require('path');

const filePath = '../../data';

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
            array.forEach((landmark: initLandmarkDto) =>
                this.landmarksRepository.save({ ...landmark }),
            );
            return array;
        } catch (error) {
            console.log(error);
        }
    }
}
