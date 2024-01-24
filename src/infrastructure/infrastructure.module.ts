import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { CustomConfigModule } from 'src/config/config.module';
import { KeycloakEmailService } from './services/keycloak-email.service';

@Module({
  imports: [CustomConfigModule],
  providers: [ClientService, KeycloakEmailService],
  exports: [ClientService, KeycloakEmailService],
})
export class InfrastructureModule {}
