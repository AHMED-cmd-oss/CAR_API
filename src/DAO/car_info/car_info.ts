import { CarDAOS } from "./mocks";
import { Car } from "../../model/Car_info";
import { NotFoundError } from "../../errors";

interface CarInfo_design
{
    id: string;
    brand: string;
    model: string;
    year: number;
}

const mocksDB: { [id: string]: CarInfo_design } = {
    '1': { id: '1', brand: 'Toyota', model: 'Corolla', year: 2019 },
    '2': { id: '2', brand: 'Honda', model: 'Civic', year: 2020 },
    '3': { id: '3', brand: 'Nissan', model: 'Sentra', year: 2021 }
};

export class CarInfoDAO implements CarDAOS
{
    private counter = 3; 
    async create(car: Car): Promise<Car> {
        const carInfo = this.topresistance(car);
        mocksDB[carInfo.id] = carInfo;
        return this.todomain(carInfo)
    }
    async read(id: string): Promise<Car | undefined> {
        
      
    
        const result = mocksDB[id]; // ✅ تحويل ID إلى string
        console.log("🚗 Car found:", result);
        
            if (!result) {
                throw new NotFoundError("Car not found");
            }
                return this.todomain(result);
    

    }
    
    async upsert(id: string, car: Car): Promise<Car> {
        const reesultprestance = { ...this.topresistance(car, id) };
        mocksDB[id] = reesultprestance;
        return this.todomain(reesultprestance);
    }
    async delete(id: string): Promise<void> {
        if (!mocksDB[id]) {
            throw new NotFoundError("Car not found");
        }
        delete mocksDB[id];
    }
    
    
    async list(): Promise<Car[]> {
        return Promise.resolve(Object.values(mocksDB).map((car) => this.todomain(car)));
    }
    private generate_id(): string
    {
        this.counter++;
        return this.counter.toString();

    }

    private topresistance(car: Car, existingId?: string): CarInfo_design
    {
        return {
            id: existingId ?? car.result?.id ?? this.generate_id(),
            brand: car.command.brand,
            model: car.command.model,
            year: car.command.year
        };
    }
    private todomain(car: CarInfo_design): Car
    {
        const { id, brand, model, year } = car;
        return new Car({
            brand: car.brand,
            model: car.model,
            year: car.year
        }, {
            id: car.id,
            brand: car.brand,
            model: car.model,
            year: car.year
        });
    }
}