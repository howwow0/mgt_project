//src/utils/TrafficUtils.ts

export class TrafficUtils {
  // Коэффицент рабочего населения
  private static WORKING_SITIZEN = 0.57;
  // Коэффицент для рабочей зоны
  private static WORKING_AREA = 35;
  // Коэффицент поездок в центр
  private static TO_CENTER = 0.8;
  // Коэффицент поездок на общественном транспорте
  private static PUBLIC_TRASPORT = 0.7;
  // Тысяча (для перевода в т.)
  private static THOUSAND = 1000;
  // Коэффиццент заполняемости автомобиля
  private static CAR_OCCAPACITY = 1.2;

  // Функция для расчета рабочего населения на объекте
  static countCitizen(zones: any[]): number {
    let res = 0;
    zones.forEach((zone) => {
      if (zone.construction_type.floor_area != TrafficUtils.WORKING_AREA) {
        res += Number(
          (zone.zone_area / zone.construction_type.floor_area) *
            TrafficUtils.WORKING_SITIZEN,
        );
      }
    });
    return res;
  }

  // Функция ддля расчта рабочих мест на объекте с учетом занятых "местными" рабочими
  static countWorkPlace(zones: any[], workers: number): number {
    let res = 0;
    zones.forEach((zone) => {
      if (zone.construction_type.floor_area == TrafficUtils.WORKING_AREA) {
        res += Number(zone.zone_area / zone.construction_type.floor_area);
      }
    });
    return res - workers * (1 - TrafficUtils.TO_CENTER);
  }

  // Функция для расчета нагрузки
  static calcLoad(
    workers: number,
    workPlaces: number,
    isMetro: Boolean,
  ): number {
    return (
      (workers * TrafficUtils.TO_CENTER + workPlaces) *
      (isMetro
        ? TrafficUtils.PUBLIC_TRASPORT / TrafficUtils.THOUSAND
        : (1 - TrafficUtils.PUBLIC_TRASPORT) / TrafficUtils.CAR_OCCAPACITY)
    );
  }

  // Функция для получения суммы нагрузки на метро
  static sumTrafficMetro(zones: any[], isMorning: Boolean): number {
    let res = 0;
    zones.forEach((zone) => {
      console.log(zone.metro_station);
      if (isMorning) {
        res += Number(zone.metro_station.morning_traffic);
      } else {
        res += Number(zone.metro_station.evening_traffic);
      }
    });
    return res;
  }

  // Функция для получения суммы нагрузки на дорогу
  static sumTrafficRoad(zones: any[], isMorning: Boolean): number {
    let res = 0;
    zones.forEach((zone) => {
      if (isMorning) {
        res += Number(zone.road.morning_traffic);
      } else {
        res += Number(zone.road.evening_traffic);
      }
    });
    return res;
  }

  // Функция для расчета нагрузки для отдельного "узла"
  static calcTraffic(
    addTraffic: number,
    oldTraffic: number,
    sumTraffic: number,
  ): number {
    return (addTraffic * oldTraffic) / sumTraffic + Number(oldTraffic);
  }

}
