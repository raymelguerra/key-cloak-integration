import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { CustomConfigModule } from 'src/config/config.module';

@Module({
  imports: [CustomConfigModule],
  providers: [ClientService],
  exports: [ClientService]
})
export class InfrastructureModule {}
