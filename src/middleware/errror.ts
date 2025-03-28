import { Error } from "../types/error"; 
import { Request,Response,NextFunction } from "express";

interface ErrorResponse {
    message: string;
}

export function ErrorHandler(err: any, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    console.error(err.stack);
    res.status
    (err.status || 500)
    .send({ message: err.message || 'Internal Server Error' }); 
}
