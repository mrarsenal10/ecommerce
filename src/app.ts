// require("dotenv").config();
import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import { ErrorResponse } from "./core/error.response";
import router from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//require database
// require("./dbs/init.mysql");
import "./dbs/init.mongodb";

// const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

// console.log(`Process::`, process.env);

app.use("", router);

// handling errors
app.use((_req: Request, _res: Response, _next: NextFunction) => {
    const error = new ErrorResponse({ message: "Not Found", code: 404 });
    _next(error);
});

app.use(
    (
        error: ErrorResponse,
        _req: Request,
        _res: Response,
        _next: NextFunction
    ) => {
        const statusCode = error.status || 500;
        const errors = error.errors || [];

        return _res.status(statusCode).json({
            status: "error",
            code: statusCode,
            message: error.message || "Internal error",
            ...(errors.length > 0 && { errors }),
        });
    }
);

export default app;
