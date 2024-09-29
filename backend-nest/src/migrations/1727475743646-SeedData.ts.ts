import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1620000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      
-- Добавление расширения PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Создание таблицы для станций метро
CREATE TABLE metro_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,                     -- Название станции должно быть уникальным
    position GEOGRAPHY(Point, 4326) NOT NULL,              -- Географическое положение станции (широта, долгота)
    morning_traffic DECIMAL(10, 2) NOT NULL,               -- Пассажиропоток утром, тыс. чел./час
    evening_traffic DECIMAL(10, 2) NOT NULL,               -- Пассажиропоток вечером, тыс. чел./час
    capacity INTEGER NOT NULL                                 -- Пропускная способность, тыс. чел./час
);

-- Создание таблицы для дорог
CREATE TABLE roads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,                      -- Название дороги должно быть уникальным
    geometry GEOGRAPHY(LINESTRING, 4326) NOT NULL,         -- Геометрия дороги (линия, а не точка)
    morning_traffic DECIMAL(10, 2) NOT NULL,               -- Пассажиропоток утром, машин/час
    evening_traffic DECIMAL(10, 2) NOT NULL,               -- Пассажиропоток вечером, машин/час
    capacity INTEGER NOT NULL                                 -- Пропускная способность, машин/час
);

-- Создание таблицы типов строительства
CREATE TABLE construction_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,                      -- Название типа должно быть уникальным
    floor_area DECIMAL(10, 2) NOT NULL                              -- Поэтажная площадь (м²)
);

-- Создание таблицы для строительных зон
CREATE TABLE construction_zones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,                      -- Название проекта должно быть уникальным
    area GEOGRAPHY(POLYGON, 4326) NOT NULL                  -- Географическое положение строительной зоны (полигон)
);

CREATE TABLE construction_zone_areas (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER NOT NULL REFERENCES construction_zones(id) ON DELETE CASCADE,          -- Зона (внешний ключ)
    construction_type_id INTEGER NOT NULL REFERENCES construction_types(id) ON DELETE CASCADE, -- Тип площади (внешний ключ)
    zone_area DECIMAL(10, 2) NOT NULL,
    UNIQUE(zone_id, construction_type_id)                    -- Уникальная комбинация зоны и типа строительства
);

-- Создание таблицы для трафика станций метро в зоне строительства
CREATE TABLE zone_metro_traffic (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER NOT NULL REFERENCES construction_zones(id) ON DELETE CASCADE,              -- Зона (внешний ключ)
    metro_station_id INTEGER NOT NULL REFERENCES metro_stations(id) ON DELETE CASCADE        -- Станция метро (внешний ключ)
);

-- Создание таблицы для трафика дорог в зоне строительства
CREATE TABLE zone_road_traffic (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER NOT NULL REFERENCES construction_zones(id) ON DELETE CASCADE,               -- Зона (внешний ключ)
    road_id INTEGER NOT NULL REFERENCES roads(id) ON DELETE CASCADE                          -- Дорога (внешний ключ)
);

-- Добавление дороги Сергия Радонежского
INSERT INTO roads (name, geometry, morning_traffic, evening_traffic, capacity)
VALUES (
    'Сергия Радонежского',
    ST_GeomFromText('LINESTRING(37.676155 55.746996, 37.679910 55.746687)', 4326),
    2400,    -- Пример утреннего трафика 
    2400,    -- Пример вечернего трафика 
    3427      -- Пример пропускной способности 
);

-- Добавление дороги Гжельский переулок
INSERT INTO roads (name, geometry, morning_traffic, evening_traffic, capacity)
VALUES (
    'Гжельский переулок',
    ST_GeomFromText('LINESTRING(37.676434 55.748024, 37.680704 55.747546)', 4326),
    150,     -- Пример утреннего трафика
    150,     -- Пример вечернего трафика 
    500      -- Пример пропускной способности 
);

-- Добавление дороги Золоторожский Вал
INSERT INTO roads (name, geometry, morning_traffic, evening_traffic, capacity)
VALUES (
    'Золоторожский Вал',
    ST_GeomFromText('LINESTRING(37.680038 55.746760, 37.681326 55.747934)', 4326),
    300,     -- Пример утреннего трафика 
    300,     -- Пример вечернего трафика
    600      -- Пример пропускной способности 
);

-- Добавление станции метро Площадь Ильича
INSERT INTO metro_stations (name, position, morning_traffic, evening_traffic, capacity)
VALUES (
    'Площадь Ильича',
    ST_GeomFromText('POINT(37.680832 55.747312)', 4326),  
    8.4,     -- Пример утреннего трафика 
    5.6,     -- Пример вечернего трафика 
    16       -- Пример пропускной способности 
);

-- Добавление станции метро Серп и Молот
INSERT INTO metro_stations (name, position, morning_traffic, evening_traffic, capacity)
VALUES (
    'Серп и Молот',
    ST_GeomFromText('POINT(37.682443 55.747969)', 4326),  
    1,       -- Пример утреннего трафика 
    3.5,     -- Пример вечернего трафика 
    5        -- Пример пропускной способности 
);

-- Добавление станции метро Римская
INSERT INTO metro_stations (name, position, morning_traffic, evening_traffic, capacity)
VALUES (
    'Римская',
    ST_GeomFromText('POINT(37.680089 55.746936)', 4326),   
    4.6,     -- Пример утреннего трафика 
    6.6,     -- Пример вечернего трафика 
    16       -- Пример пропускной способности 
);

-- Добавление записей в таблицу типов строительства
INSERT INTO construction_types (name, floor_area)
VALUES
    ('Жилые помещения Категория 1', 25),  -- Примерное значение поэтажной площади для категории 1 (м²)
    ('Жилые помещения Категория 2', 45),  -- Примерное значение поэтажной площади для категории 2 (м²)
    ('Офисные помещения', 35);            -- Примерное значение поэтажной площади для офисных помещений (м²)
DO $$
DECLARE
    construction_zone_id INTEGER;  -- Объявление переменной для хранения id
BEGIN
-- Добавление зоны строительства с полигоном (указан id типа строительства)
INSERT INTO construction_zones (name, area)
VALUES (
    'Демо площадь',
    ST_GeomFromText('POLYGON((
         37.676686 55.749210,
         37.676514 55.748127,
         37.680741 55.747649,
         37.681460 55.748224,
         37.678982 55.748914,
         37.676686 55.749210
    ))', 4326)
) RETURNING id INTO construction_zone_id;  -- Сохранение id зоны для последующих вставок

-- Привязка дороги "Сергия Радонежского" (road_id = 1) к зоне
INSERT INTO zone_road_traffic (zone_id, road_id)
VALUES (construction_zone_id, 1);  -- Замените на фактический id зоны

-- Привязка дороги "Гжельский переулок" (road_id = 2) к зоне
INSERT INTO zone_road_traffic (zone_id, road_id)
VALUES (construction_zone_id, 2);  -- Замените на фактический id зоны

-- Привязка дороги "Золоторожский Вал" (road_id = 3) к зоне
INSERT INTO zone_road_traffic (zone_id, road_id)
VALUES (construction_zone_id, 3);  -- Замените на фактический id зоны

-- Привязка станции метро "Площадь Ильича" (metro_station_id = 1) к зоне
INSERT INTO zone_metro_traffic (zone_id, metro_station_id)
VALUES (construction_zone_id, 1);  -- Замените на фактический id зоны

-- Привязка станции метро "Серп и Молот" (metro_station_id = 2) к зоне
INSERT INTO zone_metro_traffic (zone_id, metro_station_id)
VALUES (construction_zone_id, 2);  -- Замените на фактический id зоны

-- Привязка станции метро "Римская" (metro_station_id = 3) к зоне
INSERT INTO zone_metro_traffic (zone_id, metro_station_id)
VALUES (construction_zone_id, 3);  -- Замените на фактический id зоны

INSERT INTO construction_zone_areas (zone_id, construction_type_id, zone_area)
VALUES
    (construction_zone_id, 1, 190000), -- Связка зоны 1 с типом "Жилые помещения Категория 1"
    (construction_zone_id, 3, 214000); -- Связка зоны 2 с типом "Офисные помещения"
	END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE zone_metro_traffic;`);
    await queryRunner.query(`DROP TABLE zone_road_traffic;`);
    await queryRunner.query(`DROP TABLE construction_zone_areas;`);
    await queryRunner.query(`DROP TABLE construction_zones;`);
    await queryRunner.query(`DROP TABLE construction_types;`);
    await queryRunner.query(`DROP TABLE roads;`);
    await queryRunner.query(`DROP TABLE metro_stations;`);
  }
}
