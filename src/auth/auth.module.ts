import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { CustomConfigModule } from 'src/config/config.module';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';

@Module({
  imports: [CustomConfigModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
