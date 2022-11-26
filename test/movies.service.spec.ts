import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepository } from './../src/movies/movies.repository';
import { MovieService } from './../src/movies/movies.service';
import { Movie } from './../src/movies/movies.entity';
import {
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

const mockMovieRepository = () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  findUsers: jest.fn(),
  update: jest.fn(),
});

describe('UsersService', () => {
    let movieRepository;
    let service;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            MovieService,
          {
            provide: MovieRepository,
            useFactory: mockMovieRepository,
          },
        ],
      }).compile();
  
      movieRepository = await module.get<MovieRepository>(MovieRepository);
      service = await module.get<MovieService>(MovieService);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(MovieRepository).toBeDefined();
    });

    describe('createMovie', () => {
        let mockCreateMovie: Movie;
    
        beforeEach(() => {
            mockCreateMovie = {
            id: '15245412fd',
            name: 'email@email.com',
            description: 'File sobre o castelo animado',
            genre: 'Terror',
            createdAt: new Date("1995-12-17T03:24:00"),
            updatedAt: new Date("1995-12-17T03:24:00"),
            affected: null,
            save: null,
            reload: null,
            remove: null,
            hasId: null,
            recover: null,
            softRemove: null,
          };
        });
    
        it('Deve ser criado um filme novo', async () => {
          movieRepository.createUser.mockResolvedValue('mockMovie');
          const result = await service.createAdminUser(mockCreateMovie);
    
          expect(movieRepository.createUser).toHaveBeenCalledWith(
            mockCreateMovie,
          );
          expect(result).toEqual('mockUser');
        });
    
      });
    });