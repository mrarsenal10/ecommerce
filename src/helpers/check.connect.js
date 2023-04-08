const os = require("os")
const process = require("process")
const mongoose = require("mongoose")

const _SECONDS = 5000

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connection::${numConnection}`)
}

const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memory = process.memoryUsage().rss

        const maxConnection = numCores * 5

        console.log(`Active connection: ${numConnection}`)
        console.log(`Memory usage: ${memory / 1024 / 1024} MB`)

        if (numConnection > maxConnection) {
            console.log(`Connection overload detected`)
        }
    }, _SECONDS)
}

export {
    countConnect,
    checkOverload
}