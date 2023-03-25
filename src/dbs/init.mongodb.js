'use strict'

const mongoose = require("mongoose")
const { db: { host, port, name }} = require("../configs/config.mongodb")

const connectString = `mongodb://${host}:${port}/${name}`

// console.log(connectString)

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(connectString).then(() => {
            console.log("Connected Mongodb success")
        }).catch((err) => {
            console.log(`Error connect ${err}`)
        })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const dbinstance = Database.getInstance()

module.exports = dbinstance