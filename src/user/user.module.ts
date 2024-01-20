import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CustomConfigModule } from 'src/config/config.module';

@Module({
  imports: [CustomConfigModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
