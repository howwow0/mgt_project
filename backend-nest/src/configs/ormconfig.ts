import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432, 
  username: 'postgres', //Ваш username
  password: '#qwertyasd123!', //Ваш пароль
  logging: true,
  synchronize: false,
  migrationsRun: false,
  database: 'construction_db', //Ваша БД, ВАЖНО! Ее необходимо самому создать в PostgreSQL
  entities: ['**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.ts'],
});
