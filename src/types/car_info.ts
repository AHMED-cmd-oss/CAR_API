import {components} from '../schemas/types';
export type CarcommandDTO = components['schemas']['carCommand'];
export type CarResultDTO = components['schemas']['carResult'];
export interface CarCommand {
    
    brand: string;
    model: string;
    year: number;
}

export interface CarResult {
    id?: string;
    brand: string;
    model: string;
    year: number;
}

