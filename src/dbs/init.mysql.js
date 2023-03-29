const { Sequelize } = require("sequelize");
const {
    db: { host, port, name, username, password },
} = require("../configs/config.mongodb");

const sequelize = new Sequelize(name, username, password, {
    host,
    port,
    dialect: "mysql",
});

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((error) => {
                console.error("Unable to connect to the database: ", error);
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
dbinstance.sequelize = sequelize;
dbinstance.Sequelize = Sequelize;

module.exports = dbinstance;
