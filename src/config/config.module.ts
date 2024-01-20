import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './services/keycloak-config.service';
import { AxiosHttpService } from './services/axios-http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [KeycloakConfigService, AxiosHttpService],
  exports: [KeycloakConfigService, AxiosHttpService],
})
export class CustomConfigModule {}
