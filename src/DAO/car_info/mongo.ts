import { CarDAOS } from "./mocks";
import { Car } from "../../model/Car_info";
import { NotFoundError } from "../../errors";
import omit from "lodash.omit"; 
import { ObjectId,MongoClient, Collection } from "mongodb";
import { client, databases, MONGOCOLLECTIONS } from "../../services/mongo";
import { ErrorHandler } from "../../utilies";


interface mongoCarInfo_design
{
    _id?: ObjectId;
    brand: string;
    model: string;
    year: number;
}

const database_name=databases.RESTAPI;
const collection_name=MONGOCOLLECTIONS[database_name].cars;

export class CarInfoDAO implements CarDAOS
{
    private collections : Collection<mongoCarInfo_design>
    constructor(private client:MongoClient){
        const database = this.client.db(database_name);
        this.collections = database.collection<mongoCarInfo_design>(MONGOCOLLECTIONS[database_name].cars.toString());
    }
    
    async create(car: Car): Promise<Car> {
        const carPersisted = this.topresistance(car);
        
            const result = await this.collections.insertOne(carPersisted,{ignoreUndefined:true});
            const insertdedocument=await this.collections.findOne({_id:result.insertedId});
            if(insertdedocument)
            {
                return this.todomain(insertdedocument);
            }else{
                throw new Error("Error inserting the document");
            }
        
        
    }
    async read(_id: string): Promise<Car | undefined> {
        try{
            const result = await this.collections.findOne({_id:new ObjectId(_id)})
            return result? this.todomain(result):undefined

        }catch(error)
        {
            ErrorHandler(error,"something went wrong")
        }

        
      
    
       
    

    }
    
    async upsert(_id: string, car: Car): Promise<Car> {
        const prestance = await this.topresistance(car);
        try {
            const checkId = await this.collections.findOneAndUpdate(
                { _id: new ObjectId(_id) }, // ✅ الفلتر لتحديد المستند
                { $set:omit(prestance,'date') ,
                    $currentDate: { lastModified: true }
                }, // ✅ تحديث البيانات باستخدام $set
                { upsert: true, returnDocument: "after",ignoreUndefined:true } // ✅ upsert لإنشاءه لو مش موجود
            );
    
            if (checkId) {
                return this.todomain(checkId);
            } else {
                throw new Error("Car not found");
            }
        } catch (error) {
            ErrorHandler(error, "something went wrong");
        }
    }
    
    async delete(_id: string): Promise<void> {
        try{
            const result = await this.collections.findOne({_id:new ObjectId(_id)})
            if (result)
            {
                await this.collections.deleteOne({_id:new ObjectId(_id)})
            }else{
                throw new Error("The id not found")
            }

        }catch(error)
        {
            ErrorHandler(error,"Something went wrong")
        }
       
    }
    
    
    async list(): Promise<Car[]> {
        try
        {
            const results=await this.collections.find().toArray();
            return results.map(doc=>this.todomain(doc))
        }catch(error)
        {
            ErrorHandler(error,"Something went wrong")
        }
    
    }
    

    private topresistance(car: Car, existingId?: string): mongoCarInfo_design
    {
        return {
            _id: existingId ?? car.result?.id? new ObjectId(car.result?.id):undefined ,
            brand: car.command.brand,
            model: car.command.model,
            year: car.command.year
        };
    }
    private todomain(car: mongoCarInfo_design): Car
    {
        const { _id, brand, model, year } = car;
        return new Car({
            brand: car.brand,
            model: car.model,
            year: car.year
        }, {
            id: car._id?.toString(),
            brand: car.brand,
            model: car.model,
            year: car.year
        });
    }
}