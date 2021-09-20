const meterService = require("../services/meterService")

const getInitialMeterReadings = (req,res) => {
    let rawData = meterService.fetchMeterData()
    let aggregatedDataByDate = meterService.aggregatedDataByDate(rawData)
    
    res.status(200).json(aggregatedDataByDate)
}

module.exports = {
    getInitialMeterReadings
}