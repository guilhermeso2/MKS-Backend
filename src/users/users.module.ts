import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
