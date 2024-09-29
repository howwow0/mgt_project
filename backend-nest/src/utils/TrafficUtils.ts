//src/utils/TrafficUtils.ts

export class TrafficUtils {
  // Growth of population based on area
  static populationGrowth(square: number, category: number): number {
    return square / category;
  }

  // Growth of passenger traffic (office and residential areas)
  static passengerGrowth(
    officePopulationGrowth: number,
    livingPopulationGrowth: number,
  ): number {
    return officePopulationGrowth + livingPopulationGrowth * 0.57 * 0.8;
  }

  // Passenger traffic growth by type: IT or OT
  static typePassengerGrowth(passengerGrowth: number, type: number): number {
    return type * passengerGrowth;
  }

  // Sum of traffic nodes (for both IT and OT)
  static passengerTraffic(
    nodeArray: number[],
    countNode: number,
    transportFactor: number = 1,
  ): number {
    let sum = 0;
    for (let i = 0; i < countNode; i++) {
      sum += nodeArray[i];
    }
    return sum * transportFactor;
  }

  // New passenger traffic
  static newPassengerTraffic(
    passengerTraffic: number,
    typePassengerGrowth: number,
  ): number {
    return passengerTraffic + typePassengerGrowth;
  }

  // New passenger traffic at a node
  static newNodePassengerTraffic(
    typePassengerGrowth: number,
    passengerTraffic: number,
    nodePassengerTraffic: number,
  ): number {
    return (typePassengerGrowth * nodePassengerTraffic) / passengerTraffic;
  }

  // Check for deficit
  static delta(newPassengerTraffic: number, trafficCapacity: number): boolean {
    return newPassengerTraffic - trafficCapacity > 0;
  }
}


