import { Injectable, UnprocessableEntityException, UnauthorizedException, Get, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { MovieRepository } from './movies.repository';
import { Movie } from './movies.entity';

@Injectable()
export class MovieService {
    constructor(
        private movieRepository: MovieRepository,
      ) {}
    

      async findUserById(id: string) {
        const movie = await this.movieRepository.findOne(id);
    
        if (!movie) throw new NotFoundException('Usuário não encontrado');
    
        return movie;
      }

      async create(movie: Movie): Promise<Movie> {
        return this.movieRepository.create(movie)
      }

      async updateMovie(movie: Movie, id: string): Promise<Movie> {
        const movieFinded = await this.findUserById(id);
        const { name, description, genre} = movie;
        movieFinded.name = name ? name : movieFinded.name;
        movieFinded.description = description ? description : movieFinded.description;
        movieFinded.genre = genre ? genre : movieFinded.genre;
        try {
          await movieFinded.save();
          return movieFinded;
        } catch (error) {
          throw new InternalServerErrorException(
            'Erro ao salvar os dados no banco de dados',
          );
        }
      }

      async deleteMovie(movieId: string) {
        const result = await this.movieRepository.delete(movieId);
        if (result.affected === 0) {
          throw new NotFoundException(
            'Não foi encontrado um usuário com o ID informado',
          );
        }
      }
}
