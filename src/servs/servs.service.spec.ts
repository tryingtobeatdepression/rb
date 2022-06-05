import { Test, TestingModule } from '@nestjs/testing';
import { ServsService } from './servs.service';

describe('ServsService', () => {
  let service: ServsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServsService],
    }).compile();

    service = module.get<ServsService>(ServsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
