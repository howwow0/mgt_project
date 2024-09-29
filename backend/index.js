'use strict';

//прирост населения в зависимости от площади
function PoppulationGrowth(square, category){
    return square / category;
}

//прирост пассажиропотока (офисная и жилая область застройки)
function PassangerGrowth(officePoppulationGrowth, livingPoppulationGrowth){
    return officePoppulationGrowth + livingPoppulationGrowth * 0.57 * 0.8; 
}

//прирост пассажиропотока по типу: ИТ или ОТ
function TypePassangerGrowth(passangerGrowth, type){
    return type * passangerGrowth;
}

//TODO: перевести число людей в количество машин/час

//сумма узлов пассажиропотока (и для ИТ, и для ОТ)
function PassangerTraffic(nodeArray, countNode, transportFactor = 1){
    let sum = 0;
    for (let i = 0; i < countNode; i++){
        sum += nodeArray[i];
    }
    return sum * transportFactor;
}

//новый пассажиропоток
function NewPassangerTraffic(passangerTraffic, typePassangerGrowth){
    return passangerTraffic + typePassangerGrowth;
}

//TODO: уточнить, посчитано ли для узла или для прироста узла

//новый пассажиропоток на узле
function NewNodePassangerTraffic(typePassangerGrowth, passangerTraffic, nodePassangerTraffic){
    return typePassangerGrowth * nodePassangerTraffic / passangerTraffic;
}

//наличие дефицита
function Delta(newPassangerTraffic, trafficCapacity){
    if (trafficCapacity - newPassangerTraffic > 0){
        return true;
    }
    else{
        return false;
    }
}

//TODO: сделать расчёт баллов по линейно зависимости






