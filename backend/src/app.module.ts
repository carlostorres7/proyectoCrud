import { Module } from '@nestjs/common';
import { UsersModule } from './pages/users/users.module';
import { TaskModule } from './pages/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule, 
    TaskModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
