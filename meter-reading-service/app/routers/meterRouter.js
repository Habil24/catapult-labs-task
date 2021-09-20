const express = require("express")
const meterRouter = express.Router()
const { getInitialMeterReadings } = require("../controllers/meterController")


meterRouter.get("/",getInitialMeterReadings)

module.exports = meterRouter

