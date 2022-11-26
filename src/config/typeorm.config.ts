import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'pguser',
  password: 'pgpassword123',
  database: 'MKS-music',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
