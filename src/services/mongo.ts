import { MongoClient } from "mongodb";
const MONGO_URI="mongodb://localhost:27017";
export const client = new MongoClient(MONGO_URI);
export enum databases{
    RESTAPI = 'restapi'

}    

enum RESTAPIcollections
{
    cars = 'cars'
}

export const MONGOCOLLECTIONS = {
    [databases.RESTAPI]:{
        [RESTAPIcollections.cars]:RESTAPIcollections
    }   
}