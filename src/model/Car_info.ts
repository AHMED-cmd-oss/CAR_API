import { CarCommand,CarResult } from "../types";

export class Car{
    constructor(
        public command: CarCommand,
        public result?: CarResult 
    )
    {
        this.validate();

    }

    private validate():void
    {
        if(this.command.brand === undefined || this.command.model === undefined || this.command.year === undefined)
        {
            throw new Error('Please full of the required command (brand, model, year)');
        }   
    }


}