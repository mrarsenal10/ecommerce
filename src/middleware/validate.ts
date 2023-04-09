import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../core/error.response";

import { Schema, ZodError } from "zod";

const validate =
    (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                params: req.params,
                body: req.body,
            });

            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                throw new BadRequestError({
                    // errors: error.errors
                });
            }

            next(error);
        }
    };

export default validate;
