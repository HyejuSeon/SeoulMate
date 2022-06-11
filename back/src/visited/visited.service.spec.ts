import { Test, TestingModule } from '@nestjs/testing';
import { VisitedService } from './visited.service';

describe('VisitedService', () => {
  let service: VisitedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitedService],
    }).compile();

    service = module.get<VisitedService>(VisitedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
