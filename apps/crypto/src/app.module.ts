import { Module } from '@nestjs/common';
import { User } from 'apps/user/src/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [User],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
