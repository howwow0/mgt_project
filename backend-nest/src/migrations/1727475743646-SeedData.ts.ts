import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1620000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      
-- Добавление расширения PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Создание таблицы для станций метро
CREATE TABLE metro_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,          		   -- Название станции
    position GEOGRAPHY(Point, 4326) NOT NULL,      -- Географическое положение станции (широта, долгота)
    morning_traffic DECIMAL(10, 2) NOT NULL,       -- Пассажиропоток утром, тыс. чел./час
    evening_traffic DECIMAL(10, 2) NOT NULL,       -- Пассажиропоток вечером, тыс. чел./час
    capacity INTEGER NOT NULL                      -- Пропускная способность, тыс. чел./час
);

-- Создание таблицы для дорог
CREATE TABLE roads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,                    -- Название дороги
    geometry GEOGRAPHY(LINESTRING, 4326) NOT NULL, -- Геометрия дороги (линия, а не точка)
    morning_traffic DECIMAL(10, 2) NOT NULL,       -- Пассажиропоток утром, машин/час
    evening_traffic DECIMAL(10, 2) NOT NULL,       -- Пассажиропоток вечером, машин/час
    capacity INTEGER NOT NULL                      -- Пропускная способность, машин/час
);

-- Создание таблицы типов строительства
CREATE TABLE construction_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),                       		     -- Название типа
    floor_area DECIMAL(10, 2)                            -- Поэтажная площадь (м²)
);

-- Создание таблицы для строительных зон
CREATE TABLE construction_zones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,                    -- Название проекта
    area GEOGRAPHY(POLYGON, 4326) NOT NULL,        -- Географическое положение строительной зоны (полигон)
    construction_type_id INTEGER NOT NULL,	       -- Тип площади
    zone_area DECIMAL(10, 2) NOT NULL             -- Площадь зоны (м²)
);

-- Создание таблицы для траффика станций метро в зоне строительства
CREATE TABLE zone_metro_traffic (
    id SERIAL PRIMARY KEY,
	zone_id INTEGER NOT NULL,						   -- Зона
    metro_station_id INTEGER NOT NULL,                 -- Станция метро
    new_traffic DECIMAL(10, 2) NULL,				   -- Новый трафик
    is_defective BOOLEAN NULL				           -- Является ли трафик дефективным
);

-- Создание таблицы для траффика дорог в зоне строительства
CREATE TABLE zone_road_traffic (
    id SERIAL PRIMARY KEY,
	zone_id INTEGER NOT NULL,						   -- Зона
    road_id INTEGER NOT NULL,                   	   -- Дорога
    new_traffic DECIMAL(10, 2) NULL,				   -- Новый трафик
    is_defective BOOLEAN NULL				   -- Является ли трафик дефективным
);

-- Добавление внешнего ключа для связи с таблицей metro_stations
ALTER TABLE zone_metro_traffic
ADD CONSTRAINT metro_station_fk
    FOREIGN KEY (metro_station_id)
    REFERENCES metro_stations (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
	
-- Добавление внешнего ключа для связи с таблицей roads
ALTER TABLE zone_road_traffic
ADD CONSTRAINT road_fk
    FOREIGN KEY (road_id)
    REFERENCES roads (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


-- Добавление внешнего ключа для связи с таблицей construction_types
ALTER TABLE construction_zones 
ADD CONSTRAINT construction_type_fk
    FOREIGN KEY (construction_type_id)
    REFERENCES construction_types (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Добавление внешнего ключа для связи с таблицей zone_metro_traffic
ALTER TABLE zone_metro_traffic
ADD CONSTRAINT zone_metro_fk
    FOREIGN KEY (zone_id)
    REFERENCES construction_zones (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Добавление внешнего ключа для связи с таблицей zone_road_traffic
ALTER TABLE zone_road_traffic
ADD CONSTRAINT zone_road_fk
    FOREIGN KEY (zone_id)
    REFERENCES construction_zones (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Добавление дороги Сергия Радонежского
INSERT INTO roads (name, geometry, morning_traffic, evening_traffic, capacity)
VALUES (
    'Сергия Радонежского',
    ST_GeomFromText('LINESTRING(37.676155 55.746996 , 37.679910 55.746687 )', 4326),
    2400,    -- Пример утреннего трафика 
    2400,    -- Пример вечернего трафика 
    3427      -- Пример пропускной способности 
);

-- Добавление дороги Гжельский переулок
INSERT INTO roads (name, geometry, morning_traffic, evening_traffic, capacity)
VALUES (
    'Гжельский переулок',
    ST_GeomFromText('LINESTRING(37.676434 55.748024 , 37.680704 55.747546)', 4326),
    150,     -- Пример утреннего трафика
    150,    -- Пример вечернего трафика 
    500        -- Пример пропускной способности 
);

-- Добавление дороги Золоторожский Вал
INSERT INTO roads (name, geometry, morning_traffic, evening_traffic, capacity)
VALUES (
    'Золоторожский Вал',
    ST_GeomFromText('LINESTRING(37.680038 55.746760 ,  37.681326 55.747934)', 4326),
    300,    -- Пример утреннего трафика 
    300,    -- Пример вечернего трафика
    600     -- Пример пропускной способности 
);

-- Добавление станции метро Площадь Ильича
INSERT INTO metro_stations (name, position, morning_traffic, evening_traffic, capacity)
VALUES (
    'Площадь Ильича',
    ST_GeomFromText('POINT(37.680832 55.747312 )', 4326),  
    8.4,    -- Пример утреннего трафика 
    5.6,    -- Пример вечернего трафика 
    16        -- Пример пропускной способности 
);

-- Добавление станции метро Серп и Молот
INSERT INTO metro_stations (name, position, morning_traffic, evening_traffic, capacity)
VALUES (
    'Серп и Молот',
    ST_GeomFromText('POINT(37.682443 55.747969 )', 4326),  
    1,    -- Пример утреннего трафика 
    3.5,    -- Пример вечернего трафика 
    5        -- Пример пропускной способности 
);

-- Добавление станции метро Римская
INSERT INTO metro_stations (name, position, morning_traffic, evening_traffic, capacity)
VALUES (
    'Римская',
    ST_GeomFromText('POINT(37.680089 55.746936 )', 4326),   
    4.6,    -- Пример утреннего трафика 
    6.6,    -- Пример вечернего трафика 
    16        -- Пример пропускной способности 
);

-- Добавление записей в таблицу типов строительства
INSERT INTO construction_types (name, floor_area)
VALUES
    ('Жилые помещения Категория 1', 25),  -- Примерное значение поэтажной площади для категории 1 (м²)
    ('Жилые помещения Категория 2', 45),  -- Примерное значение поэтажной площади для категории 2 (м²)
    ('Офисные помещения', 35);            -- Примерное значение поэтажной площади для офисных помещений (м²)


-- Добавление зоны строительства с полигоном и корректными внешними ключами
INSERT INTO construction_zones (name, area, construction_type_id, zone_area)
VALUES (
    'Демо площадь',
    ST_GeomFromText('POLYGON((
         37.676686 55.749210,
         37.676514 55.748127,
         37.680741 55.747649,
         37.681460 55.748224,
         37.678982 55.748914,
         37.676686 55.749210
    ))', 4326),
    3,         -- Примерное значение для типа строительства 
    214000     -- Пример площади зоны 
);

-- Привязка дороги "Сергия Радонежского" (road_id = 1) к зоне 1
INSERT INTO zone_road_traffic (zone_id, road_id, new_traffic, is_defective)
VALUES (1, 1, NULL, NULL);

-- Привязка дороги "Гжельский переулок" (road_id = 2) к зоне 1
INSERT INTO zone_road_traffic (zone_id, road_id, new_traffic, is_defective)
VALUES (1, 2, NULL, NULL);

-- Привязка дороги "Золоторожский Вал" (road_id = 3) к зоне 1
INSERT INTO zone_road_traffic (zone_id, road_id, new_traffic, is_defective)
VALUES (1, 3, NULL, NULL);

-- Привязка станции метро "Площадь Ильича" (metro_station_id = 1) к зоне 1
INSERT INTO zone_metro_traffic (zone_id, metro_station_id, new_traffic, is_defective)
VALUES (1, 1, NULL, NULL);

-- Привязка станции метро "Серп и Молот" (metro_station_id = 2) к зоне 1
INSERT INTO zone_metro_traffic (zone_id, metro_station_id, new_traffic, is_defective)
VALUES (1, 2, NULL, NULL);

-- Привязка станции метро "Римская" (metro_station_id = 3) к зоне 1
INSERT INTO zone_metro_traffic (zone_id, metro_station_id, new_traffic, is_defective)
VALUES (1, 3, NULL, NULL);

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM zone_metro_traffic;
      DELETE FROM zone_road_traffic;
      DELETE FROM construction_zones;
      DELETE FROM construction_types;
      DELETE FROM metro_stations;
      DELETE FROM roads;
    `);
  }
}
