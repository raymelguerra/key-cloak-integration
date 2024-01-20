import { Test, TestingModule } from '@nestjs/testing';
import { AxiosHttpService } from './axios-http.service';

describe('AxiosHttpService', () => {
  let service: AxiosHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosHttpService],
    }).compile();

    service = module.get<AxiosHttpService>(AxiosHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
