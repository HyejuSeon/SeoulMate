import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs';
import { Repository } from 'typeorm';
import { Landmark } from './landmarks.entity';

@Injectable()
export class LandmarksService {
    constructor(
        @Inject('LANDMARKS_REPOSITORY')
        private landmarksRepository: Repository<Landmark>,
    ) {}

    async getLandmarks(): Promise<Landmark> {
        const filePath =
            '/Users/hongjiun/Downloads/007/라벨링데이터/서울특별시';
        try {
            fs.readdir(filePath, (err, files) => {
                files.forEach((file) => console.log(file));
            });
            return;
        } catch (err) {
            console.log(err);
        }
    }
}
