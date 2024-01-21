import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CustomConfigModule } from 'src/config/config.module';
import { UserController } from './user.controller';

@Module({
  imports: [CustomConfigModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
