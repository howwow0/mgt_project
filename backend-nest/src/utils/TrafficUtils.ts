//src/utils/TrafficUtils.ts

export class TrafficUtils {
    private static WORKING_SITIZEN = 0.57;
    private static WORKING_AREA = 35;
    private static TO_CENTER = 0.8;
    private static PUBLIC_TRASPORT = 0.7;
    private static THOUSAND = 1000;
    private static CAR_OCCAPACITY = 1.2;
    // Функция для расчета рабочего населения на объекте
    static countCitizen(zones: any[]): number{
        let res = 0;
        zones.forEach((zone) =>{
            if(zone.construction_type.floor_area != TrafficUtils.WORKING_AREA){
                res += (zone.zone_area / zone.construction_type.floor_area) * TrafficUtils.WORKING_SITIZEN;
            }
        });
        return res;
    }

    // Функция ддля расчта рабочих мест на объекте с учетом занятых "местными" рабочими
    static countWorkPlace(zones: any[], workers: number): number{
        let res = 0;
        zones.forEach((zone) =>{
            if(zone.construction_type.floor_area == TrafficUtils.WORKING_AREA){
                res += (zone.zone_area / zone.construction_type.floor_area);
            }
        });
        return (res - (workers * (1 - TrafficUtils.TO_CENTER)));
    }

    static calcLoad(workers: number, workPlaces: number, isMetro: Boolean): number{
        return (workers * TrafficUtils.TO_CENTER + workPlaces) * (isMetro ? (TrafficUtils.PUBLIC_TRASPORT / TrafficUtils.THOUSAND) : ((1 - TrafficUtils.PUBLIC_TRASPORT) / TrafficUtils.CAR_OCCAPACITY));
    }

    static sumTrafficMetro(zones: any[], isMorning: Boolean): number{
        let res = 0;
        zones.forEach((zone) =>{
            if(isMorning){
                res + zone.metro_station.morning_traffic;
            }
            else{
                res + zone.metro_station.evening_traffic;
            }
        });
        return res;
    }

    static sumTrafficRoad(zones: any[], isMorning: Boolean): number{
        let res = 0;
        zones.forEach((zone) =>{
            if(isMorning){
                res + zone.road.morning_traffic;
            }
            else{
                res + zone.road.evening_traffic;
            }
        });
        return res;
    }

    static calcTraffic(addTraffic: number, oldTraffic: number, sumTraffic: number):number{
        return addTraffic * oldTraffic / sumTraffic + oldTraffic;
    }

    //static isDeficite()
}
