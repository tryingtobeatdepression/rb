import { Test, TestingModule } from '@nestjs/testing';
import { ServsController } from './servs.controller';

describe('ServsController', () => {
  let controller: ServsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServsController],
    }).compile();

    controller = module.get<ServsController>(ServsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
