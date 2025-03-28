import { Car } from "../model/Car_info";
import { CarResultDTO } from "../types";
import { CarCommandMapper } from "./carCommand";
import { NotFoundError } from "../errors";


export const carMapper={
    toDTO(car: Car): CarResultDTO{
        
            if(!car)
            {
                throw new NotFoundError('Car not found');
            }   
           

        
        const {command,result} = car;
        if(!result)
        {
           throw new Error('Please check the result');
        }
        return {
            id: result.id??'Error was happend',
            brand: result.brand,
            model: result.model,
            year: result.year
            
            
            
        }
    }
}