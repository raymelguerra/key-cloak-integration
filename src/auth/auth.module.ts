import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { CustomConfigModule } from 'src/config/config.module';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { UserService } from 'src/user/services/user.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoleService } from 'src/user/services/role.service';

@Module({
  imports: [CustomConfigModule, InfrastructureModule],
  providers: [AuthService, UserService, RoleService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
