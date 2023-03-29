require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { ErrorResponse } = require("./core/error.response");

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
require("./dbs/init.mysql");

// const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

// console.log(`Process::`, process.env);

app.use("", require("./routes"));

// handling errors

app.use((req, res, next) => {
    console.log("first")
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    const errors = error.errors || [];

    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal error",
        ...(errors.length && { errors: [error.errors] }),
    });
});

module.exports = app;
