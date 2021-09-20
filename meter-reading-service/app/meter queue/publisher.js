const amqp = require("amqplib")
const meterDataQueue = "meter-data-queue"
const connectionUrl = "amqp://localhost"
const { generateRandomMeterData,fetchMeterData,aggregatedDataByDate } = require("../services/meterService")

let publishChannel = null

const connectToChannel = async () => {
    try {
        let connection = await amqp.connect(connectionUrl)
        publishChannel = await connection.createChannel()
        publishChannel.assertQueue(meterDataQueue)
    } catch (error) {
        console.error('Failed to create amqp publisher connection and channel: ', error)
    }
}

const publishToQueue = async (data) => {
    if (publishChannel == null) {
        publishChannel = await connectToChannel();
    }
    
    publishChannel.sendToQueue(meterDataQueue, Buffer.from(data));
}

setInterval(() => {
    let data = generateRandomMeterData()
    let updatedData = fetchMeterData()
    updatedData.push(data)
    let groupedData = JSON.stringify(aggregatedDataByDate(updatedData))
    publishToQueue(groupedData)
}, 10000);

module.exports = { publishToQueue, connectToChannel }