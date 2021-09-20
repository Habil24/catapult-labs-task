const amqp = require("amqplib")
const connectionUrl = "amqp://localhost"
const meterDataQueue = "meter-data-queue"
const SocketInit = require("../socket")
let publishChannel = null

const connectToChannel = async () => {
    try {
        let connection = await amqp.connect(connectionUrl)
        publishChannel = await connection.createChannel()
        publishChannel.assertQueue(meterDataQueue)

        publishChannel.consume(meterDataQueue, (message) => {
            const msgString = message.content.toString()
            publishChannel.ack(message)
            processMessage(msgString)
        })
    } catch (error) {
        console.error('Failed to create amqp consumer connection and channel: ', error)
    }
}

const processMessage = (stringMessage) => {
    let meterData = JSON.parse(stringMessage)
    const socket = SocketInit.getInstance();
    socket.publishEvent("newMeterData",meterData)
}

module.exports = {connectToChannel,processMessage}
