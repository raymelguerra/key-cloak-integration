import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CustomConfigModule } from 'src/config/config.module';
import { UserController } from './user.controller';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoleService } from './services/role.service';

@Module({
  imports: [CustomConfigModule, InfrastructureModule],
  providers: [UserService, RoleService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
