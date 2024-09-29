const TYPE_METRO = 1;
const TYPE_ROAD = 0;

class Traffic{
    public type: number;
    public morningTrafic: number;
    public eveningTraffic: number;
    public newMorningTrafic: number = 0;
    public newEveningTraffic: number = 0;

    constructor(type: number, mT: number, eT: number){
        this.type = type;
        this.morningTrafic = mT;
        this.eveningTraffic = eT;
    }
}

class CalculationLoad{
    private floorArea: number[] = [25, 45, 35];
    private workingCapacity: number = 57;
    private proportionPublicTransport: number = 70;
    private occupancyCar: number = 1.2;
    private rideToCentre: number = 80;
    private allOccupancy: boolean = true;
    private partCitizenRushHour: number = 10;
    private partWorkerRushHour: number = 35;

    private livingArea1: number;
    private livingArea2: number;
    private workingArea: number;
    private trafficList: Traffic[];

    constructor(lA1: number, lA2: number, wA: number){
        this.livingArea1 = lA1;
        this.livingArea2 = lA2;
        this.workingArea = wA;
    }

    public setValue(floorArea1?: number, floorArea2?: number, floorArea3?: number, workingCapacity?: number, proportionPublicTransport?: number,
        occupancyCar?: number, rideToCentre?: number, allOccupancy?: boolean,
        partCitizenRushHour?: number, partWorkerRushHour?: number): void{
            if(floorArea1 != undefined) this.floorArea[0] = floorArea1;
            if(floorArea2 != undefined) this.floorArea[1] = floorArea2;
            if(floorArea3 != undefined) this.floorArea[2] = floorArea3;
            if(workingCapacity != undefined) this.workingCapacity = workingCapacity;
            if(proportionPublicTransport != undefined) this.proportionPublicTransport = proportionPublicTransport;
            if(occupancyCar != undefined) this.occupancyCar = occupancyCar;
            if(rideToCentre != undefined) this.rideToCentre = rideToCentre;
            if(allOccupancy != undefined) this.allOccupancy = allOccupancy;
            if(partCitizenRushHour != undefined) this.partCitizenRushHour = partCitizenRushHour;
            if(partWorkerRushHour != undefined) this.partWorkerRushHour = partWorkerRushHour;
    }

    public addTrafic(type: number, mT: number, eT: number): void{
        this.trafficList.push(new Traffic(type, mT, eT));
    }

    public addTraficExemplar(traffic: Traffic): void{
        this.trafficList.push(traffic);
    }

    public getLoadTraffic(index: number, inMorning: boolean): number{
        if(index >= this.trafficList.length) return -1;
        if(inMorning){
            return this.trafficList[index].newMorningTrafic;
        }
        return this.trafficList[index].newEveningTraffic;
    }

    public getTraffic(index: number): Traffic | undefined{
        if(index >= this.trafficList.length) return undefined;
        return this.trafficList[index];
    }

    public getListTrafic(): Traffic[]{
        return this.trafficList;
    }

    private sumLoad(type: number, inMorning: Boolean): number{
        let sum = 0;
        for(let i = 0; i < this.trafficList.length; i++){
            if(this.trafficList[i].type == type){
                if(inMorning)
                    sum += this.trafficList[i].morningTrafic;
                else
                    sum += this.trafficList[i].eveningTraffic;
            }
        }
        return sum;
    }

    private setLoad(type: number, inMorning: Boolean, summ: number, add:number): void{
        for(let i = 0; i < this.trafficList.length; i++){
            if(this.trafficList[i].type == type){
                if(inMorning)
                    this.trafficList[i].newMorningTrafic = add * this.trafficList[i].morningTrafic / summ;
                else
                    this.trafficList[i].newEveningTraffic = add * this.trafficList[i].eveningTraffic / summ;
            }
        }
    }

    //прирост населения в зависимости от площади
    private populationGrowth(square: number, category: number): number{
        return square / category;
    }


    public calculate(){
        let addMetroLoad, addRoadLoad;
        let currentMetroLoadMorning = this.sumLoad(TYPE_METRO, true);
        let currentMetroLoadEvening = this.sumLoad(TYPE_METRO, false);
        let currentRoadLoadMorning = this.sumLoad(TYPE_ROAD, true);
        let currentRoadLoadEvening = this.sumLoad(TYPE_ROAD, false);

        let newPopulation = this.populationGrowth(this.livingArea1, this.floorArea[0]);
        newPopulation += this.populationGrowth(this.livingArea2, this.floorArea[1]);
        let newWorkPlace = this.populationGrowth(this.workingArea, this.floorArea[2]);
        let newWorker = newPopulation * this.workingCapacity / 100;

        addMetroLoad = this.allOccupancy ? 
            newWorker * this.rideToCentre * this.proportionPublicTransport / 10000 : 
            newWorker * this.rideToCentre * this.proportionPublicTransport * this.partCitizenRushHour / 1000000;
            
        addRoadLoad = this.allOccupancy ?
            newWorker * this.rideToCentre * (100 - this.proportionPublicTransport) / 10000 : 
            newWorker * this.rideToCentre * (100 - this.proportionPublicTransport) * this.partCitizenRushHour / 1000000;

        newWorkPlace -= newWorker * (100 - this.rideToCentre) / 100;

        addMetroLoad += this.allOccupancy ?
            newWorkPlace * this.proportionPublicTransport / 100 :
            newWorkPlace * this.proportionPublicTransport * this.partWorkerRushHour / 10000;
        addRoadLoad += this.allOccupancy ?
            newWorkPlace * (100 - this.proportionPublicTransport) / 100 :
            newWorkPlace * (100 - this.proportionPublicTransport) * this.partWorkerRushHour / 10000;

        addRoadLoad /= this.occupancyCar;
        
        this.setLoad(TYPE_METRO, true, currentMetroLoadMorning, addMetroLoad);
        this.setLoad(TYPE_METRO, false, currentMetroLoadEvening, addMetroLoad);
        this.setLoad(TYPE_ROAD, true, currentRoadLoadMorning, addRoadLoad);
        this.setLoad(TYPE_ROAD, false, currentRoadLoadEvening, addRoadLoad);
    }

}

