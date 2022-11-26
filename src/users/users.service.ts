import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserRole } from './user.roles.enum';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: string) {
    return await this.userRepository.findOne(id);
  }
  
  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
  }

}
