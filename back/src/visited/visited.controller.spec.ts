import { Test, TestingModule } from '@nestjs/testing';
import { VisitedController } from './visited.controller';

describe('VisitedController', () => {
  let controller: VisitedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitedController],
    }).compile();

    controller = module.get<VisitedController>(VisitedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
