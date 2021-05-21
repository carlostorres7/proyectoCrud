import { Module } from '@nestjs/common';
import { UsersModule } from './pages/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
