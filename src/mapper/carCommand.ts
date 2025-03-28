import { CarCommand,CarcommandDTO } from "../types";

export const CarCommandMapper = {
    toDomain(dto: CarcommandDTO): CarCommand {
        const {brand, model, year} = dto;
        return {brand, model, year};
    },

    toDTO(domain: CarCommand): CarcommandDTO {
        const {brand, model, year} = domain;
        return {brand, model, year}
    }

    
};