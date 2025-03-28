import express from 'express'
import { ErrorHandler,apivalidator } from './middleware';
import { CarDAOS } from './DAO/car_info/mocks';
import { CarInfoDAO } from './DAO/car_info/mongo'
import { CarController } from './controllers';
import { calculatorRouter } from './routers/cars_info';
import {client} from './services/mongo'


const app =express();
app.use(express.json());
const port = 5000;
app.use(apivalidator);
const car:CarDAOS = new CarInfoDAO(client);
const carcont =new CarController(car);
const carRouter = new calculatorRouter(carcont);
app.use('/cars',carRouter.router);


app.use(ErrorHandler)
app.listen(port,()=>{
    console.log(`server is running in http://localhost:${port}`)
});

app.get('/',(req,res)=>{
    res.send(`Welcome to our API`)
})  