import { VehicleType } from "./vehicleType.model";

export class Vehicle{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public plate: string,
        public vehicleType: VehicleType
    ) {}
}