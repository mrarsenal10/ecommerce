import app from "./src/app"
import config from "./src/configs/config.mongodb"

const {
    app: { port },
} = config

const PORT = port || 3052

const server = app.listen(PORT, () => {
    console.log(`Ecommerce start with ${PORT}`)
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed")
    })
})
