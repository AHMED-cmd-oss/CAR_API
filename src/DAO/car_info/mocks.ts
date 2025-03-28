import { Car } from "../../model/Car_info";
export interface CarDAOS
{
    create(car: Car): Promise<Car>;
    read(id: string): Promise<Car|any> ;
    upsert(id: string, car: Car): Promise<Car>;
    delete(id: string): Promise<void>;
    list(): Promise<Car[]>;
    
}

export * from './car_info';