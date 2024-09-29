import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sa',
  logging: true,
  synchronize: false,
  migrationsRun: false,
  database: 'construction_db',
  entities: ['./src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
});
