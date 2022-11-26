import { Controller, Post, Get, Param, Body, ValidationPipe, UseGuards, Req, Patch, ForbiddenException, Delete } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './movies.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get(':id')
  async getMovie(@Param() params: { id: string }) {
    return this.movieService.findUserById(params.id);
  }

  @Post()
  async create(@Body() movie: Movie) {
    const movieCreated = await this.movieService.create(movie);
    if(!movieCreated) {
      return 'Erro ao criar um novo filme!'
    }
    return 'Filme criado com sucesso!'
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) movie: Movie,
    @Param('id') id: string,
  ) {
      return this.movieService.updateMovie(movie, id);
  }
  
  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    await this.movieService.deleteMovie(id);
    return {
      message: 'Filme removido com sucesso',
    };
  }
}
