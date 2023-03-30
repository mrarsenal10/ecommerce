const app = require("./src/app");

const {
    app: { port },
} = require("./src/configs/config.mongodb");
const { sequelize } = require("./src/dbs/init.mysql");

const PORT = port || 3052;

const server = app.listen(PORT, () => {
    console.log(`Ecommerce start with ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        // sequelize.close();
        console.log("Server closed");
    });
});
