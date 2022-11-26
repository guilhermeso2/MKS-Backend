import { EntityManager } from 'typeorm';
import { Movie } from './movies.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class MovieRepository {
  constructor(private manager: EntityManager) {}

  repository = this.manager.getRepository(Movie);

  async findOne(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(
    movie: Movie
  ): Promise<Movie> {
    const { name, description, genre } = movie;

    const movieCreated = this.repository.create();
    movieCreated.name = name;
    movieCreated.description = description;
    movieCreated.genre = genre;
    try {
      await movieCreated.save();
      return movieCreated;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o filme no banco de dados',
      );
    }
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}

