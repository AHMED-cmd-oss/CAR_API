import { MongoCryptCreateEncryptedCollectionError } from "mongodb";

export function ErrorHandler (error:unknown,message:string):never
{
    if (error instanceof Error)
    {
        throw new Error(`${message}: ${error.message}`)
    }
    throw error
}