'use strict'

const mongoose = require("mongoose")
const { db: { host, port, name, username, password }} = require("../configs/config.mongodb")

console.log(host, port, name)

const connectString = `mongodb://${host}:${port}/${name}?authMechanism=DEFAULT`
// const connectString =  'mongodb://root:rootpassword@127.0.0.1:27018/shopDev?authMechanism=DEFAULT'
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