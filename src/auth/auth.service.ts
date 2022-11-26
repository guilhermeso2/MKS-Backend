import { Injectable, UnprocessableEntityException, UnauthorizedException, Get} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/create-user.dto';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user.roles.enum';
import { CredentialsDto } from '../users/credentials-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
      ) {}
    
      async signUp(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
          throw new UnprocessableEntityException('As senhas não conferem');
        } else {
          return await this.userRepository.createUser(createUserDto, UserRole.USER);
        }
      }

      async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);
    
        if (user === null) {
          throw new UnauthorizedException('Credenciais inválidas');
        }
    
        const jwtPayload = {
          id: user.id,
        };
        const token = await this.jwtService.sign(jwtPayload);
    
        return { token };
      }
    
      async getUser(id: string) {
        return await this.userRepository.findOne(id);
      }
}
