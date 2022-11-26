import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MovieController } from './movies.controller';
import { MovieService } from './movies.service';
import { MovieRepository } from './movies.repository';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],

})
export class MoviesModule {}