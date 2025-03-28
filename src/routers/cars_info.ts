import  e, {Router, Response, Request } from 'express';
import { CarCommand,CarResult,CarcommandDTO,CarResultDTO } from '../types';
import { Validation,apivalidator } from '../middleware';
import { CarController } from '../controllers';




export class calculatorRouter
{
    public static path ='./cars';
    router:Router;
    constructor(private carController:CarController)
    {
        this.router = Router();
        this.getAllCar();
        this.getCarById();
        this.createCar();
        this.updateCar();
        this.deleteCar();   

        
    }

    private getAllCar(){
        /**
 * @swagger
 * /cars:
 *   get:
 *     tags:
 *       - Car_info
 *     summary: Retrieve all cars
 *     description: Returns a list of cars.
 *     responses:
 *       200:
 *         description: Response was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/carResult'
 */

this.router.get('/',async (req: Request, res: Response<CarResultDTO[]>) => {
    res.send(await this.carController.getAllCars());
});

    }

    private getCarById(){
        /**
 * @swagger
 * /cars/{id}:
 *   get:
 *     tags:
 *       - Car_info
 *     summary: Get car by ID
 *     description: Retrieve a specific car by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/carResult'
 *       404:
 *         $ref: '#/components/responses/notFoundError'
 */
interface ErrorResponse {
    error: string;
    message: string;
  }
  
this.router.get('/:id',apivalidator, async(req: Request<{ id: string }>, res: Response<CarResultDTO | { message: string } | ErrorResponse>) => {

    try {
        const car = await this.carController.getCarById(req.params.id);
        res.json(car);
    } catch (error: any) {
        console.error("🚨 Error:", error);
        res.status(error.status || 500).json({
            error: error.name || "InternalServerError",
            message: error.message || "Something went wrong"
        });
    }

    
    

    

    
});
}
private createCar(){
    /**
 * @swagger
 * /cars:
 *   post:
 *     tags:
 *       - Car_info
 *     summary: Create a new car
 *     description: Add a new car to the system.
 *     requestBody:
 *       $ref: "#/components/requestBodies/carCommand"
 *     responses:
 *       201:
 *         description: Car was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/carResult'
 */

this.router.post('/', apivalidator, async(req: Request<{}, {}, Omit<CarcommandDTO, 'id'>>, res: Response<CarResultDTO>) => {
    
    res.status(201).json(await this.carController.createCar(req.body));
});
}
private updateCar(){
    /**
 * @swagger
 * /cars/{id}:
 *   put:
 *     tags:
 *       - Car_info
 *     summary: Update car by ID
 *     description: Modify car details.
 *     requestBody:
 *       $ref: "#/components/requestBodies/carCommand"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/carResult'
 *       404:
 *         $ref: '#/components/responses/notFoundError'
 */
interface ErrorResponse {
    error: string;
    message: string;
  }
this.router.put('/:id', apivalidator,async (req: Request<{ id: string },{},Omit<CarResultDTO,'id'>>, res: Response<CarResultDTO|ErrorResponse>) => {
    try{
        res.send(await this.carController.updateCar(req.params.id,req.body));

    }catch(error : any)
    {
        const status = (error && typeof error === "object" && "status" in error) ? error.status : 500;
        const message = (error && typeof error === "object" && "message" in error) ? error.message : "Something went wrong";

        res.status(status).json({
            error: error.name || "InternalServerError",
            message: message
        });

    }
});
}

private deleteCar(){
    
/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     tags:
 *       - Car_info
 *     summary: Delete car by ID
 *     description: Remove a car from the system using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car successfully deleted.
 *       404:
 *         $ref: '#/components/responses/notFoundError'
 */
this.router.delete('/:id', apivalidator, async (req: Request<{ id: string }>, res: Response) => {
    try {
        await this.carController.deleteCar(req.params.id);
        res.status(200).json({ message: 'Car deleted successfully' }); // ✅ نجاح الحذف
    } catch (error:any) {
        console.error("🚨 Error:", error);

        // ✅ تأكد إن الخطأ هو Object، ولو مش Object رجعه كـ `InternalServerError`
        const status = (error && typeof error === "object" && "status" in error) ? error.status : 500;
        const message = (error && typeof error === "object" && "message" in error) ? error.message : "Something went wrong";

        res.status(status).json({
            error: error.name || "InternalServerError",
            message: message
        });
    }
});


}
}



