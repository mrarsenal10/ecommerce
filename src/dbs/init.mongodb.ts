"use strict";

import mongoose from "mongoose";
import config from "../configs/config.mongodb";

const {
    db: { host, port, name },
} = config;

const connectString = `mongodb://${host}:${port}/${name}?authMechanism=DEFAULT`;
// const connectString =  'mongodb://root:rootpassword@127.0.0.1:27018/shopDev?authMechanism=DEFAULT'

class Database {
    static instance: Database;

    constructor() {
        this.connect();
    }

    connect() {
        mongoose
            .connect(connectString)
            .then(() => {
                console.log("Connected Mongodb success");
            })
            .catch((err: Error) => {
                console.log(`Error connect ${err}`);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const dbinstance = Database.getInstance();

export default dbinstance;
