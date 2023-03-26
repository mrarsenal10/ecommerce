require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
//require database
require("./dbs/init.mongodb");

// const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

// console.log(`Process::`, process.env);

app.use('', require('./routes'))

// handling errors

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || "Internal error",
    })
})

module.exports = app;
