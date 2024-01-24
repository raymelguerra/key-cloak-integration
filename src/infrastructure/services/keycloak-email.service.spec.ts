import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakEmailService } from './keycloak-email.service';

describe('KeycloakEmailService', () => {
  let service: KeycloakEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakEmailService],
    }).compile();

    service = module.get<KeycloakEmailService>(KeycloakEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
