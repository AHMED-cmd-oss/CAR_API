import { Request, Response, NextFunction } from "express";
import { CarCommand } from "../types";
export function Validation(req: Request<{}, {}, CarCommand>, res: Response, next: NextFunction): void {
    const { brand, model, year } = req.body;

    if (!brand || !model || !year) {
        res.status(400).json({ error: "Missing required fields: brand, model, year are required" });
        return; // ✅ ضروري حتى لا يُنفّذ `next()`
    }

    if (typeof brand !== "string") {
        res.status(400).json({ error: "Brand must be a string" });
        return;
    }

    if (typeof model !== "string") {
        res.status(400).json({ error: "Model must be a string" });
        return;
    }

    if (typeof year !== "number" || year < 1886 || year > new Date().getFullYear() + 1) {
        res.status(400).json({ error: "Year must be a valid number (between 1886 and next year)" });
        return;
    }

    return next(); // ✅ تأكيد أن `next()` يُنفَّذ فقط عند نجاح التحقق
}
