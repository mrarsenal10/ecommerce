"use strict";

import { NextFunction, Request, Response } from "express";
import { findById } from "../services/apiKey.service";

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
};

const apiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if (!key) {
            return res.status(403).json({
                message: "Forbidden Error",
            });
        }

        const objKey = await findById(key);

        if (!objKey) {
            return res.status(403).json({
                message: "Forbidden Error",
            });
        }

        // req.objKey = objKey;

        return next();
    } catch (err) {}
};

const permission = (permission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "Forbidden Error",
            });
        }

        const isValid = req.objKey.permissions.includes(permission);

        if (!isValid) {
            return res.status(403).json({
                message: "Forbidden Error",
            });
        }

        return next();
    };
};

export { apiKey, permission };
