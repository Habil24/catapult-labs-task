const express = require('express')
const app = express()
const { Server } = require('socket.io')
const cors = require("cors")
const publisher = require("./app/meter queue/publisher")
const consumer = require("./app/meter queue/consumer")
const SocketInit = require("./app/socket")
const meterRouter = require("./app/routers/meterRouter")


// Middlewares
app.use(cors({
    origin: '*'
}));

// Routes
app.use("/meterReadings",meterRouter)

// Queue connections
publisher.connectToChannel()
consumer.connectToChannel()

const server = app.listen(3000, () => {
    console.log("Server started to run on port 3000...")
})

// Socket for sending data to frontend
const io = new Server(server, {
    cors: {
      origin: "*"
    },
});

new SocketInit(io)

module.exports = io