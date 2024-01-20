import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakConfigService } from './keycloak-config.service';

describe('KeycloakConfigService', () => {
  let service: KeycloakConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakConfigService],
    }).compile();

    service = module.get<KeycloakConfigService>(KeycloakConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
