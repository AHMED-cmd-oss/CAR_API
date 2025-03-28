import { CarDAOS } from "../DAO/car_info/mocks";    
import { CarResultDTO } from "../types";
import { carMapper } from "../mapper/mapper";
import { Car } from "../model/Car_info";
import { CarcommandDTO } from "../types";
import { CarCommandMapper } from "../mapper/carCommand";
import { NotFoundError } from "../errors";

export class CarController{
    constructor(private carDAO:CarDAOS){}
   


    async getAllCars():Promise<CarResultDTO[]>{
        const cars = await this.carDAO.list();
        return cars.map((car)=>carMapper.toDTO(car));
    }

    async getCarById(id:string):Promise<CarResultDTO | undefined>{
        
        const car =await this.carDAO.read(id);
        return carMapper.toDTO(car);
    }

    async deleteCar(id:string):Promise<void>{
        
       

        await this.carDAO.delete(id);
        return;
        
    }

    async createCar(car:CarcommandDTO):Promise<CarResultDTO>{
        const newCar = new Car(CarCommandMapper.toDomain(car));
        const result = await this.carDAO.create(newCar);
        return carMapper.toDTO(result); 
    }

    async updateCar(id:string,car:CarcommandDTO):Promise<CarResultDTO>{
        await this.checkcarByID(id);
        const newCar = new Car(CarCommandMapper.toDomain(car));
        
        const result = await this.carDAO.upsert(id,newCar);
        return carMapper.toDTO(result);
    } 
    private async checkcarByID(id: string): Promise<Car | any> {
        try {
            const car = await this.carDAO.read(id);
            if (!car) {
                throw new NotFoundError("Car not found");
            }
            return car;
        } catch (error) {
            console.error("❌ Error fetching car:", error);
            console.log("🔍 Error Type:", typeof error);
    
            throw error instanceof NotFoundError ? error : new Error("Internal Server Error");
        }
    }
    
}