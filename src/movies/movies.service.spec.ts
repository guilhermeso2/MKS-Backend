import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepository } from './movies.repository';
import { MovieService } from './movies.service';
import { Movie } from './movies.entity';
import {
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';


const mockUserRepository = () => ({
  create: jest.fn(),
  movieCreated: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  findUsers: jest.fn(),
  update: jest.fn(),
});

describe('ProductService', () => {
  let service: MovieService;
  let movieService;
  let movieRepository;

  beforeEach(async () => {
    let userRepository;
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService,
        {
          provide: MovieRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();
    movieService =  await module.get<MovieService>(MovieService);
    movieRepository = await module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  describe('createMovie', () => {
    it('should save a movie in the database', async () => {
      movieRepository.create.mockResolvedValue('someMovie');
      expect(movieRepository.movieCreated).not.toHaveBeenCalled();
      const movieMock: Movie = {
        id: '1524',
        name: 'Luiz Felipe',
        genre: 'terror',
        description: 'M',
        save: null,
        createdAt: new Date("December 17, 1995 03:24:00"),
        updatedAt: new Date("December 17, 1995 03:24:00"),
        hasId: null,
        recover: null,
        remove: null,
        softRemove: null,
        reload: null,
        affected: null
      }
      const result = movieService.create(movieMock);
      console.log(result)
      expect(movieRepository.create).toHaveBeenCalledWith(
        movieMock,
      );

    });
  });
});